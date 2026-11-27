import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

/** A tall crystal needle (blue): one upright picture (drawn from a PixelLab reference); it glows at night. */
export const MD_CRYSTAL_SPIRE_BLUE: SceneModel = {
  id: 'crystal-spire-blue',
  tex: {link: 'assets/tex/crystal-spire-blue.png', night: 'assets/tex/crystal-spire-blue-night.png', glow: '#8fc8ff', size: {x: 17, y: 40}},
  thumb: {min: {x: 0, y: 0}, max: {x: 17, y: 40}},
  hitBox: {
    // (margins on the picture's bounds, as the game reads them: x in from each side, z out on each side)
    min: {x: 3.5, y: 0, z: 3},
    max: {x: 3.5, y: 0, z: 3}
  },
  lights: [{name: 'Cristal', pos: {x: 0, y: 27, z: 1}, color: '#8fc8ff', range: 3, strength: 1}],
  planes: [{
    // (taller than the picture, like the player's sprite: the camera looks down at it)
    size: {x: 17, y: 53.2, z: 0},
    pos: {x: 0, y: 26.6, z: 0},
    rot: {x: 0, y: 0, z: 0},
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 40}, max: {x: 17, y: 0}},
      back: {min: {x: 0, y: 40}, max: {x: 17, y: 0}},
    }
  }],
  boxes: []
};
