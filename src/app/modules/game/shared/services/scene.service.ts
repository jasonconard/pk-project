import { Service } from '@angular/core';
import * as THREE from 'three';
import { KeyCode } from '../../../../core/shared/model/PressedKey';
import { PlayerDirection, PlayerMoveStatus } from "../model/ScenePlayer";
import { MapHelper } from "../model/MapHelper";
import { Vec3 } from "../model/SceneUtils";
import { terrainById } from "../model/Terrain";

/** How far ahead of the player a blocking ground stops them (world units). */
const GROUND_MARGIN = 6;
/** Half width of the player's feet (across a vertical move) and half depth (across a horizontal move). */
const FOOT_HALF_WIDTH = 6;
const FOOT_HALF_DEPTH = 3;

@Service()
export class SceneService {

  public static checkCollisions(mapHelper: MapHelper, playerMesh: THREE.Object3D, move: Vec3) {
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
          const hb = building.originModel?.hitBox;
          if (!bounds || !hb) {
            return;
          }
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

  /**
   * Blocking ground (water) and reliefs: the player stops before entering a cell of a blocking terrain or a higher
   * cell (walls can't be climbed). Checked a few units ahead in the move direction, so the sprite doesn't walk
   * half into the water / the wall.
   */
  public static checkGroundCollisions(mapHelper: MapHelper, playerMesh: THREE.Object3D, move: Vec3) {
    const ahead = (v: number) => Math.sign(v) * GROUND_MARGIN;
    const pos = playerMesh.position;
    // Both sides of the sprite (across the move), so it can't slip half over a higher / blocking cell
    const sides: [number, number][] = move.z ? [[-FOOT_HALF_WIDTH, 0], [FOOT_HALF_WIDTH, 0]] : [[0, -FOOT_HALF_DEPTH], [0, FOOT_HALF_DEPTH]];
    const levelHere = Math.max(...sides.map(([dx, dz]) => mapHelper.levelAtWorld(pos.x + dx, pos.z + dz)));
    for (const [dx, dz] of sides) {
      const x = pos.x + move.x + ahead(move.x) + dx;
      const z = pos.z + move.z + ahead(move.z) + dz;
      const cell = mapHelper.cellAt(x, z);
      // Climbing a wall is impossible, one level by stairs is fine (from or onto a stairs cell)
      const rise = mapHelper.levelAtWorld(x, z) - levelHere;
      const byStairs = rise === 1 && (mapHelper.isStairsAt(x, z) || mapHelper.isStairsAt(pos.x, pos.z));
      const climbing = rise > 0 && !byStairs;
      if (climbing || (cell && terrainById(cell.chunk.tiles?.[cell.col + ',' + cell.row])?.blocking)) {
        move.x = 0;
        move.z = 0;
        return;
      }
    }
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
