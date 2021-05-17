import { SceneModel } from '../../model/SceneModel';
import { ObjSide } from '../../model/SceneMap';

export const MD_LABO: SceneModel = {
  id: 'labo',
  tex: {link: 'assets/tex/labo.png', size: {x: 300, y: 200}},
  hitBox: {
    min: {x: 0, y: 0, z: 8},
    max: {x: 0, y: 0, z: 0}
  },
  planes: [],
  boxes: [{ // WALLS
    size: {x: 110, y: 31, z: 42},
    pos: {x: 0, y: 16, z: 0},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.BOTH,
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
    pos: {x: 0, y: 33.5, z: 0},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 112, y: 86}, max: {x: 0, y: 82}},
      back: {min: {x: 112, y: 86}, max: {x: 0, y: 82}},
      left: {min: {x: 115, y: 82}, max: {x: 159, y: 86}},
      right: {min: {x: 115, y: 82}, max: {x: 159, y: 86}},
      top: {min: {x: 0, y: 133}, max: {x: 112, y: 89}},
      bottom: {min: {x: 0, y: 133}, max: {x: 112, y: 89}},
    }
  }, { // CHIMNEY BASE
    size: {x: 22, y: 2, z: 22},
    pos: {x: 35, y: 37, z: -4},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 157}, max: {x: 22, y: 159}},
      back: {min: {x: 0, y: 157}, max: {x: 22, y: 159}},
      left: {min: {x: 0, y: 157}, max: {x: 22, y: 159}},
      right: {min: {x: 0, y: 157}, max: {x: 22, y: 159}},
      top: {min: {x: 0, y: 156}, max: {x: 22, y: 134}},
      bottom: {min: {x: 0, y: 134}, max: {x: 22, y: 156}},
    }
  }, { // CHIMNEY BACK
    size: {x: 16, y: 7, z: 3},
    pos: {x: 35, y: 41.5, z: -10},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 21, y: 164}, max: {x: 37, y: 171}},
      back: {min: {x: 0, y: 164}, max: {x: 16, y: 171}},
      left: {min: {x: 17, y: 164}, max: {x: 20, y: 171}},
      right: {min: {x: 17, y: 164}, max: {x: 20, y: 171}},
      top: {min: {x: 0, y: 160}, max: {x: 16, y: 163}},
      bottom: {min: {x: 0, y: 160}, max: {x: 16, y: 163}},
    }
  }, { // CHIMNEY FRONT
    size: {x: 16, y: 7, z: 3},
    pos: {x: 35, y: 41.5, z: 2.5},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 164}, max: {x: 16, y: 171}},
      back: {min: {x: 0, y: 164}, max: {x: 16, y: 171}},
      left: {min: {x: 17, y: 164}, max: {x: 20, y: 171}},
      right: {min: {x: 17, y: 164}, max: {x: 20, y: 171}},
      top: {min: {x: 0, y: 163}, max: {x: 16, y: 160}},
      bottom: {min: {x: 0, y: 160}, max: {x: 16, y: 163}},
    }
  }, { // CHIMNEY LEFT
    size: {x: 10, y: 7, z: 3},
    pos: {x: 28.5, y: 41.5, z: -3.5},
    rot: {x: 0, y: Math.PI/2, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 176}, max: {x: 10, y: 183}},
      back: {min: {x: 0, y: 176}, max: {x: 10, y: 183}},
      left: {min: {x: 11, y: 176}, max: {x: 14, y: 183}},
      right: {min: {x: 11, y: 176}, max: {x: 14, y: 183}},
      top: {min: {x: 0, y: 172}, max: {x: 10, y: 175}},
      bottom: {min: {x: 0, y: 172}, max: {x: 10, y: 175}},
    }
  }, { // CHIMNEY RIGHT
    size: {x: 10, y: 7, z: 3},
    pos: {x: 41.5, y: 41.5, z: -3.5},
    rot: {x: 0, y: Math.PI/2, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 176}, max: {x: 10, y: 183}},
      back: {min: {x: 0, y: 176}, max: {x: 10, y: 183}},
      left: {min: {x: 11, y: 176}, max: {x: 14, y: 183}},
      right: {min: {x: 11, y: 176}, max: {x: 14, y: 183}},
      top: {min: {x: 0, y: 175}, max: {x: 10, y: 172}},
      bottom: {min: {x: 0, y: 172}, max: {x: 10, y: 175}},
    }
  }]
};
