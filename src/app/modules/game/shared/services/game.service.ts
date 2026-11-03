import { inject, Service, signal } from '@angular/core';
import { MapHelper } from "../model/MapHelper";
import * as THREE from 'three';
import { GameMode, Game } from "../model/Game";
import { auditTime, fromEvent } from "rxjs";
import { GameMapService } from "./game-map.service";
import { KeyService } from "../../../../core/shared/service/key.service";
import { KeyCode } from "../../../../core/shared/model/PressedKey";
import { FightService } from "../../../fight/shared/services/fight.service";

/** Snapshot of the game state displayed by the Angular UI (HUD, overlays). */
export interface GameHud {
  loading: boolean;
  paused: boolean;
  framePerSec: number;
  mode: GameMode;
  drawModelOpen: boolean;
  drawModelId: string;
  mapHelper: MapHelper | null;
}

const sameHud = (a: GameHud | null, b: GameHud | null): boolean =>
  a === b || (!!a && !!b && (Object.keys(a) as (keyof GameHud)[]).every(key => a[key] === b[key]));

@Service()
export class GameService {
  private readonly keyService = inject(KeyService);
  private readonly fightService = inject(FightService);
  private readonly gameMapService = inject(GameMapService);

  private game: Game | null = null;

  private readonly hudState = signal<GameHud | null>(null, { equal: sameHud });
  /** Reactive view of the (mutable) game object, synced on every rendered frame. */
  readonly hud = this.hudState.asReadonly();

  constructor() {
    this.initCheckResize();
  }

  init(canvas: HTMLElement, gameMode: GameMode = GameMode.MAP): Game {
    this.keyService.initTouch(canvas);

    const rect = canvas.getBoundingClientRect();
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize( rect.width, rect.height );
    canvas.appendChild( renderer.domElement );

    const scene = new THREE.Scene();
    const raycaster = new THREE.Raycaster();

    const game = new Game({
      scene, raycaster, renderer, canvas,
      mode: gameMode,
      drawModelId: 'flowers',
    });
    this.game = game;

    this.switchGameMode(gameMode, true);

    setInterval(() => {
      game.framePerSec = game.frame;
      game.frame = 0;
    }, 1000);

    setInterval(() => this.inputLoop(game), 1000 / 120);

    this.animate(game);

    return game;
  }

  switchGameMode(gameMode: GameMode, firstInit?: boolean) {
    const game = this.game;
    if(!game || game.loading) {
      return;
    }

    game.loading = true;
    game.mode = gameMode;

    setTimeout( () => {
      switch (gameMode) {
        case GameMode.FIGHT:
          this.gameMapService.clear(game);
          this.fightService.init(game);
          break;
        case GameMode.MAP:
          this.fightService.clear(game);
          this.gameMapService.init(game);
          break;
      }
      game.refreshRenderer();

      setTimeout(() => game.loading = false, 300);
    }, firstInit ? 0 : 300);
  }

  private renderLoop(game: Game) {
    game.frame++;

    this.keyService.updateGamePadKeys();

    if(!game.paused && !game.drawModelOpen) {
      game.renderer.render(game.scene, game.camera);
    }

    const pressedCodes = this.keyService.pressedCodes;
    if(pressedCodes.includes(KeyCode.pause)) {
      this.togglePaused();
    } else if(pressedCodes.includes(KeyCode.select)) {
      game.drawModelOpen = true;
    } else if(pressedCodes.includes(KeyCode.cancel)) {
      game.paused = false;
      game.drawModelOpen = false;
    }

    this.keyService.clearPressedKey();
    this.syncHud();
  }

  private syncHud(): void {
    const game = this.game;
    this.hudState.set(game ? {
      loading: game.loading,
      paused: game.paused,
      framePerSec: game.framePerSec,
      mode: game.mode,
      drawModelOpen: game.drawModelOpen,
      drawModelId: game.drawModelId,
      mapHelper: game.mapHelper ?? null,
    } : null);
  }

  private inputLoop(game: Game) {
    switch (game.mode) {
      case GameMode.MAP: this.gameMapService.inputLoop(game); break;
      case GameMode.FIGHT: this.fightService.inputLoop(game); break;
    }
  }

  private animate(game: Game): void {
    requestAnimationFrame(() => this.animate(game));
    this.renderLoop(game);
  }

  private initCheckResize() {
    fromEvent(window, 'resize').pipe(auditTime(200)).subscribe(
      () => this.game?.refreshRenderer())
  }


  togglePaused() {
    if (this.game) {
      this.game.paused = !this.game.paused;
      this.syncHud();
    }
  }

  selectDrawModel(modelId: string) {
    if (this.game) {
      this.game.drawModelId = modelId;
      this.game.drawModelOpen = false;
      this.syncHud();
    }
  }

}
