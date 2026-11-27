import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

/** An old oil lantern left on the ground: one upright picture (drawn from a PixelLab reference). */
export const MD_MINE_LANTERN: SceneModel = {
  id: 'mine-lantern',
  tex: {link: 'assets/tex/mine-lantern.png', night: 'assets/tex/mine-lantern-night.png', glow: '#ffb45e', size: {x: 8, y: 12}},
  thumb: {min: {x: 0, y: 0}, max: {x: 8, y: 12}},
  hitBox: {
    // (margins on the picture's bounds, as the game reads them: x in from each side, z out on each side)
    min: {x: 1, y: 0, z: 2},
    max: {x: 1, y: 0, z: 2}
  },
  lights: [{name: 'Flamme', pos: {x: 0, y: 7, z: 1}, color: '#ffb45e', range: 3, strength: 1, flicker: true}],
  planes: [{
    // (taller than the picture, like the player's sprite: the camera looks down at it)
    size: {x: 8, y: 15.96, z: 0},
    pos: {x: 0, y: 7.98, z: 0},
    rot: {x: 0, y: 0, z: 0},
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 12}, max: {x: 8, y: 0}},
      back: {min: {x: 0, y: 12}, max: {x: 8, y: 0}},
    }
  }],
  boxes: []
};
