import { SceneParcel } from '../../model/SceneMap';
import { PlayerDirection } from '../../model/ScenePlayer';
import { KeyCode } from '../../../../../core/shared/model/PressedKey';
import { InstructionType } from '../../model/SceneEventInstruction';

export const PC_PALLET_TOWN: SceneParcel = {
  id: 'pallet-town',
  pos: { x: 0, y: 0, z: 0 },
  size: { x: 800, y: 800 },
  groundLink: 'assets/tex/ground.png',
  buildings: [{
    id: 'letter-box-1',
    modelId: 'letter-box',
    pos: {x: -120, y: 0, z: -62},
    passable: false,
    canHide: false,
    events: []
  },{
    id: 'letter-box-2',
    modelId: 'letter-box',
    pos: {x: 24, y: 0, z: -62},
    passable: false,
    canHide: false,
    events: []
  },{
    id: 'labo',
    modelId: 'labo',
    pos: {x: 72, y: 0, z: 20},
    passable: false,
    canHide: true,
    events: []
  },{
    id: 'house1',
    modelId: 'house',
    pos: {x: -72, y: 0, z: -70},
    passable: false,
    canHide: true,
    events: []
  },{
    id: 'house2',
    modelId: 'house',
    pos: {x: 72, y: 0, z: -70},
    passable: false,
    canHide: true,
    events: []
  },...[0,1,2,3,4,5].map( i => { return {
    id: 'tree-' + i,
    modelId: 'tree',
    pos: {x: -16 - (i*32), y: 0, z: -160},
    passable: false,
    canHide: false,
    events: []
  }}),...[0,1,2,3,4,5,6,7,8].map( i => { return {
    id: 'tree-' + (6+i),
    modelId: 'tree',
    pos: {x: -16 - (5*32), y: 0, z: -160 + 32 + (i*32)},
    passable: false,
    canHide: false,
    events: []
  }}),...[0,1,2,3,4,5,6,7,8].map( i => { return {
    id: 'tree-' + (16+i),
    modelId: 'tree',
    pos: {x: +16 + (5*32), y: 0, z: -160 + 32 + (i*32)},
    passable: false,
    canHide: false,
    events: []
  }}),...[0,1,2,3,4].map( i => { return {
    id: 'tree-' + (25+i),
    modelId: 'tree',
    pos: {x: 48 + (i*32), y: 0, z: -160},
    passable: false,
    canHide: false,
    events: []
  }}),{
    id: 'wood-pannel',
    modelId: 'wood-pannel',
    pos: {x: -105, y: 0, z: 52},
    passable: false,
    canHide: false,
    events: []
  },{
    id: 'pannel',
    modelId: 'pannel',
    pos: {x: -40, y: 0, z: 5},
    passable: false,
    canHide: false,
    events: [{
      conditions: {
        direction: PlayerDirection.UP,
        pressedKey: KeyCode.confirm,
        bounds: { min: { x:0, y:0, z:0 }, max: {x:0, y:0, z: 16} }
      },
      sequence: [
        {
          type: InstructionType.LOG,
          log: { text: 'Coucou' }
        }
      ]
    }]
  },{
    id: 'pannel2',
    modelId: 'pannel',
    pos: {x: 72, y: 0, z: 85},
    passable: false,
    canHide: false,
    events: [{
      conditions: {
        direction: PlayerDirection.UP,
        pressedKey: KeyCode.confirm,
        bounds: { min: { x:0, y:0, z:0 }, max: {x:0, y:0, z: 16} }
      },
      sequence: [
        {
          type: InstructionType.MESSAGE,
          message: { name: 'Jason', text: 'Coucou' }
        }
      ]
    }]
  }, ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
    return {
      id: 'barrier-' + i,
      modelId: 'barrier',
      pos: {x: -108 + (i * 8), y: 0, z: 3},
      passable: false,
      canHide: false,
      events: []
    };
  }), ...[8, 9, 10, 11, 12, 13].map(i => {
    return {
      id: 'barrier-' + i,
      modelId: 'barrier',
      pos: {x: 20 + ((i - 8) * 8), y: 0, z: 83},
      passable: false,
      canHide: false,
      events: []
    };
  }), ...[14, 15, 16, 17].map(i => {
    return {
      id: 'barrier-' + i,
      modelId: 'barrier',
      pos: {x: 36 + ((i - 8) * 8), y: 0, z: 83},
      passable: false,
      canHide: false,
      events: []
    };
  }), ...[1,2,3,4,5,6,7,8].map(i => {
    const z = i%2 ? 20 : 36;
    const x = -105 + (Math.floor((i-1)/2) * 18);
    return {
      id: 'flowers-' + i,
      modelId: 'flowers',
      pos: {x, y: 0, z },
      passable: true,
      canHide: false,
      events: []
    }
  })]
}