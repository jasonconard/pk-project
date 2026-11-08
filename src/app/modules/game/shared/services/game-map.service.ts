import { inject, Service } from '@angular/core';
import { CAMERA_LOOK, Game, SHADE_OFFSET, TOO_FAR_LIMIT } from "../model/Game";
import { SCENE_PLAYER } from "../../../../../assets/characters/player";
import { MapHelper } from "../model/MapHelper";
import { PlayerDirection, PlayerMoveStatus } from "../model/ScenePlayer";
import { SceneService } from "./scene.service";
import { Vec3 } from "../model/SceneUtils";
import { PlayerService } from "./player.service";
import { EventService } from "./event.service";
import { KeyService } from "../../../../core/shared/service/key.service";
import * as THREE from 'three';
import { SequenceService } from "./sequence.service";
import { WORLD_MAP } from "../../../../../assets/map/world/world";
import { MapEditorService } from "./map-editor.service";
import { loadMapEdits } from "./map-storage";


/** Ledge hop length (s) and height (world units). */
const HOP_TIME = 0.35;
const HOP_HEIGHT = 7;
/** The ground height is found by a ray cast down from this high above the player (above any relief). */
const GROUND_RAY_UP = 80;
const RAY_NUDGE = 0.013;

@Service()
export class GameMapService {
  private readonly keyService = inject(KeyService);
  private readonly sequenceService = inject(SequenceService);
  private readonly mapEditorService = inject(MapEditorService);


  private pixelSize = 8;
  /** Ledge hop: time since it started (s, -1 = none) and the height currently added to the sprite. */
  private hopTime = -1;
  private hopOffset = 0;
  /** Ground level (and stairs) under the player at the previous step, to notice stepping off a ledge. */
  private lastLevel = 0;
  private lastOnStairs = false;
  private isMoving = 0;
  private moveRatio: Vec3 = { x:0, y:0, z:0 };
  private moveSpeed: number = 0;
  private moveDir: PlayerDirection = PlayerDirection.DOWN;
  private moveStatus: PlayerMoveStatus = PlayerMoveStatus.STAYING;

  init(game: Game) {
    if(game.mapHelper) {
      Object.values(game.mapHelper.meshes).forEach(mesh => mesh.visible = true);
    } else {
      // The map edited in the editor (saved in the browser) replaces the one of the code
      loadMapEdits(WORLD_MAP);
      const mapHelper = new MapHelper({
        originGame: game,
        sceneMap: WORLD_MAP,
        scenePlayer: SCENE_PLAYER
      });
      game.mapHelper = mapHelper;

      const rect = game.canvas.getBoundingClientRect();

      game.camera = new THREE.PerspectiveCamera( 45, rect.width / rect.height, 1, TOO_FAR_LIMIT + SHADE_OFFSET );
      game.camera.position.set(CAMERA_LOOK.x, CAMERA_LOOK.y, CAMERA_LOOK.z);
      game.camera.lookAt( 0, 0, 0 );

      game.render();

      mapHelper.buildChunks();
      mapHelper.buildPlayer();
    }
  }

  /** Ledge hop: the sprite rises and falls (a sine arch) while the ground drops under it. Relative offset. */
  private updateHop(sprite: THREE.Object3D) {
    const plane = sprite.children[0];
    if (!plane || this.hopTime < 0) {
      return;
    }
    plane.position.y -= this.hopOffset;
    this.hopTime += 1 / 120;
    const t = this.hopTime / HOP_TIME;
    if (t >= 1) {
      this.hopTime = -1;
      this.hopOffset = 0;
      return;
    }
    this.hopOffset = HOP_HEIGHT * Math.sin(Math.PI * t);
    plane.position.y += this.hopOffset;
  }

  clear(game: Game) {
    if(game.mapHelper) {
      Object.values(game.mapHelper.meshes).forEach(mesh => mesh.visible = false);
    }
  }

  inputLoop(game: Game) {
    const mapHelper = game.mapHelper;
    const sprite = mapHelper?.scenePlayer.mesh;
    if(!mapHelper || !sprite) { return; }
    if(game.paused) { return; }
    // Map editor: the player is frozen, the camera moves instead
    if(game.editMode) {
      this.mapEditorService.update(game);
      return;
    }
    // No moves during a sequence, or while a tornado carries the player away
    const moveDetails = this.sequenceService.isRunning || game.weather.playerFlying ?
      { move: { x: 0, y: 0, z: 0 }, speed: 0, status: PlayerMoveStatus.STAYING } :
      SceneService.getMove(mapHelper, this.keyService.holdedCodes);
    const move = moveDetails.move;

    let mouvStatus = moveDetails.status;

    if(!this.isMoving) {
      this.moveRatio = move;
      this.moveSpeed = moveDetails.speed;
      this.moveDir = mapHelper.scenePlayer.dir;
      this.moveStatus = mouvStatus;
    } else {
      mapHelper.scenePlayer.dir = this.moveDir;
    }
    if(this.isMoving < this.pixelSize) {
      this.isMoving += this.moveSpeed;
    } else {
      this.isMoving = 0;
      this.moveSpeed = 0;
      this.moveDir = PlayerDirection.DOWN;
      this.moveRatio = { x:0, y:0, z:0 };
      this.moveStatus = mouvStatus;
    }

    if(this.isMoving && this.isMoving === this.moveSpeed) {
      const ratio = this.pixelSize / this.moveSpeed;
      const collisions = { x: this.moveRatio.x * ratio, y: this.moveRatio.y * ratio, z: this.moveRatio.z * ratio };
      SceneService.checkCollisions(mapHelper, sprite, collisions);
      SceneService.checkGroundCollisions(mapHelper, sprite, collisions);
      this.moveRatio = { x: collisions.x / ratio, y: collisions.y / ratio, z: collisions.z / ratio };
    }

    const camera = game.camera;
    this.updateHop(sprite);
    mapHelper.updatePlayerShadow();

    camera.position.x += this.moveRatio.x;
    camera.position.z += this.moveRatio.z;
    mapHelper.updateCameraAim();
    sprite.position.x += this.moveRatio.x;
    sprite.position.z += this.moveRatio.z;


    // (from high above: the ground may have been raised under the player in the editor)
    // (slightly off the exact position: a ray going exactly through a vertex shared by the cells can miss them all)
    const spriteRayOrigin = new THREE.Vector3(sprite.position.x + RAY_NUDGE, sprite.position.y + GROUND_RAY_UP, sprite.position.z + RAY_NUDGE);
    game.raycaster.ray = new THREE.Ray(spriteRayOrigin, new THREE.Vector3(0, -1, 0));
    let dist = -1;

    mapHelper.sceneMap.chunks.forEach( chunk => {
      if(chunk.visible) {
        chunk.grounds.forEach(ground => {
          if(!ground.passable || !ground.mesh) { return; }
          const rayCasting = game.raycaster.intersectObject(ground.mesh)[0];
          if(rayCasting && rayCasting.distance) {
            if(dist === -1  || rayCasting.distance < dist) {
              dist = rayCasting.distance
            }
          }
        });
      }
    });

    if(dist > -1) {
      sprite.position.y -= dist - GROUND_RAY_UP;
      camera.position.y -= dist - GROUND_RAY_UP;
      // Stepping off a ledge: a little hop, like in the Pokémon games, once the player really enters the lower cell
      // (not by stairs)
      const level = mapHelper.levelAtWorld(sprite.position.x, sprite.position.z);
      const stairs = mapHelper.isStairsAt(sprite.position.x, sprite.position.z);
      if (level < this.lastLevel && !stairs && !this.lastOnStairs && this.hopTime < 0) {
        this.hopTime = 0;
      }
      this.lastLevel = level;
      this.lastOnStairs = stairs;
    } else {
      sprite.position.x -= this.moveRatio.x;
      sprite.position.z -= this.moveRatio.z;
      camera.position.x -= this.moveRatio.x;
      camera.position.z -= this.moveRatio.z;
    }


    PlayerService.updatePlayerSprite({
      mapHelper: mapHelper,
      player: mapHelper.scenePlayer,
      status: this.moveStatus,
      currentFrame: game.frame,
      framePerSecond: game.framePerSec
    });

    if(!this.sequenceService.isRunning) {
      const event = EventService.checkEvents(mapHelper, sprite, this.keyService.pressedCodes);
      if(event) {
        this.sequenceService.launchSequence(event);
      }
    }



    mapHelper.sceneMap.chunks.forEach(chunk => {
      if(chunk.visible) {
        chunk.buildings.forEach(building => {
          mapHelper.updateVisibleMesh(chunk.id + '-' + building.id, sprite.position, building.canHide);
        });
      }
    });

    // if(this.keyService.holdedKeys.find(key => { return key.code === KeyCode.y; })) {
    //   camera.zoom = Math.min(2, camera.zoom + 0.01);
    // } else if(this.keyService.holdedKeys.find(key => { return key.code === KeyCode.x; })) {
    //   camera.zoom = Math.max(0.5, camera.zoom - 0.005);
    // } else {
    //   if(camera.zoom > 1) {
    //     camera.zoom = Math.max(1, camera.zoom - 0.01);
    //   } else if(camera.zoom < 1) {
    //     camera.zoom = Math.min(1, camera.zoom + 0.005);
    //   }
    // }
    // CoreService.me.setLogs(camera.zoom);
    // camera.updateProjectionMatrix();

  }

}
