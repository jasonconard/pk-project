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
          const bounds = mapHelper.buildingBounds(chunk, building);
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
    const block = () => {
      move.x = 0;
      move.z = 0;
    };
    // Both sides of the sprite (across the move), so it can't slip half over a higher / blocking cell
    const alongZ = move.z !== 0;
    const sides: [number, number][] = alongZ ? [[-FOOT_HALF_WIDTH, 0], [FOOT_HALF_WIDTH, 0]] : [[0, -FOOT_HALF_DEPTH], [0, FOOT_HALF_DEPTH]];
    const here = sides.map(([dx, dz]) => [pos.x + dx, pos.z + dz]);
    const next = sides.map(([dx, dz]) => [pos.x + move.x + ahead(move.x) + dx, pos.z + move.z + ahead(move.z) + dz]);
    // Stairs are only used along their slope, both feet on stairs of the same direction (the player centered on a
    // single one, anywhere across stairs set side by side): otherwise they are a wall
    let onStairs = false;
    for (const feet of [here, next]) {
      const stairs = feet.map(([x, z]) => mapHelper.stairsAt(x, z));
      const side = stairs[0];
      if (stairs.every(s => !s)) {
        continue;
      }
      onStairs = true;
      if (!side || stairs.some(s => s !== side) || (side === 'n' || side === 's') !== alongZ) {
        block();
        return;
      }
    }
    const levelHere = Math.max(...here.map(([x, z]) => mapHelper.levelAtWorld(x, z)));
    for (const [x, z] of next) {
      const cell = mapHelper.cellAt(x, z);
      // Climbing a wall is impossible, one level by stairs is fine
      const rise = mapHelper.levelAtWorld(x, z) - levelHere;
      if ((rise > 0 && !(rise === 1 && onStairs)) || (cell && terrainById(cell.chunk.tiles?.[cell.col + ',' + cell.row])?.blocking)) {
        block();
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
