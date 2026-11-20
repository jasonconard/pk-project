import { WeatherType } from "../../game/shared/weather/Weather";
import { omit } from "../../../core/shared/omit";

/**
 * The game's database (docs/idees.md, point 5): what the combat, the events and the menus read. Built table by
 * table: elements, weapon types, states, skills, items, characters, enemies and groups.
 * Every row has an id that never changes (what refers to it keeps working when it is renamed).
 */

/** The fixed stats (as in Persona). */
export type StatId = "hp" | "mp" | "str" | "mag" | "end" | "agi" | "luck";
export const STATS: { id: StatId; label: string }[] = [
  { id: "hp", label: "PV" },
  { id: "mp", label: "PM" },
  { id: "str", label: "Force" },
  { id: "mag", label: "Magie" },
  { id: "end", label: "Endurance" },
  { id: "agi", label: "Agilité" },
  { id: "luck", label: "Chance" },
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
  | { kind: "hp"; percent: number }
  /** PM gained (+) or lost (−) each turn, in % of the max. */
  | { kind: "mp"; percent: number }
  /** A stat raised (+) or lowered (−) while it lasts, in %. */
  | { kind: "stat"; stat: StatId; percent: number }
  /** Chance (%) to lose one's turn. */
  | { kind: "skip"; chance: number };

export type StateEffectKind = StateEffect["kind"];

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
export type SkillTarget = "enemy" | "enemies" | "ally" | "allies" | "self";
export const SKILL_TARGETS: { id: SkillTarget; label: string }[] = [
  { id: "enemy", label: "Un ennemi" },
  { id: "enemies", label: "Tous les ennemis" },
  { id: "ally", label: "Un allié" },
  { id: "allies", label: "Toute l'équipe" },
  { id: "self", label: "Soi-même" },
];

/** Where a skill can be used. */
export type SkillUse = "fight" | "field" | "both";
export const SKILL_USES: { id: SkillUse; label: string }[] = [
  { id: "fight", label: "En combat" },
  { id: "field", label: "Hors combat" },
  { id: "both", label: "Les deux" },
];

/**
 * What a skill or an item does, in order. Damage and heal are worked out from a stat of the one who uses it and the
 * power. Skills don't offer the item-only ones (a stat raised for good, element experience) and items don't deal damage.
 */
export type SkillEffect =
  /** Damage of the skill's element. */
  | { kind: "damage"; stat: "str" | "mag"; power: number }
  /** PV or PM given back. */
  | { kind: "heal"; resource: "hp" | "mp"; power: number }
  /** A state given, with a chance (%). */
  | { kind: "addState"; state: string; chance: number }
  /** A state cured. */
  | { kind: "removeState"; state: string }
  /** A stat raised (+) or lowered (−) in %, for some turns. */
  | { kind: "stat"; stat: StatId; percent: number; turns: number }
  /** Items: a stat raised for good (a seed). */
  | { kind: "statUp"; stat: StatId; amount: number }
  /** Items: experience in a simple element or a weapon type (Grandia's mana eggs). */
  | { kind: "xp"; id: string; amount: number };

export type SkillEffectKind = SkillEffect["kind"];

export type ItemKind = "consumable" | "equipment" | "key" | "gift";
export const ITEM_KINDS: { id: ItemKind; label: string; many: string }[] = [
  { id: "consumable", label: "Consommable", many: "Consommables" },
  { id: "equipment", label: "Équipement", many: "Équipement" },
  { id: "key", label: "Objet clé", many: "Objets clés" },
  { id: "gift", label: "Cadeau", many: "Cadeaux" },
];

export type EquipSlot = "weapon" | "armor" | "accessory";
export const EQUIP_SLOTS: { id: EquipSlot; label: string }[] = [
  { id: "weapon", label: "Arme" },
  { id: "armor", label: "Armure" },
  { id: "accessory", label: "Accessoire" },
];

/** How one takes an element's damage (normal: not listed). The enemies will use it too. */
export type ResistLevel = "weak" | "resist" | "null" | "absorb";
export const RESIST_LEVELS: { id: ResistLevel; label: string }[] = [
  { id: "weak", label: "Faible ×2" },
  { id: "resist", label: "Résiste ×½" },
  { id: "null", label: "Annule" },
  { id: "absorb", label: "Absorbe" },
];

/**
 * An item. Consumables are used (effects, target, where); equipment is worn (slot, stat bonuses, resistances, and the
 * element or weapon levels it makes grow faster); key items are for the story; gifts are given to the inhabitants
 * (what each one likes comes with the social links). Price 0: can't be bought nor sold.
 */
export interface DbItem {
  id: string;
  name: string;
  icon?: string;
  note?: string;
  kind: ItemKind;
  price: number;
  /** Consumable. */
  use?: SkillUse;
  target?: SkillTarget;
  effects?: SkillEffect[];
  /** Equipment. */
  slot?: EquipSlot;
  /** Weapon: its type (hitting with it makes that level grow). */
  weapon?: string;
  /** Weapon: the element of its attacks (none: physical). */
  attackElement?: string;
  bonuses?: { stat: StatId; amount: number }[];
  resists?: { element: string; level: ResistLevel }[];
  /** An element's or weapon type's experience gained faster while worn, in %. */
  growth?: { id: string; percent: number }[];
  /** Equipment: the characters who can wear it (none: everyone). */
  wearers?: string[];
}

/** How fast a character grows in an element or a weapon type. */
export type Affinity = "fast" | "normal" | "slow" | "never";
export const AFFINITIES: { id: Affinity; label: string }[] = [
  { id: "fast", label: "Rapide" },
  { id: "normal", label: "Normal" },
  { id: "slow", label: "Lent" },
  { id: "never", label: "Jamais" },
];

/** How fast the levels come (the experience needed). */
export type XpCurve = "fast" | "normal" | "slow";
export const XP_CURVES: { id: XpCurve; label: string }[] = [
  { id: "fast", label: "Monte vite" },
  { id: "normal", label: "Normal" },
  { id: "slow", label: "Monte lentement" },
];

/** How a stat goes from the first level to the last: evenly, mostly early, mostly late. */
export type StatCurve = "linear" | "early" | "late";
export const STAT_CURVES: { id: StatCurve; label: string }[] = [
  { id: "linear", label: "Régulière" },
  { id: "early", label: "Monte tôt" },
  { id: "late", label: "Monte tard" },
];

export interface CharacterStat {
  /** At the first level. */
  start: number;
  /** At the last level. */
  max: number;
  curve: StatCurve;
}

/** A character: a team member (levels, stats, element and weapon levels, equipment) or a villager (looks only). */
export interface DbCharacter {
  id: string;
  name: string;
  note?: string;
  team: boolean;
  /** In the team when a new game starts (else an event makes them join). */
  startsInTeam?: boolean;
  /** Pixel art: the menus' and action gauge's small face (also the list's icon), the dialogues' portrait, the combat sprite. */
  icon?: string;
  portrait?: string;
  sprite?: string;
  /** The 3D model on the map. */
  model?: string;
  levelStart: number;
  levelMax: number;
  xpCurve: XpCurve;
  stats: Record<StatId, CharacterStat>;
  /** Level at the start and affinity in each simple element and weapon type (missing: level 0, normal). */
  growth: Record<string, { level: number; affinity: Affinity }>;
  /** Worn at the start. */
  equipment: Partial<Record<EquipSlot, string>>;
  /** Skills this character never learns, even with the levels (other characters' own skills). */
  excludedSkills?: string[];
}

/** Pixel sizes of a character's pictures. */
export const PICTURE_SIZES = {
  icon: { w: 16, h: 16 },
  portrait: { w: 48, h: 48 },
  sprite: { w: 32, h: 48 },
};
/** An enemy's combat sprite (wider: a bat, a slime). */
export const ENEMY_SPRITE_SIZE = { w: 48, h: 48 };

/** The moments of the day (the calendar, point 7, will use them too). */
export type DayTime = "morning" | "afternoon" | "evening" | "night";
export const DAY_TIMES: { id: DayTime; label: string }[] = [
  { id: "morning", label: "Matin" },
  { id: "afternoon", label: "Après-midi" },
  { id: "evening", label: "Soir" },
  { id: "night", label: "Nuit" },
];

/** How often an enemy uses a skill. */
export const WEIGHTS: { id: number; label: string }[] = [
  { id: 1, label: "rarement" },
  { id: 2, label: "parfois" },
  { id: 3, label: "souvent" },
];

/** When an enemy may use a skill: always, under some PV, during a weather. */
export type BehaviorCondition =
  | { kind: "hpBelow"; percent: number }
  | { kind: "weather"; weather: `${WeatherType}` };

export interface EnemyAction {
  skill: string;
  /** 1 rarely, 2 sometimes, 3 often. */
  weight: number;
  condition?: BehaviorCondition;
}

/** An enemy: looks, stats, how it takes each element, loot, what it does, and when it shows up. */
export interface DbEnemy {
  id: string;
  name: string;
  note?: string;
  /** The action gauge's small picture (16×16) and the combat sprite (48×48). */
  icon?: string;
  sprite?: string;
  /** Seen on the dungeon map before the fight. */
  model?: string;
  level: number;
  stats: Record<StatId, number>;
  /** Element id → how it takes it (missing: normal). */
  resists: Record<string, ResistLevel>;
  xp: number;
  money: number;
  drops: { item: string; chance: number }[];
  /** Its skills (none: it only attacks). */
  actions: EnemyAction[];
  /** Weathers it appears in (only those, when some are « appears »), or is stronger in. */
  weathers: { weather: `${WeatherType}`; effect: "appears" | "stronger" }[];
  /** Moments it appears (none: all day). */
  times: DayTime[];
}

/** A group of enemies met together, placed on the battlefield (x, y from 0 to 1 in the enemies' half). */
export interface DbGroup {
  id: string;
  name: string;
  /** (none: the list shows its first enemy's picture) */
  icon?: string;
  note?: string;
  members: { enemy: string; x: number; y: number }[];
  /** A song of the music editor (none: the combat music). */
  music?: string;
  canFlee: boolean;
  /** The enemies may attack first (the team caught from behind). */
  surprise: boolean;
}

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
  items: DbItem[];
  characters: DbCharacter[];
  enemies: DbEnemy[];
  groups: DbGroup[];
}

export type DbTable = keyof GameDatabase;

export const ELEMENT_COLORS = [
  "#f08c32",
  "#d64040",
  "#ffd650",
  "#8fd8ff",
  "#6ec86e",
  "#4d96ff",
  "#aa64dc",
  "#f0f0e8",
  "#bec3d2",
  "#8c5a3c",
];

export const TURNS_MAX = 99;
export const PERCENT_MAX = 100;
export const MP_MAX = 999;
export const POWER_MAX = 999;
export const LEVEL_MAX = 99;
export const CAST_MAX = 5;
export const LEARN_MAX = 2;
export const PRICE_MAX = 99_999;
export const BONUS_MAX = 999;
export const XP_MAX = 9999;

export function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export function newElement(name: string): DbElement {
  return { id: newId("el"), name, color: ELEMENT_COLORS[0], weathers: [] };
}

export function newWeapon(name: string): DbWeapon {
  return { id: newId("wp"), name };
}

export function newState(name: string): DbState {
  return {
    id: newId("st"),
    name,
    color: "#aa64dc",
    turns: 3,
    staysAfterFight: false,
    endsOnHit: false,
    effects: [],
  };
}

export function newStateEffect(kind: StateEffectKind): StateEffect {
  switch (kind) {
    case "hp":
      return { kind, percent: -10 };
    case "mp":
      return { kind, percent: -10 };
    case "stat":
      return { kind, stat: "str", percent: 25 };
    case "skip":
      return { kind, chance: 50 };
  }
}

export function newSkill(name: string, db: GameDatabase): DbSkill {
  const element = db.elements.find((e) => e.physical) ?? db.elements[0];
  return {
    id: newId("sk"),
    name,
    element: element?.id ?? "",
    mp: 0,
    cast: 0.5,
    target: "enemy",
    use: "fight",
    effects: [{ kind: "damage", stat: "str", power: 30 }],
    learn: [],
  };
}

export function newSkillEffect(
  kind: SkillEffectKind,
  db: GameDatabase
): SkillEffect {
  const state = db.states[0]?.id ?? "";
  switch (kind) {
    case "damage":
      return { kind, stat: "mag", power: 40 };
    case "heal":
      return { kind, resource: "hp", power: 40 };
    case "addState":
      return { kind, state, chance: 30 };
    case "removeState":
      return { kind, state };
    case "stat":
      return { kind, stat: "str", percent: 25, turns: 3 };
    case "statUp":
      return { kind, stat: "str", amount: 1 };
    case "xp":
      return { kind, id: learnChoices(db)[0]?.id ?? "", amount: 50 };
  }
}

export function newCharacter(name: string): DbCharacter {
  const stat = (start: number, max: number): CharacterStat => ({
    start,
    max,
    curve: "linear",
  });
  return {
    id: newId("ch"),
    name,
    team: true,
    levelStart: 1,
    levelMax: 99,
    xpCurve: "normal",
    stats: {
      hp: stat(40, 900),
      mp: stat(15, 400),
      str: stat(6, 80),
      mag: stat(6, 80),
      end: stat(5, 75),
      agi: stat(6, 80),
      luck: stat(4, 60),
    },
    growth: {},
    equipment: {},
  };
}

/** A stat's value at a level (the curve between the first and the last level). */
export function statAt(
  character: DbCharacter,
  stat: StatId,
  level: number
): number {
  const { start, max, curve } = character.stats[stat];
  const t =
    character.levelMax > 1
      ? Math.min(1, Math.max(0, (level - 1) / (character.levelMax - 1)))
      : 1;
  const shapes: Record<StatCurve, number> = {
    linear: t,
    early: Math.sqrt(t),
    late: t * t,
  };
  const f = shapes[curve];
  return Math.round(start + (max - start) * f);
}

/** The character's level and affinity in an element or a weapon type. */
export function growthOf(
  character: DbCharacter,
  id: string
): { level: number; affinity: Affinity } {
  return character.growth[id] ?? { level: 0, affinity: "normal" };
}

/**
 * Where a character stands with a skill: known from the start, to be learned (what is missing), never (an affinity
 * « jamais » in one of its levels), or excluded (kept for other characters). Skills without levels are not listed
 * (given by events or items).
 */
export function learnState(
  character: DbCharacter,
  skill: DbSkill
): "start" | "later" | "never" | "excluded" {
  if (character.excludedSkills?.includes(skill.id)) {
    return "excluded";
  }
  if (skill.learn.some((l) => growthOf(character, l.id).affinity === "never")) {
    return "never";
  }
  return skill.learn.every((l) => growthOf(character, l.id).level >= l.level)
    ? "start"
    : "later";
}

export function newEnemy(name: string): DbEnemy {
  return {
    id: newId("en"),
    name,
    level: 1,
    stats: { hp: 40, mp: 10, str: 6, mag: 4, end: 5, agi: 4, luck: 3 },
    resists: {},
    xp: 10,
    money: 5,
    drops: [],
    actions: [],
    weathers: [],
    times: [],
  };
}

export function newGroup(name: string, db: GameDatabase): DbGroup {
  const enemy = db.enemies[0]?.id;
  return {
    id: newId("gr"),
    name,
    members: enemy ? [{ enemy, x: 0.5, y: 0.5 }] : [],
    canFlee: true,
    surprise: true,
  };
}

/** « Gluant ×2 · Chauve-souris » */
export function groupLabel(group: DbGroup, enemies: DbEnemy[]): string {
  const counts = new Map<string, number>();
  group.members.forEach((m) =>
    counts.set(m.enemy, (counts.get(m.enemy) ?? 0) + 1)
  );
  return [...counts]
    .map(
      ([id, n]) =>
        `${enemies.find((e) => e.id === id)?.name ?? "?"}${n > 1 ? ` ×${n}` : ""}`
    )
    .join(" · ");
}

/** A free place for one more enemy in a group (the least crowded of a few spots). */
export function freeSpot(group: DbGroup): { x: number; y: number } {
  const spots = [
    [0.5, 0.5],
    [0.2, 0.6],
    [0.8, 0.6],
    [0.35, 0.2],
    [0.65, 0.2],
    [0.1, 0.25],
    [0.9, 0.25],
    [0.5, 0.85],
  ];
  const crowd = ([x, y]: number[]) =>
    Math.min(9, ...group.members.map((m) => Math.hypot(m.x - x, m.y - y)));
  const [x, y] = spots.reduce((best, spot) =>
    crowd(spot) > crowd(best) ? spot : best
  );
  return { x, y };
}

export function newItem(name: string): DbItem {
  return {
    id: newId("it"),
    name,
    kind: "consumable",
    price: 50,
    use: "both",
    target: "ally",
    effects: [{ kind: "heal", resource: "hp", power: 50 }],
  };
}

/** The item with what its kind needs (and without what it doesn't), keeping what it already had. */
export function withItemKind(item: DbItem, kind: ItemKind): DbItem {
  const {
    use,
    target,
    effects,
    slot,
    weapon,
    attackElement,
    bonuses,
    resists,
    growth,
    ...base
  } = item;
  const next: DbItem = { ...base, kind };
  switch (kind) {
    case "consumable": {
      Object.assign(next, {
        use: use ?? "both",
        target: target ?? "ally",
        effects: effects ?? [],
      });

      break;
    }
    case "equipment": {
      Object.assign(next, {
        slot: slot ?? "weapon",
        bonuses: bonuses ?? [],
        resists: resists ?? [],
        growth: growth ?? [],
      });
      if (weapon) {
        next.weapon = weapon;
      }
      if (attackElement) {
        next.attackElement = attackElement;
      }

      break;
    }
    case "key": {
      next.price = 0;

      break;
    }
    // No default
  }
  return next;
}

/** « Rapide » for a cast time in seconds. */
export function castLabel(cast: number): string {
  if (cast <= 0) {
    return "Immédiat";
  }
  if (cast <= 1) {
    return "Rapide";
  }
  if (cast <= 2.5) {
    return "Moyen";
  }
  return cast <= 4 ? "Lent" : "Très lent";
}

/**
 * The levels a skill of this element is learned with, to start from: both parts of a composed element, the element
 * itself, the first weapon type for a physical skill.
 */
export function defaultLearn(
  elementId: string,
  db: GameDatabase
): SkillLearn[] {
  const element = db.elements.find((e) => e.id === elementId);
  if (!element) {
    return [];
  }
  if (element.parts) {
    return element.parts.map((id) => ({ id, level: 1 }));
  }
  if (element.physical) {
    return db.weapons[0] ? [{ id: db.weapons[0].id, level: 1 }] : [];
  }
  return [{ id: element.id, level: 1 }];
}

/** What a skill can be learned with: the simple elements (not physical), then the weapon types. */
export function learnChoices(
  db: GameDatabase
): { id: string; name: string; weapon: boolean }[] {
  return [
    ...db.elements
      .filter((e) => !e.physical && !e.parts)
      .map((e) => ({ id: e.id, name: e.name, weapon: false })),
    ...db.weapons.map((w) => ({ id: w.id, name: w.name, weapon: true })),
  ];
}

/** Letters, numbers, a. / b. and the 4 operations only. */
export function formulaProblem(formula: string): string {
  const text = formula.trim();
  if (!text) {
    return "";
  }
  if (!/^[\d\s()*+./a-z-]*$/i.test(text)) {
    return "Seulement des nombres, a.stat, b.stat, + − * / et des parenthèses.";
  }
  const names = text.match(/[_a-z]\w*(\.[_a-z]+)?/gi) ?? [];
  const stats = [...STATS.map((s) => s.id as string), "level"];
  const bad = names.find(
    (n) => !/^[ab]\.[a-z]+$/i.test(n) || !stats.includes(n.split(".")[1])
  );
  return bad ? `« ${bad} » : écrire a. ou b. puis ${stats.join(", ")}.` : "";
}

export function clampInt(value: number, min: number, max: number): number {
  return Math.min(
    max,
    Math.max(min, Math.round(Number.isFinite(value) ? value : 0))
  );
}

/** The simple elements a composed one can be made of (not itself, not physical, not composed). */
export function composableElements(
  elements: DbElement[],
  self?: string
): DbElement[] {
  return elements.filter((e) => e.id !== self && !e.physical && !e.parts);
}

/** « Feu + Vent » for a composed element, '' otherwise. */
export function partsLabel(element: DbElement, elements: DbElement[]): string {
  if (!element.parts) {
    return "";
  }
  return element.parts
    .map((id) => elements.find((e) => e.id === id)?.name ?? "?")
    .join(" + ");
}

/**
 * The database with a table row removed, and what pointed to it fixed: a composed element made of it becomes simple,
 * its skills become physical, the levels and the effects naming it go.
 */
export function withoutRow(
  db: GameDatabase,
  table: DbTable,
  id: string
): GameDatabase {
  const next = {
    ...db,
    [table]: (db[table] as { id: string }[]).filter((row) => row.id !== id),
  } as GameDatabase;
  if (table === "elements") {
    next.elements = next.elements.map((e) => {
      if (!e.parts?.includes(id)) {
        return e;
      }
      return omit(e, "parts");
    });
    // Its skills become physical
    const physical =
      next.elements.find((e) => e.physical)?.id ?? next.elements[0]?.id ?? "";
    next.skills = next.skills.map((s) =>
      s.element === id ? { ...s, element: physical } : s
    );
  }
  if (table === "elements" || table === "weapons") {
    next.skills = next.skills.map((s) =>
      s.learn.some((l) => l.id === id)
        ? { ...s, learn: s.learn.filter((l) => l.id !== id) }
        : s
    );
  }
  const effectNames = (e: SkillEffect) =>
    ((e.kind === "addState" || e.kind === "removeState") && e.state === id) ||
    (e.kind === "xp" && e.id === id);
  if (table === "states" || table === "elements" || table === "weapons") {
    next.skills = next.skills.map((s) => ({
      ...s,
      effects: s.effects.filter((e) => !effectNames(e)),
    }));
    next.items = next.items.map((it) => {
      const fixed = { ...it };
      if (fixed.effects) {
        fixed.effects = fixed.effects.filter((e) => !effectNames(e));
      }
      if (fixed.resists) {
        fixed.resists = fixed.resists.filter((r) => r.element !== id);
      }
      if (fixed.growth) {
        fixed.growth = fixed.growth.filter((g) => g.id !== id);
      }
      if (fixed.weapon === id) {
        delete fixed.weapon;
      }
      if (fixed.attackElement === id) {
        delete fixed.attackElement;
      }
      return fixed;
    });
  }
  if (table === "elements" || table === "weapons") {
    next.characters = next.characters.map((c) => {
      if (!(id in c.growth)) {
        return c;
      }
      return { ...c, growth: omit(c.growth, id) };
    });
  }
  if (table === "items") {
    next.characters = next.characters.map((c) =>
      Object.values(c.equipment).includes(id)
        ? {
            ...c,
            equipment: Object.fromEntries(
              Object.entries(c.equipment).filter(([, v]) => v !== id)
            ),
          }
        : c
    );
  }
  if (table === "elements") {
    next.enemies = next.enemies.map((e) => {
      if (!(id in e.resists)) {
        return e;
      }
      return { ...e, resists: omit(e.resists, id) };
    });
  }
  if (table === "skills") {
    next.enemies = next.enemies.map((e) =>
      e.actions.some((a) => a.skill === id)
        ? { ...e, actions: e.actions.filter((a) => a.skill !== id) }
        : e
    );
  }
  if (table === "items") {
    next.enemies = next.enemies.map((e) =>
      e.drops.some((d) => d.item === id)
        ? { ...e, drops: e.drops.filter((d) => d.item !== id) }
        : e
    );
  }
  if (table === "enemies") {
    next.groups = next.groups.map((g) =>
      g.members.some((m) => m.enemy === id)
        ? { ...g, members: g.members.filter((m) => m.enemy !== id) }
        : g
    );
  }
  if (table === "skills") {
    next.characters = next.characters.map((c) => {
      if (!c.excludedSkills?.includes(id)) {
        return c;
      }
      const { excludedSkills, ...rest } = c;
      const left = excludedSkills.filter((s) => s !== id);
      return left.length > 0 ? { ...rest, excludedSkills: left } : rest;
    });
  }
  if (table === "characters") {
    next.items = next.items.map((it) => {
      if (!it.wearers?.includes(id)) {
        return it;
      }
      const { wearers, ...rest } = it;
      const left = wearers.filter((w) => w !== id);
      return left.length > 0 ? { ...rest, wearers: left } : rest;
    });
  }
  return next;
}
