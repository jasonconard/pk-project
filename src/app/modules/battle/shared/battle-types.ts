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
  states: ActiveState[];
  boosts: Boost[];
  /** The team: the skills it knows; an enemy: what it may do. */
  skills: string[];
  actions: EnemyAction[];
  /** An enemy stronger in the weather of the fight. */
  stronger: boolean;
  /** Place on the action gauge: 0 (just acted) … GAUGE_COMMAND (its turn) … 1 (it acts). */
  gauge: number;
  /** Chosen at GAUGE_COMMAND, done at 1. */
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
  /** Between its command and its action: a heavy attack would interrupt it. */
  busy: boolean;
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
 * What the fight's interface shows (updated by the battle service). `phase`: the gauges run, a team member chooses
 * its command or its target (time stops), someone acts (time stops), the fight is over.
 */
export interface BattleView {
  groupName: string;
  canFlee: boolean;
  fighters: Fighter[];
  phase: "run" | "command" | "target" | "act" | "over";
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
  /** Fighters just interrupted or pushed back on the gauge (their token flashes). */
  knocked: string[];
  /** State id → its name and color (the cards' small dots). */
  stateLooks: Record<string, { name: string; color: string }>;
}

/** Where the action gauge's zones start: waiting, then the command (the turn comes), then the action. */
export const GAUGE_COMMAND = 0.7;
export const GAUGE_ACTION = 0.86;
