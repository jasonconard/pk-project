import { VariableTest } from './SceneEvent';
import { Vec3 } from './SceneUtils';

export enum InstructionType {
  LOG, MESSAGE, WAIT, TELEPORT, VARIABLE, WEATHER, SOUND, BRANCH, STOP
}

export interface SceneEventInstruction {
  type: InstructionType,
  log?: InstructionLog,
  message?: InstructionMessage,
  wait?: InstructionWait,
  teleport?: InstructionTeleport,
  variable?: InstructionVariable,
  weather?: InstructionWeather,
  sound?: InstructionSound,
  /** BRANCH: plays its sub-instructions 'then' when these conditions are true, else 'else'. */
  branch?: InstructionBranch,
  subInstructions?: SceneEventSubInstruction[]
}

export interface SceneEventSubInstruction {
  condition: string,
  instructions: SceneEventInstruction[]
}

export interface InstructionWait {
  time: number
}

export interface InstructionLog {
  text: string
}

export interface InstructionMessage {
  name?: string,
  text: string,
  pic?: string,
  choices?: InstructionMessageChoice[]
}
export interface InstructionMessageChoice {
  key: string, text: string
}

export interface InstructionTeleport {
  /** Arrival point; the map's arrival point (spawn) when missing. */
  pos?: Vec3,
  /** Map to go to (id); the current map when missing. */
  map?: string
}

/** A story variable changes: a flag set to true / false, a counter set to or increased by a number. */
export interface InstructionVariable {
  id: string,
  op: 'set' | 'add',
  value: boolean | number
}

export interface InstructionWeather {
  /** WeatherType. */
  type: string
}

export interface InstructionSound {
  /** SoundId (see sfx.ts). */
  id: string
}

/** What a branch checks (all must be true), like an event's conditions. */
export interface InstructionBranch {
  variables?: VariableTest[],
  hours?: { from: number, to: number },
  weathers?: string[]
}
