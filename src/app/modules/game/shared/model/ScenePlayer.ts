import { Vec2, Vec3 } from "./SceneUtils";
import * as THREE from "three";
import { MapHelper } from "./MapHelper";

export enum PlayerDirection {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

export enum PlayerMoveStatus {
  STAYING,
  WALKING,
  RUNNING,
  JUMPING,
}

export interface ScenePlayer {
  id: string;
  tex: PlayerTex;
  pos: Vec3;
  dir: PlayerDirection;
  mesh?: THREE.Object3D;
}

export interface PlayerTex {
  link: string;
  /** One picture's size (pixels = map units). */
  size: Vec2;
  /** A walking sheet of the database (see WALK_CELL), else the first sprite's layout. */
  walk?: boolean;
}

export interface PlayerMove {
  mapHelper: MapHelper;
  player: ScenePlayer;
  currentFrame: number;
  framePerSecond: number;
  status: PlayerMoveStatus;
}

export function isPlayerMoving(pm: PlayerMove) {
  return [PlayerMoveStatus.RUNNING, PlayerMoveStatus.WALKING].includes(
    pm.status
  );
}
