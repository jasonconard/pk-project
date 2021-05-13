import { SceneMap } from '../model/SceneMap';

export const SCENE_MAP: SceneMap = {
  parcels: [{
    id: 'pallet-town',
    pos: { x: 0, y: 0, z: 0 },
    size: { x: 800, y: 800 },
    groundLink: 'assets/tex/ground.png',
    buildings: [{
      id: 'labo',
      modelId: 'labo',
      pos: {x: 71, y: 16, z: 20},
      passable: false,
      canHide: true
    },{
      id: 'house1',
      modelId: 'house',
      pos: {x: -71, y: 16, z: -70},
      passable: false,
      canHide: true
    },{
      id: 'house2',
      modelId: 'house',
      pos: {x: 71, y: 16, z: -70},
      passable: false,
      canHide: true
    },...[0,1,2,3,4,5].map( i => { return {
      id: 'tree-' + i,
      modelId: 'tree',
      pos: {x: -16 - (i*32), y: 0, z: -160},
      passable: false,
      canHide: false
    }}),...[0,1,2,3,4,5,6,7,8].map( i => { return {
      id: 'tree-' + (6+i),
      modelId: 'tree',
      pos: {x: -16 - (5*32), y: 0, z: -160 + 32 + (i*32)},
      passable: false,
      canHide: false
    }}),...[0,1,2,3,4,5,6,7,8].map( i => { return {
      id: 'tree-' + (16+i),
      modelId: 'tree',
      pos: {x: +16 + (5*32), y: 0, z: -160 + 32 + (i*32)},
      passable: false,
      canHide: false
    }}),...[0,1,2,3,4].map( i => { return {
      id: 'tree-' + (25+i),
      modelId: 'tree',
      pos: {x: 48 + (i*32), y: 0, z: -160},
      passable: false,
      canHide: false
    }}),{
      id: 'pannel',
      modelId: 'pannel',
      pos: {x: -40, y: 2, z: 5},
      passable: false,
      canHide: false
    },{
      id: 'pannel2',
      modelId: 'pannel',
      pos: {x: 72, y: 2, z: 85},
      passable: false,
      canHide: false
    }, ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
      return {
        id: 'barrier-' + i,
        modelId: 'barrier',
        pos: {x: -108 + (i * 8), y: 4, z: 3},
        passable: false,
        canHide: false
      };
    }), ...[8, 9, 10, 11, 12, 13].map(i => {
      return {
        id: 'barrier-' + i,
        modelId: 'barrier',
        pos: {x: 20 + ((i - 8) * 8), y: 4, z: 83},
        passable: false,
        canHide: false
      };
    }), ...[14, 15, 16, 17].map(i => {
      return {
        id: 'barrier-' + i,
        modelId: 'barrier',
        pos: {x: 36 + ((i - 8) * 8), y: 4, z: 83},
        passable: false,
        canHide: false
      };
    }), ...[1,2,3,4,5,6,7,8].map(i => {
      const z = i%2 ? 20 : 36;
      const x = -105 + (Math.floor((i-1)/2) * 18);
      return {
        id: 'flowers-' + i,
        modelId: 'flowers',
        pos: {x, y: 6, z },
        passable: true,
        canHide: false
      }
    })]
  }]
};
console.log(SCENE_MAP);
