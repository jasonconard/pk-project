import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

/** A small crystal shard (violet): one upright picture (drawn from a PixelLab reference); it glows at night. */
export const MD_CRYSTAL_SHARD_VIOLET: SceneModel = {
  id: 'crystal-shard-violet',
  tex: {link: 'assets/tex/crystal-shard-violet.png', night: 'assets/tex/crystal-shard-violet-night.png', glow: '#c58af0', size: {x: 8, y: 14}},
  thumb: {min: {x: 0, y: 0}, max: {x: 8, y: 14}},
  hitBox: {
    // (margins on the picture's bounds, as the game reads them: x in from each side, z out on each side)
    min: {x: 1, y: 0, z: 2},
    max: {x: 1, y: 0, z: 2}
  },
  planes: [{
    // (taller than the picture, like the player's sprite: the camera looks down at it)
    size: {x: 8, y: 18.62, z: 0},
    pos: {x: 0, y: 9.31, z: 0},
    rot: {x: 0, y: 0, z: 0},
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 14}, max: {x: 8, y: 0}},
      back: {min: {x: 0, y: 14}, max: {x: 8, y: 0}},
    }
  }],
  boxes: []
};
