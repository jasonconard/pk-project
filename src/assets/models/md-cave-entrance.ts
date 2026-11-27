import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

/** A rocky cave mouth with a couple of crystals, for the outdoor maps: one upright picture (drawn from a PixelLab reference). */
export const MD_CAVE_ENTRANCE: SceneModel = {
  id: 'cave-entrance',
  tex: {link: 'assets/tex/cave-entrance.png', night: 'assets/tex/cave-entrance-night.png', glow: '#8fc8ff', size: {x: 48, y: 49}},
  thumb: {min: {x: 0, y: 0}, max: {x: 48, y: 49}},
  hitBox: {
    // (margins on the picture's bounds, as the game reads them: x in from each side, z out on each side)
    min: {x: 2, y: 0, z: 6},
    max: {x: 2, y: 0, z: 6}
  },
  planes: [{
    // (taller than the picture, like the player's sprite: the camera looks down at it)
    size: {x: 48, y: 65.17, z: 0},
    pos: {x: 0, y: 32.59, z: 0},
    rot: {x: 0, y: 0, z: 0},
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 49}, max: {x: 48, y: 0}},
      back: {min: {x: 0, y: 49}, max: {x: 48, y: 0}},
    }
  }],
  boxes: []
};
