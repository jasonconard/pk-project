import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

/** A large dark cave rock: a low block, the top of its picture (drawn from a PixelLab reference) on top, its lower part on the sides. */
export const MD_CAVE_ROCK_LARGE: SceneModel = {
  id: 'cave-rock-large',
  tex: {link: 'assets/tex/cave-rock-large.png', size: {x: 25, y: 15}},
  thumb: {min: {x: 0, y: 0}, max: {x: 25, y: 15}},
  hitBox: {
    min: {x: 0, y: 0, z: 0},
    max: {x: 0, y: 0, z: 0}
  },
  planes: [],
  boxes: [{
    size: {x: 24, y: 10, z: 12},
    pos: {x: 0, y: 5, z: 0},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.FRONT,
    uvs: {
      front: {min: {x: 1, y: 15}, max: {x: 24, y: 5}},
      back: {min: {x: 1, y: 15}, max: {x: 24, y: 5}},
      left: {min: {x: 6, y: 15}, max: {x: 18, y: 5}},
      right: {min: {x: 6, y: 15}, max: {x: 18, y: 5}},
      top: {min: {x: 1, y: 13}, max: {x: 24, y: 1}},
      bottom: {min: {x: 0, y: 0}, max: {x: 0, y: 0}},
    }
  }],
};
