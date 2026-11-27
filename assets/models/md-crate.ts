import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

/** An old wooden crate: a cube, the planks of its picture (drawn from a PixelLab reference) on every face. */
export const MD_CRATE: SceneModel = {
  id: 'crate',
  tex: {link: 'assets/tex/crate.png', size: {x: 12, y: 15}},
  thumb: {min: {x: 0, y: 0}, max: {x: 12, y: 15}},
  hitBox: {
    min: {x: 0, y: 0, z: 0},
    max: {x: 0, y: 0, z: 0}
  },
  planes: [],
  boxes: [{
    size: {x: 12, y: 12, z: 12},
    pos: {x: 0, y: 6, z: 0},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.FRONT,
    uvs: {
      front: {min: {x: 0, y: 15}, max: {x: 12, y: 3}},
      back: {min: {x: 0, y: 15}, max: {x: 12, y: 3}},
      left: {min: {x: 0, y: 15}, max: {x: 12, y: 3}},
      right: {min: {x: 0, y: 15}, max: {x: 12, y: 3}},
      top: {min: {x: 0, y: 15}, max: {x: 12, y: 3}},
      bottom: {min: {x: 0, y: 0}, max: {x: 0, y: 0}},
    }
  }],
};
