import { SceneModel } from '../../model/SceneModel';
import { ObjSide } from '../../model/SceneMap';

export const MD_HOUSE: SceneModel = {
  id: 'house',
  tex: {link: 'assets/tex/house.png', size: {x: 300, y: 200}},
  hitBox: {
    min: {x: -2, y: 0, z: 8},
    max: {x: 4, y: 0, z: 8}
  },
  planes: [{ // FRONT TOP WALL
    size: {x: 76, y: 6, z: 0},
    pos: {x: 0, y: 33, z: 15},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: false,
    depthTest: true,
    side: ObjSide.FRONT,
    uvs: {
      front: {min: {x: 0, y: 43}, max: {x: 76, y: 37}},
      back: {min: {x: 0, y: 43}, max: {x: 76, y: 37}},
    }
  }],
  boxes: [{ // WALLS
    size: {x: 76, y: 31, z: 30},
    pos: {x: 0, y: 16, z: 0},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 31}, max: {x: 76, y: 0}},
      back: {min: {x: 0, y: 31}, max: {x: 0, y: 0}},
      left: {min: {x: 78, y: 31}, max: {x: 108, y: 0}},
      right: {min: {x: 78, y: 31}, max: {x: 108, y: 0}},
      top: {min: {x: 0, y: 47}, max: {x: 58, y: 79}},
      bottom: {min: {x: 0, y: 47}, max: {x: 58, y: 79}},
    }
  },{ // CEIL TOP
    size: {x: 58, y: 3, z: 32},
    pos: {x: 0, y: 39.1, z: 2},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 83}, max: {x: 58, y: 80}},
      back: {min: {x: 0, y: 83}, max: {x: 58, y: 80}},
      left: {min: {x: 0, y: 83}, max: {x: 58, y: 80}},
      right: {min: {x: 0, y: 83}, max: {x: 58, y: 80}},
      top: {min: {x: 0, y: 47}, max: {x: 58, y: 79}},
      bottom: {min: {x: 0, y: 47}, max: {x: 58, y: 79}},
    }
  },{ // CEIL TOP LEFT
    size: {x: 18, y: 3, z: 32},
    pos: {x: -35, y: 33, z: 1.99},
    rot: {x: 0, y: 0, z: Math.PI / 4},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 60, y: 83}, max: {x: 78, y: 80}},
      back: {min: {x: 60, y: 83}, max: {x: 78, y: 80}},
      left: {min: {x: 46, y: 84}, max: {x: 78, y: 87}},
      right: {min: {x: 46, y: 87}, max: {x: 78, y: 84}},
      top: {min: {x: 60, y: 47}, max: {x: 78, y: 79}},
      bottom: {min: {x: 60, y: 47}, max: {x: 78, y: 79}},
    }
  },{ // CEIL TOP RIGHT
    size: {x: 18, y: 3, z: 32},
    pos: {x: 35, y: 33, z: 1.99},
    rot: {x: 0, y: 0, z: -Math.PI / 4},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 80, y: 83}, max: {x: 98, y: 80}},
      back: {min: {x: 80, y: 83}, max: {x: 98, y: 80}},
      left: {min: {x: 80, y: 84}, max: {x: 112, y: 87}},
      right: {min: {x: 80, y: 87}, max: {x: 112, y: 84}},
      top: {min: {x: 80, y: 47}, max: {x: 98, y: 79}},
      bottom: {min: {x: 80, y: 47}, max: {x: 98, y: 79}},
    }
  }]
};
