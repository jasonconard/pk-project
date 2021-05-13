import { SceneModel } from '../model/SceneMap';

export const MD_TREE: SceneModel = {
  id: 'tree',
  tex: {link: 'assets/tex/tree.png', size: {x: 96, y: 120}},
  hitBox: {
    min: {x: 0, y: 0, z: 16},
    max: {x: 0, y: 0, z: 4}
  },
  boxes: [{
    size: {x: 9, y: 10, z: 9},
    pos: {x: 0, y: 5, z: 0},
    rot: {x: 0, y: 0, z: 0},
    uvs: {
      front: {min: {x: 11, y: 100}, max: {x: 19, y: 90}},
      back: {min: {x: 11, y: 100}, max: {x: 19, y: 90}},
      left: {min: {x: 11, y: 100}, max: {x: 19, y: 90}},
      right: {min: {x: 11, y: 100}, max: {x: 19, y: 90}},
      top: {min: {x: 11, y: 100}, max: {x: 19, y: 90}},
      bottom: {min: {x: 0, y: 0}, max: {x: 0, y: 0}},
    }
  }],
  planes: [
    ...[1,-1].reduce((planes, j) => {
      return [...planes, ...[0,1,2,3].map(i => {
        const z = i === 4 ? 0 : -j*(2.2 + i/5);
        const rotX = i === 4 ? 0 : j * ((i+1) * 0.2);
        return {
          size: {x: 30, y: 20, z: 0},
          pos: {x: 0, y: 2 + (6*(5-i)), z},
          rot: {x: rotX, y: 0, z: 0},
          uvs: {
            front: {min: {x: 0, y: (i+1)*20}, max: {x: 30, y: i*20}},
            back: {min: {x: 0, y: (i+1)*20}, max: {x: 30, y: i*20}},
          }
        }})];
    }, [])
  ]
};


