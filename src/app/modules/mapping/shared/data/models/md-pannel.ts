import { SceneModel } from '../../model/SceneModel';

export const MD_PANNEL: SceneModel = {
  id: 'pannel',
  tex: {link: 'assets/tex/pannel.png', size: {x: 50, y: 50}},
  hitBox: {
    min: {x: 0, y: 0, z: 8},
    max: {x: 0, y: 0, z: 7}
  },
  planes: [],
  boxes: [{ // TEXT
    size: {x: 16, y: 9, z: 2},
    pos: {x: 0, y: 4, z: 0},
    rot: {x: 0, y: 0, z: 0},
    uvs: {
      front: {min: {x: 16, y: 9}, max: {x: 0, y: 0}},
      back: {min: {x: 0, y: 0}, max: {x: 16, y: 9}},
      left: {min: {x: 19, y: 9}, max: {x: 17, y: 0}},
      right: {min: {x: 19, y: 9}, max: {x: 17, y: 0}},
      top: {min: {x: 16, y: 12}, max: {x: 0, y: 10}},
      bottom: {min: {x: 0, y: 10}, max: {x: 16, y: 12}},
    }
  },{ // PILLAR
    size: {x: 3, y: 11, z: 3},
    pos: {x: -4, y: 0.5, z: -2},
    rot: {x: 0, y: 0, z: 0},
    uvs: {
      front: {min: {x: 3, y: 28}, max: {x: 0, y: 17}},
      back: {min: {x: 3, y: 28}, max: {x: 0, y: 17}},
      left: {min: {x: 3, y: 28}, max: {x: 0, y: 17}},
      right: {min: {x: 3, y: 28}, max: {x: 0, y: 17}},
      top: {min: {x: 0, y: 13}, max: {x: 3, y: 16}},
      bottom: {min: {x: 0, y: 13}, max: {x: 3, y: 16}},
    }
  },{ // PILLAR
    size: {x: 3, y: 11, z: 3},
    pos: {x: 4, y: 0.5, z: -2},
    rot: {x: 0, y: 0, z: 0},
    uvs: {
      front: {min: {x: 3, y: 28}, max: {x: 0, y: 17}},
      back: {min: {x: 3, y: 28}, max: {x: 0, y: 17}},
      left: {min: {x: 3, y: 28}, max: {x: 0, y: 17}},
      right: {min: {x: 3, y: 28}, max: {x: 0, y: 17}},
      top: {min: {x: 0, y: 13}, max: {x: 3, y: 16}},
      bottom: {min: {x: 0, y: 13}, max: {x: 3, y: 16}},
    }
  }]
};
