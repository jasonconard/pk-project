import * as THREE from 'three';
import { SurfaceHeights } from './SurfaceHeights';

/** Pairs of eyes at the same time at moonless = 1, distance range to the player where they appear (world units). */
const MAX_PAIRS = 7;
const DISTANCE = [55, 140] as const;
/** They vanish when the player comes closer than this (they run away). */
const FLEE_DISTANCE = 42;
/** How long a pair stays (s), fade in / out time, seconds between two blinks, blink length. */
const STAY = [4, 11] as const;
const FADE = 0.8;
const BLINK_INTERVAL = [1.5, 5] as const;
const BLINK_LENGTH = 0.14;
/** Height above the ground (in a bush, on a low wall), eye spacing, eye size. */
const HEIGHT = [2.5, 7] as const;
const SPACING = 2.2;
const EYE_SIZE = 1.5;
/** Eye colors (additive, bright enough to shine through the darkness and pick up the bloom). */
const COLORS = [0xfff07a, 0xb8ff6a, 0xff5a3a, 0xfff0d0].map(c => new THREE.Color(c).multiplyScalar(2.2));

interface Pair {
  x: number;
  y: number;
  z: number;
  age: number;
  life: number;
  /** Fading out early (the player came too close). */
  fleeing: boolean;
  blinkTimer: number;
  blinkAge: number;
  color: THREE.Color;
}

function makeEyeTexture(): THREE.CanvasTexture {
  const size = 32;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.8)');
  g.addColorStop(0.6, 'rgba(255,255,255,0.15)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Moonless night: pairs of glowing eyes watching the player from the dark, a bit away from them. They blink
 * now and then, stay a few seconds, and run away (fade out, with a rustle) when the player comes closer.
 */
export class EyesHelper {
  private readonly mesh: THREE.InstancedMesh;
  private readonly pairs: Pair[] = [];
  private spawnTimer = 1;
  /** Called when a pair runs away (position): rustle sound. */
  onFlee?: (position: THREE.Vector3) => void;

  private readonly matrix = new THREE.Matrix4();
  private readonly position = new THREE.Vector3();
  private readonly scale = new THREE.Vector3();
  private readonly side = new THREE.Vector3();
  private readonly color = new THREE.Color();

  constructor(scene: THREE.Scene, private readonly surfaces: SurfaceHeights) {
    this.mesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({
      map: makeEyeTexture(), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
    }), MAX_PAIRS * 2);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.setColorAt(0, this.color.set(0)); // creates the instance color buffer
    this.mesh.frustumCulled = false;
    this.mesh.raycast = () => {};
    this.mesh.renderOrder = 12;
    this.mesh.visible = false;
    scene.add(this.mesh);
  }

  /** @param level 0..1 */
  update(dt: number, target: THREE.Vector3, player: THREE.Vector3, level: number, camera: THREE.Camera) {
    const wanted = Math.round(MAX_PAIRS * level);
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0 && this.pairs.length < wanted) {
      this.spawnTimer = THREE.MathUtils.randFloat(0.5, 2);
      this.spawn(target, player);
    }

    // The eyes' left-right axis: the camera's, so the two eyes always show side by side
    this.side.set(1, 0, 0).applyQuaternion(camera.quaternion);
    let n = 0;
    for (let i = this.pairs.length - 1; i >= 0; i--) {
      const p = this.pairs[i];
      p.age += dt;
      const dist = Math.hypot(p.x - player.x, p.z - player.z);
      if (!p.fleeing && (dist < FLEE_DISTANCE || level < 0.05)) {
        p.fleeing = true;
        p.life = Math.min(p.life, p.age + FADE * 0.5);
        if (level >= 0.05) {
          this.onFlee?.(this.position.set(p.x, p.y, p.z));
        }
      }
      if (p.age >= p.life) {
        this.pairs.splice(i, 1);
        continue;
      }
      const fade = Math.min(p.age / FADE, (p.life - p.age) / (p.fleeing ? FADE * 0.5 : FADE), 1);
      // Blink: the eyes close (squashed vertically) for a short moment
      p.blinkTimer -= dt;
      if (p.blinkTimer <= 0) {
        p.blinkTimer = THREE.MathUtils.randFloat(BLINK_INTERVAL[0], BLINK_INTERVAL[1]);
        p.blinkAge = 0;
      }
      let open = 1;
      if (p.blinkAge >= 0) {
        p.blinkAge += dt;
        open = Math.abs(p.blinkAge / BLINK_LENGTH * 2 - 1);
        if (p.blinkAge >= BLINK_LENGTH) {
          p.blinkAge = -1;
          open = 1;
        }
      }
      this.color.copy(p.color).multiplyScalar(fade);
      this.scale.set(EYE_SIZE, EYE_SIZE * Math.max(open, 0.08), 1);
      for (const s of [-0.5, 0.5]) {
        this.position.set(p.x, p.y, p.z).addScaledVector(this.side, s * SPACING);
        this.matrix.compose(this.position, camera.quaternion, this.scale);
        this.mesh.setMatrixAt(n, this.matrix);
        this.mesh.setColorAt(n, this.color);
        n++;
      }
    }
    this.mesh.count = n;
    this.mesh.visible = n > 0;
    this.mesh.instanceMatrix.needsUpdate = true;
    this.mesh.instanceColor!.needsUpdate = true;
  }

  /** A new pair somewhere around the player, in the visible area, not too close. */
  private spawn(target: THREE.Vector3, player: THREE.Vector3) {
    for (let attempt = 0; attempt < 10; attempt++) {
      const a = Math.random() * Math.PI * 2;
      const r = THREE.MathUtils.randFloat(DISTANCE[0], DISTANCE[1]);
      const x = player.x + Math.cos(a) * r;
      const z = player.z + Math.sin(a) * r * 0.8;
      // Stay on screen (roughly the area the camera looks at)
      if (Math.abs(x - target.x) > 170 || z - target.z < -200 || z - target.z > 70) {
        continue;
      }
      const ground = this.surfaces.heightAt(x, z, target.y);
      this.pairs.push({
        x, z, y: ground + THREE.MathUtils.randFloat(HEIGHT[0], HEIGHT[1]),
        age: 0,
        life: THREE.MathUtils.randFloat(STAY[0], STAY[1]),
        fleeing: false,
        blinkTimer: THREE.MathUtils.randFloat(0.5, BLINK_INTERVAL[1]),
        blinkAge: -1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
      return;
    }
  }
}
