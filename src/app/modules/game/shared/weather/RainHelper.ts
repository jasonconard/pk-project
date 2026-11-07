import * as THREE from 'three';
import { SurfaceHeights } from './SurfaceHeights';
import { applyLinearFog, registerUnlitMaterial } from './weather-shader';

const MAX_SPLASHES = 400;
/** Area (relative to the point the camera looks at) where it rains: wide enough to cover the screen. */
const RAIN_AREA = { minX: -240, maxX: 240, minZ: -300, maxZ: 140 };
const SPLASH_LIFE = 0.25;

/** Look and motion of the drops: the same helper draws the rain and the drizzle. */
export interface RainStyle {
  /** Drops at density = 1. */
  maxDrops: number;
  /** Fall speed (world units / s). */
  speed: number;
  length: number;
  width: number;
  color: number;
  opacity: number;
  /** Horizontal speed of the drops at full wind (world units / s). */
  windSpeed: number;
  /** Splash rings where the drops land. */
  splashes: boolean;
  /** Height (above the camera target) where drops appear. */
  top: number;
  /** Tinted by the scene light like the sprites (dim at night) instead of always bright. */
  followLight: boolean;
  /** Splash rings color (additive). */
  splashColor?: number;
}

/** Heavy drops (rain = 1 is the storm, the normal rain uses 0.6 of it). */
export const RAIN_STYLE: RainStyle = {
  maxDrops: 2500,
  speed: 420,
  length: 7,
  width: 0.35,
  color: 0xd6e6ff,
  opacity: 0.6,
  windSpeed: 220,
  splashes: true,
  top: 260,
  followLight: false,
};

/** Drizzle: many tiny, slow, faint drops, pushed further by the wind, no splashes. */
export const DRIZZLE_STYLE: RainStyle = {
  maxDrops: 3000,
  speed: 130,
  // ~1 screen pixel wide: thinner drops vanish between pixels
  length: 3.5,
  width: 0.5,
  color: 0xe4ecf6,
  opacity: 0.5,
  windSpeed: 110,
  splashes: false,
  // Below the camera (140 above the target): slow drops passing next to it would look like huge streaks
  top: 90,
  followLight: true,
};

/** "Rain of death": heavy dark red drops of blood, red splashes. */
export const BLOOD_RAIN_STYLE: RainStyle = {
  ...RAIN_STYLE,
  maxDrops: 1800,
  speed: 380,
  length: 6,
  width: 0.5,
  color: 0xa0141c,
  opacity: 0.9,
  followLight: true,
  splashColor: 0x7a0a0e,
};

/** Hail: short thick white pellets, falling very fast, white splashes. */
export const HAIL_STYLE: RainStyle = {
  ...RAIN_STYLE,
  maxDrops: 900,
  speed: 520,
  length: 1.8,
  width: 1.1,
  color: 0xf4f8ff,
  opacity: 0.95,
  windSpeed: 120,
  followLight: true,
  splashColor: 0xc8d4e4,
};

/** Sun shower: light rain of golden drops lit by the sun (always bright, like backlit). */
export const SUN_RAIN_STYLE: RainStyle = {
  ...RAIN_STYLE,
  maxDrops: 1200,
  color: 0xfff0c0,
  opacity: 0.7,
  splashColor: 0xb0a070,
};

/** Acid rain: thin sickly yellow-green drops, green splashes. */
export const ACID_RAIN_STYLE: RainStyle = {
  ...RAIN_STYLE,
  maxDrops: 2200,
  color: 0xc4e86a,
  opacity: 0.8,
  followLight: true,
  splashColor: 0x5a8a20,
};

/** Poisoned climate: toxic purple drops, a bit thinner and slower than the rain. */
export const POISON_RAIN_STYLE: RainStyle = {
  ...RAIN_STYLE,
  maxDrops: 2000,
  speed: 340,
  length: 6,
  width: 0.45,
  color: 0xa64cf0,
  opacity: 0.85,
  followLight: true,
  splashColor: 0x6a2aa0,
};

const Z_AXIS = new THREE.Vector3(0, 0, 1);
const ONE = new THREE.Vector3(1, 1, 1);

/**
 * Rain drops falling around the camera target. Each drop stops on the first surface below it
 * (ground, roof...) and leaves a small splash (see RainStyle).
 */
export class RainHelper {
  private readonly group = new THREE.Group();
  private readonly drops: THREE.InstancedMesh;
  private readonly splashes: THREE.InstancedMesh;

  private readonly dropX: Float32Array;
  private readonly dropY: Float32Array;
  private readonly dropZ: Float32Array;
  private readonly dropStopY: Float32Array;
  private readonly dropAlive: Uint8Array;
  private activeDrops = 0;

  private readonly splashPos = new Float32Array(MAX_SPLASHES * 3);
  private readonly splashAge = new Float32Array(MAX_SPLASHES).fill(SPLASH_LIFE);
  private nextSplash = 0;
  private aliveSplashes = 0;

  private readonly matrix = new THREE.Matrix4();
  private readonly scale = new THREE.Vector3();
  private readonly position = new THREE.Vector3();
  private readonly quaternion = new THREE.Quaternion();
  private readonly tilt = new THREE.Quaternion();
  /** Current horizontal speed of the drops (wind). */
  private vx = 0;
  private readonly splashColor = new THREE.Color();
  private readonly splashBaseColor: THREE.Color;

  constructor(scene: THREE.Scene, private readonly surfaces: SurfaceHeights, private readonly style: RainStyle = RAIN_STYLE) {
    this.splashBaseColor = new THREE.Color(style.splashColor ?? 0x9fb8d8);
    const n = style.maxDrops;
    this.dropX = new Float32Array(n);
    this.dropY = new Float32Array(n);
    this.dropZ = new Float32Array(n);
    this.dropStopY = new Float32Array(n);
    this.dropAlive = new Uint8Array(n);
    this.drops = RainHelper.makeDrops(style);
    this.splashes = RainHelper.makeSplashes();
    // Drawn after everything else: buildings that can fade (canHide) are transparent too,
    // and three's transparent sorting could otherwise draw them over the drops.
    this.drops.renderOrder = 10;
    this.splashes.renderOrder = 10;
    this.group.add(this.drops, this.splashes);
    this.group.visible = false;
    scene.add(this.group);
  }

  private static makeDrops(style: RainStyle): THREE.InstancedMesh {
    // Vertical streak in the XY plane (it faces +z, where the camera stands: not a true billboard),
    // transparent at the top, opaque at the bottom. Tilted along its motion in update (see `tilt`)
    const geo = new THREE.PlaneGeometry(style.width, style.length);
    geo.translate(0, style.length / 2, 0); // origin at the bottom of the drop
    const pos = geo.getAttribute('position');
    const colors = new Float32Array(pos.count * 4);
    for (let i = 0; i < pos.count; i++) {
      colors.set([1, 1, 1, pos.getY(i) > style.length / 2 ? 0 : 1], i * 4);
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 4));
    const mat = new THREE.MeshBasicMaterial({
      color: style.color,
      vertexColors: true,
      transparent: true,
      opacity: style.opacity,
      depthWrite: false,
    });
    if (style.followLight) {
      registerUnlitMaterial(mat);
    } else {
      applyLinearFog(mat);
    }
    const mesh = new THREE.InstancedMesh(geo, mat, style.maxDrops);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false;
    mesh.count = 0;
    return mesh;
  }

  private static makeSplashes(): THREE.InstancedMesh {
    const geo = new THREE.RingGeometry(0.5, 0.9, 10);
    geo.rotateX(-Math.PI / 2);
    // Additive blending: fading the instance color to black makes the splash vanish
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false, // additive: fog would add its color instead of hiding the splash
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.InstancedMesh(geo, mat, MAX_SPLASHES);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false;
    const black = new THREE.Color(0);
    const hidden = new THREE.Matrix4().makeScale(0, 0, 0);
    for (let i = 0; i < MAX_SPLASHES; i++) {
      mesh.setMatrixAt(i, hidden);
      mesh.setColorAt(i, black);
    }
    return mesh;
  }

  /**
   * @param density 0..1, share of the style maxDrops falling
   * @param windX signed wind, -1..1: drops fall diagonally
   */
  update(dt: number, target: THREE.Vector3, density: number, windX = 0) {
    this.vx = windX * this.style.windSpeed;
    // Streak tilted along its motion: the top points upwind
    this.tilt.setFromAxisAngle(Z_AXIS, Math.atan2(this.vx, this.style.speed));
    const count = Math.round(this.style.maxDrops * THREE.MathUtils.clamp(density, 0, 1));
    for (let i = count; i < this.activeDrops; i++) {
      this.dropAlive[i] = 0;
    }
    this.activeDrops = count;

    if (count === 0 && this.aliveSplashes === 0) {
      this.group.visible = false;
      return;
    }
    this.group.visible = true;

    this.updateDrops(dt, target, count);
    this.updateSplashes(dt);
  }

  private updateDrops(dt: number, target: THREE.Vector3, count: number) {
    for (let i = 0; i < count; i++) {
      if (!this.dropAlive[i]) {
        this.respawnDrop(i, target, true);
      }
      this.dropY[i] -= this.style.speed * dt;
      this.dropX[i] += this.vx * dt;

      // Area check on where the drop will land (it drifts with the wind)
      const landX = this.dropX[i] + this.vx * Math.max(this.dropY[i] - this.dropStopY[i], 0) / this.style.speed;
      const dx = landX - target.x;
      const dz = this.dropZ[i] - target.z;
      if (dx < RAIN_AREA.minX || dx > RAIN_AREA.maxX || dz < RAIN_AREA.minZ || dz > RAIN_AREA.maxZ) {
        // The camera moved away: recycle the drop inside the new area
        this.respawnDrop(i, target, true);
      } else if (this.dropY[i] <= this.dropStopY[i]) {
        if (this.style.splashes) {
          this.addSplash(this.dropX[i], this.dropStopY[i], this.dropZ[i]);
        }
        this.respawnDrop(i, target, false);
      }

      this.position.set(this.dropX[i], this.dropY[i], this.dropZ[i]);
      this.matrix.compose(this.position, this.tilt, ONE);
      this.drops.setMatrixAt(i, this.matrix);
    }
    this.drops.count = count;
    this.drops.instanceMatrix.needsUpdate = true;
  }

  private respawnDrop(i: number, target: THREE.Vector3, randomHeight: boolean) {
    // Pick where the drop lands, then start it upwind so the wind brings it there
    const landX = target.x + THREE.MathUtils.randFloat(RAIN_AREA.minX, RAIN_AREA.maxX);
    const z = target.z + THREE.MathUtils.randFloat(RAIN_AREA.minZ, RAIN_AREA.maxZ);
    const top = target.y + this.style.top;
    const stopY = this.surfaces.heightAt(landX, z, target.y);
    // Random height on (re)activation so drops don't all fall in a single wave
    const y = randomHeight ? THREE.MathUtils.randFloat(stopY, Math.max(top, stopY)) : Math.max(top, stopY);
    this.dropX[i] = landX - this.vx * (y - stopY) / this.style.speed;
    this.dropY[i] = y;
    this.dropZ[i] = z;
    this.dropStopY[i] = stopY;
    this.dropAlive[i] = 1;
  }

  private addSplash(x: number, y: number, z: number) {
    const i = this.nextSplash;
    this.nextSplash = (this.nextSplash + 1) % MAX_SPLASHES;
    this.splashPos[i * 3] = x;
    this.splashPos[i * 3 + 1] = y + 0.3; // slightly above the surface to avoid z-fighting
    this.splashPos[i * 3 + 2] = z;
    this.splashAge[i] = 0;
  }

  private updateSplashes(dt: number) {
    let alive = 0;
    for (let i = 0; i < MAX_SPLASHES; i++) {
      if (this.splashAge[i] >= SPLASH_LIFE) {
        continue;
      }
      this.splashAge[i] += dt;
      const t = Math.min(this.splashAge[i] / SPLASH_LIFE, 1);
      const s = t < 1 ? 0.4 + 1.6 * t : 0;
      this.position.set(this.splashPos[i * 3], this.splashPos[i * 3 + 1], this.splashPos[i * 3 + 2]);
      this.scale.set(s, s, s);
      this.matrix.compose(this.position, this.quaternion, this.scale);
      this.splashes.setMatrixAt(i, this.matrix);
      this.splashes.setColorAt(i, this.splashColor.copy(this.splashBaseColor).multiplyScalar(1 - t));
      if (t < 1) {
        alive++;
      }
    }
    this.aliveSplashes = alive;
    this.splashes.instanceMatrix.needsUpdate = true;
    if (this.splashes.instanceColor) {
      this.splashes.instanceColor.needsUpdate = true;
    }
  }
}
