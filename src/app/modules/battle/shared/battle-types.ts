import * as THREE from "three";
import { SpriteSheet } from "../../database-editor/shared/sprite-sheet";

/** How a fight ends: the event's branches (Victoire, Défaite, Fuite). */
export type BattleResult = "win" | "lose" | "flee";

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
  agility: number;
  /** Place on the action gauge: 0 (just acted) … 1 (acts). */
  gauge: number;
  /** An enemy's place in the group's field (0..1, see the group sheet); the team: unused. */
  spot: { x: number; y: number };
  /** Where it stands on the map (set by the field). */
  pos: THREE.Vector3;
}

/** What the fight's interface shows (a copy, updated by the battle service). */
export interface BattleView {
  groupName: string;
  canFlee: boolean;
  fighters: Fighter[];
}

/** Where the action gauge's zones start: waiting, then the command (the turn comes), then the action. */
export const GAUGE_COMMAND = 0.7;
export const GAUGE_ACTION = 0.86;
