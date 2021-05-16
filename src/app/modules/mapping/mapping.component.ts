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
import { getPlayerDirectionFromKeyCode, PlayerDirection, PlayerMoveStatus } from './shared/model/ScenePlayer';
import { PlayerService } from './shared/services/player.service';
import * as THREE from 'three';
import { CoreService } from '../../core/shared/service/core.service';

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

  @ViewChild('canvas', { static: false }) canvasRef: ElementRef;

  constructor(private keyService: KeyService,
              private coreService: CoreService) {
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

  private updateRender() {
    const camera = this.sceneHelper.camera;
    this.sceneHelper.renderer.render(this.sceneHelper.scene, camera);

    const sprite = this.sceneHelper.getPlayerMesh();

    this.funOption(this.keyService.pressedCodes);

    const moveDetails = SceneService.getMove(this.sceneHelper, this.keyService.holdedCodes);
    const move = moveDetails.move;

    let mouvStatus: PlayerMoveStatus = PlayerMoveStatus.STAYING;
    switch (moveDetails.speed) {
      case 1.5: mouvStatus = PlayerMoveStatus.WALKING; break;
      case 2.5: mouvStatus = PlayerMoveStatus.RUNNING; break;
    }

    PlayerService.updatePlayerSprite({
      scene: this.sceneHelper,
      player: this.sceneHelper.scenePlayer,
      status: mouvStatus,
      currentFrame: this.frame,
      framePerSecond: this.framePerSec
    });

    SceneService.checkCollisions(this.sceneHelper, sprite, move);

    camera.position.x += move.x;
    camera.position.z += move.z;
    this.sceneHelper.updateCameraAim();
    if(sprite) {
      sprite.position.x += move.x;
      sprite.position.z += move.z;
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

