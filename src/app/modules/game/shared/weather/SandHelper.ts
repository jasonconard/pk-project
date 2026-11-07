import * as THREE from 'three';
import { SurfaceHeights } from './SurfaceHeights';
import { registerUnlitMaterial } from './weather-shader';
import { makeSmokeTexture } from './GlowParticles';

/** Area (relative to the point the camera looks at) where the sand blows: covers the screen. */
const AREA = { minX: -260, maxX: 260, minZ: -300, maxZ: 140 };
/** Grains (fast streaks) and dust puffs (big slow soft clouds) at density = 1. */
const MAX_GRAINS = 1400;
const MAX_PUFFS = 70;
/** Grains height above the surface below, horizontal speed range at full wind (world units / s). */
const GRAIN_HEIGHT = [0.5, 35] as const;
const GRAIN_SPEED = [130, 220] as const;
/** Grain streak size (stretched along the wind). */
const GRAIN_LENGTH = [4, 8] as const;
const GRAIN_WIDTH = 0.5;
/** Puffs: height, speed (share of the wind), size, opacity. */
const PUFF_HEIGHT = [2, 25] as const;
const PUFF_SPEED = [40, 80] as const;
const PUFF_SIZE = [28, 55] as const;
const PUFF_OPACITY = 0.45;
/** Dust clouds rolling on themselves (rad / s). */
const PUFF_ROLL = 0.5;
const FORWARD = new THREE.Vector3(0, 0, 1);
/** Minimal wind used for the sand when the wind gauge is lower (the sand always blows). */
const MIN_WIND = 0.6;
// Lighter than the ochre-tinted ground so the streaks stand out
const SAND_COLORS = [0xf2dcae, 0xe8c48a, 0xfff0cf, 0xdcb880];
const DUST_COLORS = [0xd6b688, 0xc9a374, 0xe0c49c];


/** One group of particles blown along x (grains or puffs). */
class Blown {
  readonly mesh: THREE.InstancedMesh;
  readonly x: Float32Array;
  readonly y: Float32Array;
  readonly z: Float32Array;
  readonly speed: Float32Array;
  readonly length: Float32Array;
  readonly phase: Float32Array;
  readonly alive: Uint8Array;
  active = 0;

  constructor(readonly max: number, material: THREE.MeshBasicMaterial, renderOrder: number) {
    this.mesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), material, max);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.setColorAt(0, new THREE.Color(0xffffff)); // creates the instance color buffer
    this.mesh.frustumCulled = false;
    this.mesh.raycast = () => {};
    this.mesh.renderOrder = renderOrder;
    this.mesh.count = 0;
    this.mesh.visible = false;
    this.x = new Float32Array(max);
    this.y = new Float32Array(max);
    this.z = new Float32Array(max);
    this.speed = new Float32Array(max);
    this.length = new Float32Array(max);
    this.phase = new Float32Array(max);
    this.alive = new Uint8Array(max);
  }
}

/**
 * Sandstorm: sand grains streaking horizontally with the wind, and big dust puffs rolling slower.
 * Particles enter on the upwind side of the area and leave on the other one.
 */
export class SandHelper {
  private readonly grains: Blown;
  private readonly puffs: Blown;
  private time = 0;

  private readonly matrix = new THREE.Matrix4();
  private readonly position = new THREE.Vector3();
  private readonly scale = new THREE.Vector3();
  private readonly color = new THREE.Color();
  private readonly spin = new THREE.Quaternion();
  private readonly turned = new THREE.Quaternion();

  constructor(scene: THREE.Scene, private readonly surfaces: SurfaceHeights) {
    const grainMaterial = registerUnlitMaterial(new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    }));
    const puffMaterial = registerUnlitMaterial(new THREE.MeshBasicMaterial({
      // Cloudy outline (smoke texture) rather than a round blob: the dust looks billowing
      map: makeSmokeTexture(),
      transparent: true,
      opacity: PUFF_OPACITY,
      depthWrite: false,
    }));
    this.grains = new Blown(MAX_GRAINS, grainMaterial, 10);
    this.puffs = new Blown(MAX_PUFFS, puffMaterial, 11);
    scene.add(this.grains.mesh, this.puffs.mesh);
  }

  /** Tint of the grains and puffs (multiplies their sandy colors; white = unchanged). */
  setTint(tint: THREE.Color) {
    for (const mesh of [this.grains.mesh, this.puffs.mesh]) {
      ((mesh.material as THREE.Material).userData['unlitBaseColor'] as THREE.Color | undefined)?.copy(tint);
    }
  }

  /** Wind actually pushing the sand: at least MIN_WIND, in the wind direction. */
  static sandWind(windX: number): number {
    return Math.sign(windX || 1) * Math.max(Math.abs(windX), MIN_WIND);
  }

  /**
   * @param density 0..1
   * @param camera particles face it (the camera right axis is the world x axis: streaks stay horizontal)
   * @param windX signed wind, -1..1
   */
  update(dt: number, target: THREE.Vector3, density: number, camera: THREE.Camera, windX: number) {
    this.time += dt;
    const wind = SandHelper.sandWind(windX);
    this.updateGroup(this.grains, dt, target, density, camera, wind, false);
    this.updateGroup(this.puffs, dt, target, density, camera, wind, true);
  }

  private updateGroup(g: Blown, dt: number, target: THREE.Vector3, density: number, camera: THREE.Camera,
                      wind: number, puff: boolean) {
    const count = Math.round(g.max * THREE.MathUtils.clamp(density, 0, 1));
    for (let i = count; i < g.active; i++) {
      g.alive[i] = 0;
    }
    g.active = count;
    g.mesh.visible = count > 0;
    if (!count) {
      return;
    }
    const dir = Math.sign(wind);
    for (let i = 0; i < count; i++) {
      if (!g.alive[i]) {
        this.respawn(g, i, target, puff, dir, true);
      }
      g.x[i] += g.speed[i] * wind * dt;
      // Grains bounce a little (saltation), puffs slowly rise and fall
      const p = g.phase[i];
      const bob = puff ? Math.sin(this.time * 0.4 + p) * 3 : Math.sin(this.time * 6 + p) * 0.6;
      const dx = g.x[i] - target.x;
      const dz = g.z[i] - target.z;
      // Left the area downwind (or the camera moved): back on the upwind side
      if (dx * dir > AREA.maxX || dx * dir < AREA.minX - 40 || dz < AREA.minZ || dz > AREA.maxZ) {
        this.respawn(g, i, target, puff, dir, false);
      }
      this.position.set(g.x[i], g.y[i] + bob, g.z[i]);
      if (puff) {
        this.scale.set(g.length[i], g.length[i] * 0.6, 1);
      } else {
        this.scale.set(g.length[i] * (0.5 + 0.5 * Math.abs(wind)), GRAIN_WIDTH, 1);
      }
      if (puff) {
        // Dust clouds roll on themselves while they are blown
        this.spin.setFromAxisAngle(FORWARD, p * 3 + this.time * PUFF_ROLL * (p > Math.PI ? 1 : -1));
        this.matrix.compose(this.position, this.turned.copy(camera.quaternion).multiply(this.spin), this.scale);
      } else {
        this.matrix.compose(this.position, camera.quaternion, this.scale);
      }
      g.mesh.setMatrixAt(i, this.matrix);
    }
    g.mesh.count = count;
    g.mesh.instanceMatrix.needsUpdate = true;
  }

  private respawn(g: Blown, i: number, target: THREE.Vector3, puff: boolean, dir: number, anywhere: boolean) {
    // Upwind edge (or anywhere on (re)activation so the screen fills at once)
    const x = anywhere
      ? THREE.MathUtils.randFloat(AREA.minX, AREA.maxX)
      : -dir * THREE.MathUtils.randFloat(AREA.maxX - 30, AREA.maxX);
    g.x[i] = target.x + x;
    g.z[i] = target.z + THREE.MathUtils.randFloat(AREA.minZ, AREA.maxZ);
    const ground = this.surfaces.heightAt(g.x[i], g.z[i], target.y);
    const [h0, h1] = puff ? PUFF_HEIGHT : GRAIN_HEIGHT;
    // Grains mostly close to the ground
    const t = puff ? Math.random() : Math.pow(Math.random(), 2);
    g.y[i] = ground + h0 + (h1 - h0) * t;
    const [s0, s1] = puff ? PUFF_SPEED : GRAIN_SPEED;
    g.speed[i] = THREE.MathUtils.randFloat(s0, s1);
    const [l0, l1] = puff ? PUFF_SIZE : GRAIN_LENGTH;
    g.length[i] = THREE.MathUtils.randFloat(l0, l1);
    g.phase[i] = Math.random() * Math.PI * 2;
    const colors = puff ? DUST_COLORS : SAND_COLORS;
    g.mesh.setColorAt(i, this.color.set(colors[Math.floor(Math.random() * colors.length)]));
    g.mesh.instanceColor!.needsUpdate = true;
    g.alive[i] = 1;
  }
}
