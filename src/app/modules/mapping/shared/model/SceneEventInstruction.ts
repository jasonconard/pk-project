export enum InstructionType {
  LOG, MESSAGE
}

export interface SceneEventInstruction {
  type: InstructionType,
  log?: InstructionLog,
  message?: InstructionMessage
}

export interface InstructionLog {
  text: string,
}


export interface InstructionMessage {
  name?: string,
  text: string,
  pic?: string
}
