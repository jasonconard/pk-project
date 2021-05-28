import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { GameMode, Game } from "../model/Game";
import { fromEvent } from "rxjs";
import { auditTime } from "rxjs/operators";
import { GameMapService } from "./game-map.service";
import { KeyService } from "../../../../core/shared/service/key.service";
import { KeyCode } from "../../../../core/shared/model/PressedKey";
import { FightService } from "../../../fight/shared/services/fight.service";


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private game: Game = null;

  constructor(private keyService: KeyService,
              private fightService: FightService,
              private gameMapService: GameMapService) {
    this.initCheckResize();
  }

  init(canvas: HTMLCanvasElement, gameMode: GameMode = GameMode.MAP): Game {
    this.keyService.initTouch(canvas);

    const rect = canvas.getBoundingClientRect();
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize( rect.width, rect.height );
    canvas.appendChild( renderer.domElement );

    const scene = new THREE.Scene();
    const raycaster = new THREE.Raycaster();

    const loading = false;

    const frame = 0;
    const framePerSec = 0;
    const paused = false;

    const drawModelOpen: boolean = false;
    const drawModelId: string = 'flowers';

    const mode = gameMode;

    this.game = new Game({
      scene, raycaster, renderer,
      canvas, gameMode, loading,
      frame, framePerSec, paused,
      drawModelOpen, drawModelId,
      mode
    });

    this.switchGameMode(gameMode, true);

    setTimeout( () => {
      this.game.loading = false;
    }, 400);

    setInterval(() => {
      this.game.framePerSec = this.game.frame;
      this.game.frame = 0;
    }, 1000);

    setInterval(() => {
      this.inputLoop();
    }, 1000 / 120);

    this.animate();

    return this.game;
  }

  switchGameMode(gameMode: GameMode, firstInit?: boolean) {
    if(!this.game) {
      return;
    }
    if(this.game.loading) {
      return;
    }

    this.game.loading = true;
    this.game.mode = gameMode;


    setTimeout( () => {
      switch (gameMode) {
        case GameMode.FIGHT:
          this.gameMapService.clear(this.game);
          this.fightService.init(this.game);
          break;
        case GameMode.MAP:
          this.fightService.clear(this.game);
          this.gameMapService.init(this.game);
          break;
      }
      this.game.refreshRenderer();

      setTimeout( () => {
        this.game.loading = false;
      }, 300);
    }, firstInit ? 0 : 300);

  }

  renderLoop() {
    if(!this.game || !this.game.camera) { return; }
    this.game.frame++;

    this.keyService.updateGamePadKeys();

    if(!this.game.paused && !this.game.drawModelOpen) {
      this.game.renderer.render(this.game.scene, this.game.camera);
    }



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
    } else if(pressed.select) {
      this.game.drawModelOpen = true;
    } else if(pressed.cancel) {
      if(this.game.paused) {
        this.togglePaused();
      }
      if(this.game.drawModelOpen) {
        this.game.drawModelOpen = false;
      }
    }

    this.keyService.clearPressedKey();
  }

  inputLoop() {
    switch (this.game.mode) {
      case GameMode.MAP: this.gameMapService.inputLoop(this.game); break;
      default: break;
      // case GameMode.FIGHT: this.gameFightService.inputLoop(this.game); break;
    }
  }

  private animate(): void {
    requestAnimationFrame( () => { this.animate() });
    this.renderLoop();
  }

  private initCheckResize() {
    fromEvent(window, 'resize').pipe(auditTime(200)).subscribe(
      (event) => {
        if(this.game) {
          this.game.refreshRenderer();
        }
      })
  }


  togglePaused() {
    this.game.paused = !this.game.paused;
  }

}
