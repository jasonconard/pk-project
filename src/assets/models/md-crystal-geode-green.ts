import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

/** A broken open geode, crystals inside (green): one upright picture (drawn from a PixelLab reference); it glows at night. */
export const MD_CRYSTAL_GEODE_GREEN: SceneModel = {
  id: 'crystal-geode-green',
  tex: {link: 'assets/tex/crystal-geode-green.png', night: 'assets/tex/crystal-geode-green-night.png', glow: '#9cff8a', size: {x: 21, y: 20}},
  thumb: {min: {x: 0, y: 0}, max: {x: 21, y: 20}},
  hitBox: {
    // (margins on the picture's bounds, as the game reads them: x in from each side, z out on each side)
    min: {x: 1.5, y: 0, z: 4},
    max: {x: 1.5, y: 0, z: 4}
  },
  lights: [{name: 'Cristal', pos: {x: 0, y: 16, z: 1}, color: '#9cff8a', range: 3, strength: 1}],
  planes: [{
    // (taller than the picture, like the player's sprite: the camera looks down at it)
    size: {x: 21, y: 26.6, z: 0},
    pos: {x: 0, y: 13.3, z: 0},
    rot: {x: 0, y: 0, z: 0},
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 20}, max: {x: 21, y: 0}},
      back: {min: {x: 0, y: 20}, max: {x: 21, y: 0}},
    }
  }],
  boxes: []
};
