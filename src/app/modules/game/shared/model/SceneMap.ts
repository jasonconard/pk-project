import { Square3, Vec2, Vec3 } from './SceneUtils';
import { SceneBuilding } from './SceneBuilding';
import * as THREE from 'three';

export enum ObjSide {
  FRONT, BACK, BOTH
}

export interface SceneMap {
  chunks: SceneChunk[]
}

export interface SceneChunk {
  id: string,
  pos: Vec3,
  size: Vec2,
  visible?: boolean,
  group?: THREE.Group,
  buildings: SceneBuilding[],
  grounds: ChunkGround[],
  /** Ground tiles painted in the editor over the first ground: 'column,row' (TILE_SIZE cells from the chunk corner) → tile id. */
  tiles?: Record<string, string>
}


export interface ChunkGround {
  id: string,
  link: string,
  points: Square3,
  passable: boolean,
  canHide: boolean,
  mesh?: THREE.Mesh
}

