import * as THREE from "three";
import { SpriteSheet } from "../../database-editor/shared/sprite-sheet";

/** How a fight ends: the event's branches (Victoire, Défaite, Fuite). */
export type BattleResult = "win" | "lose" | "flee";

/** What a fighter does on its turn (step 2: the attacks, defending; magic and items come later). */
export type CommandKind = "attack" | "heavy" | "defend" | "flee";

export interface Command {
  kind: CommandKind;
  /** The fighter aimed at (attacks). */
  target?: string;
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
  strength: number;
  endurance: number;
  agility: number;
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

/** A number (damage…) rising over a fighter for a moment. */
export interface Popup {
  id: number;
  text: string;
  kind: "damage" | "heal" | "info";
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
  /** The attack being aimed (target phase). */
  pending: CommandKind | null;
  /** The enemy under the aim (target phase), and where it is on the screen. */
  aim: string | null;
  aimScreen: { x: number; y: number } | null;
  popups: Popup[];
}

/** Where the action gauge's zones start: waiting, then the command (the turn comes), then the action. */
export const GAUGE_COMMAND = 0.7;
export const GAUGE_ACTION = 0.86;
