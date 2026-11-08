import * as THREE from 'three';
import { RENDER_DETAIL } from '../model/Quality';
import { SurfaceHeights } from './SurfaceHeights';
import { registerUnlitMaterial } from './weather-shader';

/** Flakes at snow = 1, and the max (snow up to 2: blizzard). */
const FLAKES_PER_DENSITY = 2000;
const MAX_FLAKES = 4000;
/** Area (relative to the point the camera looks at) where it snows: wide enough to cover the screen. */
const SNOW_AREA = { minX: -240, maxX: 240, minZ: -300, maxZ: 140 };
/** Height (above the camera target) where flakes appear. */
const SNOW_TOP = 220;
/** Fall speed range (world units / s): much slower than rain. */
const FALL_SPEED = [22, 42] as const;
/** Horizontal speed of the flakes at full wind (world units / s), plus a light constant drift in z. */
const SNOW_WIND_SPEED = 60;
const SNOW_DRIFT_Z = 3;
/** Side-to-side swaying amplitude (world units) and speed. */
const SWAY = 2.5;
const SWAY_SPEED = 1.6;
/** Flake size range (world units). */
const FLAKE_SIZE = [0.6, 1.4] as const;

function makeFlakeTexture(): THREE.CanvasTexture {
  const size = 32;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.5, 'rgba(255,255,255,0.8)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Snowflakes slowly falling and swaying around the camera target. Each flake stops on the first surface
 * below where it lands (ground, roof...). The white layer itself is drawn by the weather shader (uSnowCover).
 */
export class SnowHelper {
  private readonly flakes: THREE.InstancedMesh;
  private readonly x = new Float32Array(MAX_FLAKES);
  private readonly y = new Float32Array(MAX_FLAKES);
  private readonly z = new Float32Array(MAX_FLAKES);
  private readonly stopY = new Float32Array(MAX_FLAKES);
  private readonly speed = new Float32Array(MAX_FLAKES);
  private readonly phase = new Float32Array(MAX_FLAKES);
  private readonly size = new Float32Array(MAX_FLAKES);
  private readonly alive = new Uint8Array(MAX_FLAKES);
  private activeFlakes = 0;
  private time = 0;
  /** Current horizontal speed of the flakes (wind). */
  private vx = 0;
  /** Blizzard: fall speed multiplier, flakes stretched along the wind. */
  private fallScale = 1;
  private stretch = 1;

  private readonly matrix = new THREE.Matrix4();
  private readonly position = new THREE.Vector3();
  private readonly scale = new THREE.Vector3();

  constructor(scene: THREE.Scene, private readonly surfaces: SurfaceHeights) {
    const material = new THREE.MeshBasicMaterial({
      map: makeFlakeTexture(),
      color: 0xffffff,
      transparent: true,
      depthWrite: false,
    });
    registerUnlitMaterial(material); // dimmed at night like the other sprites
    this.flakes = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), material, MAX_FLAKES);
    this.flakes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.flakes.frustumCulled = false;
    this.flakes.renderOrder = 10; // after the (possibly transparent) buildings, like the rain
    this.flakes.count = 0;
    this.flakes.visible = false;
    scene.add(this.flakes);
  }

  /**
   * @param density 0..2, FLAKES_PER_DENSITY flakes per unit
   * @param camera flakes always face it (billboards)
   * @param windX signed wind, -1..1
   * @param drift how much the wind carries the flakes (1 = normal snow, more = blizzard, almost horizontal)
   */
  update(dt: number, target: THREE.Vector3, density: number, camera: THREE.Camera, windX = 0, drift = 1) {
    this.vx = windX * SNOW_WIND_SPEED * drift;
    // Blown snow falls faster (else flakes would start far off screen) and streaks along the wind
    this.fallScale = 1 + (drift - 1) * 0.6;
    this.stretch = 1 + (drift - 1) * 0.5 * Math.min(Math.abs(windX), 1);
    // (fewer flakes at a lower graphics quality)
    const count = Math.min(Math.round(FLAKES_PER_DENSITY * RENDER_DETAIL.particles * Math.max(density, 0)), MAX_FLAKES);
    for (let i = count; i < this.activeFlakes; i++) {
      this.alive[i] = 0;
    }
    this.activeFlakes = count;
    this.flakes.visible = count > 0;
    if (!count) {
      return;
    }
    this.time += dt;

    for (let i = 0; i < count; i++) {
      if (!this.alive[i]) {
        this.respawn(i, target, true);
      }
      this.y[i] -= this.speed[i] * this.fallScale * dt;
      this.x[i] += this.vx * dt;
      this.z[i] += SNOW_DRIFT_Z * dt;

      // Area check on where the flake will land (it drifts with the wind)
      const fallLeft = Math.max(this.y[i] - this.stopY[i], 0) / (this.speed[i] * this.fallScale);
      const dx = this.x[i] + this.vx * fallLeft - target.x;
      const dz = this.z[i] + SNOW_DRIFT_Z * fallLeft - target.z;
      if (dx < SNOW_AREA.minX || dx > SNOW_AREA.maxX || dz < SNOW_AREA.minZ || dz > SNOW_AREA.maxZ) {
        this.respawn(i, target, true);
      } else if (this.y[i] <= this.stopY[i]) {
        this.respawn(i, target, false); // landed: melts into the snow layer
      }

      const sway = Math.sin(this.time * SWAY_SPEED + this.phase[i]) * SWAY;
      this.position.set(this.x[i] + sway, this.y[i], this.z[i] + sway * 0.4);
      this.scale.set(this.size[i] * this.stretch, this.size[i], this.size[i]);
      this.matrix.compose(this.position, camera.quaternion, this.scale);
      this.flakes.setMatrixAt(i, this.matrix);
    }
    this.flakes.count = count;
    this.flakes.instanceMatrix.needsUpdate = true;
  }

  private respawn(i: number, target: THREE.Vector3, randomHeight: boolean) {
    // Pick where the flake lands, then start it upwind so the wind brings it there
    const landX = target.x + THREE.MathUtils.randFloat(SNOW_AREA.minX, SNOW_AREA.maxX);
    const landZ = target.z + THREE.MathUtils.randFloat(SNOW_AREA.minZ, SNOW_AREA.maxZ);
    const top = target.y + SNOW_TOP;
    const speed = THREE.MathUtils.randFloat(FALL_SPEED[0], FALL_SPEED[1]);
    const stopY = this.surfaces.heightAt(landX, landZ, target.y);
    // Random height on (re)activation so flakes don't all fall in a single wave
    const y = randomHeight ? THREE.MathUtils.randFloat(stopY, Math.max(top, stopY)) : Math.max(top, stopY);
    const fallTime = (y - stopY) / (speed * this.fallScale);
    this.x[i] = landX - this.vx * fallTime;
    this.z[i] = landZ - SNOW_DRIFT_Z * fallTime;
    this.y[i] = y;
    this.stopY[i] = stopY;
    this.speed[i] = speed;
    this.phase[i] = Math.random() * Math.PI * 2;
    this.size[i] = THREE.MathUtils.randFloat(FLAKE_SIZE[0], FLAKE_SIZE[1]);
    this.alive[i] = 1;
  }
}
