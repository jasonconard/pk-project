import * as THREE from 'three';
import { SurfaceHeights } from './SurfaceHeights';
import { WEATHER_UNIFORMS } from './weather-shader';

/** Seconds between two strikes at thunderRain = 1 (random in this range), chance that one falls near the player. */
const STRIKE_INTERVAL = [1.2, 3.5] as const;
const NEAR_CHANCE = 0.15;
const NEAR_DISTANCE = [15, 55] as const;
/** Where the far strikes land, relative to the point the camera looks at (the visible part of the ground). */
const AREA = { minX: -130, maxX: 130, minZ: -200, maxZ: 50 };
/** Bolt: life (s), height of its top above the ground, horizontal drift of the top, segments (power of 2). */
const BOLT_LIFE = 0.45;
const BOLT_HEIGHT = 260;
const BOLT_DRIFT = 50;
const MAIN_SEGMENTS = 32;
/** Side branches per bolt, segments each, their length range. */
const BRANCHES = 4;
const BRANCH_SEGMENTS = 8;
const BRANCH_LENGTH = [30, 80] as const;
/** Ribbon widths (world units), glow size at the impact. */
const MAIN_WIDTH = 2.4;
const BRANCH_WIDTH = 1.1;
const GLOW_SIZE = 45;
/** How long the ground discharge lasts (s), and crackles per second at its start (for the sounds). */
const GROUND_LIFE = 1.8;
const CRACKLE_RATE = 14;
/** Max bolts / ground discharges at the same time (= size of the uStrikes uniform array). */
export const MAX_STRIKES = 2;

/** Light colors (additive, above 1 so they bloom at night). */
const BOLT_COLOR = new THREE.Color(0.85, 0.92, 1.0).multiplyScalar(2.6);
const GLOW_COLOR = new THREE.Color(0.45, 0.65, 1.0).multiplyScalar(1.5);

function makeGlowTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.3, 'rgba(255,255,255,0.35)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

interface Strike {
  impact: THREE.Vector3;
  age: number;
  /** Main channel then the branches, each a polyline. */
  lines: { points: THREE.Vector3[]; width: number }[];
}

/**
 * Thunder rain: lightning bolts striking the visible ground. Each bolt is a jagged channel (midpoint
 * displacement) with a few side branches, drawn as camera-facing ribbons that blink 2-3 times; at the impact
 * a glow, and an electric discharge spreading on the ground (drawn by the surface shader from uStrikes).
 */
export class StrikeHelper {
  private readonly segments: THREE.InstancedMesh;
  private readonly glows: THREE.InstancedMesh;
  private readonly strikes: Strike[] = [];
  private timer = 1;
  private crackleDebt = 0;
  /** Called on each strike (impact point): flash, thunder, shake. */
  onStrike?: (impact: THREE.Vector3) => void;
  /** Called for each crackle of a ground discharge (point, strength 0..1): sounds. */
  onCrackle?: (position: THREE.Vector3, strength: number) => void;
  /** Spark burst strength 0..1 (fresh impacts) and where it is. */
  sparks = 0;
  readonly sparkAt = new THREE.Vector3();

  private readonly matrix = new THREE.Matrix4();
  private readonly xAxis = new THREE.Vector3();
  private readonly yAxis = new THREE.Vector3();
  private readonly zAxis = new THREE.Vector3();
  private readonly mid = new THREE.Vector3();
  private readonly color = new THREE.Color();

  constructor(scene: THREE.Scene, private readonly surfaces: SurfaceHeights) {
    const additive = { transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false } as const;
    const perBolt = MAIN_SEGMENTS + BRANCHES * BRANCH_SEGMENTS;
    this.segments = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ ...additive }), MAX_STRIKES * perBolt);
    this.glows = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ ...additive, map: makeGlowTexture() }), MAX_STRIKES);
    for (const mesh of [this.segments, this.glows]) {
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      mesh.setColorAt(0, this.color.set(0)); // creates the instance color buffer
      mesh.frustumCulled = false;
      mesh.raycast = () => {};
      mesh.renderOrder = 12;
      mesh.visible = false;
      scene.add(mesh);
    }
  }

  /** @param level 0..1 strike frequency */
  update(dt: number, target: THREE.Vector3, player: THREE.Vector3, level: number, camera: THREE.Camera) {
    if (level > 0.05) {
      this.timer -= dt * level;
      if (this.timer <= 0) {
        this.timer = THREE.MathUtils.randFloat(STRIKE_INTERVAL[0], STRIKE_INTERVAL[1]);
        this.strike(target, player);
      }
    }

    // Age; ground discharges crackle, fading
    this.sparks = 0;
    let crackle = 0;
    for (let i = this.strikes.length - 1; i >= 0; i--) {
      const s = this.strikes[i];
      s.age += dt;
      if (s.age >= GROUND_LIFE) {
        this.strikes.splice(i, 1);
        continue;
      }
      const fresh = Math.exp(-s.age * 3);
      if (fresh > this.sparks) {
        this.sparks = fresh;
        this.sparkAt.copy(s.impact);
      }
      crackle = Math.max(crackle, Math.exp(-s.age * 2));
    }
    this.crackleDebt += dt * CRACKLE_RATE * crackle;
    while (this.crackleDebt >= 1 && this.strikes.length) {
      this.crackleDebt--;
      const s = this.strikes[Math.floor(Math.random() * this.strikes.length)];
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 30;
      this.mid.set(s.impact.x + Math.cos(a) * r, s.impact.y, s.impact.z + Math.sin(a) * r);
      this.onCrackle?.(this.mid, Math.exp(-s.age * 2));
    }
    if (!this.strikes.length) {
      this.crackleDebt = 0;
    }

    // Ground discharges for the shader: x, z, age, power (power 0 = unused slot)
    const uniforms = WEATHER_UNIFORMS.uStrikes.value;
    for (let i = 0; i < MAX_STRIKES; i++) {
      const s = this.strikes[i];
      uniforms[i].set(s?.impact.x ?? 0, s?.impact.z ?? 0, s?.age ?? 0, s ? 1 : 0);
    }
    WEATHER_UNIFORMS.uStrikeOn.value = this.strikes.length ? 1 : 0;

    this.draw(camera);
  }

  /** A new strike: somewhere visible, or now and then right next to the player. */
  private strike(target: THREE.Vector3, player: THREE.Vector3) {
    if (this.strikes.length >= MAX_STRIKES) {
      this.strikes.shift();
    }
    let x: number;
    let z: number;
    if (Math.random() < NEAR_CHANCE) {
      const a = Math.random() * Math.PI * 2;
      const r = THREE.MathUtils.randFloat(NEAR_DISTANCE[0], NEAR_DISTANCE[1]);
      x = player.x + Math.cos(a) * r;
      z = player.z + Math.sin(a) * r;
    } else {
      x = target.x + THREE.MathUtils.randFloat(AREA.minX, AREA.maxX);
      z = target.z + THREE.MathUtils.randFloat(AREA.minZ, AREA.maxZ);
    }
    const impact = new THREE.Vector3(x, this.surfaces.heightAt(x, z, target.y), z);
    const top = impact.clone().add(new THREE.Vector3(
      THREE.MathUtils.randFloatSpread(BOLT_DRIFT * 2), BOLT_HEIGHT, THREE.MathUtils.randFloatSpread(BOLT_DRIFT * 2)));
    const main = jagged(top, impact, MAIN_SEGMENTS, 0.22);
    const lines = [{ points: main, width: MAIN_WIDTH }];
    for (let b = 0; b < BRANCHES; b++) {
      // Branches leave from the upper 3/4 of the channel, going down and outwards
      const from = main[Math.floor(THREE.MathUtils.randFloat(0.1, 0.75) * MAIN_SEGMENTS)];
      const length = THREE.MathUtils.randFloat(BRANCH_LENGTH[0], BRANCH_LENGTH[1]);
      const a = Math.random() * Math.PI * 2;
      const to = from.clone().add(new THREE.Vector3(Math.cos(a) * length * 0.7, -length * 0.7, Math.sin(a) * length * 0.7));
      lines.push({ points: jagged(from, to, BRANCH_SEGMENTS, 0.3), width: BRANCH_WIDTH });
    }
    this.strikes.push({ impact, age: 0, lines });
    this.onStrike?.(impact);
  }

  /** Bolts as ribbons turned towards the camera, blinking: on, off, on again, then fading. */
  private draw(camera: THREE.Camera) {
    camera.getWorldDirection(this.zAxis).negate();
    let n = 0;
    let g = 0;
    for (const s of this.strikes) {
      if (s.age >= BOLT_LIFE) {
        continue;
      }
      const t = s.age / BOLT_LIFE;
      const blink = t < 0.15 ? 1 : t < 0.25 ? 0.15 : t < 0.4 ? 1 : 1 - (t - 0.4) / 0.6;
      for (const line of s.lines) {
        this.color.copy(BOLT_COLOR).multiplyScalar(blink * (line.width === MAIN_WIDTH ? 1 : 0.7));
        for (let k = 0; k < line.points.length - 1; k++) {
          const p0 = line.points[k];
          const p1 = line.points[k + 1];
          this.xAxis.subVectors(p1, p0);
          const length = this.xAxis.length();
          this.xAxis.divideScalar(length || 1);
          this.yAxis.crossVectors(this.zAxis, this.xAxis).normalize();
          this.mid.addVectors(p0, p1).multiplyScalar(0.5);
          this.matrix.makeBasis(
            this.xAxis.multiplyScalar(length * 1.05),
            this.yAxis.multiplyScalar(line.width),
            this.zAxis,
          ).setPosition(this.mid);
          this.segments.setMatrixAt(n, this.matrix);
          this.segments.setColorAt(n, this.color);
          n++;
        }
      }
      this.mid.copy(s.impact).y += 4;
      this.matrix.compose(this.mid, camera.quaternion, this.xAxis.setScalar(GLOW_SIZE));
      this.glows.setMatrixAt(g, this.matrix);
      this.glows.setColorAt(g, this.color.copy(GLOW_COLOR).multiplyScalar(blink));
      g++;
    }
    this.segments.count = n;
    this.glows.count = g;
    for (const mesh of [this.segments, this.glows]) {
      mesh.visible = mesh.count > 0;
      mesh.instanceMatrix.needsUpdate = true;
      mesh.instanceColor!.needsUpdate = true;
    }
  }
}

/**
 * Jagged line by midpoint displacement: each segment's middle is pushed sideways by a share (`roughness`) of
 * its length, then both halves are split again: big zigzags with smaller ones on them, like a real channel.
 */
function jagged(from: THREE.Vector3, to: THREE.Vector3, segments: number, roughness: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = new Array(segments + 1);
  points[0] = from.clone();
  points[segments] = to.clone();
  const split = (a: number, b: number) => {
    if (b - a < 2) {
      return;
    }
    const m = (a + b) >> 1;
    const length = points[a].distanceTo(points[b]);
    points[m] = points[a].clone().lerp(points[b], 0.5).add(new THREE.Vector3(
      THREE.MathUtils.randFloatSpread(length * roughness * 2),
      THREE.MathUtils.randFloatSpread(length * roughness * 0.5),
      THREE.MathUtils.randFloatSpread(length * roughness * 2),
    ));
    split(a, m);
    split(m, b);
  };
  split(0, segments);
  return points;
}
