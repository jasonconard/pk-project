import * as THREE from "three";
import {
  EnemyAction,
  ResistLevel,
  StatId,
} from "../../database-editor/shared/database";
import { SpriteSheet } from "../../database-editor/shared/sprite-sheet";

/** How a fight ends: the event's branches (Victoire, Défaite, Fuite). */
export type BattleResult = "win" | "lose" | "flee";

/** What a fighter does on its turn. */
export type CommandKind =
  "attack" | "heavy" | "skill" | "item" | "defend" | "flee";

export interface Command {
  kind: CommandKind;
  /** A skill's or an item's id. */
  id?: string;
  /** The fighter aimed at (one target); none: every one of the side, or itself. */
  target?: string;
}

/** A state on a fighter (poison…), with its turns left (0: the whole fight). */
export interface ActiveState {
  id: string;
  turns: number;
}

/** A stat raised or lowered by a skill, for some turns. */
export interface Boost {
  stat: StatId;
  percent: number;
  turns: number;
}

/** One fighter: a team member or an enemy of the group. */
export interface Fighter {
  /** Unique in the fight (an enemy twice in the group: two ids). */
  id: string;
  side: "team" | "foe";
  name: string;
  level: number;
  icon?: string;
  portrait?: string;
  sheet?: SpriteSheet;
  hp: number;
  hpMax: number;
  mp: number;
  mpMax: number;
  /** Its stats with its equipment (states and boosts on top: statOf). */
  stats: Record<StatId, number>;
  /** How it takes the elements (equipment for the team). */
  resists: Record<string, ResistLevel>;
  /** The element of its plain attacks (the weapon's, else physical). */
  attackElement: string;
  /** The team: its weapon's type (its attacks make that level grow). */
  weaponType?: string;
  /** Its weapon hits from afar (a bow): its attacks are shot from where it stands. */
  ranged?: boolean;
  /** Stunned after a hit (s, 0: no): its gauge waits at least that long (its sheet's « Étourdi après un coup »). */
  stun: number;
  states: ActiveState[];
  boosts: Boost[];
  /** The team: the skills it knows; an enemy: what it may do. */
  skills: string[];
  actions: EnemyAction[];
  /** An enemy stronger in the weather of the fight. */
  stronger: boolean;
  /**
   * Place on the action gauge: 0 (just acted) … GAUGE_DECIDE (an enemy decides) … GAUGE_COMMAND (the team chooses;
   * then a skill charges) … 1 (it acts).
   */
  gauge: number;
  /** Decided (an enemy, at GAUGE_DECIDE) or chosen (the team, at GAUGE_COMMAND), done at 1. */
  command: Command | null;
  /** Takes half the damage until its next turn. */
  defending: boolean;
  /** An enemy's place in the group's field (0..1, see the group sheet); the team: unused. */
  spot: { x: number; y: number };
  /** Where it stands in the fight, and where it goes back after acting (set by the field). */
  home: THREE.Vector3;
  pos: THREE.Vector3;
}

/** A number (damage…) or a word rising over a fighter for a moment. */
export interface Popup {
  id: number;
  text: string;
  kind: "damage" | "heal" | "info" | "state" | "cancel";
  color?: string;
  x: number;
  y: number;
}

/** A choice in the magic or items list. */
export interface ActionChoice {
  id: string;
  name: string;
  icon?: string;
  /** « 4 PM », « ×3 ». */
  detail: string;
  usable: boolean;
}

/** One a target list can aim at. */
export interface TargetChoice {
  id: string;
  name: string;
  icon?: string;
  hp: number;
  hpMax: number;
  level: number;
  /** Where it is on the screen (CSS px): a touch near it aims at it. */
  screen: { x: number; y: number };
  /** Its states (ids). */
  states: string[];
  /** Its next action when decided (an enemy past 2/5, a team member who chose): « Venin », « Attaque ». */
  plan: string | null;
  /** Charging its skill or walking to its target: a heavy attack would interrupt it. */
  busy: boolean;
  /** An enemy: how it takes the elements it doesn't take normally. */
  resists: { name: string; icon?: string; level: ResistLevel }[];
}

/** A spell being gathered (between the command and the action marks), shown over its caster. */
export interface Cast {
  id: string;
  name: string;
  progress: number;
  x: number;
  y: number;
}

/**
 * What the fight's interface shows (updated by the battle service). `phase`: the fight runs (the gauges fill and the
 * actions play, several at once), a team member chooses its command or its target (everything waits), the fight is
 * over, its end window.
 */
export interface BattleView {
  groupName: string;
  canFlee: boolean;
  fighters: Fighter[];
  phase: "run" | "command" | "target" | "over" | "result";
  /** Who chooses (command, target) or acts. */
  actor: string | null;
  /** Where the one choosing stands on the screen (CSS px): the commands go beside it. */
  actorScreen: { x: number; y: number } | null;
  /** The one choosing: its skills and the team's items. */
  skills: ActionChoice[];
  items: ActionChoice[];
  /** Target phase: what is being aimed (« Boule de feu »), at whom, the one under the aim and where it is. */
  pendingLabel: string;
  targets: TargetChoice[];
  aim: string | null;
  aimScreen: { x: number; y: number } | null;
  casts: Cast[];
  popups: Popup[];
  /** A skill being shown off (the fight stops): its name, big under the gauge. */
  showcase: string | null;
  /** Fighters just interrupted or pushed back on the gauge (their token flashes). */
  knocked: string[];
  /** The end of the fight (victory, defeat): what the team won (phase « result »). */
  outcome: BattleOutcome | null;
  /** State id → its name and color (the cards' small dots). */
  stateLooks: Record<string, { name: string; color: string }>;
}

/**
 * The action gauge, Grandia style: at 2/5 an enemy decides its next action (a spell: it glows); at 4/5 (COM) a team
 * member chooses its command; from there to the end a skill charges (the others go straight to the end); at the end
 * the fighter acts.
 */
export const GAUGE_DECIDE = 0.4;
export const GAUGE_COMMAND = 0.8;

/** What a team member got from a victory. */
export interface MemberOutcome {
  id: string;
  name: string;
  portrait?: string;
  levelFrom: number;
  levelTo: number;
  /** Fallen during the fight (no experience; back on its feet with 1 PV). */
  fallen: boolean;
  /** Elements and weapon types used: their name and icon, the points gained, a level reached. */
  gains: {
    id: string;
    name: string;
    icon?: string;
    points: number;
    level: number | null;
  }[];
  /** Skills learned with the new levels. */
  skills: string[];
}

/** The end window: victory (experience, money, items, each member's progress) or defeat. */
export interface BattleOutcome {
  result: "win" | "lose";
  xp: number;
  money: number;
  items: { name: string; icon?: string; count: number }[];
  members: MemberOutcome[];
}
