import { Vec2, Vec3 } from './SceneUtils';
import { KeyCode } from '../../../../core/shared/model/PressedKey';
import { SceneHelper } from './SceneHelper';

export enum PlayerDirection {
  UP, RIGHT, DOWN, LEFT
}

export enum PlayerMoveStatus {
  STAYING, WALKING, RUNNING, JUMPING
}

export interface ScenePlayer {
  id: string,
  tex: PlayerTex,
  pos: Vec3,
  dir: PlayerDirection
}

export interface PlayerTex {
  link: string
  size: Vec2
}

export interface PlayerMove {
  scene: SceneHelper,
  player: ScenePlayer,
  currentFrame: number,
  framePerSecond: number,
  status: PlayerMoveStatus
}

export function getPlayerDirectionFromKeyCode(k: KeyCode) {
  switch (k) {
    case KeyCode.up: return PlayerDirection.UP;
    case KeyCode.down: return PlayerDirection.DOWN;
    case KeyCode.left: return PlayerDirection.LEFT;
    case KeyCode.right: return PlayerDirection.RIGHT;
    default: return null;
  }
}

export function isPlayerMoving(pm: PlayerMove) {
  return [PlayerMoveStatus.RUNNING, PlayerMoveStatus.WALKING].indexOf(pm.status) >= 0;
}
