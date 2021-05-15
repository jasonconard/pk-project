import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { KeyCode, PressedKey } from '../../core/shared/model/PressedKey';
import { KeyService } from '../../core/shared/service/key.service';
import { SceneHelper } from './shared/model/SceneHelper';
import { SceneService } from './shared/services/scene.service';
import * as THREE from 'three';
import { GamepadService } from '../../core/shared/service/gamepad.service';
import { SCENE_MAP } from './shared/data/scene';
import { SCENE_PLAYER } from './shared/data/characters/player';
import { debounceTime } from 'rxjs/operators';
import { FADE_ANIM } from '../../core/shared/animations/FadeAnim';
import { CoreService } from '../../core/shared/service/core.service';

@Component({
  selector: 'mapping-main',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss'],
  animations: [FADE_ANIM]
})
export class MappingComponent implements AfterViewInit, OnInit, OnDestroy {

  private subs: Subscription[] = [];
  private holdedKeys: PressedKey[] = [];
  private pressedKeys: PressedKey[] = [];

  private sceneHelper: SceneHelper = null;

  public paused: boolean = false;
  public loading: boolean = false;

  private frame: number = 0;
  public framePerSec: number = 0;

  public axes: number[] = [];

  private lastDirection: KeyCode = KeyCode.down;

  @ViewChild('canvas', { static: false }) canvasRef: ElementRef;

  constructor(private keyService: KeyService,
              private coreService: CoreService) {
  }

  ngOnInit() {

    this.subs.push(this.keyService.pressedState.subscribe(keys => {
      this.pressedKeys = keys;
    }));
    this.subs.push(this.keyService.holdedState.subscribe(keys => {
      this.holdedKeys = keys;
    }));

    this.subs.push(fromEvent(window, 'resize').pipe(debounceTime(200)).subscribe(
      (event) => {
        console.log('resize');
        if(this.sceneHelper) {
          this.sceneHelper.refreshRenderer();
          const coords = this.sceneHelper.getPlayerScreenCoords();
          this.axes = [coords.x, coords.y];
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
    this.updateSprite(SCENE_PLAYER.id);

    this.sceneHelper.refreshRenderer();
    const coords = this.sceneHelper.getPlayerScreenCoords();
    this.axes = [coords.x, coords.y];

    setInterval(() => {
      this.framePerSec = this.frame;
      this.frame = 0;
    }, 1000);

    this.animate();
  }

  public canAddFlowers: boolean = true;

  private animate(): void {
    requestAnimationFrame( () => { this.animate() });

    this.keyService.updateGamePadKeys();

    const pauseClicked = !!this.pressedKeys.find( key => key.code === KeyCode.pause );

    if(pauseClicked) {
      this.togglePaused();
    }

    if(!this.paused) {
      this.animateCanvas();
    } else if(this.pressedKeys.find(key => key.code === KeyCode.cancel )) {
      this.togglePaused();
    }

    this.keyService.clearPressedKey();

  }

  private animateCanvas() {
    this.frame++;
    const camera = this.sceneHelper.camera;
    this.sceneHelper.renderer.render( this.sceneHelper.scene, camera );

    const sprite = this.sceneHelper.getPlayerMesh();

    const direction = this.lastDirection;
    const move = this.getMove();
    const isMoving = move.x || move.y || move.z;
    const isRunning = isMoving && Math.abs(isMoving) === 2.5;
    // this.axes = [isMoving];
    this.updateSprite(this.sceneHelper.scenePlayer.id, isMoving, isRunning);

    const nextPosition = new THREE.Vector3(
      sprite.position.x + move.x,
      sprite.position.y + move.y,
      sprite.position.z + move.z
    );

    // this.coreService.setLogs(JSON.stringify({ x: sprite.position.x, z: sprite.position.z}));

    const spriteSize = new THREE.Vector3();
    new THREE.Box3().setFromObject(sprite).getSize(spriteSize);

    const parcel = this.sceneHelper.sceneMap.parcels[0];
    const limitX = parcel.pos.x + (parcel.size.x / 2) - (spriteSize.x / 2);
    const limitZ = parcel.pos.z + (parcel.size.y / 2);

    if(nextPosition.x < -limitX) { move.x = 0; }
    if(nextPosition.x > limitX) { move.x = 0; }
    if(nextPosition.z < -limitZ) { move.z = 0; }
    if(nextPosition.z > limitZ) { move.z = 0; }


    this.sceneHelper.sceneMap.parcels.forEach(parcel => {
      parcel.buildings.forEach(building => {
        if(!building.originModel) {
          return;
        }
        if(building.passable) {
          return;
        }
        const bounds = this.sceneHelper.getBounds(parcel.id + '-' + building.id);
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
    });

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

    if(this.pressedKeys.length) {
      this.coreService.setLogs(KeyCode[this.pressedKeys[0].code]);
    }
  }

  public vibrating = false;

  public vibrate() {
    const gamepad = navigator.getGamepads()[0];
    const va = gamepad && gamepad['vibrationActuator'];
    if(va && !this.vibrating) {
      this.vibrating = true;
      va.playEffect("dual-rumble", {
        startDelay: 0,
        duration: 2,
        weakMagnitude: 0.5,
        strongMagnitude: 0.5
      });
      setTimeout( () => { this.vibrating = false; }, 20);
    }

  }

  private getMove(): THREE.Vector3 {
    const move = new THREE.Vector3(0, 0, 0);

    const keySet = new Set<KeyCode>();
    this.holdedKeys.forEach(key => { keySet.add(key.code)});

    GamepadService.getPressedKeys().forEach(key => { keySet.add(key) });

    let keys = Array.from(keySet);
    // this.axes = keys;

    let speed = keys.indexOf(KeyCode.confirm) >= 0 ? 2.5 : 1.5;

    const pKeySet = new Set<KeyCode>();
    this.pressedKeys.forEach(key => { pKeySet.add(key.code)});
    let pKeys = Array.from(pKeySet);
    // if(this.pressedKeys.length) {
    //   this.axes = [this.pressedKeys.length];
    // }
    if(pKeys.indexOf(KeyCode.cancel) >= 0) {
      // this.vibrate();

      if(this.canAddFlowers) {
        this.canAddFlowers = false;
        const playerPos = this.sceneHelper.getPlayerMesh().position;
        this.sceneHelper.addFlowersToCoords( new THREE.Vector3(playerPos.x,6,playerPos.z));
        setTimeout( () => { this.canAddFlowers = true; }, 50);
      }
    }

    for(let i = 0; i < keys.length; i++) {
      const key = keys[i];
      switch (key) {
        case KeyCode.up: move.z = -speed; this.lastDirection = key; keys = []; break;
        case KeyCode.left: move.x = -speed; this.lastDirection = key; keys = []; break;
        case KeyCode.down: move.z = speed; this.lastDirection = key; keys = []; break;
        case KeyCode.right: move.x = speed; this.lastDirection = key; keys = []; break;
      }
    }

    return move;
  }

  updateSprite(spriteKey: string, isMoving?: boolean, isRunning?: boolean) {
    const w = 59;
    const h = 65;

    let b = { x1: 0, y1: 0, x2: 0, y2: 0 };

    let frameCode = 0;
    if(this.framePerSec && isMoving) {
      frameCode = Math.floor(this.frame / (this.framePerSec / (isRunning ? 9 : 6))) % 3;
    }
    // this.axes = [frameCode, isRunning ? 18 : 6];
    const yOffset = 22 * frameCode;
    const y = h - 22 - yOffset;
    const y1 = (y+1)/h;
    const y2 = (y+22)/h;

    switch (this.lastDirection) {
      case KeyCode.up: b = { x1: 15/w, x2: 29/w, y1, y2 }; break;
      case KeyCode.down: b = { x1: 0, x2: 14/w, y1, y2 }; break;
      case KeyCode.left: b = { x1: 30/w, x2: 44/w, y1, y2 }; break;
      case KeyCode.right: b = { x1: 45/w, x2: 59/w, y1, y2 }; break;
    }

    const spriteGeo = this.sceneHelper.meshes[spriteKey].geometry;
    const uvAtt = spriteGeo.getAttribute('uv');
    const uv = new THREE.Vector2();
    for(let i = 0; i < uvAtt.count; i++) {
      uv.fromBufferAttribute(uvAtt, i);
      if( i%4 === 0 ) { uvAtt.setXY( i, b.x1, b.y2 ) } // 0, 1
      if( i%4 === 1 ) { uvAtt.setXY( i, b.x2, b.y2 ) } // 1, 1
      if( i%4 === 2 ) { uvAtt.setXY( i, b.x1, b.y1 ) } // 0, 0
      if( i%4 === 3 ) { uvAtt.setXY( i, b.x2, b.y1 ) } // 1, 0
    }

    uvAtt.needsUpdate = true;
  }

  togglePaused() {
    this.paused = !this.paused;
  }

}

