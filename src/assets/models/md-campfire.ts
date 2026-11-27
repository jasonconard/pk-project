import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

/** A campfire: one upright picture (drawn from a PixelLab reference); its flames glow at night. */
export const MD_CAMPFIRE: SceneModel = {
  id: 'campfire',
  tex: {link: 'assets/tex/campfire.png', night: 'assets/tex/campfire-night.png', size: {x: 24, y: 20}},
  thumb: {min: {x: 0, y: 0}, max: {x: 24, y: 20}},
  hitBox: {
    min: {x: -10, y: 0, z: -5},
    max: {x: 10, y: 10, z: 5}
  },
  lights: [{name: 'Flammes', pos: {x: 0, y: 10, z: 1}, color: '#ff9a3c', range: 3, strength: 1.5, flicker: true}],
  planes: [{
    // (taller than the picture, like the player's sprite: the camera looks down at it)
    size: {x: 24, y: 26.6, z: 0},
    pos: {x: 0, y: 13.3, z: 0},
    rot: {x: 0, y: 0, z: 0},
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 20}, max: {x: 24, y: 0}},
      back: {min: {x: 0, y: 20}, max: {x: 24, y: 0}},
    }
  }],
  boxes: []
};
