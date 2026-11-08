import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

/** Rock (in the water or on the ground): a low block, the "sea rocks" tile on top, its lower part on the sides. */
export const MD_ROCK: SceneModel = {
  id: 'rock',
  tex: {link: 'assets/tex/rock.png', size: {x: 16, y: 16}},
  hitBox: {
    min: {x: 0, y: 0, z: 4},
    max: {x: 0, y: 0, z: 6}
  },
  planes: [],
  boxes: [{
    size: {x: 14, y: 6, z: 12},
    pos: {x: 0, y: 3, z: 0},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.FRONT,
    uvs: {
      front: {min: {x: 1, y: 16}, max: {x: 15, y: 10}},
      back: {min: {x: 1, y: 16}, max: {x: 15, y: 10}},
      left: {min: {x: 2, y: 16}, max: {x: 14, y: 10}},
      right: {min: {x: 2, y: 16}, max: {x: 14, y: 10}},
      top: {min: {x: 1, y: 14}, max: {x: 15, y: 2}},
      bottom: {min: {x: 0, y: 0}, max: {x: 0, y: 0}},
    }
  }],
};
