import { Vec3 } from './SceneUtils';

export enum InstructionType {
  LOG, MESSAGE, WAIT, TELEPORT
}

export interface SceneEventInstruction {
  type: InstructionType,
  log?: InstructionLog,
  message?: InstructionMessage,
  wait?: InstructionWait,
  teleport?: InstructionTeleport,
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
  pos: Vec3
}
