import { SceneModel } from '../../model/SceneModel';
import { ObjSide } from '../../model/SceneMap';

export const MD_LETTER_BOX: SceneModel = {
  id: 'letter-box',
  tex: {link: 'assets/tex/letter-box.png', size: {x: 40, y: 40}},
  hitBox: {
    min: {x: 0, y: 0, z: 8},
    max: {x: 0, y: 0, z: 15}
  },
  planes: [{ // FRONT TOP WALL
    size: {x: 12, y: 3, z: 0},
    pos: {x: 0, y: 10, z: 4},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: false,
    depthTest: false,
    side: ObjSide.FRONT,
    uvs: {
      front: {min: {x: 0, y: 21}, max: {x: 12, y: 18}},
      back: {min: {x: 0, y: 21}, max: {x: 12, y: 18}},
    }
  }],
  boxes: [{ // TEXT
    size: {x: 12, y: 7, z: 8},
    pos: {x: 0, y: 6, z: 0},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 7}, max: {x: 12, y: 0}},
      back: {min: {x: 0, y: 7}, max: {x: 12, y: 0}},
      left: {min: {x: 13, y: 7}, max: {x: 21, y: 0}},
      right: {min: {x: 13, y: 7}, max: {x: 21, y: 0}},
      top: {min: {x: 0, y: 16}, max: {x: 12, y: 8}},
      bottom: {min: {x: 0, y: 16}, max: {x: 12, y: 8}},
    }
  },{ // FRONT TOP WALL
    size: {x: 6.5, y: 1, z: 8},
    pos: {x: 0, y: 11.88, z: 0},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 17, y: 9}, max: {x: 21, y: 8}},
      back: {min: {x: 4, y: 16}, max: {x: 8, y: 8}},
      left: {min: {x: 4, y: 16}, max: {x: 8, y: 8}},
      right: {min: {x: 4, y: 16}, max: {x: 8, y: 8}},
      top: {min: {x: 4, y: 16}, max: {x: 8, y: 8}},
      bottom: {min: {x: 4, y: 16}, max: {x: 8, y: 8}},
    }
  },{ // FRONT TOP WALL
    size: {x: 4, y: 1, z: 8},
    pos: {x: -4.25, y: 10.62, z: -0.01},
    rot: {x: 0, y: 0, z: 0.8},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 13, y: 9}, max: {x: 17, y: 8}},
      back: {min: {x: 0, y: 16}, max: {x: 4, y: 8}},
      left: {min: {x: 0, y: 16}, max: {x: 4, y: 8}},
      right: {min: {x: 0, y: 16}, max: {x: 4, y: 8}},
      top: {min: {x: 0, y: 16}, max: {x: 4, y: 8}},
      bottom: {min: {x: 0, y: 16}, max: {x: 4, y: 8}},
    }
  },{ // FRONT TOP WALL
    size: {x: 4, y: 1, z: 8},
    pos: {x: 4.25, y: 10.62, z: -0.01},
    rot: {x: 0, y: 0, z: -0.8},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 21, y: 9}, max: {x: 25, y: 8}},
      back: {min: {x: 8, y: 16}, max: {x: 12, y: 8}},
      left: {min: {x: 8, y: 16}, max: {x: 12, y: 8}},
      right: {min: {x: 8, y: 16}, max: {x: 12, y: 8}},
      top: {min: {x: 8, y: 16}, max: {x: 12, y: 8}},
      bottom: {min: {x: 8, y: 16}, max: {x: 12, y: 8}},
    }
  },{ // PILLAR
    size: {x: 4, y: 6, z: 4},
    pos: {x: 0, y: 0.5, z: 0},
    rot: {x: 0, y: 0, z: 0},
    uvs: {
      front: {min: {x: 0, y: 28}, max: {x: 4, y: 22}},
      back: {min: {x: 0, y: 28}, max: {x: 4, y: 22}},
      left: {min: {x: 0, y: 28}, max: {x: 4, y: 22}},
      right: {min: {x: 0, y: 28}, max: {x: 4, y: 22}},
      top: {min: {x: 0, y: 28}, max: {x: 4, y: 22}},
      bottom: {min: {x: 0, y: 28}, max: {x: 4, y: 22}},
    }
  }]
};
