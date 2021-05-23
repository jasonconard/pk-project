import { Vec2 } from "../../../modules/game/shared/model/SceneUtils";

export enum KeyCode {
  confirm, cancel, left, right, down, up, x, y, pause, select
}

export interface PressedKey {
  code: KeyCode,
  pressedTime: number
}

export function getKeyFromAxes(axes: Vec2): KeyCode {
  if(!axes) { return null; }

  let xDir: KeyCode = null;
  let zDir: KeyCode = null;
  if(axes.x < -0.2) { xDir = KeyCode.left; }
  if(axes.x > 0.2) { xDir = KeyCode.right; }
  if(axes.y < -0.2) { zDir = KeyCode.up; }
  if(axes.y > 0.2) { zDir = KeyCode.down; }
  if(xDir != null && zDir != null) {
    return Math.abs(axes.x) > Math.abs(axes.y) ? xDir : zDir;
  } else if(xDir != null) {
    return xDir;
  } else if(zDir != null) {
    return zDir;
  }
}
