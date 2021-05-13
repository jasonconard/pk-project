import { Vec2, Vec3, VecBox2, VecBox3 } from './SceneUtils';

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

export interface SceneBuilding {
  id: string,
  modelId: string
  originModel?: SceneModel,
  pos: Vec3,
  passable: boolean,
  canHide: boolean
}

export interface SceneModel {
  id: string,
  tex: SceneModelTex,
  boxes: SceneModelBox[],
  planes: SceneModelPlane[],
  hitBox: VecBox3
}

export interface SceneModelTex {
  link: string,
  size: Vec2
}

export interface SceneModelObj {
  size: Vec3,
  pos: Vec3,
  rot: Vec3,
  depthWrite?: boolean,
  depthTest?: boolean,
  side?: ObjSide
}

export interface SceneModelBox extends SceneModelObj {
  uvs: {
    front: VecBox2, back: VecBox2,
    left: VecBox2, right: VecBox2,
    top: VecBox2, bottom: VecBox2
  }
}


export interface SceneModelPlane extends SceneModelObj {
  uvs: {
    front: VecBox2, back: VecBox2
  }
}
