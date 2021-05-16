import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { isPlayerMoving, PlayerDirection, PlayerMove, PlayerMoveStatus } from '../model/ScenePlayer';

import { VecBox2 } from '../model/SceneUtils';
import { CoreService } from '../../../../core/shared/service/core.service';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() {
  }

  public static updatePlayerSprite(pm: PlayerMove) {

    // TODO Map to player conf
    const w = 59;// pm.player.tex.size.x; // 59
    const h = 65; // pm.player.tex.size.y // 65

    let b: VecBox2;

    // TODO PUT FRAMES IN CONSTANTS
    let frameCode = 0;
    if(pm.framePerSecond && isPlayerMoving(pm)) {
      frameCode = Math.floor(pm.currentFrame / (pm.framePerSecond / (PlayerMoveStatus.RUNNING ? 9 : 6))) % 3;
    }

    const yOffset = 22 * frameCode;
    const y = h - 22 - yOffset;
    const y1 = (y+1)/h;
    const y2 = (y+22)/h;

    switch (pm.player.dir) {
      case PlayerDirection.UP: b = { min: { x: 15/w, y: y1 }, max: { x: 29/w, y: y2 } }; break;
      case PlayerDirection.DOWN: b = { min: { x: 0, y: y1 }, max: { x: 14/w, y: y2 } }; break;
      case PlayerDirection.LEFT: b = { min: { x: 30/w, y: y1 }, max: { x: 44/w, y : y2 } }; break;
      case PlayerDirection.RIGHT: b = { min: { x: 45/w, y: y1 }, max: { x: 59/w, y: y2 } }; break;
      // default: b = { min: { x: 0, y: y1 }, max: { x: 14/w, y: y2 } }; break;
    }

    const spriteGeo = pm.scene.meshes[pm.player.id].geometry;
    const uvAtt = spriteGeo.getAttribute('uv');
    const uv = new THREE.Vector2();
    for(let i = 0; i < uvAtt.count; i++) {
      uv.fromBufferAttribute(uvAtt, i);
      if( i%4 === 0 ) { uvAtt.setXY( i, b.min.x, b.max.y ) } // 0, 1
      if( i%4 === 1 ) { uvAtt.setXY( i, b.max.x, b.max.y ) } // 1, 1
      if( i%4 === 2 ) { uvAtt.setXY( i, b.min.x, b.min.y ) } // 0, 0
      if( i%4 === 3 ) { uvAtt.setXY( i, b.max.x, b.min.y ) } // 1, 0
    }

    uvAtt.needsUpdate = true;
  }
}
