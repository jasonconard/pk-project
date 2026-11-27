import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

/** A group of stalagmites: one upright picture (drawn from a PixelLab reference). */
export const MD_STALAGMITE_GROUP: SceneModel = {
  id: 'stalagmite-group',
  tex: {link: 'assets/tex/stalagmite-group.png', size: {x: 26, y: 31}},
  thumb: {min: {x: 0, y: 0}, max: {x: 26, y: 31}},
  hitBox: {
    // (margins on the picture's bounds, as the game reads them: x in from each side, z out on each side)
    min: {x: 2, y: 0, z: 4},
    max: {x: 2, y: 0, z: 4}
  },
  planes: [{
    // (taller than the picture, like the player's sprite: the camera looks down at it)
    size: {x: 26, y: 41.23, z: 0},
    pos: {x: 0, y: 20.61, z: 0},
    rot: {x: 0, y: 0, z: 0},
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 31}, max: {x: 26, y: 0}},
      back: {min: {x: 0, y: 31}, max: {x: 26, y: 0}},
    }
  }],
  boxes: []
};
