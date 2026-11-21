import {
  Affinity,
  DbCharacter,
  DbSkill,
  GameDatabase,
  XpCurve,
} from "../../database-editor/shared/database";
import { MemberProgress } from "../../database-editor/shared/party";

// How the team grows from its fights, Grandia style: experience and levels (the character's curve), and the levels
// in each element and weapon type, which grow with use (its affinity, its equipment) and teach the skills.

/** Experience to go from a level to the next: k × level^1.6 (k by the character's curve). */
const XP_FACTOR: Record<XpCurve, number> = { fast: 15, normal: 20, slow: 26 };
/** Points to go from an element / weapon level to the next: 10 × (level + 1). */
const GROWTH_STEP = 10;
/** Points gained per use, by affinity. */
const AFFINITY_GAIN: Record<Affinity, number> = {
  fast: 1.5,
  normal: 1,
  slow: 0.5,
  never: 0,
};
/** Points one use gives (before the affinity and the equipment). */
const POINTS_PER_USE = 2;
export const GROWTH_LEVEL_MAX = 99;

export function xpToNext(curve: XpCurve, level: number): number {
  return Math.round(XP_FACTOR[curve] * Math.pow(level, 1.6));
}

export function pointsToNext(level: number): number {
  return GROWTH_STEP * (level + 1);
}

/** Experience gained: the levels it brings (up to the character's last level). */
export function gainXp(
  c: DbCharacter,
  p: MemberProgress,
  amount: number
): number {
  const before = p.level;
  p.xp += amount;
  while (p.level < c.levelMax && p.xp >= xpToNext(c.xpCurve, p.level)) {
    p.xp -= xpToNext(c.xpCurve, p.level);
    p.level++;
  }
  if (p.level >= c.levelMax) {
    p.xp = 0;
  }
  return p.level - before;
}

/**
 * Uses of an element or weapon type: the points they bring (affinity, the worn equipment's « grows faster » %), and
 * the levels gained. An affinity « jamais »: nothing.
 */
export function gainGrowth(
  c: DbCharacter,
  p: MemberProgress,
  id: string,
  uses: number,
  bonusPercent: number
): { points: number; levels: number } {
  const affinity = c.growth[id]?.affinity ?? "normal";
  const points = Math.round(
    uses * POINTS_PER_USE * AFFINITY_GAIN[affinity] * (1 + bonusPercent / 100)
  );
  const g = p.growth[id] ?? { level: 0, points: 0 };
  const before = g.level;
  g.points += points;
  while (g.level < GROWTH_LEVEL_MAX && g.points >= pointsToNext(g.level)) {
    g.points -= pointsToNext(g.level);
    g.level++;
  }
  p.growth[id] = g;
  return { points, levels: g.level - before };
}

/** The skills a character knows with these levels (as learnState in the database, with its current levels). */
export function knownSkills(
  c: DbCharacter,
  p: MemberProgress,
  db: GameDatabase
): DbSkill[] {
  return db.skills.filter(
    (s) =>
      s.learn.length > 0 &&
      !c.excludedSkills?.includes(s.id) &&
      !s.learn.some(
        (l) => (c.growth[l.id]?.affinity ?? "normal") === "never"
      ) &&
      s.learn.every((l) => (p.growth[l.id]?.level ?? 0) >= l.level)
  );
}

/**
 * What using a skill trains: the levels it is learned with; none (given by an event): its element if simple, its
 * parts if composed (the physical element: the weapon type used).
 */
export function trainedBy(
  skill: DbSkill,
  db: GameDatabase,
  weaponType: string | undefined
): string[] {
  if (skill.learn.length > 0) {
    return skill.learn.map((l) => l.id);
  }
  const element = db.elements.find((e) => e.id === skill.element);
  if (element?.parts) {
    return [...element.parts];
  }
  if (element?.physical) {
    return weaponType ? [weaponType] : [];
  }
  return element ? [element.id] : [];
}
