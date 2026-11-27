import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

/** An old wooden warning sign: one upright picture (drawn from a PixelLab reference). */
export const MD_MINE_SIGN: SceneModel = {
  id: 'mine-sign',
  tex: {link: 'assets/tex/mine-sign.png', size: {x: 14, y: 17}},
  thumb: {min: {x: 0, y: 0}, max: {x: 14, y: 17}},
  hitBox: {
    // (margins on the picture's bounds, as the game reads them: x in from each side, z out on each side)
    min: {x: 4, y: 0, z: 2},
    max: {x: 4, y: 0, z: 2}
  },
  planes: [{
    // (taller than the picture, like the player's sprite: the camera looks down at it)
    size: {x: 14, y: 22.61, z: 0},
    pos: {x: 0, y: 11.3, z: 0},
    rot: {x: 0, y: 0, z: 0},
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 17}, max: {x: 14, y: 0}},
      back: {min: {x: 0, y: 17}, max: {x: 14, y: 0}},
    }
  }],
  boxes: []
};
