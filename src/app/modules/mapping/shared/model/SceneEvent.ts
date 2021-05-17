import { VecBox3 } from './SceneUtils';
import { KeyCode } from '../../../../core/shared/model/PressedKey';
import { PlayerDirection } from './ScenePlayer';
import { SceneEventInstruction } from './SceneEventInstruction';
import * as THREE from 'three';

export interface SceneEvent {
  conditions: SceneEventCondition,
  sequence: SceneEventInstruction[]
}

export interface SceneEventCondition {
  direction?: PlayerDirection, // Only use up down left right =)
  bounds?: VecBox3,
  pressedKey?: KeyCode
}

export interface SceneEventHelper {
  evt: SceneEvent,
  buildingMesh: THREE.Mesh
}
