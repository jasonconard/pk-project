import * as THREE from 'three';
import { MapHelper } from "./MapHelper";
import { FightHelper } from "../../../fight/shared/models/FightHelper";
import { WeatherHelper } from "../weather/WeatherHelper";
import { Diagnostics } from "./Diagnostics";
import { AUTO_HIGH_FPS, AUTO_HIGH_SECONDS, AUTO_LOW_FPS, AUTO_LOW_SECONDS, AUTO_MIN_RATIO, AUTO_RATIO_STEP, isTouchDevice, QUALITY_PRESETS, QualityMode, RENDER_DETAIL } from "./Quality";
import type { EditBrush, EditSelection } from "../services/map-editor.service";

export enum GameMode {
  MAP, FIGHT
}

// export const CAMERA_LOOK = new THREE.Vector3(0, 30, 160);
export const CAMERA_LOOK = new THREE.Vector3(0, 140, 160);
export const TOO_CLOSE_LIMIT = 40;
export const TOO_FAR_LIMIT = 480;
//export const TOO_FAR_LIMIT = 300;
export const SHADE_OFFSET = 32;

/**
 * Shadows setup (the sun position and light levels are driven by the weather, see WeatherHelper).
 * - SHADOW_AREA: half size of the square (world units) around the camera target where shadows are computed.
 * - SHADOW_MAP_SIZE: shadow texture resolution at start (higher = sharper shadows, slower); then set by the
 *   graphics quality (see Quality.ts).
 * - SUN_DISTANCE: distance between the sun light and the camera target (only matters for the shadow camera).
 */
export const SHADOW_AREA = 256;
export const SHADOW_MAP_SIZE = 2048;
export const SUN_DISTANCE = 500;

export interface GameInit {
  scene: THREE.Scene;
  raycaster: THREE.Raycaster;
  renderer: THREE.WebGLRenderer;
  canvas: HTMLElement;
  mode: GameMode;
}

export class Game {
  scene: THREE.Scene;
  raycaster: THREE.Raycaster;
  canvas: HTMLElement;
  /** Replaced by the map / fight services when the game mode changes. */
  camera = new THREE.PerspectiveCamera();
  ambientLight: THREE.AmbientLight;
  sun: THREE.DirectionalLight;
  weather: WeatherHelper;
  renderer: THREE.WebGLRenderer;
  mapHelper?: MapHelper;
  fightHelper?: FightHelper;
  mode: GameMode;
  loading = false;
  frame = 0;
  framePerSec = 0;
  paused = false;

  /** Map editor: the player is frozen and the camera moves freely (see MapEditorService). */
  editMode = false;
  /** Map editor: model being placed (null = none selected: the mouse only moves the camera). */
  editModelId: string | null = null;
  /** Map editor: ground tile being painted ('erase' = original ground, null = none). */
  editTileId: string | null = null;
  /** Map editor: ground brush size in cells, or the bucket. */
  editBrush: EditBrush = 1;
  /** Map editor: the cells grid is drawn on the ground. */
  editGrid = false;
  /** Map editor: the selected object (null = none), and whether there are changes to undo / redo. */
  editSelection: EditSelection | null = null;
  editCanUndo = false;
  editCanRedo = false;
  /** Camera distance factor: 1 = normal view, the editor zooms in (< 1) and out (> 1). */
  cameraZoom = 1;

  constructor(o: GameInit) {
    this.scene = o.scene;
    this.raycaster = o.raycaster;
    this.canvas = o.canvas;
    this.renderer = o.renderer;
    this.mode = o.mode;

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    this.ambientLight = new THREE.AmbientLight(0xffffff);
    this.sun = Game.makeSun();
    this.scene.add(this.ambientLight, this.sun, this.sun.target);
    this.weather = new WeatherHelper(this);
  }

  private static makeSun(): THREE.DirectionalLight {
    const sun = new THREE.DirectionalLight(0xffffff);
    sun.castShadow = true;
    sun.shadow.mapSize.set(SHADOW_MAP_SIZE, SHADOW_MAP_SIZE);
    const cam = sun.shadow.camera;
    cam.left = -SHADOW_AREA;
    cam.right = SHADOW_AREA;
    cam.top = SHADOW_AREA;
    cam.bottom = -SHADOW_AREA;
    cam.near = 1;
    cam.far = SUN_DISTANCE * 2;
    cam.updateProjectionMatrix();
    // Avoid "shadow acne" (striped self-shadowing) on walls and ground
    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.25; // ~2 shadow texels
    return sun;
  }

  /** Camera position relative to the point it looks at (CAMERA_LOOK, scaled by the zoom). */
  public cameraOffset(): THREE.Vector3 {
    return CAMERA_LOOK.clone().multiplyScalar(this.cameraZoom);
  }

  /** Point of the ground the camera is looking at. */
  public getCameraTarget(): THREE.Vector3 {
    return this.camera.position.clone().sub(this.cameraOffset());
  }

  /** Keep the sun (and its shadow area) centered on the camera target, lighting from `sunDir`. */
  public placeSun(target: THREE.Vector3, sunDir: THREE.Vector3) {
    // Snap to the shadow-map texel grid so shadows don't shimmer while the camera moves
    const texel = (SHADOW_AREA * 2) / (this.shadowMapSize || SHADOW_MAP_SIZE);
    const snapped = new THREE.Vector3(
      Math.round(target.x / texel) * texel,
      Math.round(target.y / texel) * texel,
      Math.round(target.z / texel) * texel
    );
    this.sun.target.position.copy(snapped);
    this.sun.position.copy(snapped).addScaledVector(sunDir, SUN_DISTANCE);
  }

  /** Update lights and weather effects, `dt` in seconds. */
  public updateLights(dt = 0) {
    this.weather.update(dt);
  }

  /** Diagnostic console measures (only taken while it is open). */
  readonly diagnostics = new Diagnostics();

  /** Graphics quality chosen, render pixel ratio and shadow texture size in use (see Quality.ts). */
  qualityMode: QualityMode = 'auto';
  pixelRatio = 1;
  shadowMapSize = 2048;
  /** Auto quality: seconds in a row below / above the fps thresholds. */
  private slowSeconds = 0;
  private fastSeconds = 0;

  /** Rendering detail in use (auto quality changes it): particles share, full screen effects. */
  detail = 1;
  postEffects = true;

  /** Applies a quality mode: render resolution (capped screen density), shadows, particles, full screen effects. */
  public setQuality(mode: QualityMode) {
    this.qualityMode = mode;
    const preset = QUALITY_PRESETS[mode === 'auto' ? (isTouchDevice() ? 'medium' : 'high') : mode];
    this.slowSeconds = this.fastSeconds = 0;
    this.applyQuality(Math.min(window.devicePixelRatio, preset.maxPixelRatio), preset.shadowMapSize, preset.detail, preset.postEffects);
  }

  /**
   * Auto quality, called every second with the measured fps. Too slow for a while → one step down: lower
   * resolution, then smaller shadows, then the low preset (no shadows, fewer particles, no full screen effects).
   * Fast for a while → one step back up, the other way round, up to the high preset.
   */
  public adaptQuality(fps: number) {
    if (this.qualityMode !== 'auto' || this.paused || this.loading) {
      return;
    }
    this.slowSeconds = fps < AUTO_LOW_FPS ? this.slowSeconds + 1 : 0;
    this.fastSeconds = fps >= AUTO_HIGH_FPS ? this.fastSeconds + 1 : 0;
    const { high, medium, low } = QUALITY_PRESETS;
    const maxRatio = Math.min(window.devicePixelRatio, high.maxPixelRatio);
    const minShadows = medium.shadowMapSize / 2;
    if (this.slowSeconds >= AUTO_LOW_SECONDS) {
      this.slowSeconds = 0;
      if (this.pixelRatio > AUTO_MIN_RATIO) {
        this.applyQuality(Math.max(AUTO_MIN_RATIO, this.pixelRatio - AUTO_RATIO_STEP), this.shadowMapSize, this.detail, this.postEffects);
      } else if (this.shadowMapSize > minShadows) {
        this.applyQuality(this.pixelRatio, this.shadowMapSize / 2, this.detail, this.postEffects);
      } else if (this.shadowMapSize) {
        this.applyQuality(Math.min(this.pixelRatio, low.maxPixelRatio), low.shadowMapSize, low.detail, low.postEffects);
      }
    } else if (this.fastSeconds >= AUTO_HIGH_SECONDS) {
      this.fastSeconds = 0;
      if (!this.shadowMapSize) {
        this.applyQuality(Math.max(this.pixelRatio, AUTO_MIN_RATIO), minShadows, medium.detail, medium.postEffects);
      } else if (this.shadowMapSize < medium.shadowMapSize) {
        this.applyQuality(this.pixelRatio, this.shadowMapSize * 2, this.detail, this.postEffects);
      } else if (this.pixelRatio < maxRatio) {
        this.applyQuality(Math.min(maxRatio, this.pixelRatio + AUTO_RATIO_STEP), this.shadowMapSize, high.detail, this.postEffects);
      }
    }
  }

  /** @param shadowMapSize shadow texture size, 0 = no shadows */
  private applyQuality(pixelRatio: number, shadowMapSize: number, detail: number, postEffects: boolean) {
    this.pixelRatio = pixelRatio;
    this.renderer.setPixelRatio(pixelRatio);
    // Below 1 the picture is enlarged: keep the pixels crisp (pixel art) instead of blurring them
    this.renderer.domElement.style.imageRendering = pixelRatio < 1 ? 'pixelated' : '';
    this.detail = detail;
    this.postEffects = postEffects;
    RENDER_DETAIL.particles = detail;
    RENDER_DETAIL.postEffects = postEffects;
    // Shadows on / off: the materials are compiled again once (three.js notices the light change)
    this.sun.castShadow = shadowMapSize > 0;
    if (shadowMapSize && (shadowMapSize !== this.shadowMapSize || !this.sun.shadow.map)) {
      this.sun.shadow.mapSize.set(shadowMapSize, shadowMapSize);
      // The shadow texture is created again at its new size on the next frame
      this.sun.shadow.map?.dispose();
      this.sun.shadow.map = null;
    }
    this.shadowMapSize = shadowMapSize;
  }

  public render() {
    // (no setPixelRatio here: it sets the canvas size again at every frame, which Safari pays for; applyQuality
    // sets it when it changes)
    this.updateLights();
    this.renderFrame();
  }

  /** Draws the scene on screen (through the weather post effects when needed: sun rays, window bloom). */
  public renderFrame() {
    if (!this.weather.renderPostEffects()) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  /**
   * Prepares the whole map for the GPU at once, while loading: the shaders of every object are compiled and the
   * textures sent, hidden chunks included. Otherwise it happens the first time a chunk comes into view, and the
   * game stutters while walking (very visible with Safari).
   */
  public warmUp() {
    const hidden: THREE.Object3D[] = [];
    this.scene.traverse(object => {
      if (!object.visible) {
        hidden.push(object);
        object.visible = true;
      }
    });
    this.renderer.compile(this.scene, this.camera);
    const textures = new Set<THREE.Texture>();
    this.scene.traverse(object => {
      const material = (object as THREE.Mesh).material;
      (Array.isArray(material) ? material : material ? [material] : []).forEach(m => {
        Object.values(m).forEach(value => (value as THREE.Texture)?.isTexture && textures.add(value));
        Object.values((m as THREE.ShaderMaterial).uniforms ?? {}).forEach(u => (u.value as THREE.Texture)?.isTexture && textures.add(u.value));
      });
    });
    textures.forEach(texture => this.renderer.initTexture(texture));
    hidden.forEach(object => object.visible = false);
  }

  public refreshRenderer() {
    const rect = this.canvas.getBoundingClientRect();
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( rect.width, rect.height );
  }

}
