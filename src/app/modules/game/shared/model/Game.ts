import * as THREE from 'three';
import { MapHelper } from "./MapHelper";

export enum GameMode {
  MAP, FIGHT
}

// export const CAMERA_LOOK = new THREE.Vector3(0, 30, 160);
export const CAMERA_LOOK = new THREE.Vector3(0, 140, 160);
export const TOO_CLOSE_LIMIT = 40;
export const TOO_FAR_LIMIT = 480;
//export const TOO_FAR_LIMIT = 300;
export const SHADE_OFFSET = 32;

export class Game {
  scene: THREE.Scene;
  raycaster: THREE.Raycaster;
  canvas: HTMLCanvasElement;
  camera: THREE.PerspectiveCamera;
  light: THREE.AmbientLight;
  renderer: THREE.WebGLRenderer;
  mapHelper: MapHelper;
  mode: GameMode;
  loading: boolean;
  frame: number;
  framePerSec: number;
  paused: boolean;

  drawModelOpen: boolean;
  drawModelId: string;

  constructor(o: any) {
    this.scene = o.scene;
    this.raycaster = o.raycaster;
    this.canvas = o.canvas;
    this.camera = o.camera;
    this.light = o.light;
    this.renderer = o.renderer;
    this.mapHelper = o.mapHelper;
    this.mode = o.mode;
    this.loading = o.loading;
    this.frame = o.frame || 0;
    this.framePerSec = o.framePerSec || 0;
    this.paused = o.paused;

    this.drawModelOpen = o.drawModelOpen;
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
