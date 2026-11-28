import {
  characterStats,
  DbCharacter,
  DbItem,
  EQUIP_SLOTS,
  EquipSlot,
  GameDatabase,
  STATS,
  StatId,
} from "../../../database-editor/shared/database";
import {
  asWorn,
  currentParty,
  memberProgress,
} from "../../../database-editor/shared/party";
import {
  knownSkills,
  pointsToNext,
  xpToNext,
} from "../../../battle/shared/progress";

/** The stats shown as numbers (PV and PM are bars). */
const SHEET_STATS: StatId[] = ["str", "mag", "end", "agi", "luck"];

/** A slot of a member: its name and what is worn in it. */
export interface WornSlot {
  slot: EquipSlot;
  label: string;
  item?: DbItem;
  /** « Force +3 · Feu ×½ »: what the item brings. */
  brings: string;
}

/** A member as the team menu shows it. */
export interface MemberCard {
  c: DbCharacter;
  level: number;
  hp: number;
  hpMax: number;
  mp: number;
  mpMax: number;
  /** Experience towards the next level: in %, and what is left (0 at the highest level). */
  xpPercent: number;
  xpLeft: number;
  slots: WornSlot[];
}

/** What an item brings, in a few words: its stat bonuses, its resistances, what grows faster with it. */
export function itemBrings(item: DbItem, db: GameDatabase): string {
  const resist = {
    weak: "faible",
    resist: "×½",
    null: "annulé",
    absorb: "absorbé",
  };
  const name = (id: string) =>
    db.elements.find((e) => e.id === id)?.name ??
    db.weapons.find((w) => w.id === id)?.name ??
    "";
  return [
    ...(item.bonuses ?? []).map(
      (b) =>
        `${STATS.find((s) => s.id === b.stat)?.label ?? b.stat} ${signed(b.amount)}`
    ),
    ...(item.resists ?? []).map((r) => `${name(r.element)} ${resist[r.level]}`),
    ...(item.growth ?? []).map(
      (g) => `${name(g.id)} progresse +${g.percent} %`
    ),
  ].join(" · ");
}

function signed(n: number): string {
  return n < 0 ? `−${-n}` : `+${n}`;
}

/** A member's card: its level, bars, experience and what it wears. */
export function memberCard(c: DbCharacter, db: GameDatabase): MemberCard {
  const p = memberProgress(c);
  const worn = asWorn(c, p);
  const stats = characterStats(worn, p.level, db, p.statUps);
  const next = p.level >= c.levelMax ? 0 : xpToNext(c.xpCurve, p.level);
  return {
    c,
    level: p.level,
    hp: Math.min(p.hp, stats.hp),
    hpMax: stats.hp,
    mp: Math.min(p.mp, stats.mp),
    mpMax: stats.mp,
    xpPercent: next ? Math.min(100, (100 * p.xp) / next) : 100,
    xpLeft: next ? Math.max(0, next - p.xp) : 0,
    slots: EQUIP_SLOTS.map(({ id, label }) => {
      const item = db.items.find((i) => i.id === worn.equipment[id]);
      return {
        slot: id,
        label,
        item,
        brings: item ? itemBrings(item, db) : "",
      };
    }),
  };
}

/** The rest of a member's sheet: its stats, its levels in elements and weapon types, the skills it knows. */
export function memberSheet(c: DbCharacter, db: GameDatabase) {
  const p = memberProgress(c);
  const worn = asWorn(c, p);
  const stats = characterStats(worn, p.level, db, p.statUps);
  const bare = characterStats({ ...c, equipment: {} }, p.level, db, p.statUps);
  const rows = [
    ...db.elements.filter((e) => !e.physical && !e.parts),
    ...db.weapons,
  ];
  return {
    stats: SHEET_STATS.map((id) => ({
      id,
      label: STATS.find((s) => s.id === id)?.label ?? id,
      value: stats[id],
      /** What the equipment adds (or takes). */
      bonus: stats[id] - bare[id],
    })),
    growth: rows
      .map((row) => {
        const g = p.growth[row.id] ?? {
          level: c.growth[row.id]?.level ?? 0,
          points: 0,
        };
        return {
          id: row.id,
          name: row.name,
          icon: row.icon,
          level: g.level,
          percent: Math.min(100, (100 * g.points) / pointsToNext(g.level)),
          never: c.growth[row.id]?.affinity === "never",
        };
      })
      .filter((g) => !g.never && (g.level > 0 || g.percent > 0)),
    skills: knownSkills(c, p, db),
  };
}

/** An item of the bag a member could wear in a slot, and what it changes against what is worn there. */
export interface EquipChoice {
  /** None: take off what is worn. */
  item: DbItem | null;
  count: number;
  /** « Magie +5 », « Force −3 »: the stats changed, better or worse. */
  changes: { text: string; better: boolean }[];
}

/** The stats' differences between two equipments of a member. */
function statChanges(
  c: DbCharacter,
  from: DbCharacter["equipment"],
  to: DbCharacter["equipment"],
  db: GameDatabase
): EquipChoice["changes"] {
  const level = memberProgress(c).level;
  const a = characterStats({ ...c, equipment: from }, level, db);
  const b = characterStats({ ...c, equipment: to }, level, db);
  return STATS.filter((s) => a[s.id] !== b[s.id]).map((s) => ({
    text: `${s.label} ${signed(b[s.id] - a[s.id])}`,
    better: b[s.id] > a[s.id],
  }));
}

/**
 * What the bag holds for a member's slot: the equipment of that slot it can wear, each with what it changes, then
 * « take off » when something is worn.
 */
export function equipChoices(
  c: DbCharacter,
  slot: EquipSlot,
  db: GameDatabase
): EquipChoice[] {
  const worn = asWorn(c, memberProgress(c)).equipment;
  const items = currentParty().items;
  const choices: EquipChoice[] = db.items
    .filter(
      (i) =>
        i.kind === "equipment" &&
        i.slot === slot &&
        (items[i.id] ?? 0) > 0 &&
        (!i.wearers?.length || i.wearers.includes(c.id))
    )
    .map((item) => ({
      item,
      count: items[item.id],
      changes: statChanges(c, worn, { ...worn, [slot]: item.id }, db),
    }));
  if (worn[slot]) {
    const without = { ...worn };
    delete without[slot];
    choices.push({
      item: null,
      count: 0,
      changes: statChanges(c, worn, without, db),
    });
  }
  return choices;
}
