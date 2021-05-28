import { Injectable } from '@angular/core';
import { CAMERA_LOOK, Game, SHADE_OFFSET, TOO_FAR_LIMIT } from "../model/Game";
import { SCENE_PLAYER } from "../../../../../assets/characters/player";
import { MapHelper } from "../model/MapHelper";
import { PlayerDirection, PlayerMoveStatus } from "../model/ScenePlayer";
import { SceneService } from "./scene.service";
import { Vec3 } from "../model/SceneUtils";
import { PlayerService } from "./player.service";
import { SceneEvent } from "../model/SceneEvent";
import { EventService } from "./event.service";
import { KeyCode } from "../../../../core/shared/model/PressedKey";
import { KeyService } from "../../../../core/shared/service/key.service";
import * as THREE from 'three';
import { SequenceService } from "./sequence.service";
import { WORLD_MAP } from "../../../../../assets/map/world/world";
import { CoreService } from "../../../../core/shared/service/core.service";


@Injectable({
  providedIn: 'root'
})
export class GameMapService {

  private pixelSize = 8;
  private isMoving = 0;
  private moveRatio: Vec3 = { x:0, y:0, z:0 };
  private moveSpeed: number = 0;
  private moveDir: PlayerDirection = PlayerDirection.DOWN;
  private moveStatus: PlayerMoveStatus = PlayerMoveStatus.STAYING;

  constructor(private keyService: KeyService,
              private sequenceService: SequenceService) {
  }

  init(game: Game) {
    if(game.mapHelper) {
      Object.keys(game.mapHelper.meshes).forEach(key => {
        const mesh = game.mapHelper.meshes[key];
        mesh.visible = true;
      });
    } else {
      game.mapHelper = new MapHelper({
        originGame: game,
        meshes: {},
        sceneMap: WORLD_MAP,
        scenePlayer: SCENE_PLAYER
      });

      const rect = game.canvas.getBoundingClientRect();

      game.camera = new THREE.PerspectiveCamera( 45, rect.width / rect.height, 1, TOO_FAR_LIMIT + SHADE_OFFSET );
      game.camera.position.set(CAMERA_LOOK.x, CAMERA_LOOK.y, CAMERA_LOOK.z);
      game.camera.lookAt( 0, 0, 0 );

      game.render();

      game.light = new THREE.AmbientLight( 0x404040 ); // soft white light
      game.scene.add(game.light);

      game.mapHelper.buildChunks();
      game.mapHelper.buildPlayer();
    }
  }

  clear(game: Game) {
    if(game.mapHelper) {
      Object.keys(game.mapHelper.meshes).forEach(key => {
        const mesh = game.mapHelper.meshes[key];
        mesh.visible = false;
      });
    }
  }

  inputLoop(game: Game) {
    const mapHelper = game.mapHelper;
    if(!mapHelper) { return; }
    if(game.paused || game.drawModelOpen) { return; }
    const moveDetails = this.sequenceService.sequenceSub.get() ?
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

    const sprite = mapHelper.scenePlayer.mesh;

    if(this.isMoving && this.isMoving === this.moveSpeed) {
      const ratio = this.pixelSize / this.moveSpeed;
      const collisions = { x: this.moveRatio.x * ratio, y: this.moveRatio.y * ratio, z: this.moveRatio.z * ratio };
      SceneService.checkCollisions(mapHelper, sprite, collisions);
      this.moveRatio = { x: collisions.x / ratio, y: collisions.y / ratio, z: collisions.z / ratio };
    }

    const camera = game.camera;
    camera.position.x += this.moveRatio.x;
    camera.position.z += this.moveRatio.z;
    mapHelper.updateCameraAim();
    if(sprite) {
      sprite.position.x += this.moveRatio.x;
      sprite.position.z += this.moveRatio.z;
    }


    const spriteRayOrigin = new THREE.Vector3(sprite.position.x, sprite.position.y + 16, sprite.position.z);
    game.raycaster.ray = new THREE.Ray(spriteRayOrigin, new THREE.Vector3(0, -1, 0));
    let dist = -1;

    mapHelper.sceneMap.chunks.forEach( chunk => {
      if(chunk.visible) {
        chunk.grounds.forEach(ground => {
          if(!ground.passable) { return; }
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
      sprite.position.y -= dist - 16;
      camera.position.y -= dist - 16;
    } else {
      sprite.position.x -= this.moveRatio.x;
      sprite.position.z -= this.moveRatio.z;
      camera.position.x -= this.moveRatio.x;
      camera.position.z -= this.moveRatio.z;
    }


    this.funOption(mapHelper, this.keyService.pressedCodes);

    PlayerService.updatePlayerSprite({
      mapHelper: mapHelper,
      player: mapHelper.scenePlayer,
      status: this.moveStatus,
      currentFrame: game.frame,
      framePerSecond: game.framePerSec
    });

    if(!this.sequenceService.sequenceSub.get()) {
      const event: SceneEvent = EventService.checkEvents(mapHelper, sprite, this.keyService.pressedCodes);
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


  public canMakeFun: boolean = true;
  private funOption(mapHelper: MapHelper, pressedCodes: KeyCode[]) {
    if(pressedCodes.indexOf(KeyCode.cancel) >= 0) {
      if(this.canMakeFun) {
        this.canMakeFun = false;
        const playerPos = mapHelper.scenePlayer.mesh.position;
        mapHelper.addModelToCoords(mapHelper.originGame.drawModelId, new THREE.Vector3(playerPos.x,0,playerPos.z));
        setTimeout( () => { this.canMakeFun = true; }, 50);
      }
    }
  }

}
