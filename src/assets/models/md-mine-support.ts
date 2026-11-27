import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

/** A mine support frame, two posts and a lintel (the player does not walk through): one upright picture (drawn from a PixelLab reference). */
export const MD_MINE_SUPPORT: SceneModel = {
  id: 'mine-support',
  tex: {link: 'assets/tex/mine-support.png', size: {x: 30, y: 30}},
  thumb: {min: {x: 0, y: 0}, max: {x: 30, y: 30}},
  hitBox: {
    // (margins on the picture's bounds, as the game reads them: x in from each side, z out on each side)
    min: {x: 0, y: 0, z: 3},
    max: {x: 0, y: 0, z: 3}
  },
  planes: [{
    // (taller than the picture, like the player's sprite: the camera looks down at it)
    size: {x: 30, y: 39.9, z: 0},
    pos: {x: 0, y: 19.95, z: 0},
    rot: {x: 0, y: 0, z: 0},
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 30}, max: {x: 30, y: 0}},
      back: {min: {x: 0, y: 30}, max: {x: 30, y: 0}},
    }
  }],
  boxes: []
};
