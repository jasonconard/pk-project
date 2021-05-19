import { SceneParcel } from '../../model/SceneMap';
import { PlayerDirection } from '../../model/ScenePlayer';
import { KeyCode } from '../../../../../core/shared/model/PressedKey';
import { InstructionType } from '../../model/SceneEventInstruction';

export const PC_PALLET_TOWN_N: SceneParcel = {
  id: 'pallet-town-n',
  pos: {x: 0, y: 0, z: -512},
  size: {x: 512, y: 512},
  groundLink: 'assets/tex/ground2.png',
  buildings: []
}
export const PC_PALLET_TOWN_NE: SceneParcel = {
  id: 'pallet-town-ne',
  pos: {x: 512, y: 0, z: -512},
  size: {x: 512, y: 512},
  groundLink: 'assets/tex/ground2.png',
  buildings: []
}
export const PC_PALLET_TOWN_E: SceneParcel = {
  id: 'pallet-town-e',
  pos: {x: 512, y: 0, z: 0},
  size: {x: 512, y: 512},
  groundLink: 'assets/tex/ground2.png',
  buildings: []
}
export const PC_PALLET_TOWN_SE: SceneParcel = {
  id: 'pallet-town-se',
  pos: {x: 512, y: 0, z: 512},
  size: {x: 512, y: 512},
  groundLink: 'assets/tex/ground2.png',
  buildings: []
}
export const PC_PALLET_TOWN_S: SceneParcel = {
  id: 'pallet-town-s',
  pos: {x: 0, y: 0, z: 512},
  size: {x: 512, y: 512},
  groundLink: 'assets/tex/ground2.png',
  buildings: []
}
export const PC_PALLET_TOWN_SW: SceneParcel = {
  id: 'pallet-town-sw',
  pos: {x: -512, y: 0, z: 512},
  size: {x: 512, y: 512},
  groundLink: 'assets/tex/ground2.png',
  buildings: []
}
export const PC_PALLET_TOWN_W: SceneParcel = {
  id: 'pallet-town-w',
  pos: {x: -512, y: 0, z: 0},
  size: {x: 512, y: 512},
  groundLink: 'assets/tex/ground2.png',
  buildings: []
}
export const PC_PALLET_TOWN_NW: SceneParcel = {
  id: 'pallet-town-nw',
  pos: {x: -512, y: 0, z: -512},
  size: {x: 512, y: 512},
  groundLink: 'assets/tex/ground2.png',
  buildings: []
}
export const PC_PALLET_TOWN: SceneParcel = {
  id: 'pallet-town',
  pos: { x: 0, y: 0, z: 0 },
  size: { x: 512, y: 512 },
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
        direction: PlayerDirection.DOWN,
        pressedKeys: [KeyCode.confirm],
        bounds: { min: { x:0, y:0, z:16 }, max: {x:0, y:0, z: 0} }
      },
      instructions: [
        {
          type: InstructionType.MESSAGE,
          message: { name: 'Jason', text: 'Impossible de lire une pancarte par derrière' },
        },
        { type: InstructionType.WAIT, wait: { time: 400 } }
      ]
    },{
      conditions: {
        direction: PlayerDirection.UP,
        pressedKeys: [KeyCode.confirm, KeyCode.up],
        bounds: { min: { x:0, y:0, z:0 }, max: {x:0, y:0, z: 24} }
      },
      instructions: [
        { type: InstructionType.MESSAGE,
          message: {
            name: 'Hugo',
            pic: 'assets/img/faces/face-hugo.png',
            text: "J'adore manger des frites mais le problème c'est que ça fait trop grossir alors je me contente " +
              "d'en manger de temps en temps mais pas tous les jours parce que sinon je ne ressemblerai jamais à Terry Crews.",
            choices: [
              { key: 'confirm', text: "N'oublie jamais le cheat meal !"},
              { key: 'cancel', text: 'Tu devrais éviter la malbouffe.'},
              { key: 'cancel', text: '...'}
            ]
          },
          subInstructions: [{
            condition: 'confirm',
            instructions: [
              { type: InstructionType.WAIT, wait: { time: 200 } },
              { type: InstructionType.MESSAGE, message: { name: 'Hugo', text: "Un bon grec de temps en temps ça fait pas de mal !", pic: 'assets/img/faces/face-hugo.png' } },
              { type: InstructionType.WAIT, wait: { time: 200 } },
              { type: InstructionType.MESSAGE, message: { name: 'Jason', text: "Grave !!!!", pic: 'assets/img/faces/face-jason.png' } },
              { type: InstructionType.WAIT, wait: { time: 400 } }
            ]
          },{
            condition: 'cancel',
            instructions: [
              { type: InstructionType.WAIT, wait: { time: 200 } },
              { type: InstructionType.MESSAGE, message: { name: 'Hugo', text: "Fais pas genre, t'as grave envie d'un bon gros keugré des familles", pic: 'assets/img/faces/face-hugo.png' } },
              { type: InstructionType.WAIT, wait: { time: 200 } },
              { type: InstructionType.MESSAGE, message: { name: 'Jason', text: "J'avoue, supplément oeuf et 3 fromages !", pic: 'assets/img/faces/face-jason.png' } },
              { type: InstructionType.WAIT, wait: { time: 200 } },
              { type: InstructionType.MESSAGE, message: { name: 'Hugo', text: "Et le petit piment !", pic: 'assets/img/faces/face-hugo.png' } },
              { type: InstructionType.WAIT, wait: { time: 400 } }
            ]
          }]
        },
        // { type: InstructionType.WAIT, wait: { time: 1000 } },
        // { type: InstructionType.LOG, log: { text: '' } }
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
        pressedKeys: [KeyCode.confirm],
        bounds: { min: { x:0, y:0, z:0 }, max: {x:0, y:0, z: 24} }
      },
      instructions: [
        { type: InstructionType.TELEPORT, teleport: { pos: { x: 0, y: 0, z: 0 } } }
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
