import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { KeyCode } from '../../core/shared/model/PressedKey';
import { KeyService } from '../../core/shared/service/key.service';
import { SceneHelper } from './shared/model/SceneHelper';
import { SceneService } from './shared/services/scene.service';
import { SCENE_MAP } from './shared/data/scene';
import { SCENE_PLAYER } from './shared/data/characters/player';
import { debounceTime } from 'rxjs/operators';
import { FADE_ANIM } from '../../core/shared/animations/FadeAnim';
import { PlayerDirection, PlayerMoveStatus } from './shared/model/ScenePlayer';
import { PlayerService } from './shared/services/player.service';
import * as THREE from 'three';
import { Vec3 } from './shared/model/SceneUtils';
import { EventService } from './shared/services/event.service';
import { SceneEvent } from './shared/model/SceneEvent';

@Component({
  selector: 'mapping-main',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss'],
  animations: [FADE_ANIM]
})
export class MappingComponent implements AfterViewInit, OnInit, OnDestroy {

  private subs: Subscription[] = [];

  public drawModelOpen: boolean = false;
  public drawModelId: string = 'flowers';

  private sceneHelper: SceneHelper = null;

  public paused: boolean = false;
  public loading: boolean = false;

  private frame: number = 0;
  public framePerSec: number = 0;

  public axes: number[] = [];

  public sequenceLaunched = false;

  @ViewChild('canvas', { static: false }) canvasRef: ElementRef;

  constructor(private keyService: KeyService,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.subs.push(fromEvent(window, 'resize').pipe(debounceTime(200)).subscribe(
      (event) => {
        console.log('resize');
        if(this.sceneHelper) {
          this.sceneHelper.refreshRenderer();
        }
      }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
    this.subs = [];
  }

  ngAfterViewInit() {
    this.sceneHelper = SceneService.makeScene(this.canvasRef.nativeElement, SCENE_MAP, SCENE_PLAYER);
    this.keyService.initTouch(this.canvasRef.nativeElement);
    this.sceneHelper.buildMeshes();
    this.sceneHelper.buildPlayer();

    this.sceneHelper.refreshRenderer();

    setInterval(() => {
      this.framePerSec = this.frame;
      this.frame = 0;
    }, 1000);

    this.animate();
  }


  private animate(): void {
    requestAnimationFrame( () => { this.animate() });
    this.frame++;

    // this.coreService.setLogs('' + this.keyService.pressedCodes.length);

    this.keyService.updateGamePadKeys();

    let pressed = { pause: false, select: false, cancel: false };
    this.keyService.pressedCodes.forEach(key => {
      switch (key) {
        case KeyCode.pause: pressed.pause = true; break;
        case KeyCode.select: pressed.select = true; break;
        case KeyCode.cancel: pressed.cancel = true; break;
      }
    });

    if(pressed.pause) {
      this.togglePaused();
    }

    if(pressed.select) {
      this.drawModelOpen = true;
    }

    if(!this.paused && !this.drawModelOpen) {
      this.updateRender();
    } else if(pressed.cancel) {
      if(!this.drawModelOpen) {
        this.togglePaused();
      }
      this.drawModelOpen = false;
    }

    this.keyService.clearPressedKey();

  }

  private pixelSize = 8;
  private isMoving = 0;
  private moveRatio: Vec3 = { x:0, y:0, z:0 };
  private moveSpeed: number = 0;
  private moveDir: PlayerDirection = PlayerDirection.DOWN;
  private moveStatus: PlayerMoveStatus = PlayerMoveStatus.STAYING;

  private updateRender() {
    const camera = this.sceneHelper.camera;
    this.sceneHelper.renderer.render(this.sceneHelper.scene, camera);

    const sprite = this.sceneHelper.getPlayerMesh();

    this.funOption(this.keyService.pressedCodes);

    const moveDetails = this.sequenceLaunched ? { move: { x: 0, y: 0, z: 0 }, speed: 0 } : SceneService.getMove(this.sceneHelper, this.keyService.holdedCodes);
    const move = moveDetails.move;

    let mouvStatus: PlayerMoveStatus = PlayerMoveStatus.STAYING;
    switch (moveDetails.speed) {
      case 2: mouvStatus = PlayerMoveStatus.WALKING; break;
      case 4: mouvStatus = PlayerMoveStatus.RUNNING; break;
    }

    if(!this.isMoving) {
      this.moveRatio = move;
      this.moveSpeed = moveDetails.speed;
      this.moveDir = this.sceneHelper.scenePlayer.dir;
      this.moveStatus = mouvStatus;
    } else {
      this.sceneHelper.scenePlayer.dir = this.moveDir;
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

    PlayerService.updatePlayerSprite({
      scene: this.sceneHelper,
      player: this.sceneHelper.scenePlayer,
      status: this.moveStatus,
      currentFrame: this.frame,
      framePerSecond: this.framePerSec
    });

    if(this.isMoving && this.isMoving === this.moveSpeed) {
      const ratio = this.pixelSize / this.moveSpeed;
      const collisions = { x: this.moveRatio.x * ratio, y: this.moveRatio.y * ratio, z: this.moveRatio.z * ratio };
      SceneService.checkCollisions(this.sceneHelper, sprite, collisions);
      this.moveRatio = { x: collisions.x / ratio, y: collisions.y / ratio, z: collisions.z / ratio };
    }

    camera.position.x += this.moveRatio.x;
    camera.position.z += this.moveRatio.z;
    this.sceneHelper.updateCameraAim();
    if(sprite) {
      sprite.position.x += this.moveRatio.x;
      sprite.position.z += this.moveRatio.z;
    }

    if(!this.sequenceLaunched) {
      const event: SceneEvent = EventService.checkEvents(this.sceneHelper, sprite, this.keyService.pressedCodes);

      if(event) {
        this.sequenceLaunched = true;
        this.eventService.launchSequence(event);

        setTimeout(() => {
          this.sequenceLaunched = false;
        }, 1);
      }
    }

    this.sceneHelper.sceneMap.parcels.forEach(parcel => {
      parcel.buildings.forEach(building => {
        this.sceneHelper.updateVisibleMesh(parcel.id + '-' + building.id, sprite.position, building.canHide);
      });
    });
  }

  togglePaused() {
    this.paused = !this.paused;
  }

  public canMakeFun: boolean = true;
  private funOption(pressedCodes: KeyCode[]) {
    if(pressedCodes.indexOf(KeyCode.cancel) >= 0) {
      if(this.canMakeFun) {
        this.canMakeFun = false;
        const playerPos = this.sceneHelper.getPlayerMesh().position;
        this.sceneHelper.addModelToCoords(this.drawModelId, new THREE.Vector3(playerPos.x,0,playerPos.z));
        setTimeout( () => { this.canMakeFun = true; }, 50);
      }
    }
  }
}
