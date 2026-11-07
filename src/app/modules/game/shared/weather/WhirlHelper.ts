import * as THREE from 'three';
import { LEAF_PALETTES, makeLeafTexture } from './LeafHelper';
import { registerUnlitMaterial } from './weather-shader';

/** Area (relative to the camera target) where the whirls travel. */
const AREA = { minX: -220, maxX: 220, minZ: -260, maxZ: 120 };
/** Whirls at density = 1, petals per whirl. */
const MAX_WHIRLS = 4;
const PETALS_PER_WHIRL = 110;
/** Whirl shape: radius at the bottom / top, height (world units). */
const RADIUS = [4, 18] as const;
const HEIGHT = 45;
/** Bottom of the spiral above the ground: clears the flowers, signs and fences (no petals going through them). */
const BASE_HEIGHT = 14;
/** Petals turning speed (rad / s, faster near the axis), climbing speed (world units / s). */
const SPIN = 2.6;
const CLIMB = [6, 14] as const;
/** Whirl travel speed with the wind (world units / s), and its own wandering. */
const TRAVEL = 40;
const WANDER = 12;
const PETAL_SIZE = [2.2, 3.4] as const;

interface Whirl {
  x: number;
  z: number;
  phase: number;
  presence: number;
}

/**
 * Giant petal gusts: whirlwinds of cherry petals spiralling up, travelling across with the wind,
 * the petals thrown out at the top and sucked back in at the bottom.
 */
export class WhirlHelper {
  private readonly mesh: THREE.InstancedMesh;
  private readonly whirls: Whirl[] = [];
  private readonly petals = Array.from({ length: PETALS_PER_WHIRL }, () => ({
    angle: Math.random() * Math.PI * 2,
    h: Math.random(),
    climb: THREE.MathUtils.randFloat(CLIMB[0], CLIMB[1]),
    spin: THREE.MathUtils.randFloat(0.7, 1.3),
    size: THREE.MathUtils.randFloat(PETAL_SIZE[0], PETAL_SIZE[1]),
    tumble: Math.random() * 10,
  }));
  private time = 0;
  private readonly matrix = new THREE.Matrix4();
  private readonly position = new THREE.Vector3();
  private readonly scale = new THREE.Vector3();
  private readonly quaternion = new THREE.Quaternion();
  private readonly euler = new THREE.Euler();
  private readonly color = new THREE.Color();

  constructor(scene: THREE.Scene) {
    const material = registerUnlitMaterial(new THREE.MeshBasicMaterial({
      map: makeLeafTexture('cherry'), alphaTest: 0.5, side: THREE.DoubleSide,
    }));
    this.mesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), material, MAX_WHIRLS * PETALS_PER_WHIRL);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const palette = LEAF_PALETTES.cherry;
    for (let i = 0; i < MAX_WHIRLS * PETALS_PER_WHIRL; i++) {
      this.mesh.setColorAt(i, this.color.set(palette[i % palette.length]));
    }
    this.mesh.frustumCulled = false;
    this.mesh.castShadow = true;
    this.mesh.visible = false;
    this.mesh.raycast = () => {};
    scene.add(this.mesh);
  }

  update(dt: number, target: THREE.Vector3, density: number, windX: number) {
    const wanted = Math.round(MAX_WHIRLS * THREE.MathUtils.clamp(density, 0, 1));
    if (!wanted && !this.whirls.length) {
      this.mesh.visible = false;
      return;
    }
    this.time += dt;
    for (let i = this.whirls.length; i < wanted; i++) {
      this.whirls.push(this.newWhirl(target, windX, true));
    }
    const dir = Math.sign(windX || 1);
    let n = 0;
    for (let w = this.whirls.length - 1; w >= 0; w--) {
      const whirl = this.whirls[w];
      whirl.x += (windX * TRAVEL + Math.sin(this.time * 0.3 + whirl.phase) * WANDER) * dt;
      whirl.z += Math.cos(this.time * 0.25 + whirl.phase) * WANDER * dt;
      const dx = whirl.x - target.x;
      const dz = whirl.z - target.z;
      const leaving = w >= wanted || dx * dir > AREA.maxX || dz < AREA.minZ || dz > AREA.maxZ;
      whirl.presence = THREE.MathUtils.clamp(whirl.presence + (leaving ? -dt : dt) * 0.6, 0, 1);
      if (leaving && whirl.presence <= 0) {
        if (w >= wanted) {
          this.whirls.splice(w, 1);
          continue;
        }
        this.whirls[w] = this.newWhirl(target, windX, false);
      }
    }
    // Turning: integrated (the speed depends on the height, which changes: multiplying the time by it would accelerate)
    for (const p of this.petals) {
      const h = (p.h + this.time * p.climb / HEIGHT) % 1;
      p.angle += dt * SPIN * p.spin * (1.4 - h * 0.7);
    }
    for (const whirl of this.whirls) {
      for (const p of this.petals) {
        // Climb the spiral, then start again at the bottom
        const h = (p.h + this.time * p.climb / HEIGHT) % 1;
        const radius = THREE.MathUtils.lerp(RADIUS[0], RADIUS[1], h * h) * (0.6 + 0.4 * whirl.presence);
        const angle = p.angle + whirl.phase;
        this.position.set(
          whirl.x + Math.cos(angle) * radius,
          target.y + BASE_HEIGHT + h * HEIGHT + Math.sin(this.time * 2 + p.tumble) * 1.5,
          whirl.z + Math.sin(angle) * radius * 0.8,
        );
        const t = this.time * 3 + p.tumble;
        this.euler.set(Math.sin(t) * 1.3, t * 0.9, Math.cos(t * 1.2));
        this.quaternion.setFromEuler(this.euler);
        // Petals appear / vanish at the ends of the spiral and with the whirl presence
        const fade = Math.min(h * 6, 1, (1 - h) * 6) * whirl.presence;
        this.scale.setScalar(p.size * fade);
        this.matrix.compose(this.position, this.quaternion, this.scale);
        this.mesh.setMatrixAt(n++, this.matrix);
      }
    }
    this.mesh.count = n;
    this.mesh.visible = n > 0;
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  /** Closeness of the nearest whirl to a point, 0 (none within `range`) .. 1 (inside it). */
  closeness(pos: THREE.Vector3, range: number): number {
    let best = 0;
    for (const w of this.whirls) {
      const d = Math.hypot(w.x - pos.x, w.z - pos.z);
      best = Math.max(best, Math.max(0, 1 - d / range) * w.presence);
    }
    return best;
  }

  /** A whirl in the area (or entering from the upwind side). */
  private newWhirl(target: THREE.Vector3, windX: number, anywhere: boolean): Whirl {
    const dir = Math.sign(windX || 1);
    const x = anywhere ? THREE.MathUtils.randFloat(AREA.minX, AREA.maxX) : (dir > 0 ? AREA.minX : AREA.maxX);
    return {
      x: target.x + x,
      z: target.z + THREE.MathUtils.randFloat(AREA.minZ * 0.7, AREA.maxZ * 0.7),
      phase: Math.random() * 100,
      presence: 0,
    };
  }
}
