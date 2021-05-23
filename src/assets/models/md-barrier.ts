import { SceneModel } from '../../app/modules/game/shared/model/SceneModel';
import { ObjSide } from '../../app/modules/game/shared/model/SceneMap';

export const MD_BARRIER: SceneModel = {
  id: 'barrier',
  tex: {link: 'assets/tex/barrier.png', size: {x: 32, y: 22}},
  hitBox: {
    min: {x: 0, y: 0, z: 8},
    max: {x: 0, y: 0, z: 16}
  },
  planes: [],
  boxes: [{
    size: {x: 6, y: 8, z: 4},
    pos: {x: 0, y: 4, z: 0},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 20}, max: {x: 6, y: 12}},
      back: {min: {x: 0, y: 12}, max: {x: 6, y: 20}},
      left: {min: {x: 0, y: 12}, max: {x: 6, y: 20}},
      right: {min: {x: 0, y: 12}, max: {x: 6, y: 20}},
      top: {min: {x: 0, y: 7}, max: {x: 6, y: 11}},
      bottom: {min: {x: 0, y: 7}, max: {x: 6, y: 11}},
    }
  },{
    size: {x: 8, y: 3, z: 2},
    pos: {x: 0, y: 4, z: 0},
    rot: {x: 0, y: 0, z: 0},
    depthWrite: true,
    depthTest: true,
    side: ObjSide.BOTH,
    uvs: {
      front: {min: {x: 0, y: 3}, max: {x: 8, y: 6}},
      back: {min: {x: 0, y: 3}, max: {x: 8, y: 6}},
      left: {min: {x: 0, y: 3}, max: {x: 3, y: 6}},
      right: {min: {x: 0, y: 3}, max: {x: 3, y: 6}},
      top: {min: {x: 0, y: 0}, max: {x: 8, y: 2}},
      bottom: {min: {x: 0, y: 0}, max: {x: 3, y: 2}},
    }
  }]
};

//size: new THREE.Vector3(8,3,2),
//     pos: new THREE.Vector3(0,0,0),
//     facesUv: {
//       front: [new THREE.Vector2(0, 3), new THREE.Vector2(8, 6)],
//       left: [new THREE.Vector2(0, 3), new THREE.Vector2(3, 6)],
//       back: [new THREE.Vector2(0, 3), new THREE.Vector2(8, 6)],
//       right: [new THREE.Vector2(0, 3), new THREE.Vector2(3, 6)],
//       top: [new THREE.Vector2(0, 0), new THREE.Vector2(8, 2)],
//       bottom: [new THREE.Vector2(0, 0), new THREE.Vector2(3, 2)],
//     }
//   }]
