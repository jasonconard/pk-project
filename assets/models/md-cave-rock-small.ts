import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

/** A small dark cave rock: one upright picture (drawn from a PixelLab reference). */
export const MD_CAVE_ROCK_SMALL: SceneModel = {
  id: 'cave-rock-small',
  tex: {link: 'assets/tex/cave-rock-small.png', size: {x: 12, y: 11}},
  thumb: {min: {x: 0, y: 0}, max: {x: 12, y: 11}},
  hitBox: {
    // (margins on the picture's bounds, as the game reads them: x in from each side, z out on each side)
    min: {x: 1, y: 0, z: 3},
    max: {x: 1, y: 0, z: 3}
  },
  planes: [{
    // (taller than the picture, like the player's sprite: the camera looks down at it)
    size: {x: 12, y: 14.63, z: 0},
    pos: {x: 0, y: 7.32, z: 0},
    rot: {x: 0, y: 0, z: 0},
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 11}, max: {x: 12, y: 0}},
      back: {min: {x: 0, y: 11}, max: {x: 12, y: 0}},
    }
  }],
  boxes: []
};
