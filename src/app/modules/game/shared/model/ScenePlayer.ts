import { Vec2, Vec3 } from './SceneUtils';
import { Game } from './Game';
import * as THREE from 'three';
import { MapHelper } from "./MapHelper";

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
  dir: PlayerDirection,
  mesh?: THREE.Mesh
}

export interface PlayerTex {
  link: string
  size: Vec2
}

export interface PlayerMove {
  mapHelper: MapHelper,
  player: ScenePlayer,
  currentFrame: number,
  framePerSecond: number,
  status: PlayerMoveStatus
}

export function isPlayerMoving(pm: PlayerMove) {
  return [PlayerMoveStatus.RUNNING, PlayerMoveStatus.WALKING].indexOf(pm.status) >= 0;
}
