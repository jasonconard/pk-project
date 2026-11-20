import { WeatherType } from '../../game/shared/weather/Weather';

/**
 * The game's database (docs/idees.md, point 5): what the combat, the events and the menus read. Built table by
 * table: elements, weapon types, states and skills so far; items, characters, enemies and groups come next.
 * Every row has an id that never changes (what refers to it keeps working when it is renamed).
 */

/** The fixed stats (as in Persona). */
export type StatId = 'hp' | 'mp' | 'str' | 'mag' | 'end' | 'agi' | 'luck';
export const STATS: { id: StatId, label: string }[] = [
  { id: 'hp', label: 'PV' },
  { id: 'mp', label: 'PM' },
  { id: 'str', label: 'Force' },
  { id: 'mag', label: 'Magie' },
  { id: 'end', label: 'Endurance' },
  { id: 'agi', label: 'Agilité' },
  { id: 'luck', label: 'Chance' },
];

/** How a weather changes an element's damage: +25 = 25 % stronger, -25 = 25 % weaker. */
export interface ElementWeather {
  weather: `${WeatherType}`;
  percent: number;
}

/**
 * An element (fire, ice…). A composed one is made of two simple ones (Feu + Vent = Foudre): its skills are learned
 * with a level in both, and make both grow. The physical element only counts for damage and resistances (the
 * weapon types are what physical skills are learned with): it can't be deleted nor be part of a composed one.
 */
export interface DbElement {
  id: string;
  name: string;
  /** #rrggbb */
  color: string;
  /** 16×16 pixel art, PNG data URL. */
  icon?: string;
  physical?: boolean;
  parts?: [string, string];
  weathers: ElementWeather[];
}

/** A weapon type (sword, bow…): for physical skills what the elements are for magic. */
export interface DbWeapon {
  id: string;
  name: string;
  icon?: string;
  note?: string;
}

/** What a state does each turn or while it lasts. */
export type StateEffect =
  /** PV gained (+) or lost (−) each turn, in % of the max. */
  | { kind: 'hp', percent: number }
  /** PM gained (+) or lost (−) each turn, in % of the max. */
  | { kind: 'mp', percent: number }
  /** A stat raised (+) or lowered (−) while it lasts, in %. */
  | { kind: 'stat', stat: StatId, percent: number }
  /** Chance (%) to lose one's turn. */
  | { kind: 'skip', chance: number };

export type StateEffectKind = StateEffect['kind'];

/** A state (poison, sleep, strength up…): skills and items give it or cure it. */
export interface DbState {
  id: string;
  name: string;
  /** #rrggbb */
  color: string;
  icon?: string;
  /** Turns it lasts; 0 = until the end of the fight. */
  turns: number;
  /** Still there after the fight (until cured). */
  staysAfterFight: boolean;
  /** Ends when the one who has it is hit (sleep). */
  endsOnHit: boolean;
  effects: StateEffect[];
}

/** Who a skill is used on. */
export type SkillTarget = 'enemy' | 'enemies' | 'ally' | 'allies' | 'self';
export const SKILL_TARGETS: { id: SkillTarget, label: string }[] = [
  { id: 'enemy', label: 'Un ennemi' },
  { id: 'enemies', label: 'Tous les ennemis' },
  { id: 'ally', label: 'Un allié' },
  { id: 'allies', label: 'Toute l\'équipe' },
  { id: 'self', label: 'Soi-même' },
];

/** Where a skill can be used. */
export type SkillUse = 'fight' | 'field' | 'both';
export const SKILL_USES: { id: SkillUse, label: string }[] = [
  { id: 'fight', label: 'En combat' },
  { id: 'field', label: 'Hors combat' },
  { id: 'both', label: 'Les deux' },
];

/** What a skill does, in order. Damage and heal are worked out from a stat of the one who uses it and the power. */
export type SkillEffect =
  /** Damage of the skill's element. */
  | { kind: 'damage', stat: 'str' | 'mag', power: number }
  /** PV or PM given back. */
  | { kind: 'heal', resource: 'hp' | 'mp', power: number }
  /** A state given, with a chance (%). */
  | { kind: 'addState', state: string, chance: number }
  /** A state cured. */
  | { kind: 'removeState', state: string }
  /** A stat raised (+) or lowered (−) in %, for some turns. */
  | { kind: 'stat', stat: StatId, percent: number, turns: number };

export type SkillEffectKind = SkillEffect['kind'];

/**
 * A level needed to learn a skill, Grandia style: in a simple element or a weapon type (the characters' levels grow
 * as they use them). A skill of a composed element asks for a level in both of its parts.
 */
export interface SkillLearn {
  /** A simple element's id, or a weapon type's. */
  id: string;
  level: number;
}

/** A skill (attack, spell, heal…). */
export interface DbSkill {
  id: string;
  name: string;
  icon?: string;
  note?: string;
  /** Its element (damage, resistances, weather). */
  element: string;
  /** PM it costs. */
  mp: number;
  /** Seconds of casting on the action gauge (0 = right away): the slower, the easier to cancel. */
  cast: number;
  target: SkillTarget;
  use: SkillUse;
  effects: SkillEffect[];
  /** Replaces the power of its damage and heals (« a.mag * 2 - b.end »: a = who uses it, b = the target). */
  formula?: string;
  /** Levels needed to learn it (none: given by an event or an item). Two at most. */
  learn: SkillLearn[];
}

export interface GameDatabase {
  elements: DbElement[];
  weapons: DbWeapon[];
  states: DbState[];
  skills: DbSkill[];
}

export type DbTable = keyof GameDatabase;

export const ELEMENT_COLORS = ['#f08c32', '#d64040', '#ffd650', '#8fd8ff', '#6ec86e', '#4d96ff', '#aa64dc', '#f0f0e8', '#bec3d2', '#8c5a3c'];

export const TURNS_MAX = 99;
export const PERCENT_MAX = 100;
export const MP_MAX = 999;
export const POWER_MAX = 999;
export const LEVEL_MAX = 99;
export const CAST_MAX = 5;
export const LEARN_MAX = 2;

export function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export function newElement(name: string): DbElement {
  return { id: newId('el'), name, color: ELEMENT_COLORS[0], weathers: [] };
}

export function newWeapon(name: string): DbWeapon {
  return { id: newId('wp'), name };
}

export function newState(name: string): DbState {
  return { id: newId('st'), name, color: '#aa64dc', turns: 3, staysAfterFight: false, endsOnHit: false, effects: [] };
}

export function newStateEffect(kind: StateEffectKind): StateEffect {
  switch (kind) {
    case 'hp': return { kind, percent: -10 };
    case 'mp': return { kind, percent: -10 };
    case 'stat': return { kind, stat: 'str', percent: 25 };
    case 'skip': return { kind, chance: 50 };
  }
}

export function newSkill(name: string, db: GameDatabase): DbSkill {
  const element = db.elements.find(e => e.physical) ?? db.elements[0];
  return {
    id: newId('sk'), name, element: element?.id ?? '', mp: 0, cast: 0.5, target: 'enemy', use: 'fight',
    effects: [{ kind: 'damage', stat: 'str', power: 30 }], learn: [],
  };
}

export function newSkillEffect(kind: SkillEffectKind, db: GameDatabase): SkillEffect {
  const state = db.states[0]?.id ?? '';
  switch (kind) {
    case 'damage': return { kind, stat: 'mag', power: 40 };
    case 'heal': return { kind, resource: 'hp', power: 40 };
    case 'addState': return { kind, state, chance: 30 };
    case 'removeState': return { kind, state };
    case 'stat': return { kind, stat: 'str', percent: 25, turns: 3 };
  }
}

/** « Rapide » for a cast time in seconds. */
export function castLabel(cast: number): string {
  if (cast <= 0) {
    return 'Immédiat';
  }
  if (cast <= 1) {
    return 'Rapide';
  }
  if (cast <= 2.5) {
    return 'Moyen';
  }
  return cast <= 4 ? 'Lent' : 'Très lent';
}

/**
 * The levels a skill of this element is learned with, to start from: both parts of a composed element, the element
 * itself, the first weapon type for a physical skill.
 */
export function defaultLearn(elementId: string, db: GameDatabase): SkillLearn[] {
  const element = db.elements.find(e => e.id === elementId);
  if (!element) {
    return [];
  }
  if (element.parts) {
    return element.parts.map(id => ({ id, level: 1 }));
  }
  if (element.physical) {
    return db.weapons[0] ? [{ id: db.weapons[0].id, level: 1 }] : [];
  }
  return [{ id: element.id, level: 1 }];
}

/** What a skill can be learned with: the simple elements (not physical), then the weapon types. */
export function learnChoices(db: GameDatabase): { id: string, name: string, weapon: boolean }[] {
  return [
    ...db.elements.filter(e => !e.physical && !e.parts).map(e => ({ id: e.id, name: e.name, weapon: false })),
    ...db.weapons.map(w => ({ id: w.id, name: w.name, weapon: true })),
  ];
}

/** Letters, numbers, a. / b. and the 4 operations only. */
export function formulaProblem(formula: string): string {
  const text = formula.trim();
  if (!text) {
    return '';
  }
  if (!/^[\sa-z0-9.+\-*/()]*$/i.test(text)) {
    return 'Seulement des nombres, a.stat, b.stat, + − * / et des parenthèses.';
  }
  const names = text.match(/[a-z_][a-z0-9_]*(\.[a-z_]+)?/gi) ?? [];
  const stats = STATS.map(s => s.id as string).concat('level');
  const bad = names.find(n => !/^[ab]\.[a-z]+$/i.test(n) || !stats.includes(n.split('.')[1]));
  return bad ? `« ${bad} » : écrire a. ou b. puis ${stats.join(', ')}.` : '';
}

export function clampInt(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.round(Number.isFinite(value) ? value : 0)));
}

/** The simple elements a composed one can be made of (not itself, not physical, not composed). */
export function composableElements(elements: DbElement[], self?: string): DbElement[] {
  return elements.filter(e => e.id !== self && !e.physical && !e.parts);
}

/** « Feu + Vent » for a composed element, '' otherwise. */
export function partsLabel(element: DbElement, elements: DbElement[]): string {
  if (!element.parts) {
    return '';
  }
  return element.parts.map(id => elements.find(e => e.id === id)?.name ?? '?').join(' + ');
}

/**
 * The database with a table row removed, and what pointed to it fixed: a composed element made of it becomes simple,
 * its skills become physical, the levels and the effects naming it go.
 */
export function withoutRow(db: GameDatabase, table: DbTable, id: string): GameDatabase {
  const next = { ...db, [table]: (db[table] as { id: string }[]).filter(row => row.id !== id) } as GameDatabase;
  if (table === 'elements') {
    next.elements = next.elements.map(e => {
      if (!e.parts?.includes(id)) {
        return e;
      }
      const { parts: _, ...simple } = e;
      return simple;
    });
    // Its skills become physical
    const physical = next.elements.find(e => e.physical)?.id ?? next.elements[0]?.id ?? '';
    next.skills = next.skills.map(s => s.element === id ? { ...s, element: physical } : s);
  }
  if (table === 'elements' || table === 'weapons') {
    next.skills = next.skills.map(s => s.learn.some(l => l.id === id) ? { ...s, learn: s.learn.filter(l => l.id !== id) } : s);
  }
  if (table === 'states') {
    next.skills = next.skills.map(s => ({
      ...s, effects: s.effects.filter(e => !((e.kind === 'addState' || e.kind === 'removeState') && e.state === id)),
    }));
  }
  return next;
}
