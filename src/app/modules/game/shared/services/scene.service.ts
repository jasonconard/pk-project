import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { KeyCode } from '../../../../core/shared/model/PressedKey';
import { PlayerDirection, PlayerMoveStatus } from "../model/ScenePlayer";
import { MapHelper } from "../model/MapHelper";

@Injectable({
  providedIn: 'root'
})
export class SceneService {

  constructor() {
  }

  public static checkCollisions(mapHelper: MapHelper, playerMesh: THREE.Mesh, move: THREE.Vector3) {
    const nextPosition = new THREE.Vector3(
      playerMesh.position.x + move.x,
      playerMesh.position.y + move.y,
      playerMesh.position.z + move.z
    );

    const spriteSize = new THREE.Vector3();
    new THREE.Box3().setFromObject(playerMesh).getSize(spriteSize);

    mapHelper.sceneMap.chunks.forEach(chunk => {
      if(chunk.visible) {
        chunk.buildings.forEach(building => {
          if(!building.originModel) {
            return;
          }
          if(building.passable) {
            return;
          }
          const bounds = mapHelper.getBounds(chunk.id + '-' + building.id);
          const hb = building.originModel.hitBox;
          const spx = (spriteSize.x / 2);
          const bMinX = bounds.min.x - spx - hb.min.x;
          const bMaxX = bounds.max.x + spx - hb.max.x;
          const npx = nextPosition.x;
          const npz = nextPosition.z;


          if(npx >= bMinX && npx <= bMaxX) {
            if(npz >= bounds.min.z - hb.min.z && npz < bounds.max.z + hb.max.z) {
              move.z = 0;
              move.x = 0;
            }
          }
        });
      }
    });
  }

  public static getMove(mapHelper: MapHelper, holdedCodes: KeyCode[]): { move: THREE.Vector3, speed: number, status: PlayerMoveStatus } {
    const move = new THREE.Vector3(0, 0, 0);

    const runPressed = holdedCodes.indexOf(KeyCode.confirm) >= 0;
    let status = runPressed ? PlayerMoveStatus.RUNNING : PlayerMoveStatus.WALKING;
    let speed = (runPressed ? 2 : 1)

    let playerSpeed = 0;

    let direction = mapHelper.scenePlayer.dir;
    for(let i = 0; i < holdedCodes.length; i++) {
      const key = holdedCodes[i];
      switch (key) {
        case KeyCode.up: move.z = -speed; direction = PlayerDirection.UP; holdedCodes = []; playerSpeed = speed; break;
        case KeyCode.left: move.x = -speed; direction = PlayerDirection.LEFT; holdedCodes = []; playerSpeed = speed; break;
        case KeyCode.down: move.z = speed; direction = PlayerDirection.DOWN; holdedCodes = []; playerSpeed = speed; break;
        case KeyCode.right: move.x = speed; direction = PlayerDirection.RIGHT; holdedCodes = []; playerSpeed = speed; break;
      }
    }

    if(!playerSpeed) {
      status = PlayerMoveStatus.STAYING;
    }

    mapHelper.scenePlayer.dir = direction;

    return { move, speed: playerSpeed, status };
  }
}
