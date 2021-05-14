import { Vec2, Vec3 } from './SceneUtils';
import { SceneBuilding } from './SceneBuilding';

export enum ObjSide {
  FRONT, BACK, BOTH
}

export interface SceneMap {
  parcels: SceneParcel[]
}

export interface SceneParcel {
  id: string,
  pos: Vec3,
  size: Vec2,
  groundLink: string,
  buildings: SceneBuilding[]
}

