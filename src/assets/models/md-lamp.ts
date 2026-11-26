import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

/** A street lamp: one upright picture (drawn from a PixelLab reference); its glass glows at night. */
export const MD_LAMP: SceneModel = {
  id: 'lamp',
  tex: {link: 'assets/tex/lamp.png', night: 'assets/tex/lamp-night.png', size: {x: 16, y: 40}},
  thumb: {min: {x: 0, y: 0}, max: {x: 16, y: 40}},
  hitBox: {
    min: {x: -3, y: 0, z: -3},
    max: {x: 3, y: 40, z: 3}
  },
  planes: [{
    // (taller than the picture, like the player's sprite: the camera looks down at it)
    size: {x: 16, y: 53.2, z: 0},
    pos: {x: 0, y: 26.6, z: 0},
    rot: {x: 0, y: 0, z: 0},
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 40}, max: {x: 16, y: 0}},
      back: {min: {x: 0, y: 40}, max: {x: 16, y: 0}},
    }
  }],
  boxes: []
};
