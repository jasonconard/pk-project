import * as THREE from 'three';
import { SurfaceHeights } from './SurfaceHeights';

/** Area (relative to the point the camera looks at) where sparks can appear: covers the screen. */
const AREA = { minX: -240, maxX: 240, minZ: -300, maxZ: 140 };
/** Max arcs at the same time, segments per arc. */
const MAX_ARCS = 44;
const SEGMENTS = 7;
/** Arcs started per second at electric = 1, and their life range (s). */
const SPAWN_RATE = 48;
const ARC_LIFE = [0.08, 0.32] as const;
/** Arc length range (world units), height above the surface, zigzag amplitude, segment width. */
const ARC_LENGTH = [2.5, 8] as const;
const ARC_HEIGHT = 0.6;
const JITTER = 0.9;
const ARC_WIDTH = 0.65;
/** The zigzag is redrawn this often (s): the crackling. */
const REJITTER = 0.035;
/** Chance that an arc immediately spawns a second one at the same spot (bursts). */
const BURST_CHANCE = 0.45;
/** Glow around each arc (soft quad) size. */
const GLOW_SIZE = 9;
/** Light colors (additive, above 1 so they bloom at night). */
const ARC_COLOR = new THREE.Color(0.75, 0.92, 1.0).multiplyScalar(2.2);
const GLOW_COLOR = new THREE.Color(0.35, 0.6, 1.0).multiplyScalar(1.3);
/** How often the conductive surfaces list is refreshed (s). */
const SURFACES_REFRESH = 2;

function makeGlowTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.35)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

interface Arc {
  start: THREE.Vector3;
  end: THREE.Vector3;
  age: number;
  life: number;
  jitterAge: number;
  points: THREE.Vector3[];
}

/**
 * Electric field: small crackling arcs on the shiny surfaces (roofs, metal: the Phong materials),
 * each a zigzag redrawn very fast, with a soft blue glow.
 */
export class ElectricHelper {
  private readonly segments: THREE.InstancedMesh;
  private readonly glows: THREE.InstancedMesh;
  private readonly arcs: Arc[] = [];
  private spawnDebt = 0;
  /** World boxes of the conductive surfaces, and their cumulated top areas (bigger roofs get more sparks). */
  private conductors: THREE.Box3[] = [];
  private conductorAreas: number[] = [];
  private conductorsAge = SURFACES_REFRESH;
  /** Called for every new arc (its start point and life): sounds. */
  onArc?: (position: THREE.Vector3, life: number) => void;
  /** Recent activity, 0..1: drives a faint light flicker. */
  private activity = 0;

  private readonly matrix = new THREE.Matrix4();
  private readonly xAxis = new THREE.Vector3();
  private readonly yAxis = new THREE.Vector3();
  private readonly zAxis = new THREE.Vector3();
  private readonly mid = new THREE.Vector3();
  private readonly color = new THREE.Color();

  constructor(private readonly scene: THREE.Scene, private readonly surfaces: SurfaceHeights) {
    const additive = { transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false } as const;
    this.segments = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ ...additive }), MAX_ARCS * SEGMENTS);
    this.glows = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ ...additive, map: makeGlowTexture() }), MAX_ARCS);
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

  /** Faint global light boost following the sparks (0..1). */
  get flicker(): number {
    return this.activity;
  }

  /** @param intensity 0..1 */
  update(dt: number, target: THREE.Vector3, intensity: number, camera: THREE.Camera) {
    this.activity = Math.max(0, this.activity - dt * 6);
    if (intensity <= 0.01 && !this.arcs.length) {
      this.segments.visible = this.glows.visible = false;
      return;
    }
    this.refreshConductors(dt);

    // Spawn
    this.spawnDebt += dt * SPAWN_RATE * intensity;
    while (this.spawnDebt >= 1) {
      this.spawnDebt--;
      if (this.arcs.length < MAX_ARCS) {
        const arc = this.newArc(target);
        if (arc) {
          this.arcs.push(arc);
          this.onArc?.(arc.start, arc.life);
          if (Math.random() < BURST_CHANCE && this.arcs.length < MAX_ARCS) {
            this.arcs.push(this.newArc(target, arc.start)!);
          }
        }
      }
    }

    // Age, redraw the zigzags
    for (let a = this.arcs.length - 1; a >= 0; a--) {
      const arc = this.arcs[a];
      arc.age += dt;
      arc.jitterAge += dt;
      if (arc.age >= arc.life) {
        this.arcs.splice(a, 1);
        continue;
      }
      if (arc.jitterAge >= REJITTER) {
        arc.jitterAge = 0;
        this.zigzag(arc);
      }
    }

    // Draw: each segment is a thin quad along the segment, turned towards the camera
    camera.getWorldDirection(this.zAxis).negate();
    let s = 0;
    this.arcs.forEach((arc, a) => {
      const t = arc.age / arc.life;
      const brightness = (t < 0.15 ? 1 : 1 - (t - 0.15) / 0.85) * (0.7 + 0.3 * Math.random());
      this.color.copy(ARC_COLOR).multiplyScalar(brightness);
      for (let k = 0; k < SEGMENTS; k++) {
        const p0 = arc.points[k];
        const p1 = arc.points[k + 1];
        this.xAxis.subVectors(p1, p0);
        const length = this.xAxis.length();
        this.xAxis.divideScalar(length || 1);
        this.yAxis.crossVectors(this.zAxis, this.xAxis).normalize();
        this.mid.addVectors(p0, p1).multiplyScalar(0.5);
        this.matrix.makeBasis(
          this.xAxis.multiplyScalar(length),
          this.yAxis.multiplyScalar(ARC_WIDTH),
          this.zAxis,
        ).setPosition(this.mid);
        this.segments.setMatrixAt(s, this.matrix);
        this.segments.setColorAt(s, this.color);
        s++;
      }
      this.mid.addVectors(arc.start, arc.end).multiplyScalar(0.5);
      this.matrix.compose(this.mid, camera.quaternion, this.xAxis.setScalar(GLOW_SIZE));
      this.glows.setMatrixAt(a, this.matrix);
      this.glows.setColorAt(a, this.color.copy(GLOW_COLOR).multiplyScalar(brightness));
      this.activity = Math.max(this.activity, brightness * 0.5);
    });
    this.segments.count = s;
    this.glows.count = this.arcs.length;
    for (const mesh of [this.segments, this.glows]) {
      mesh.visible = mesh.count > 0;
      mesh.instanceMatrix.needsUpdate = true;
      mesh.instanceColor!.needsUpdate = true;
    }
  }

  /** Conductive surfaces: meshes with a shiny (Phong) material: roofs, letter boxes... */
  private refreshConductors(dt: number) {
    this.conductorsAge += dt;
    if (this.conductorsAge < SURFACES_REFRESH) {
      return;
    }
    this.conductorsAge = 0;
    const boxes: THREE.Box3[] = [];
    this.scene.traverseVisible(o => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh && (mesh.material as THREE.Material)?.type === 'MeshPhongMaterial') {
        boxes.push(new THREE.Box3().setFromObject(mesh));
      }
    });
    this.conductors = boxes;
    let total = 0;
    this.conductorAreas = boxes.map(b => total += Math.max((b.max.x - b.min.x) * (b.max.z - b.min.z), 1));
  }

  /** Random conductor, weighted by its area. */
  private pickConductor(): THREE.Box3 | undefined {
    const total = this.conductorAreas[this.conductorAreas.length - 1];
    if (!total) {
      return undefined;
    }
    const r = Math.random() * total;
    return this.conductors[this.conductorAreas.findIndex(a => a >= r)];
  }

  /** A new arc on a conductive surface in the area (at `near` for a burst). */
  private newArc(target: THREE.Vector3, near?: THREE.Vector3): Arc | null {
    let start: THREE.Vector3 | null = null;
    if (near) {
      start = near.clone();
    } else {
      for (let attempt = 0; attempt < 6 && !start; attempt++) {
        const box = this.pickConductor();
        if (!box) {
          break;
        }
        const x = THREE.MathUtils.randFloat(box.min.x, box.max.x);
        const z = THREE.MathUtils.randFloat(box.min.z, box.max.z);
        const dx = x - target.x;
        const dz = z - target.z;
        if (dx > AREA.minX && dx < AREA.maxX && dz > AREA.minZ && dz < AREA.maxZ) {
          start = new THREE.Vector3(x, this.surfaces.heightAt(x, z, target.y) + ARC_HEIGHT, z);
        }
      }
    }
    if (!start) {
      return null;
    }
    const angle = Math.random() * Math.PI * 2;
    const length = THREE.MathUtils.randFloat(ARC_LENGTH[0], ARC_LENGTH[1]);
    const end = start.clone().add(new THREE.Vector3(Math.cos(angle) * length, Math.random() * 1.5, Math.sin(angle) * length));
    const arc: Arc = {
      start, end, age: 0, jitterAge: 0,
      life: THREE.MathUtils.randFloat(ARC_LIFE[0], ARC_LIFE[1]),
      points: Array.from({ length: SEGMENTS + 1 }, () => new THREE.Vector3()),
    };
    this.zigzag(arc);
    return arc;
  }

  /** Random zigzag between the arc ends (ends fixed, middle points pushed sideways and up). */
  private zigzag(arc: Arc) {
    for (let k = 0; k <= SEGMENTS; k++) {
      const t = k / SEGMENTS;
      const p = arc.points[k].lerpVectors(arc.start, arc.end, t);
      if (k > 0 && k < SEGMENTS) {
        const amp = JITTER * Math.sin(Math.PI * t) + 0.2;
        p.x += (Math.random() - 0.5) * 2 * amp;
        p.y += Math.random() * amp;
        p.z += (Math.random() - 0.5) * 2 * amp;
      }
    }
  }
}
