import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

/** An old pickaxe leaning on a stone: one upright picture (drawn from a PixelLab reference). */
export const MD_PICKAXE: SceneModel = {
  id: 'pickaxe',
  tex: {link: 'assets/tex/pickaxe.png', size: {x: 14, y: 15}},
  thumb: {min: {x: 0, y: 0}, max: {x: 14, y: 15}},
  hitBox: {
    // (margins on the picture's bounds, as the game reads them: x in from each side, z out on each side)
    min: {x: 2, y: 0, z: 3},
    max: {x: 2, y: 0, z: 3}
  },
  planes: [{
    // (taller than the picture, like the player's sprite: the camera looks down at it)
    size: {x: 14, y: 19.95, z: 0},
    pos: {x: 0, y: 9.97, z: 0},
    rot: {x: 0, y: 0, z: 0},
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 15}, max: {x: 14, y: 0}},
      back: {min: {x: 0, y: 15}, max: {x: 14, y: 0}},
    }
  }],
  boxes: []
};
