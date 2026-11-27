import { WeatherType } from "../../game/shared/weather/Weather";
import { omit } from "../../../core/shared/omit";
import { SkillAnim } from "./skill-anim";
import { SpriteSheet } from "./sprite-sheet";
import type { EventConditions } from "../../game/shared/model/ObjectEvent";
import type {
  TransitionCase,
  TransitionKind,
} from "../../game/shared/model/transition";

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
  /** Hits from afar (a bow): its attacks are shot from where the fighter stands, no walking to the target. */
  ranged?: boolean;
  /**
   * Played by its attacks (attack and heavy attack), apart from the fighter's sheet: an arrow flying then its impact,
   * a slash on the target (see skill-anim.ts; never on a zone). The blow lands on its hit frame.
   */
  anim?: SkillAnim;
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

/**
 * How far a skill reaches from its user (world units on the battle field): a target farther away, the user walks
 * closer first; « contact » is a blow (it walks up to its target). Missing: contact for a skill hitting only with
 * Strength, else any distance.
 */
export type SkillRange = "contact" | "short" | "medium" | "long" | "any";
export const SKILL_RANGES: { id: SkillRange; label: string }[] = [
  { id: "contact", label: "Au contact" },
  { id: "short", label: "Courte" },
  { id: "medium", label: "Moyenne" },
  { id: "long", label: "Longue" },
  { id: "any", label: "Illimitée" },
];
export const RANGE_DISTANCE: Record<SkillRange, number> = {
  contact: 15,
  short: 35,
  medium: 60,
  long: 95,
  any: Number.POSITIVE_INFINITY,
};

/** A skill's range, or the old rule when none is set (hitting only with Strength: a blow at contact). */
export function skillRange(skill: DbSkill): SkillRange {
  if (skill.range) {
    return skill.range;
  }
  const damages = skill.effects.filter((e) => e.kind === "damage");
  return damages.length > 0 && damages.every((e) => e.stat === "str")
    ? "contact"
    : "any";
}

/**
 * A skill's zone around its one target: its radius (world units, fighters stand about 26 apart), from ZONE_MIN to
 * ZONE_MAX; missing: the target alone. The editor's slider marks a few usual sizes.
 */
export const ZONE_MIN = 10;
export const ZONE_MAX = 70;
export const ZONE_MARKS: { label: string; radius: number }[] = [
  { label: "Petite", radius: 20 },
  { label: "Moyenne", radius: 32 },
  { label: "Grande", radius: 48 },
];

/** A skill's zone radius (0: the target alone); an older « small / medium / large » becomes its mark's radius. */
export function skillZone(skill: DbSkill): number {
  const zone = skill.zone as unknown;
  if (typeof zone === "number") {
    return zone;
  }
  const old = { small: 20, medium: 32, large: 48 }[String(zone)];
  return old ?? 0;
}

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
  /** Key item: a farming tool (the hoe tills the farmland, the watering can waters the crops). */
  tool?: FarmTool;
}

export type FarmTool = "hoe" | "can";
export const FARM_TOOLS: { id: FarmTool; label: string }[] = [
  { id: "hoe", label: "Houe (labourer)" },
  { id: "can", label: "Arrosoir (arroser)" },
];

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

/** A character of the team: levels, stats, element and weapon levels, equipment (the villagers are NPCs). */
export interface DbCharacter {
  id: string;
  name: string;
  note?: string;
  /** In the team when a new game starts (else an event makes them join). */
  startsInTeam?: boolean;
  /** Pixel art: the menus' and action gauge's small face (also the list's icon), the dialogues' portrait, the still picture. */
  icon?: string;
  portrait?: string;
  sprite?: string;
  /** The combat animations (see sprite-sheet.ts). */
  sheet?: SpriteSheet;
  /** The walking sheet on the map (see WALK_CELL): the team's leader is drawn with it. */
  walk?: string;
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
  /** Stunned after a hit (ms, 0 or missing: no): its gauge waits that long, at least its « hit taken » animation. */
  stunMs?: number;
  /** The social link with this member: its pace and the combat bonuses of each level. */
  link?: CharacterLink;
}

/**
 * Social links (design/database.pen, 15 · Personnage · Lien, 16 · PNJ · Lien): points given by events make the link go
 * up, level 1 to LINK_MAX; each level brings combat bonuses (a team member) or an advantage (an NPC).
 */
export type LinkPace = "fast" | "normal" | "slow";
export const LINK_PACES: { id: LinkPace; label: string; factor: number }[] = [
  { id: "fast", label: "Rapide", factor: 2 / 3 },
  { id: "normal", label: "Normal", factor: 1 },
  { id: "slow", label: "Lent", factor: 4 / 3 },
];
export const LINK_MAX = 10;
/** Points from a level to the next (from 0, not met, to 1…), at a normal pace. */
const LINK_STEPS = [5, 7, 10, 12, 14, 16, 18, 20, 22, 24];

/** Points to go from this level to the next. */
export function linkStep(level: number, pace: LinkPace = "normal"): number {
  const factor = LINK_PACES.find((p) => p.id === pace)?.factor ?? 1;
  return Math.max(1, Math.round((LINK_STEPS[level] ?? 24) * factor));
}

/** The level reached with these points, and the points into the next level. */
export function linkLevelOf(
  points: number,
  pace: LinkPace = "normal"
): { level: number; into: number; next: number } {
  let level = 0;
  let rest = Math.max(0, points);
  while (level < LINK_MAX && rest >= linkStep(level, pace)) {
    rest -= linkStep(level, pace);
    level++;
  }
  return {
    level,
    into: level < LINK_MAX ? rest : 0,
    next: level < LINK_MAX ? linkStep(level, pace) : 0,
  };
}

/** A combat bonus of a link level: stats in %, a skill learned, element or weapon experience. */
export type LinkBonus =
  | { kind: "stat"; stat: StatId; percent: number }
  | { kind: "skill"; skill: string }
  | { kind: "growth"; id: string; points: number };
export type LinkBonusKind = LinkBonus["kind"];

export interface CharacterLink {
  pace: LinkPace;
  /** levels[0]: the bonuses at level 1… */
  levels: LinkBonus[][];
}

export interface NpcLink {
  pace: LinkPace;
  /** levels[0]: the advantage at level 1 (what the player is told; empty: none)… */
  levels: string[];
  /** Gifts (item ids) liked and disliked; the others: a little. */
  liked: string[];
  disliked: string[];
}

/** Points a gift brings. */
export const GIFT_POINTS = { liked: 4, neutral: 1, disliked: -2 };

export function newCharacterLink(): CharacterLink {
  return { pace: "normal", levels: Array.from({ length: LINK_MAX }, () => []) };
}

export function newNpcLink(): NpcLink {
  return {
    pace: "normal",
    levels: Array.from({ length: LINK_MAX }, () => ""),
    liked: [],
    disliked: [],
  };
}

/** A non-player character (the baker, the mayor…): looks only, no fight. Placed on the maps with its events. */
export interface DbNpc {
  id: string;
  name: string;
  note?: string;
  /** Pixel art: the list's small face, the dialogues' portrait. */
  icon?: string;
  portrait?: string;
  /** The walking sheet on the map (see WALK_CELL). */
  walk?: string;
  /** Where it is each day and moment (missing: always at every place it is put on the maps). */
  schedule?: NpcSchedule;
  /** The social link with it: its pace, the advantage of each level, the gifts it likes. */
  link?: NpcLink;
}

/**
 * An NPC's schedule (design/database.pen, 14 · PNJ · Emploi du temps). Its places are the NPC put on the maps (each
 * one with its own events and place name): a place is « <map id>/<object id> », null where it is nowhere (absent).
 */
export interface NpcSchedule {
  /** One row per day of the calendar's week, one place per moment of the day (DAY_TIMES' order). */
  week: (string | null)[][];
  /** On a special day of the calendar (at some moments, none: all day), somewhere else. */
  exceptions: NpcException[];
}

export interface NpcException {
  id: string;
  special: string;
  times: DayTime[];
  place: string | null;
}

/**
 * The walking sheet on the map: one picture of WALK_FRAMES columns (left foot, standing, right foot) and one row per
 * direction (WALK_DIRS, in that order). A sprite pixel is a map pixel (the old player sprite was 14×22).
 */
export const WALK_CELL = { w: 16, h: 24 };
export const WALK_FRAMES = 3;
export const WALK_DIRS = [
  { id: "down", label: "Bas" },
  { id: "left", label: "Gauche" },
  { id: "right", label: "Droite" },
  { id: "up", label: "Haut" },
] as const;
/** The column of the standing picture. */
export const WALK_STAND = 1;

/**
 * An enemy's sprite walking on the map, in 8 directions: one picture of `frames` columns (the steps of the walk, the
 * first one also shown standing) and one row per direction (MAP_WALK_DIRS, in that order). Cells of any size
 * (`w` × `h`: a small slime, a big golem), a sprite pixel being a map pixel; the feet at the bottom of the cell.
 */
export interface MapWalk {
  image: string;
  w: number;
  h: number;
  frames: number;
}
export const MAP_WALK_DIRS = [
  { id: "south", label: "Bas" },
  { id: "south-west", label: "Bas gauche" },
  { id: "west", label: "Gauche" },
  { id: "north-west", label: "Haut gauche" },
  { id: "north", label: "Haut" },
  { id: "north-east", label: "Haut droite" },
  { id: "east", label: "Droite" },
  { id: "south-east", label: "Bas droite" },
] as const;

/** Pixel sizes of a character's pictures. */
export const PICTURE_SIZES = {
  icon: { w: 16, h: 16 },
  portrait: { w: 96, h: 96 },
  sprite: { w: 48, h: 48 },
  walk: { w: WALK_CELL.w * WALK_FRAMES, h: WALK_CELL.h * WALK_DIRS.length },
  /** A crop's growth stage: one map cell wide, taller (it stands on the cell). */
  crop: { w: 16, h: 24 },
};

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
  /** The action gauge's small picture (16×16) and the still picture (48×48: menus, groups). */
  icon?: string;
  sprite?: string;
  /** The combat animations (see sprite-sheet.ts). */
  sheet?: SpriteSheet;
  /** Seen on the dungeon map before the fight. */
  model?: string;
  /** Its sprite walking on a dungeon's map (missing: its still picture, not animated). */
  walk?: MapWalk;
  level: number;
  stats: Record<StatId, number>;
  /** Element id → how it takes it (missing: normal). */
  resists: Record<string, ResistLevel>;
  /** Stunned after a hit (ms, 0 or missing: no): its gauge waits that long, at least its « hit taken » animation. */
  stunMs?: number;
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
  /** Its own screen transitions into and out of the fight (missing: the settings' ones). */
  transitionIn?: TransitionKind;
  transitionOut?: TransitionKind;
  /** The arena its fights are played in: a map's id, "none" on the spot (missing: the place's, see arenaFor). */
  arena?: string;
}

/**
 * A dungeon (design/database.pen, 17 · Donjon): open only at some moments (and all day on some special days), with
 * its own weather, made of floors. A floor is a map made by hand, or generated at each visit from « Salle » maps
 * (rooms) linked at random by their room doors. Its enemies walk on the map (they start the fight when they touch
 * the team); a floor may have a save point that is also the way out.
 */
export interface DbDungeon {
  id: string;
  name: string;
  icon?: string;
  note?: string;
  /** Moments it is open (none: always). */
  moments: DayTime[];
  /** Special days (calendar ids) it is open all day too. */
  specials: string[];
  /** Its own weather (none: the weather outside). */
  weather?: `${WeatherType}`;
  /** Its own song (a song of the music editor; none: the music settings' Donjon moment). */
  music?: string;
  /** The arena of the fights in it: a map's id, "none" on the spot (missing: the settings' one). */
  arena?: string;
  floors: DbFloor[];
}

/** One floor of a dungeon, or several generated floors alike (`repeat`). */
export interface DbFloor {
  id: string;
  /** « Entrée », « Repos », « Boss ». */
  name: string;
  /** A map made by hand (its id); missing: generated from `rooms`. */
  map?: string;
  /** Generated: the « Salle » maps it picks its rooms from. */
  rooms: string[];
  roomsMin: number;
  roomsMax: number;
  /** Generated: how many floors alike follow each other (1 or more). */
  repeat: number;
  /** The enemy groups walking on the floor (one picked at random for each enemy). */
  groups: string[];
  enemiesMin: number;
  enemiesMax: number;
  /** Generated: chests placed at random, with what they may hold. */
  chestsMin: number;
  chestsMax: number;
  loot: { item: string; chance: number }[];
  /** A save point at the arrival, also the way out of the dungeon. */
  save: boolean;
}

export const DUNGEON_LIMITS = { rooms: 20, enemies: 12, chests: 6, repeat: 20 };

export function newFloor(name: string): DbFloor {
  return {
    id: newId("fl"),
    name,
    rooms: [],
    roomsMin: 4,
    roomsMax: 6,
    repeat: 1,
    groups: [],
    enemiesMin: 2,
    enemiesMax: 4,
    chestsMin: 1,
    chestsMax: 2,
    loot: [],
    save: false,
  };
}

export function newDungeon(name: string): DbDungeon {
  return {
    id: newId("dg"),
    name,
    moments: ["night"],
    specials: [],
    floors: [{ ...newFloor("Entrée"), save: true }],
  };
}

/**
 * A shop (design/database.pen, 18 · Boutique): opened by the « Ouvrir la boutique » action of an event. Its
 * shopkeeper (an NPC: portrait, name, and the link that lowers the prices), the items sold, how much it buys back.
 */
export interface DbShop {
  id: string;
  name: string;
  icon?: string;
  note?: string;
  /** The shopkeeper (an NPC id; none: nobody shown, no link discount). */
  keeper?: string;
  /** What the player gets for an item sold, in % of its price (0: the shop buys nothing). */
  buyback: number;
  /** Lower prices for each level of the link with the shopkeeper, in %. */
  discount: number;
  items: DbShopItem[];
}

/** An item sold in a shop (design/database.pen, 19 · Un objet). */
export interface DbShopItem {
  item: string;
  /** Its own price here (none: the item's). */
  price?: number;
  /** How many can be bought each day (none: no limit); it comes back every morning. */
  stock?: number;
  /** Shown only when these fit (moments, weathers, days, variables…: the events' conditions). */
  conditions?: EventConditions;
  /** Shown from this level of the link with the shopkeeper (none: always). */
  linkLevel?: number;
}

export const SHOP_LIMITS = { stock: 99, percent: 100, discount: 20 };

export function newShop(name: string): DbShop {
  return { id: newId("sh"), name, buyback: 50, discount: 5, items: [] };
}

/**
 * A crop (design/database.pen, 20 · Culture): planted with a seed item on the farmland, it grows through 4 stages
 * (each a 16 × 24 picture) on the days it is watered (or it rained), in its months only; frost hurts it unless it is
 * hardy; some weathers make it grow faster. Ripe, it gives its harvest item, then the cell is soil again or it grows
 * back.
 */
export interface DbCrop {
  id: string;
  name: string;
  icon?: string;
  note?: string;
  /** The item that plants it (a seed). */
  seed: string;
  /** Seeds, sprout, grown, ripe: the picture of each and how many watered days it lasts (the last one: ripe). */
  stages: { pic?: string; days: number }[];
  /** The item harvested and how many. */
  harvest: string;
  harvestMin: number;
  harvestMax: number;
  /** Grows back to the grown stage after a harvest, ripe again in this many days (none: one harvest). */
  regrow?: number;
  /** Months it grows in (indexes in the calendar's months; none: all year). */
  months: number[];
  /** Frost (snow, ice) wilts it, then kills it. */
  fearsFrost: boolean;
  /** Weathers that make it grow faster: days added on a watered day under that weather. */
  weathers: { weather: `${WeatherType}`; days: number }[];
}

export const CROP_STAGES = ["Semis", "Pousse", "Grande", "Mûre"];
export const CROP_LIMITS = { days: 30, harvest: 9, bonus: 3 };

export function newCrop(name: string): DbCrop {
  return {
    id: newId("cr"),
    name,
    seed: "",
    stages: [{ days: 1 }, { days: 1 }, { days: 2 }, { days: 0 }],
    harvest: "",
    harvestMin: 1,
    harvestMax: 1,
    months: [],
    fearsFrost: true,
    weathers: [],
  };
}

/** Watered days from planting to ripe. */
export function daysToRipe(crop: DbCrop): number {
  return crop.stages.slice(0, -1).reduce((sum, st) => sum + st.days, 0);
}

/** How many floors a dungeon has (generated lines count their `repeat`). */
export function floorCount(dungeon: DbDungeon): number {
  return dungeon.floors.reduce(
    (sum, f) => sum + (f.map ? 1 : Math.max(1, f.repeat)),
    0
  );
}

/** The floor line of a floor number (0 first) and its number inside the line. */
export function floorAt(
  dungeon: DbDungeon,
  floor: number
): { floor: DbFloor; index: number } | null {
  let rest = floor;
  for (const f of dungeon.floors) {
    const n = f.map ? 1 : Math.max(1, f.repeat);
    if (rest < n) {
      return { floor: f, index: rest };
    }
    rest -= n;
  }
  return null;
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
  /** How far it reaches (see SkillRange). */
  range?: SkillRange;
  /** One target (enemy, ally): the radius of the zone around it also hit (see ZONE_MIN). */
  zone?: number;
  /** Its effect animation, played during its showcase (see skill-anim.ts). */
  anim?: SkillAnim;
  use: SkillUse;
  effects: SkillEffect[];
  /** Replaces the power of its damage and heals (« a.mag * 2 - b.end »: a = who uses it, b = the target). */
  formula?: string;
  /** Levels needed to learn it (none: given by an event or an item). Two at most. */
  learn: SkillLearn[];
}

/**
 * The game's calendar (the table holds this one row; design/database.pen, 13 · Calendrier): its shape (the week, the
 * months or seasons), the start of a game, how long a day lasts, the moments of the day and the special days.
 */
export interface DbCalendar {
  id: string;
  name: string;
  /** (the rows' icon: unused here) */
  icon?: string;
  /** The days of the week (full names, shown shortened to their 3 first letters). */
  week: string[];
  months: DbMonth[];
  /** A new game starts on this day of year 1 (month index, day from 1), at this hour. */
  start: { month: number; day: number; hour: number };
  /** The day of the week of the 1st day of year 1 (index in `week`). */
  firstWeekday: number;
  /** Real minutes a day of the game lasts. */
  dayMinutes: number;
  /** The hour each moment of the day starts at. */
  moments: Record<DayTime, number>;
  special: DbSpecialDay[];
}

/** A month (or a season): its name, its days, its color and icon (the Agenda). */
export interface DbMonth {
  name: string;
  days: number;
  color: string;
  icon: MonthIcon;
}

/** The icons a month may have (Lucide). */
export type MonthIcon =
  | "sprout"
  | "sun"
  | "leaf"
  | "snowflake"
  | "flower"
  | "cloud-rain"
  | "star"
  | "moon";
export const MONTH_ICONS: { id: MonthIcon; label: string }[] = [
  { id: "sprout", label: "Pousse" },
  { id: "sun", label: "Soleil" },
  { id: "leaf", label: "Feuille" },
  { id: "snowflake", label: "Flocon" },
  { id: "flower", label: "Fleur" },
  { id: "cloud-rain", label: "Pluie" },
  { id: "star", label: "Étoile" },
  { id: "moon", label: "Lune" },
];

/** How a special day comes back: a date each year, a day each month, a day of the week. */
export type SpecialRepeat = "year" | "month" | "week";
export const SPECIAL_REPEATS: { id: SpecialRepeat; label: string }[] = [
  { id: "year", label: "Chaque année" },
  { id: "month", label: "Chaque mois" },
  { id: "week", label: "Chaque semaine" },
];

/** A special day (a feast, the market, the full moon): shown in the Agenda, a condition for events and schedules. */
export interface DbSpecialDay {
  id: string;
  name: string;
  color: string;
  repeat: SpecialRepeat;
  /** « year »: the month (index) and the day; « month »: the day; « week »: the day of the week (index). */
  month: number;
  day: number;
  weekday: number;
  /** The moments it lasts (empty: the whole day). */
  times: DayTime[];
}

export const CALENDAR_LIMITS = {
  weekDays: { min: 1, max: 10 },
  months: { min: 1, max: 24 },
  monthDays: { min: 1, max: 99 },
  dayMinutes: { min: 1, max: 240 },
};

/** The ready-made shapes: the real calendar, four seasons of 28 days (like Stardew Valley). */
export type CalendarShape = "real" | "seasons";
const FRENCH_WEEK = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];
export const CALENDAR_SHAPES: Record<
  CalendarShape,
  { label: string; week: string[]; months: DbMonth[] }
> = {
  real: {
    label: "Réel · 12 mois",
    week: FRENCH_WEEK,
    months: (
      [
        ["Janvier", 31, "#7db7e8", "snowflake"],
        ["Février", 28, "#7db7e8", "snowflake"],
        ["Mars", 31, "#7fd18b", "sprout"],
        ["Avril", 30, "#7fd18b", "flower"],
        ["Mai", 31, "#7fd18b", "flower"],
        ["Juin", 30, "#f4c06a", "sun"],
        ["Juillet", 31, "#f4c06a", "sun"],
        ["Août", 31, "#f4c06a", "sun"],
        ["Septembre", 30, "#e8895a", "leaf"],
        ["Octobre", 31, "#e8895a", "leaf"],
        ["Novembre", 30, "#e8895a", "cloud-rain"],
        ["Décembre", 31, "#7db7e8", "snowflake"],
      ] as const
    ).map(([name, days, color, icon]) => ({ name, days, color, icon })),
  },
  seasons: {
    label: "Saisons · 4 × 28 j",
    week: FRENCH_WEEK,
    months: (
      [
        ["Printemps", "#7fd18b", "sprout"],
        ["Été", "#f4c06a", "sun"],
        ["Automne", "#e8895a", "leaf"],
        ["Hiver", "#7db7e8", "snowflake"],
      ] as const
    ).map(([name, color, icon]) => ({ name, days: 28, color, icon })),
  },
};

/** The ready-made shape the calendar has (its week and months unchanged), else null (its own). */
export function calendarShape(calendar: DbCalendar): CalendarShape | null {
  const same = (a: unknown, b: unknown) =>
    JSON.stringify(a) === JSON.stringify(b);
  return (
    (Object.keys(CALENDAR_SHAPES) as CalendarShape[]).find(
      (shape) =>
        same(calendar.week, CALENDAR_SHAPES[shape].week) &&
        same(calendar.months, CALENDAR_SHAPES[shape].months)
    ) ?? null
  );
}

/** The calendar of a new game: four seasons, spring 1st at 7:00, a few special days. */
export function newCalendar(): DbCalendar {
  return {
    id: "calendar",
    name: "Calendrier du jeu",
    week: [...CALENDAR_SHAPES.seasons.week],
    months: structuredClone(CALENDAR_SHAPES.seasons.months),
    start: { month: 0, day: 1, hour: 7 },
    firstWeekday: 0,
    dayMinutes: 12,
    moments: { morning: 6, afternoon: 12, evening: 18, night: 22 },
    special: [
      newSpecialDay("Fête du printemps", "#ffb04a", {
        repeat: "year",
        day: 13,
      }),
      newSpecialDay("Jour de marché", "#7fd18b", {
        repeat: "week",
        weekday: 2,
        times: ["morning"],
      }),
      newSpecialDay("Pleine lune", "#ff6a5a", {
        repeat: "month",
        day: 28,
        times: ["night"],
      }),
    ],
  };
}

export function newSpecialDay(
  name: string,
  color: string,
  rule: Partial<DbSpecialDay> = {}
): DbSpecialDay {
  return {
    id: newId("sd"),
    name,
    color,
    repeat: "year",
    month: 0,
    day: 1,
    weekday: 0,
    times: [],
    ...rule,
  };
}

/** « 13 printemps · chaque année », « chaque mercredi · matin », « le 28 de chaque mois · nuit ». */
export function specialDayLabel(
  sd: DbSpecialDay,
  calendar: DbCalendar
): string {
  const month = calendar.months[sd.month]?.name.toLowerCase() ?? "?";
  const weekday = calendar.week[sd.weekday]?.toLowerCase() ?? "?";
  const when = {
    year: `${sd.day} ${month} · chaque année`,
    month: `le ${sd.day} de chaque mois`,
    week: `chaque ${weekday}`,
  }[sd.repeat];
  const times = sd.times
    .map((t) => DAY_TIMES.find((d) => d.id === t)?.label.toLowerCase())
    .join(", ");
  return times ? `${when} · ${times}` : `${when} · toute la journée`;
}

/**
 * The game's settings (the table holds this one row): the screen transition played in each case (see transition.ts).
 */
export interface DbSettings {
  id: string;
  name: string;
  /** (never set: every row of the editor may have a picture) */
  icon?: string;
  transitions: Record<TransitionCase, TransitionKind>;
  /** The arena of the fights without one of their own: a map's id (missing or "none": on the spot). */
  arena?: string;
}

export function newSettings(): DbSettings {
  return {
    id: "settings",
    name: "Réglages du jeu",
    transitions: { map: "fade", fightIn: "stripes", fightOut: "fade" },
  };
}

export interface GameDatabase {
  elements: DbElement[];
  weapons: DbWeapon[];
  states: DbState[];
  skills: DbSkill[];
  items: DbItem[];
  characters: DbCharacter[];
  npcs: DbNpc[];
  enemies: DbEnemy[];
  groups: DbGroup[];
  calendar: DbCalendar[];
  dungeons: DbDungeon[];
  shops: DbShop[];
  crops: DbCrop[];
  settings: DbSettings[];
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

/** The items a character wears (its equipment). */
export function wornItems(c: DbCharacter, db: GameDatabase): DbItem[] {
  return Object.values(c.equipment)
    .map((id) => db.items.find((i) => i.id === id))
    .filter((i) => !!i);
}

/** A character's stats at a level, with its equipment's bonuses. */
export function characterStats(
  c: DbCharacter,
  level: number,
  db: GameDatabase
): Record<StatId, number> {
  const stats = Object.fromEntries(
    STATS.map((s) => [s.id, statAt(c, s.id, level)])
  ) as Record<StatId, number>;
  for (const item of wornItems(c, db)) {
    item.bonuses?.forEach((b) => (stats[b.stat] += b.amount));
  }
  return stats;
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

export function newNpc(name: string): DbNpc {
  return { id: newId("npc"), name };
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
    tool,
    ...base
  } = item;
  const next: DbItem = {
    ...base,
    kind,
    ...(kind === "key" && tool ? { tool } : {}),
  };
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
  if (table === "items") {
    next.crops = next.crops.map((cr) =>
      cr.seed === id || cr.harvest === id
        ? {
            ...cr,
            seed: cr.seed === id ? "" : cr.seed,
            harvest: cr.harvest === id ? "" : cr.harvest,
          }
        : cr
    );
  }
  if (table === "items") {
    next.shops = next.shops.map((sh) =>
      sh.items.some((i) => i.item === id)
        ? { ...sh, items: sh.items.filter((i) => i.item !== id) }
        : sh
    );
  }
  if (table === "npcs") {
    next.shops = next.shops.map((sh) => {
      if (sh.keeper !== id) {
        return sh;
      }
      const rest = { ...sh };
      delete rest.keeper;
      return rest;
    });
  }
  if (table === "groups" || table === "items") {
    next.dungeons = next.dungeons.map((d) => ({
      ...d,
      floors: d.floors.map((f) => ({
        ...f,
        groups: f.groups.filter((g) => g !== id),
        loot: f.loot.filter((l) => l.item !== id),
      })),
    }));
  }
  return next;
}
