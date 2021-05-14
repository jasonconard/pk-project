import { Vec2, Vec3, VecBox2, VecBox3 } from './SceneUtils';
import { ObjSide } from './SceneMap';

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
