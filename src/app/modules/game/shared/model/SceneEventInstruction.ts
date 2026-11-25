import { VariableTest } from "./SceneEvent";
import { Vec3 } from "./SceneUtils";
import { DayTime } from "../../../database-editor/shared/database";
import { BattleOpening } from "../../../battle/shared/battle-types";

/** (new types at the end: the maps store the numbers) */
export enum InstructionType {
  LOG,
  MESSAGE,
  WAIT,
  TELEPORT,
  VARIABLE,
  WEATHER,
  SOUND,
  BRANCH,
  STOP,
  ITEM,
  MONEY,
  PARTY,
  FIGHT,
  HEAL,
  /** TIME: the time passes (a fade to black), see InstructionTime. */
  TIME,
  /** TIME_FLOW: the time stops or goes on again (until « go on » or another map). */
  TIME_FLOW,
  /** LINK: points to a social link. */
  LINK,
  /** GIFT: the player picks a gift in the bag for an NPC. */
  GIFT,
  /** DUNGEON: enter a dungeon, leave it, go down a floor… (see InstructionDungeon). */
  DUNGEON,
  /** ANIMATE: an object's movements « Par un événement » played, sent back, looped or stopped. */
  ANIMATE,
}

export interface SceneEventInstruction {
  type: InstructionType;
  log?: InstructionLog;
  message?: InstructionMessage;
  wait?: InstructionWait;
  teleport?: InstructionTeleport;
  variable?: InstructionVariable;
  weather?: InstructionWeather;
  sound?: InstructionSound;
  /** BRANCH: plays its sub-instructions 'then' when these conditions are true, else 'else'. */
  branch?: InstructionBranch;
  /** ITEM: items given (+) or taken (−). */
  item?: { id: string; amount: number };
  /** MONEY: money given (+) or taken (−). */
  money?: { amount: number };
  /** PARTY: a character joins or leaves the team. */
  party?: { id: string; join: boolean };
  /** FIGHT: a fight against a group; its sub-instructions 'win', 'lose' or 'flee' follow. */
  fight?: { group: string; opening?: BattleOpening };
  dungeon?: InstructionDungeon;
  animate?: InstructionAnimate;
  time?: InstructionTime;
  timeFlow?: { stop: boolean };
  link?: { id: string; points: number };
  gift?: { npc: string };
  subInstructions?: SceneEventSubInstruction[];
}

/** Some hours more, until a moment of the day (the next one of that name), or the next morning. */
export interface InstructionTime {
  mode: "hours" | "until" | "nextDay";
  hours?: number;
  moment?: DayTime;
}

export interface SceneEventSubInstruction {
  condition: string;
  instructions: SceneEventInstruction[];
}

/**
 * A dungeon action: enter one (at its first floor, if open), leave it, go to the next floor, save, and what the
 * game plays after a dungeon's enemy is met (beaten, the team lost or fled: `id` its object).
 */
export interface InstructionDungeon {
  action: "enter" | "leave" | "next" | "save" | "beaten" | "lost" | "fled";
  id?: string;
}

/** An object of the map (its id; missing: the event's own object) moved (see model-motion.ts). */
export interface InstructionAnimate {
  object?: string;
  mode: "play" | "back" | "loop" | "stop";
  /** The event waits for the movement to end (its longest duration). */
  wait: boolean;
}

export interface InstructionWait {
  time: number;
}

export interface InstructionLog {
  text: string;
}

export interface InstructionMessage {
  name?: string;
  text: string;
  pic?: string;
  choices?: InstructionMessageChoice[];
}
export interface InstructionMessageChoice {
  key: string;
  text: string;
}

export interface InstructionTeleport {
  /** Arrival point; the map's arrival point (spawn) when missing. */
  pos?: Vec3;
  /** Map to go to (id; `dungeon:<id>`: a dungeon's first floor); the current map when missing. */
  map?: string;
  /** Built again even if it is the current map (a generated floor's next room may be the same « Salle »). */
  rebuild?: boolean;
}

/** A story variable changes: a flag set to true / false, a counter set to or increased by a number. */
export interface InstructionVariable {
  id: string;
  op: "set" | "add";
  value: boolean | number;
}

export interface InstructionWeather {
  /** WeatherType. */
  type: string;
}

export interface InstructionSound {
  /** SoundId (see sfx.ts). */
  id: string;
}

/** What a branch checks (all must be true), like an event's conditions. */
export interface InstructionBranch {
  variables?: VariableTest[];
  hours?: { from: number; to: number };
  weathers?: string[];
  items?: { id: string; count: number }[];
  money?: number;
  members?: string[];
  weekdays?: number[];
  dates?: {
    from: { month: number; day: number };
    to: { month: number; day: number };
  };
  moments?: DayTime[];
  specials?: string[];
  links?: { id: string; level: number }[];
}
