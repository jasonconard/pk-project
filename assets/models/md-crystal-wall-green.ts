import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

/** A vein of crystals on a slab, to put against a cave wall (green): one upright picture (drawn from a PixelLab reference); it glows at night. */
export const MD_CRYSTAL_WALL_GREEN: SceneModel = {
  id: 'crystal-wall-green',
  tex: {link: 'assets/tex/crystal-wall-green.png', night: 'assets/tex/crystal-wall-green-night.png', glow: '#9cff8a', size: {x: 16, y: 22}},
  thumb: {min: {x: 0, y: 0}, max: {x: 16, y: 22}},
  hitBox: {
    // (margins on the picture's bounds, as the game reads them: x in from each side, z out on each side)
    min: {x: 1, y: 0, z: 2},
    max: {x: 1, y: 0, z: 2}
  },
  lights: [{name: 'Cristal', pos: {x: -2, y: 14, z: 1}, color: '#9cff8a', range: 2, strength: 1}],
  planes: [{
    // (taller than the picture, like the player's sprite: the camera looks down at it)
    size: {x: 16, y: 29.26, z: 0},
    pos: {x: 0, y: 14.63, z: 0},
    rot: {x: 0, y: 0, z: 0},
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 22}, max: {x: 16, y: 0}},
      back: {min: {x: 0, y: 22}, max: {x: 16, y: 0}},
    }
  }],
  boxes: []
};
