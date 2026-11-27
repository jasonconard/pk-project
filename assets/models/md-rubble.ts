import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

/** A low pile of small stones: one upright picture (drawn from a PixelLab reference). */
export const MD_RUBBLE: SceneModel = {
  id: 'rubble',
  tex: {link: 'assets/tex/rubble.png', size: {x: 16, y: 12}},
  thumb: {min: {x: 0, y: 0}, max: {x: 16, y: 12}},
  hitBox: {
    // (margins on the picture's bounds, as the game reads them: x in from each side, z out on each side)
    min: {x: 1, y: 0, z: 3},
    max: {x: 1, y: 0, z: 3}
  },
  planes: [{
    // (taller than the picture, like the player's sprite: the camera looks down at it)
    size: {x: 16, y: 15.96, z: 0},
    pos: {x: 0, y: 7.98, z: 0},
    rot: {x: 0, y: 0, z: 0},
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 12}, max: {x: 16, y: 0}},
      back: {min: {x: 0, y: 12}, max: {x: 16, y: 0}},
    }
  }],
  boxes: []
};
