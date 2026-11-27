import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

/** A cluster of crystals on its rock (violet): one upright picture (drawn from a PixelLab reference); it glows at night. */
export const MD_CRYSTAL_CLUSTER_VIOLET: SceneModel = {
  id: 'crystal-cluster-violet',
  tex: {link: 'assets/tex/crystal-cluster-violet.png', night: 'assets/tex/crystal-cluster-violet-night.png', glow: '#c58af0', size: {x: 19, y: 22}},
  thumb: {min: {x: 0, y: 0}, max: {x: 19, y: 22}},
  hitBox: {
    // (margins on the picture's bounds, as the game reads them: x in from each side, z out on each side)
    min: {x: 1.5, y: 0, z: 4},
    max: {x: 1.5, y: 0, z: 4}
  },
  lights: [{name: 'Cristal', pos: {x: 0, y: 15, z: 1}, color: '#c58af0', range: 2, strength: 1}],
  planes: [{
    // (taller than the picture, like the player's sprite: the camera looks down at it)
    size: {x: 19, y: 29.26, z: 0},
    pos: {x: 0, y: 14.63, z: 0},
    rot: {x: 0, y: 0, z: 0},
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 22}, max: {x: 19, y: 0}},
      back: {min: {x: 0, y: 22}, max: {x: 19, y: 0}},
    }
  }],
  boxes: []
};
