import {
  DbCharacter,
  DbNpc,
  GameDatabase,
  GIFT_POINTS,
  LinkBonus,
  LinkPace,
  linkLevelOf,
  STATS,
} from "./database";
import {
  addLinkPoints,
  giveItem,
  lastGiftDay,
  linkPoints,
  markGift,
  memberProgress,
  saveProgress,
  currentParty,
} from "./party";
import { pointsToNext, GROWTH_LEVEL_MAX } from "../../battle/shared/progress";

/** Someone the player can have a social link with: a team member or an NPC of the database. */
export interface LinkTarget {
  id: string;
  name: string;
  portrait?: string;
  team: boolean;
  /** « Équipe » or the NPC's description. */
  role: string;
  pace: LinkPace;
}

export function linkTargets(db: GameDatabase): LinkTarget[] {
  return [
    ...db.characters.map((c) => ({
      id: c.id,
      name: c.name,
      portrait: c.portrait,
      team: true,
      role: c.note ? `Équipe · ${c.note}` : "Équipe",
      pace: c.link?.pace ?? "normal",
    })),
    ...db.npcs.map((n) => ({
      id: n.id,
      name: n.name,
      portrait: n.portrait,
      team: false,
      role: n.note ?? "Habitant",
      pace: n.link?.pace ?? "normal",
    })),
  ];
}

export function linkTarget(
  id: string,
  db: GameDatabase
): LinkTarget | undefined {
  return linkTargets(db).find((t) => t.id === id);
}

/** Where a link is in the game being played. */
export function linkState(id: string, db: GameDatabase) {
  const points = linkPoints(id);
  return { points, ...linkLevelOf(points, linkTarget(id, db)?.pace) };
}

/** « Force +2 % », « Coup double », « Feu +20 xp ». */
export function linkBonusLabel(bonus: LinkBonus, db: GameDatabase): string {
  switch (bonus.kind) {
    case "stat":
      return `${STATS.find((s) => s.id === bonus.stat)?.label ?? "?"} +${bonus.percent} %`;
    case "skill":
      return db.skills.find((s) => s.id === bonus.skill)?.name ?? "?";
    case "growth": {
      const name =
        db.elements.find((e) => e.id === bonus.id)?.name ??
        db.weapons.find((w) => w.id === bonus.id)?.name ??
        "?";
      return `${name} +${bonus.points} xp`;
    }
  }
}

/** A team member's link bonuses up to a level. */
export function memberLinkBonuses(c: DbCharacter, level: number): LinkBonus[] {
  return (c.link?.levels ?? []).slice(0, level).flat();
}

/** What a level brings: the member's bonuses of that level, the NPC's advantage. */
export function levelGain(id: string, level: number, db: GameDatabase): string {
  if (level < 1) {
    return "";
  }
  const c = db.characters.find((x) => x.id === id);
  if (c) {
    return (c.link?.levels[level - 1] ?? [])
      .map((b) => linkBonusLabel(b, db))
      .join(" · ");
  }
  return db.npcs.find((n) => n.id === id)?.link?.levels[level - 1] ?? "";
}

/** What the link brings now: the member's stats and skills reached (added up), the NPC's last advantage. */
export function linkSummary(
  id: string,
  level: number,
  db: GameDatabase
): string {
  const c = db.characters.find((x) => x.id === id);
  if (c) {
    const bonuses = memberLinkBonuses(c, level);
    const percent = new Map<string, number>();
    for (const b of bonuses) {
      if (b.kind === "stat") {
        percent.set(b.stat, (percent.get(b.stat) ?? 0) + b.percent);
      }
    }
    return [
      ...[...percent].map(
        ([stat, pc]) =>
          `${STATS.find((s) => s.id === stat)?.label ?? "?"} +${pc} %`
      ),
      ...bonuses.flatMap((b) =>
        b.kind === "skill" ? [linkBonusLabel(b, db)] : []
      ),
    ].join(" · ");
  }
  for (let l = level; l >= 1; l--) {
    const gain = levelGain(id, l, db);
    if (gain) {
      return gain;
    }
  }
  return "";
}

export interface LinkGain {
  id: string;
  name: string;
  portrait?: string;
  points: number;
  before: number;
  after: number;
  into: number;
  next: number;
  /** What the new level brings (empty: nothing new, or the same level). */
  gained: string;
}

/**
 * Points given to a link: the levels reached, and for a team member the element and weapon experience of the
 * levels newly reached (once).
 */
export function gainLink(
  id: string,
  points: number,
  db: GameDatabase
): LinkGain | null {
  const target = linkTarget(id, db);
  if (!target || !points) {
    return null;
  }
  const before = linkLevelOf(linkPoints(id), target.pace).level;
  addLinkPoints(id, points);
  const now = linkLevelOf(linkPoints(id), target.pace);
  const c = db.characters.find((x) => x.id === id);
  if (c && now.level > before) {
    const p = memberProgress(c);
    for (let l = before + 1; l <= now.level; l++) {
      for (const bonus of c.link?.levels[l - 1] ?? []) {
        if (bonus.kind === "growth") {
          const g = p.growth[bonus.id] ?? { level: 0, points: 0 };
          g.points += bonus.points;
          while (
            g.level < GROWTH_LEVEL_MAX &&
            g.points >= pointsToNext(g.level)
          ) {
            g.points -= pointsToNext(g.level);
            g.level++;
          }
          p.growth[bonus.id] = g;
        }
      }
    }
    saveProgress({ [c.id]: p });
  }
  const gained: string[] = [];
  for (let l = before + 1; l <= now.level; l++) {
    const gain = levelGain(id, l, db);
    if (gain) {
      gained.push(gain);
    }
  }
  return {
    id,
    name: target.name,
    portrait: target.portrait,
    points,
    before,
    after: now.level,
    into: now.into,
    next: now.next,
    gained: gained.join(" · "),
  };
}

/** The gift kinds an NPC sees (liked, disliked, else neutral). */
export function giftPoints(npc: DbNpc | undefined, item: string): number {
  if (npc?.link?.liked.includes(item)) {
    return GIFT_POINTS.liked;
  }
  if (npc?.link?.disliked.includes(item)) {
    return GIFT_POINTS.disliked;
  }
  return GIFT_POINTS.neutral;
}

/**
 * A gift given to an NPC: the item taken from the bag, the link's points. Returns the gain (null: no points), or
 * « already » when it already got a gift today (the item kept).
 */
export function giveGift(
  npcId: string,
  item: string,
  day: number,
  db: GameDatabase
): LinkGain | null | "already" {
  if ((currentParty().items[item] ?? 0) < 1) {
    return null;
  }
  // (one a day: the gift stays in the bag)
  if (lastGiftDay(npcId) === day) {
    return "already";
  }
  giveItem(item, -1);
  markGift(npcId, day);
  return gainLink(
    npcId,
    giftPoints(
      db.npcs.find((n) => n.id === npcId),
      item
    ),
    db
  );
}
