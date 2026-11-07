import * as THREE from 'three';

/** Geysers at once, the area (relative to the camera target) where they are, in view. */
const GEYSERS = 4;
const AREA = { minX: -170, maxX: 170, minZ: -190, maxZ: 70 };
/** Seconds between two eruptions of a geyser, eruption length (s), how far apart geysers are (world units). */
const ERUPTION_INTERVAL = [6, 16] as const;
const ERUPTION_LENGTH = [2.5, 4.5] as const;
const MIN_SPACING = 60;
/** Vent radius (world units): where the steam comes out. */
const VENT_RADIUS = 2.5;

export interface Geyser {
  /** World position of the vent. */
  x: number;
  z: number;
  /** Time until the next eruption, eruption age (-1 = calm) and length. */
  timer: number;
  age: number;
  length: number;
  /** Eruption strength right now, 0 (calm) .. 1 (full jet). */
  power: number;
}

/**
 * Geysers: a few vents fixed on the map (moved back in view when the player walks away), each steaming gently,
 * then now and then erupting: a strong jet for a few seconds. Gives the spawn points of the steam particles,
 * and tells when an eruption starts or how close an erupting geyser is (sounds, throwing the player).
 */
export class GeyserHelper {
  readonly geysers: Geyser[] = [];
  /** Called when a geyser starts erupting (its position), for the sound. */
  onEruption?: (geyser: Geyser) => void;

  update(dt: number, target: THREE.Vector3, active: boolean) {
    if (!active) {
      this.geysers.length = 0;
      return;
    }
    // Keep GEYSERS vents in the area
    for (let i = this.geysers.length - 1; i >= 0; i--) {
      const g = this.geysers[i];
      if (g.x - target.x < AREA.minX || g.x - target.x > AREA.maxX || g.z - target.z < AREA.minZ || g.z - target.z > AREA.maxZ) {
        this.geysers.splice(i, 1);
      }
    }
    for (let tries = 0; this.geysers.length < GEYSERS && tries < 20; tries++) {
      const x = target.x + THREE.MathUtils.randFloat(AREA.minX, AREA.maxX);
      const z = target.z + THREE.MathUtils.randFloat(AREA.minZ, AREA.maxZ);
      if (this.geysers.every(g => Math.hypot(g.x - x, g.z - z) > MIN_SPACING)) {
        this.geysers.push({ x, z, timer: THREE.MathUtils.randFloat(1, ERUPTION_INTERVAL[1]), age: -1, length: 0, power: 0 });
      }
    }
    // Eruption cycles: a quick burst, a strong jet, then it dies down
    for (const g of this.geysers) {
      if (g.age < 0) {
        g.timer -= dt;
        g.power = 0;
        if (g.timer <= 0) {
          g.age = 0;
          g.length = THREE.MathUtils.randFloat(ERUPTION_LENGTH[0], ERUPTION_LENGTH[1]);
          this.onEruption?.(g);
        }
        continue;
      }
      g.age += dt;
      const t = g.age / g.length;
      if (t >= 1) {
        g.age = -1;
        g.timer = THREE.MathUtils.randFloat(ERUPTION_INTERVAL[0], ERUPTION_INTERVAL[1]);
        g.power = 0;
        continue;
      }
      g.power = Math.min(t / 0.08, 1) * (t < 0.6 ? 1 : 1 - (t - 0.6) / 0.4);
    }
  }

  /** Total eruption strength (0..GEYSERS), drives the jet particles density. */
  get eruptions(): number {
    return this.geysers.reduce((sum, g) => sum + g.power, 0);
  }

  /** A point in a vent: any geyser (gentle steam), or only the erupting ones (jets, weighted by their power). */
  spawnPoint(erupting: boolean): [number, number] | null {
    const candidates = erupting ? this.geysers.filter(g => g.power > 0.05) : this.geysers;
    if (!candidates.length) {
      return null;
    }
    let pick = candidates[0];
    if (erupting) {
      let r = Math.random() * candidates.reduce((s, g) => s + g.power, 0);
      for (const g of candidates) {
        r -= g.power;
        if (r <= 0) {
          pick = g;
          break;
        }
      }
    } else {
      pick = candidates[Math.floor(Math.random() * candidates.length)];
    }
    const a = Math.random() * Math.PI * 2;
    const rad = Math.sqrt(Math.random()) * VENT_RADIUS;
    return [pick.x + Math.cos(a) * rad, pick.z + Math.sin(a) * rad];
  }

  /** The erupting geyser closest to a point, with its distance (or null). */
  nearestErupting(x: number, z: number): { geyser: Geyser, distance: number } | null {
    let best: { geyser: Geyser, distance: number } | null = null;
    for (const g of this.geysers) {
      if (g.power > 0.3) {
        const distance = Math.hypot(g.x - x, g.z - z);
        if (!best || distance < best.distance) {
          best = { geyser: g, distance };
        }
      }
    }
    return best;
  }
}
