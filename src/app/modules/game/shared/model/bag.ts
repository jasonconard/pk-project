import {
  characterStats,
  DbCharacter,
  DbItem,
  GameDatabase,
  growthOf,
  ItemKind,
  STATS,
} from "../../../database-editor/shared/database";
import {
  currentParty,
  giveItem,
  memberProgress,
  MemberProgress,
  saveProgress,
} from "../../../database-editor/shared/party";
import {
  gainGrowth,
  GROWTH_LEVEL_MAX,
  POINTS_PER_USE,
} from "../../../battle/shared/progress";

/** An item carried and how many. */
export interface BagLine {
  item: DbItem;
  count: number;
}

/** The items carried of one kind, in the database's order. */
export function bagLines(db: GameDatabase, kind: ItemKind): BagLine[] {
  const items = currentParty().items;
  return db.items
    .filter((item) => item.kind === kind && (items[item.id] ?? 0) > 0)
    .map((item) => ({ item, count: items[item.id] }));
}

/** How many items are carried, all kinds together. */
export function bagCount(): number {
  return Object.values(currentParty().items).reduce((sum, n) => sum + n, 0);
}

/** The team's members, in order. */
export function teamMembers(db: GameDatabase): DbCharacter[] {
  return currentParty()
    .team.map((id) => db.characters.find((c) => c.id === id))
    .filter((c): c is DbCharacter => !!c);
}

/** Usable from the bag, outside a fight: a consumable made for it, on the team, that heals or makes one grow. */
export function fieldUsable(item: DbItem): boolean {
  return (
    item.kind === "consumable" &&
    (item.use === "field" || item.use === "both") &&
    item.target !== "enemy" &&
    item.target !== "enemies" &&
    !!item.effects?.some((e) =>
      ["heal", "removeState", "statUp", "xp"].includes(e.kind)
    )
  );
}

/** Used on the whole team at once. */
export function onWholeTeam(item: DbItem): boolean {
  return item.target === "allies";
}

/** A bar of the member before and after the item. */
export interface BarChange {
  from: number;
  to: number;
  max: number;
}

/** What an item would do to a member: its bars, the other gains in words, and whether it is worth using. */
export interface UsePreview {
  hp: BarChange;
  mp: BarChange;
  /** « Guérit Poison », « Force +1 »… */
  gains: string[];
  useful: boolean;
  /** Why it is not worth using (« PV au maximum »). */
  why: string;
}

/**
 * The item's effects worked out on a member, without changing anything: PV / PM given back (power / 10 × the
 * member's own Magic, without the fight's luck), states cured, a stat raised for good, experience in an element or
 * a weapon type. `progress` after the item is returned too, for useItem.
 */
function workOut(
  item: DbItem,
  c: DbCharacter,
  db: GameDatabase
): { preview: UsePreview; after: MemberProgress } {
  const p = memberProgress(c);
  const stats = characterStats(c, p.level, db, p.statUps);
  const hp: BarChange = { from: p.hp, to: p.hp, max: stats.hp };
  const mp: BarChange = { from: p.mp, to: p.mp, max: stats.mp };
  const gains: string[] = [];
  const whys: string[] = [];
  for (const e of item.effects ?? []) {
    switch (e.kind) {
      case "heal": {
        const bar = e.resource === "hp" ? hp : mp;
        const name = e.resource === "hp" ? "PV" : "PM";
        const amount = Math.max(1, Math.round((e.power / 10) * stats.mag));
        if (bar.to >= bar.max) {
          whys.push(`${name} au maximum`);
        }
        bar.to = Math.min(bar.max, bar.to + amount);
        break;
      }
      case "removeState": {
        if (p.states.includes(e.state)) {
          p.states = p.states.filter((s) => s !== e.state);
          const state = db.states.find((s) => s.id === e.state);
          gains.push(`Guérit ${state?.name ?? "l'état"}`);
        } else {
          whys.push("Rien à guérir");
        }
        break;
      }
      case "statUp": {
        p.statUps = {
          ...p.statUps,
          [e.stat]: (p.statUps?.[e.stat] ?? 0) + e.amount,
        };
        const label = STATS.find((s) => s.id === e.stat)?.label ?? e.stat;
        gains.push(`${label} +${e.amount}`);
        break;
      }
      case "xp": {
        const name =
          db.elements.find((x) => x.id === e.id)?.name ??
          db.weapons.find((x) => x.id === e.id)?.name ??
          "";
        // (a progress without this element yet starts from the character's own level in it)
        p.growth[e.id] ??= { level: growthOf(c, e.id).level, points: 0 };
        const level = p.growth[e.id].level;
        if (
          growthOf(c, e.id).affinity === "never" ||
          level >= GROWTH_LEVEL_MAX
        ) {
          whys.push(`Ne progresse pas en ${name}`);
          break;
        }
        const got = gainGrowth(c, p, e.id, e.amount / POINTS_PER_USE, 0);
        gains.push(
          got.levels > 0
            ? `${name} niv. ${level + got.levels}`
            : `${name} +${got.points} points`
        );
        break;
      }
      // No default: the other effects are for the fights
    }
  }
  p.hp = hp.to;
  p.mp = mp.to;
  const useful = hp.to > hp.from || mp.to > mp.from || gains.length > 0;
  return {
    preview: { hp, mp, gains, useful, why: useful ? "" : (whys[0] ?? "") },
    after: p,
  };
}

/** What the item would do to this member. */
export function previewUse(
  item: DbItem,
  c: DbCharacter,
  db: GameDatabase
): UsePreview {
  return workOut(item, c, db).preview;
}

/**
 * Uses one item on these members (one, or the whole team): those it is useful to change, one item leaves the bag.
 * Returns what happened in words (« Hugo : +50 PV »), or nothing when it was useless for all.
 */
export function useItem(
  item: DbItem,
  targets: DbCharacter[],
  db: GameDatabase
): string {
  const changed: Record<string, MemberProgress> = {};
  const told: string[] = [];
  for (const c of targets) {
    const { preview, after } = workOut(item, c, db);
    if (!preview.useful) {
      continue;
    }
    changed[c.id] = after;
    const parts = [
      preview.hp.to > preview.hp.from
        ? `+${preview.hp.to - preview.hp.from} PV`
        : "",
      preview.mp.to > preview.mp.from
        ? `+${preview.mp.to - preview.mp.from} PM`
        : "",
      ...preview.gains,
    ].filter(Boolean);
    told.push(`${c.name} : ${parts.join(", ")}`);
  }
  if (told.length === 0 || (currentParty().items[item.id] ?? 0) < 1) {
    return "";
  }
  saveProgress(changed);
  giveItem(item.id, -1);
  return told.join(" · ");
}

/** Can be thrown away: anything but a key item. */
export function canDrop(item: DbItem): boolean {
  return item.kind !== "key";
}

/** Throws items away (lost for good). */
export function dropItem(item: DbItem, count: number): void {
  if (canDrop(item)) {
    giveItem(item.id, -Math.max(1, Math.round(count)));
  }
}
