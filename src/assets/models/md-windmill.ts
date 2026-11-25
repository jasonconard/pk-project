import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

const SAIL_TURN = {
  kind: 'rotate' as const,
  axis: 'z' as const,
  pivot: 'center' as const,
  amount: 360,
  duration: 6,
  trigger: 'loop' as const,
};

const SAIL_UVS = {
  front: {min: {x: 0, y: 80}, max: {x: 72, y: 60}},
  back: {min: {x: 72, y: 80}, max: {x: 0, y: 60}},
};

const ROOF_EDGE = {min: {x: 55, y: 34}, max: {x: 76, y: 32}};
const ROOF_SIDE = {min: {x: 55, y: 34}, max: {x: 81, y: 32}};

export const MD_WINDMILL: SceneModel = {
  id: 'windmill',
  tex: {link: 'assets/tex/windmill.png', size: {x: 256, y: 128}},
  // The turning sails don't count in the bounds (MapHelper.getBounds): the player bumps into the tower. (x: min
  // widens the blocked area on the left, max narrows it on the right: -5 and 5 narrow both sides)
  hitBox: {
    min: {x: -5, y: 0, z: 8},
    max: {x: 5, y: 0, z: 0}
  },
  thumb: {min: {x: 176, y: 0}, max: {x: 256, y: 92}},
  planes: [{ // GABLE FRONT
    size: {x: 28, y: 14, z: 0},
    pos: {x: 0, y: 59, z: 10.05},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.FRONT,
    uvs: {
      front: {min: {x: 86, y: 42}, max: {x: 114, y: 28}},
      back: {min: {x: 86, y: 42}, max: {x: 114, y: 28}},
    }
  }, { // GABLE BACK
    size: {x: 28, y: 14, z: 0},
    pos: {x: 0, y: 59, z: -10.05},
    rot: {x: 0, y: Math.PI, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.FRONT,
    uvs: {
      front: {min: {x: 86, y: 42}, max: {x: 114, y: 28}},
      back: {min: {x: 86, y: 42}, max: {x: 114, y: 28}},
    }
  }, { // SAILS (horizontal pair)
    size: {x: 72, y: 20, z: 0},
    pos: {x: 0, y: 52, z: 16},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.BOTH,
    uvs: SAIL_UVS,
    motion: SAIL_TURN,
  }, { // SAILS (vertical pair)
    size: {x: 72, y: 20, z: 0},
    pos: {x: 0, y: 52, z: 16.3},
    rot: {x: 0, y: 0, z: Math.PI / 2},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.BOTH,
    uvs: SAIL_UVS,
    motion: SAIL_TURN,
  }],
  boxes: [{ // LOWER TOWER
    size: {x: 28, y: 30, z: 24},
    pos: {x: 0, y: 15, z: 0},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.FRONT,
    uvs: {
      front: {min: {x: 0, y: 30}, max: {x: 28, y: 0}},
      back: {min: {x: 56, y: 30}, max: {x: 84, y: 0}},
      left: {min: {x: 30, y: 30}, max: {x: 54, y: 0}},
      right: {min: {x: 30, y: 30}, max: {x: 54, y: 0}},
      top: {min: {x: 0, y: 58}, max: {x: 28, y: 34}},
      bottom: {min: {x: 0, y: 58}, max: {x: 28, y: 34}},
    }
  }, { // GALLERY
    size: {x: 30, y: 2, z: 26},
    pos: {x: 0, y: 30, z: 0},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.FRONT,
    uvs: {
      front: {min: {x: 86, y: 26}, max: {x: 116, y: 24}},
      back: {min: {x: 86, y: 26}, max: {x: 116, y: 24}},
      left: {min: {x: 118, y: 26}, max: {x: 144, y: 24}},
      right: {min: {x: 118, y: 26}, max: {x: 144, y: 24}},
      top: {min: {x: 0, y: 58}, max: {x: 30, y: 32}},
      bottom: {min: {x: 0, y: 58}, max: {x: 30, y: 32}},
    }
  }, { // UPPER TOWER
    size: {x: 24, y: 22, z: 20},
    pos: {x: 0, y: 42, z: 0},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.FRONT,
    uvs: {
      front: {min: {x: 86, y: 22}, max: {x: 110, y: 0}},
      back: {min: {x: 134, y: 22}, max: {x: 158, y: 0}},
      left: {min: {x: 112, y: 22}, max: {x: 132, y: 0}},
      right: {min: {x: 112, y: 22}, max: {x: 132, y: 0}},
      top: {min: {x: 0, y: 58}, max: {x: 24, y: 38}},
      bottom: {min: {x: 0, y: 58}, max: {x: 24, y: 38}},
    }
  }, { // ROOF LEFT
    size: {x: 21, y: 2, z: 26},
    pos: {x: -7.7, y: 59.7, z: 0},
    rot: {x: 0, y: 0, z: Math.PI / 4},
    depthWrite: true,
    depthTest: true,
    shininess: 0.5,
    side: ObjSide.FRONT,
    uvs: {
      front: ROOF_EDGE,
      back: ROOF_EDGE,
      left: ROOF_SIDE,
      right: ROOF_SIDE,
      top: {min: {x: 32, y: 58}, max: {x: 53, y: 32}},
      bottom: {min: {x: 32, y: 58}, max: {x: 53, y: 32}},
    }
  }, { // ROOF RIGHT
    size: {x: 21, y: 2, z: 26},
    pos: {x: 7.7, y: 59.7, z: 0},
    rot: {x: 0, y: 0, z: -Math.PI / 4},
    depthWrite: true,
    depthTest: true,
    shininess: 0.5,
    side: ObjSide.FRONT,
    uvs: {
      front: ROOF_EDGE,
      back: ROOF_EDGE,
      left: ROOF_SIDE,
      right: ROOF_SIDE,
      top: {min: {x: 53, y: 58}, max: {x: 32, y: 32}},
      bottom: {min: {x: 53, y: 58}, max: {x: 32, y: 32}},
    }
  }, { // RIDGE
    size: {x: 3, y: 3, z: 27},
    pos: {x: 0, y: 67, z: 0},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    shininess: 0.5,
    side: ObjSide.FRONT,
    uvs: {
      front: {min: {x: 84, y: 39}, max: {x: 87, y: 36}},
      back: {min: {x: 84, y: 39}, max: {x: 87, y: 36}},
      left: {min: {x: 55, y: 39}, max: {x: 82, y: 36}},
      right: {min: {x: 55, y: 39}, max: {x: 82, y: 36}},
      top: {min: {x: 55, y: 39}, max: {x: 58, y: 36}},
      bottom: {min: {x: 55, y: 39}, max: {x: 58, y: 36}},
    }
  }, { // AXLE
    size: {x: 3, y: 3, z: 6},
    pos: {x: 0, y: 52, z: 13},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.FRONT,
    uvs: {
      front: {min: {x: 130, y: 31}, max: {x: 133, y: 28}},
      back: {min: {x: 130, y: 31}, max: {x: 133, y: 28}},
      left: {min: {x: 125, y: 31}, max: {x: 128, y: 28}},
      right: {min: {x: 125, y: 31}, max: {x: 128, y: 28}},
      top: {min: {x: 125, y: 31}, max: {x: 128, y: 28}},
      bottom: {min: {x: 125, y: 31}, max: {x: 128, y: 28}},
    }
  }, { // HUB
    size: {x: 7, y: 7, z: 3},
    pos: {x: 0, y: 52, z: 17.8},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.FRONT,
    uvs: {
      front: {min: {x: 116, y: 35}, max: {x: 123, y: 28}},
      back: {min: {x: 116, y: 35}, max: {x: 123, y: 28}},
      left: {min: {x: 125, y: 35}, max: {x: 128, y: 28}},
      right: {min: {x: 125, y: 35}, max: {x: 128, y: 28}},
      top: {min: {x: 116, y: 35}, max: {x: 123, y: 32}},
      bottom: {min: {x: 116, y: 35}, max: {x: 123, y: 32}},
    },
    motion: SAIL_TURN,
  }]
};
