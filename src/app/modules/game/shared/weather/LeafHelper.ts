import * as THREE from 'three';
import { RENDER_DETAIL } from '../model/Quality';
import { SurfaceHeights } from './SurfaceHeights';
import { registerUnlitMaterial, SWAY_ATTRIBUTE } from './weather-shader';

/** 'autumn' = leaves of all colors from the trees, 'cherry' = pink cherry blossom petals. */
export type LeafMode = 'autumn' | 'cherry';

/** Leaves at density = 1. */
const MAX_LEAVES = 450;
/** Area (relative to the point the camera looks at) where leaves fall: covers the screen. */
const AREA = { minX: -240, maxX: 240, minZ: -300, maxZ: 140 };
/** Spawn height above the surface below, share spawned around the plants (the trees drop them). */
const SPAWN_HEIGHT = [18, 55] as const;
const NEAR_PLANTS = 0.6;
const PLANT_RADIUS = 14;
const PLANTS_REFRESH = 2;
/** Fall speed range (world units / s): leaves glide slowly. */
const FALL_SPEED = [6, 12] as const;
/** Horizontal drift: without wind, and added at full wind (world units / s). */
const DRIFT_NO_WIND = 3;
const WIND_SPEED = 45;
/** Side-to-side swinging (world units) and its speed. */
const SWING = 3;
const SWING_SPEED = 1.8;
/** Time lying on the ground before vanishing, then shrinking time (s). */
const REST_TIME = [3, 7] as const;
const SHRINK_TIME = 0.8;

const SIZE: Record<LeafMode, readonly [number, number]> = { autumn: [3.2, 4.8], cherry: [2.4, 3.4] };
export const LEAF_PALETTES: Record<LeafMode, number[]> = {
  autumn: [0xd9822b, 0xc4452b, 0xe6b33d, 0xb5562a, 0x9a6b2f, 0x8fb040],
  cherry: [0xffc0dc, 0xffadd2, 0xffd9ea, 0xff9ac6, 0xfff0f6],
};

/** White leaf / petal shapes (tinted per instance), drawn on a canvas. */
export function makeLeafTexture(mode: LeafMode): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.translate(size / 2, size / 2);
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  if (mode === 'autumn') {
    // Pointed leaf with a darker midrib
    ctx.moveTo(0, -28);
    ctx.bezierCurveTo(22, -14, 18, 16, 0, 28);
    ctx.bezierCurveTo(-18, 16, -22, -14, 0, -28);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -22);
    ctx.lineTo(0, 30);
    ctx.stroke();
  } else {
    // Rounded petal with the small notch of the cherry blossom
    ctx.moveTo(0, 28);
    ctx.bezierCurveTo(-26, 10, -22, -24, -6, -26);
    ctx.lineTo(0, -18);
    ctx.lineTo(6, -26);
    ctx.bezierCurveTo(22, -24, 26, 10, 0, 28);
    ctx.fill();
    const g = ctx.createRadialGradient(0, 22, 0, 0, 22, 26);
    g.addColorStop(0, 'rgba(255,90,150,0.45)');
    g.addColorStop(1, 'rgba(255,90,150,0)');
    ctx.fillStyle = g;
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Leaves or petals gliding down around the camera target: they swing and tumble, drift with the wind,
 * lie on the surface where they land (ground, roofs) for a few seconds, then vanish.
 */
export class LeafHelper {
  private readonly mesh: THREE.InstancedMesh;
  private readonly material: THREE.MeshBasicMaterial;
  private readonly textures: Record<LeafMode, THREE.CanvasTexture> = { autumn: makeLeafTexture('autumn'), cherry: makeLeafTexture('cherry') };
  private mode: LeafMode = 'autumn';

  private readonly x = new Float32Array(MAX_LEAVES);
  private readonly y = new Float32Array(MAX_LEAVES);
  private readonly z = new Float32Array(MAX_LEAVES);
  private readonly speed = new Float32Array(MAX_LEAVES);
  private readonly size = new Float32Array(MAX_LEAVES);
  private readonly phase = new Float32Array(MAX_LEAVES);
  private readonly spin = new Float32Array(MAX_LEAVES);
  /** Seconds lying on the ground (-1 = still falling) and how long it stays. */
  private readonly rest = new Float32Array(MAX_LEAVES);
  private readonly restTime = new Float32Array(MAX_LEAVES);
  private readonly alive = new Uint8Array(MAX_LEAVES);
  private active = 0;
  private time = 0;
  private plants: THREE.Vector3[] = [];
  private plantsAge = PLANTS_REFRESH;

  private readonly matrix = new THREE.Matrix4();
  private readonly position = new THREE.Vector3();
  private readonly scale = new THREE.Vector3();
  private readonly quaternion = new THREE.Quaternion();
  private readonly euler = new THREE.Euler();
  private readonly color = new THREE.Color();

  constructor(private readonly scene: THREE.Scene, private readonly surfaces: SurfaceHeights) {
    this.material = registerUnlitMaterial(new THREE.MeshBasicMaterial({
      map: this.textures.autumn,
      alphaTest: 0.5, // cut-out shapes: no transparency sorting needed
      side: THREE.DoubleSide,
    }));
    this.mesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), this.material, MAX_LEAVES);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.setColorAt(0, this.color.set(0xffffff)); // creates the instance color buffer
    this.mesh.frustumCulled = false;
    this.mesh.castShadow = true;
    this.mesh.raycast = () => {};
    this.mesh.count = 0;
    this.mesh.visible = false;
    scene.add(this.mesh);
  }

  /** Switches between autumn leaves and cherry petals: the falling ones are replaced progressively. */
  setMode(mode: LeafMode) {
    if (mode === this.mode) {
      return;
    }
    this.mode = mode;
    this.material.map = this.textures[mode];
    // Recolor and resize everything at once (otherwise old colors would show with the new shape)
    for (let i = 0; i < MAX_LEAVES; i++) {
      if (this.alive[i]) {
        this.pickLook(i);
      }
    }
    this.mesh.instanceColor!.needsUpdate = true;
  }

  /**
   * @param density 0..1, share of MAX_LEAVES
   * @param windX signed wind, -1..1
   */
  update(dt: number, target: THREE.Vector3, density: number, windX = 0) {
    // (fewer leaves at a lower graphics quality)
    const count = Math.round(MAX_LEAVES * RENDER_DETAIL.particles * THREE.MathUtils.clamp(density, 0, 1));
    for (let i = count; i < this.active; i++) {
      this.alive[i] = 0;
    }
    this.active = count;
    this.mesh.visible = count > 0;
    if (!count) {
      return;
    }
    this.time += dt;
    this.refreshPlants(dt);
    const vx = Math.sign(windX || 1) * DRIFT_NO_WIND + windX * WIND_SPEED;

    for (let i = 0; i < count; i++) {
      if (!this.alive[i]) {
        this.respawn(i, target, true);
      }
      const p = this.phase[i];
      let s = this.size[i];
      if (this.rest[i] < 0) {
        // Falling: gliding swing, slower when the leaf swings wide, tumbling rotation
        const swing = Math.sin(this.time * SWING_SPEED + p);
        this.y[i] -= this.speed[i] * (0.6 + 0.4 * Math.abs(Math.cos(this.time * SWING_SPEED + p))) * dt;
        this.x[i] += (vx + swing * SWING * SWING_SPEED * 0.5) * dt;
        this.z[i] += Math.cos(this.time * SWING_SPEED * 0.7 + p) * 1.5 * dt;
        const t = this.time * this.spin[i] + p;
        this.euler.set(Math.sin(t) * 1.2 + 0.4, t * 0.8, Math.cos(t * 1.3) * 0.9);
        // Surface below the current position (the leaf drifted since it spawned; the heights are cached)
        const stop = this.surfaces.heightAt(this.x[i], this.z[i], target.y);
        if (this.y[i] <= stop) {
          this.y[i] = stop;
          this.rest[i] = 0;
        }
        const dx = this.x[i] - target.x;
        const dz = this.z[i] - target.z;
        if (dx < AREA.minX || dx > AREA.maxX || dz < AREA.minZ || dz > AREA.maxZ) {
          this.respawn(i, target, false);
        }
      } else {
        // Lying flat on the surface, then shrinking away
        this.rest[i] += dt;
        this.euler.set(-Math.PI / 2, 0, p * 3);
        const left = this.restTime[i] - this.rest[i];
        if (left <= 0) {
          this.respawn(i, target, false);
        } else if (left < SHRINK_TIME) {
          s *= left / SHRINK_TIME;
        }
      }
      // Lying leaves sit slightly above the surface (no z-fighting)
      this.position.set(this.x[i], this.y[i] + (this.rest[i] >= 0 ? 0.15 : 0), this.z[i]);
      this.quaternion.setFromEuler(this.euler);
      this.scale.set(s, s, s);
      this.matrix.compose(this.position, this.quaternion, this.scale);
      this.mesh.setMatrixAt(i, this.matrix);
    }
    this.mesh.count = count;
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  private refreshPlants(dt: number) {
    this.plantsAge += dt;
    if (this.plantsAge < PLANTS_REFRESH) {
      return;
    }
    this.plantsAge = 0;
    const plants: THREE.Vector3[] = [];
    this.scene.traverseVisible(o => {
      const geometry = (o as THREE.Mesh).geometry as THREE.BufferGeometry | undefined;
      if (geometry?.getAttribute?.(SWAY_ATTRIBUTE)) {
        plants.push(o.getWorldPosition(new THREE.Vector3()));
      }
    });
    this.plants = plants;
  }

  private spawnPoint(target: THREE.Vector3): [number, number] {
    if (this.plants.length && Math.random() < NEAR_PLANTS) {
      for (let attempt = 0; attempt < 6; attempt++) {
        const plant = this.plants[Math.floor(Math.random() * this.plants.length)];
        const dx = plant.x - target.x;
        const dz = plant.z - target.z;
        if (dx > AREA.minX && dx < AREA.maxX && dz > AREA.minZ && dz < AREA.maxZ) {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * PLANT_RADIUS;
          return [plant.x + Math.cos(angle) * r, plant.z + Math.sin(angle) * r];
        }
      }
    }
    return [target.x + THREE.MathUtils.randFloat(AREA.minX, AREA.maxX), target.z + THREE.MathUtils.randFloat(AREA.minZ, AREA.maxZ)];
  }

  /** Random color and size from the current mode. */
  private pickLook(i: number) {
    const palette = LEAF_PALETTES[this.mode];
    this.mesh.setColorAt(i, this.color.set(palette[Math.floor(Math.random() * palette.length)]));
    const [min, max] = SIZE[this.mode];
    this.size[i] = THREE.MathUtils.randFloat(min, max);
  }

  private respawn(i: number, target: THREE.Vector3, randomHeight: boolean) {
    const [x, z] = this.spawnPoint(target);
    const ground = this.surfaces.heightAt(x, z, target.y);
    const top = ground + THREE.MathUtils.randFloat(SPAWN_HEIGHT[0], SPAWN_HEIGHT[1]);
    this.x[i] = x;
    this.z[i] = z;
    // Random height on (re)activation so they don't all fall in a single wave
    this.y[i] = randomHeight ? THREE.MathUtils.randFloat(ground, top) : top;
    this.speed[i] = THREE.MathUtils.randFloat(FALL_SPEED[0], FALL_SPEED[1]);
    this.phase[i] = Math.random() * Math.PI * 2;
    this.spin[i] = THREE.MathUtils.randFloat(0.8, 2.2);
    this.rest[i] = -1;
    this.restTime[i] = THREE.MathUtils.randFloat(REST_TIME[0], REST_TIME[1]);
    this.pickLook(i);
    this.alive[i] = 1;
    this.mesh.instanceColor!.needsUpdate = true;
  }
}
