import { SceneModel } from '../model/SceneMap';

export const MD_LABO: SceneModel = {
  id: 'labo',
  tex: {link: 'assets/tex/labo.png', size: {x: 300, y: 200}},
  hitBox: {
    min: {x: 0, y: 0, z: 8},
    max: {x: 0, y: 0, z: 8}
  },
  planes: [],
  boxes: [{ // WALLS
    size: {x: 110, y: 31, z: 42},
    pos: {x: 0, y: 0, z: 0},
    rot: {x: 0, y: 0, z: 0},
    uvs: {
      front: {min: {x: 110, y: 31}, max: {x: 0, y: 0}},
      back: {min: {x: 0, y: 0}, max: {x: 110, y: 31}},
      left: {min: {x: 112, y: 0}, max: {x: 154, y: 31}},
      right: {min: {x: 112, y: 0}, max: {x: 154, y: 31}},
      top: {min: {x: 0, y: 34}, max: {x: 110, y: 76}},
      bottom: {min: {x: 0, y: 34}, max: {x: 110, y: 76}},
    }
  }, { // CEIL
    size: {x: 112, y: 4, z: 44},
    pos: {x: 0, y: 18, z: 0},
    rot: {x: 0, y: 0, z: 0},
    uvs: {
      front: {min: {x: 112, y: 86}, max: {x: 0, y: 82}},
      back: {min: {x: 112, y: 86}, max: {x: 0, y: 82}},
      left: {min: {x: 115, y: 82}, max: {x: 159, y: 86}},
      right: {min: {x: 115, y: 82}, max: {x: 159, y: 86}},
      top: {min: {x: 0, y: 133}, max: {x: 112, y: 89}},
      bottom: {min: {x: 0, y: 90}, max: {x: 112, y: 134}},
    }
  }]
};
