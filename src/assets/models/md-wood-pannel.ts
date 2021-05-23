import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';

export const MD_WOOD_PANNEL: SceneModel = {
  id: 'wood-pannel',
  tex: {link: 'assets/tex/wood-pannel.png', size: {x: 40, y: 40}},
  hitBox: {
    min: {x: 0, y: 0, z: 8},
    max: {x: 0, y: 0, z: 15}
  },
  planes: [],
  boxes: [{ // TEXT
    size: {x: 14, y: 8, z: 3},
    pos: {x: 0, y: 5, z: 0},
    rot: {x: 0, y: 0, z: 0},
    uvs: {
      front: {min: {x: 0, y: 8}, max: {x: 14, y: 0}},
      back: {min: {x: 0, y: 0}, max: {x: 14, y: 8}},
      left: {min: {x: 15, y: 8}, max: {x: 18, y: 0}},
      right: {min: {x: 15, y: 8}, max: {x: 18, y: 0}},
      top: {min: {x: 0, y: 11}, max: {x: 14, y: 8}},
      bottom: {min: {x: 0, y: 8}, max: {x: 14, y: 11}},
    }
  },{ // PILLAR
    size: {x: 4, y: 15, z: 4},
    pos: {x: 0, y: 2.5, z: -2},
    rot: {x: 0, y: 0, z: 0},
    uvs: {
      front: {min: {x: 0, y: 27}, max: {x: 4, y: 12}},
      back: {min: {x: 0, y: 27}, max: {x: 4, y: 12}},
      left: {min: {x: 0, y: 27}, max: {x: 4, y: 12}},
      right: {min: {x: 0, y: 27}, max: {x: 4, y: 12}},
      top: {min: {x: 0, y: 32}, max: {x: 4, y: 28}},
      bottom: {min: {x: 0, y: 28}, max: {x: 4, y: 32}},
    }
  }]
};
