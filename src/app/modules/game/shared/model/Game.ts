import * as THREE from 'three';
import { MapHelper } from "./MapHelper";
import { FightHelper } from "../../../fight/shared/models/FightHelper";

export enum GameMode {
  MAP, FIGHT
}

// export const CAMERA_LOOK = new THREE.Vector3(0, 30, 160);
export const CAMERA_LOOK = new THREE.Vector3(0, 140, 160);
export const TOO_CLOSE_LIMIT = 40;
export const TOO_FAR_LIMIT = 480;
//export const TOO_FAR_LIMIT = 300;
export const SHADE_OFFSET = 32;

export interface GameInit {
  scene: THREE.Scene;
  raycaster: THREE.Raycaster;
  renderer: THREE.WebGLRenderer;
  canvas: HTMLElement;
  mode: GameMode;
  drawModelId: string;
}

export class Game {
  scene: THREE.Scene;
  raycaster: THREE.Raycaster;
  canvas: HTMLElement;
  /** Replaced by the map / fight services when the game mode changes. */
  camera = new THREE.PerspectiveCamera();
  light?: THREE.AmbientLight;
  renderer: THREE.WebGLRenderer;
  mapHelper?: MapHelper;
  fightHelper?: FightHelper;
  mode: GameMode;
  loading = false;
  frame = 0;
  framePerSec = 0;
  paused = false;

  drawModelOpen = false;
  drawModelId: string;

  constructor(o: GameInit) {
    this.scene = o.scene;
    this.raycaster = o.raycaster;
    this.canvas = o.canvas;
    this.renderer = o.renderer;
    this.mode = o.mode;
    this.drawModelId = o.drawModelId;
  }

  public render() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.render(this.scene, this.camera);
  }

  public refreshRenderer() {
    const rect = this.canvas.getBoundingClientRect();
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( rect.width, rect.height );
  }

}
