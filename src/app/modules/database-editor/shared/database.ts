import { WeatherType } from '../../game/shared/weather/Weather';

/**
 * The game's database (docs/idees.md, point 5): what the combat, the events and the menus read. Built table by
 * table: elements, weapon types and states first; skills, items, characters, enemies and groups come next.
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

export interface GameDatabase {
  elements: DbElement[];
  weapons: DbWeapon[];
  states: DbState[];
}

export type DbTable = keyof GameDatabase;

export const ELEMENT_COLORS = ['#f08c32', '#d64040', '#ffd650', '#8fd8ff', '#6ec86e', '#4d96ff', '#aa64dc', '#f0f0e8', '#bec3d2', '#8c5a3c'];

export const TURNS_MAX = 99;
export const PERCENT_MAX = 100;

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

/** The database with a table row removed, and what pointed to it fixed (a composed element made of it becomes simple). */
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
  }
  return next;
}
