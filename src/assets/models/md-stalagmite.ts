import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

/** A stalagmite: one upright picture (drawn from a PixelLab reference). */
export const MD_STALAGMITE: SceneModel = {
  id: 'stalagmite',
  tex: {link: 'assets/tex/stalagmite.png', size: {x: 13, y: 22}},
  thumb: {min: {x: 0, y: 0}, max: {x: 13, y: 22}},
  hitBox: {
    // (margins on the picture's bounds, as the game reads them: x in from each side, z out on each side)
    min: {x: 1.5, y: 0, z: 3},
    max: {x: 1.5, y: 0, z: 3}
  },
  planes: [{
    // (taller than the picture, like the player's sprite: the camera looks down at it)
    size: {x: 13, y: 29.26, z: 0},
    pos: {x: 0, y: 14.63, z: 0},
    rot: {x: 0, y: 0, z: 0},
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 22}, max: {x: 13, y: 0}},
      back: {min: {x: 0, y: 22}, max: {x: 13, y: 0}},
    }
  }],
  boxes: []
};
