import { Service } from "@angular/core";
import * as THREE from "three";
import {
  isPlayerMoving,
  PlayerDirection,
  PlayerMove,
  PlayerMoveStatus,
} from "../model/ScenePlayer";

import { VecBox2 } from "../model/SceneUtils";
import {
  WALK_DIRS,
  WALK_FRAMES,
  WALK_STAND,
} from "../../../database-editor/shared/database";

/** A walk's steps in the sheet's columns: left foot, standing, right foot, standing. */
const WALK_STEPS = [0, WALK_STAND, 2, WALK_STAND];
/** The sheet's row of each direction (WALK_DIRS: down, left, right, up). */
const WALK_ROWS: Record<PlayerDirection, number> = {
  [PlayerDirection.DOWN]: 0,
  [PlayerDirection.LEFT]: 1,
  [PlayerDirection.RIGHT]: 2,
  [PlayerDirection.UP]: 3,
};

@Service()
export class PlayerService {
  public static updatePlayerSprite(pm: PlayerMove) {
    const b = pm.player.tex.walk
      ? PlayerService.walkSheetFrame(pm)
      : PlayerService.oldSpriteFrame(pm);
    const spriteGeo = (
      pm.mapHelper.meshes[pm.player.id].children[0] as THREE.Mesh
    ).geometry;

    const uvAtt = spriteGeo.getAttribute("uv");
    const uv = new THREE.Vector2();
    for (let i = 0; i < uvAtt.count; i++) {
      uv.fromBufferAttribute(uvAtt as THREE.BufferAttribute, i);
      if (i % 4 === 0) {
        uvAtt.setXY(i, b.min.x, b.max.y);
      } // 0, 1
      if (i % 4 === 1) {
        uvAtt.setXY(i, b.max.x, b.max.y);
      } // 1, 1
      if (i % 4 === 2) {
        uvAtt.setXY(i, b.min.x, b.min.y);
      } // 0, 0
      if (i % 4 === 3) {
        uvAtt.setXY(i, b.max.x, b.min.y);
      } // 1, 0
    }

    uvAtt.needsUpdate = true;
  }

  /** A walking sheet of the database (WALK_CELL): one column per step, one row per direction (WALK_DIRS). */
  private static walkSheetFrame(pm: PlayerMove): VecBox2 {
    const col =
      pm.framePerSecond && isPlayerMoving(pm)
        ? WALK_STEPS[
            Math.floor(
              pm.currentFrame /
                (pm.framePerSecond /
                  (pm.status === PlayerMoveStatus.RUNNING ? 9 : 6))
            ) % WALK_STEPS.length
          ]
        : WALK_STAND;
    const row = WALK_ROWS[pm.player.dir];
    const rows = WALK_DIRS.length;
    return {
      min: { x: col / WALK_FRAMES, y: 1 - (row + 1) / rows },
      max: { x: (col + 1) / WALK_FRAMES, y: 1 - row / rows },
    };
  }

  /** The first player sprite (59×65: 4 directions across, 3 steps down, 14×22 each). */
  private static oldSpriteFrame(pm: PlayerMove): VecBox2 {
    const w = 59;
    const h = 65;
    let frameCode = 0;
    if (pm.framePerSecond && isPlayerMoving(pm)) {
      frameCode =
        Math.floor(
          pm.currentFrame /
            (pm.framePerSecond / (PlayerMoveStatus.RUNNING ? 9 : 6))
        ) % 3;
    }
    const yOffset = 22 * frameCode;
    const y = h - 22 - yOffset;
    const y1 = (y + 1) / h;
    const y2 = (y + 22) / h;
    const left = {
      [PlayerDirection.UP]: 15,
      [PlayerDirection.DOWN]: 0,
      [PlayerDirection.LEFT]: 30,
      [PlayerDirection.RIGHT]: 45,
    }[pm.player.dir];
    return {
      min: { x: left / w, y: y1 },
      max: { x: (left + 14) / w, y: y2 },
    };
  }
}
