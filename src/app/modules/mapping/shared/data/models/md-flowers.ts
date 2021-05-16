import { SceneModel } from '../../model/SceneModel';
import { ObjSide } from '../../model/SceneMap';

export const MD_FLOWERS: SceneModel = {
  id: 'flowers',
  tex: {link: 'assets/tex/flowers.png', size: {x: 40, y: 40}},
  hitBox: {
    min: {x: 0, y: 0, z: 0},
    max: {x: 0, y: 0, z: 0}
  },
  planes: [{
    size: {x: 11, y: 12, z: 0},
    pos: {x: 2, y: 6, z: 4},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: false,
    depthTest: false,
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 12}, max: {x: 11, y: 0}},
      back: {min: {x: 0, y: 0}, max: {x: 3, y: 3}},
    }
  },{
    size: {x: 10, y: 13, z: 0},
    pos: {x: -2, y: 6, z: -4},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: false,
    depthTest: false,
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 27}, max: {x: 10, y: 14}},
      back:{min: {x: 0, y: 0}, max: {x: 3, y: 3}},
    }
  }],
  boxes: []
};
