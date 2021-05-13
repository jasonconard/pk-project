export enum KeyCode {
  confirm, cancel, left, right, down, up
}

export interface PressedKey {
  code: KeyCode,
  pressedTime: number
}
