import {
  DbSkill,
  GameDatabase,
  ResistLevel,
  StatId,
  skillRange,
} from "../../database-editor/shared/database";
import { Fighter } from "./battle-types";

// The fight's rules, worked out from the database: stats (with equipment, states and boosts), damage and heals
// (elements, resistances, the weather, a skill's own formula), the enemies' choices.

/** The plain attack: power 20 from Strength, with the weapon's element (none: physical). */
export const ATTACK_POWER = 20;
/** A heavy attack's damage, compared to an attack. */
export const HEAVY_FACTOR = 1.6;
/** An enemy « stronger » in the weather deals this much more. */
const STRONGER_FACTOR = 1.25;
/** The plain attack's place among an enemy's skills (2: « parfois »). */
const ENEMY_ATTACK_WEIGHT = 2;

const RESIST_FACTOR: Record<ResistLevel, number> = {
  weak: 2,
  resist: 0.5,
  null: 0,
  absorb: -1,
};

/** A stat now: its base, then the states' and boosts' percents. */
export function statOf(f: Fighter, stat: StatId, db: GameDatabase): number {
  let percent = 0;
  for (const s of f.states) {
    for (const e of db.states.find((x) => x.id === s.id)?.effects ?? []) {
      if (e.kind === "stat" && e.stat === stat) {
        percent += e.percent;
      }
    }
  }
  for (const b of f.boosts) {
    if (b.stat === stat) {
      percent += b.percent;
    }
  }
  return Math.max(0, Math.round(f.stats[stat] * (1 + percent / 100)));
}

/**
 * How much of an element's damage a fighter takes: ×2 weak, ×½ resists, 0 cancels, −1 absorbs (it heals). A composed
 * element without its own resistance takes its parts' (the strongest effect).
 */
export function elementFactor(
  f: Fighter,
  elementId: string,
  db: GameDatabase
): number {
  const own = f.resists[elementId];
  if (own) {
    return RESIST_FACTOR[own];
  }
  const parts = db.elements.find((e) => e.id === elementId)?.parts;
  if (parts) {
    const factors = parts.map((p) =>
      f.resists[p] ? RESIST_FACTOR[f.resists[p]] : 1
    );
    return factors.reduce(
      (a, b) => (Math.abs(b - 1) > Math.abs(a - 1) ? b : a),
      1
    );
  }
  return 1;
}

/** The weather's effect on an element: +25 % → 1.25. */
export function weatherFactor(
  elementId: string,
  weather: string,
  db: GameDatabase
): number {
  const percent =
    db.elements
      .find((e) => e.id === elementId)
      ?.weathers.find((w) => w.weather === weather)?.percent ?? 0;
  return 1 + percent / 100;
}

/**
 * The amount of a damage or heal: a skill's formula when it has one (« a.mag * 2 - b.end »), else power / 10 × the
 * user's stat, minus the target's Endurance for damage. A little luck (±10 %).
 */
export function baseAmount(
  user: Fighter,
  target: Fighter,
  stat: StatId,
  power: number,
  damage: boolean,
  db: GameDatabase,
  formula?: string
): number {
  let amount: number;
  if (formula?.trim()) {
    amount = evalFormula(formula, (who, s) =>
      s === "level"
        ? (who === "a" ? user : target).level
        : statOf(who === "a" ? user : target, s as StatId, db)
    );
  } else {
    amount = (power / 10) * statOf(user, stat, db);
    if (damage) {
      amount -= statOf(target, "end", db);
    }
  }
  return Math.max(1, amount) * (0.9 + Math.random() * 0.2);
}

/** Damage dealt with an element: the target's resistance, the weather, an enemy stronger in it, defending. */
export function finalDamage(
  amount: number,
  user: Fighter,
  target: Fighter,
  elementId: string,
  weather: string,
  db: GameDatabase
): number {
  let value =
    amount *
    elementFactor(target, elementId, db) *
    weatherFactor(elementId, weather, db) *
    (user.stronger ? STRONGER_FACTOR : 1);
  if (target.defending && value > 0) {
    value /= 2;
  }
  // (absorbed: negative, the target heals; cancelled: 0)
  return value > 0 ? Math.max(1, Math.round(value)) : Math.round(value);
}

/** A skill the fighter can use now (enough PM; an enemy: its condition met). */
export function canUse(f: Fighter, skill: DbSkill): boolean {
  return f.mp >= skill.mp && skill.use !== "field";
}

/**
 * An enemy's choice: one of its skills by weight (the ones whose condition holds and that it can pay), or a plain
 * attack (weight 2). Null: the plain attack.
 */
export function enemySkill(
  f: Fighter,
  weather: string,
  db: GameDatabase
): DbSkill | null {
  const options: { skill: DbSkill | null; weight: number }[] = [
    { skill: null, weight: ENEMY_ATTACK_WEIGHT },
  ];
  for (const a of f.actions) {
    const skill = db.skills.find((s) => s.id === a.skill);
    const c = a.condition;
    const ok =
      !c ||
      (c.kind === "hpBelow" && f.hp < (f.hpMax * c.percent) / 100) ||
      (c.kind === "weather" && c.weather === weather);
    if (skill && ok && canUse(f, skill)) {
      options.push({ skill, weight: a.weight });
    }
  }
  let roll = Math.random() * options.reduce((n, o) => n + o.weight, 0);
  for (const o of options) {
    roll -= o.weight;
    if (roll < 0) {
      return o.skill;
    }
  }
  return null;
}

/** Does a skill hit in melee (its range is « contact »: the user walks up to its target)? */
export function isMelee(skill: DbSkill): boolean {
  return skillRange(skill) === "contact";
}

/**
 * A skill's formula worked out: numbers, a.stat / b.stat (the user, the target), + − * / and parentheses (checked
 * by formulaProblem in the database editor). A mistake gives 0.
 */
export function evalFormula(
  formula: string,
  value: (who: "a" | "b", stat: string) => number
): number {
  const tokens = formula.match(/[ab]\.[a-z]+|\d+(?:\.\d+)?|[()*+/-]/gi) ?? [];
  let i = 0;
  const peek = () => tokens[i];
  const factor = (): number => {
    const t = tokens[i++];
    if (t === "(") {
      const v = expr();
      i++; // ")"
      return v;
    }
    if (t === "-") {
      return -factor();
    }
    if (t && /^[ab]\./i.test(t)) {
      const [who, stat] = t.toLowerCase().split(".");
      return value(who as "a" | "b", stat);
    }
    return Number(t) || 0;
  };
  const term = (): number => {
    let v = factor();
    while (peek() === "*" || peek() === "/") {
      const op = tokens[i++];
      const r = factor();
      if (op === "*") {
        v *= r;
      } else {
        v = r === 0 ? 0 : v / r;
      }
    }
    return v;
  };
  function expr(): number {
    let v = term();
    while (peek() === "+" || peek() === "-") {
      const op = tokens[i++];
      const r = term();
      v = op === "+" ? v + r : v - r;
    }
    return v;
  }
  const result = expr();
  return Number.isFinite(result) ? result : 0;
}
