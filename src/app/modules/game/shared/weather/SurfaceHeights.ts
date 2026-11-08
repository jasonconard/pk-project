import * as THREE from 'three';

/** Surface heights are raycasted once per cell of this size, then cached. */
const HEIGHT_CELL = 4;
/** The surfaces list is checked regularly to follow visible chunks / added models. */
const SURFACES_CHECK_INTERVAL = 1;

/** Meshes flagged with this userData key stop the precipitations (grounds, buildings). */
export const RAIN_STOP_KEY = 'rainStop';

/**
 * Height of the surfaces (ground, roofs...) where rain drops and snowflakes stop.
 * Shared by the precipitation helpers so the raycasts and their cache are done once.
 */
export class SurfaceHeights {
  private readonly cache = new Map<number, number>();
  private age = SURFACES_CHECK_INTERVAL;
  private surfaces: THREE.Object3D[] = [];
  private readonly raycaster = new THREE.Raycaster();
  private readonly rayOrigin = new THREE.Vector3();
  private readonly down = new THREE.Vector3(0, -1, 0);

  constructor(private readonly scene: THREE.Scene) {
  }

  /**
   * Call every frame while something falls: checks the surfaces list regularly.
   * The cache is only cleared when the surfaces changed (raycasts are expensive: thousands of cells).
   */
  update(dt: number) {
    this.age += dt;
    if (this.age < SURFACES_CHECK_INTERVAL) {
      return;
    }
    this.age = 0;
    // The surfaces of the shown chunks, hidden or not themselves: a building hidden near the camera is still
    // there (the rain stops on it). Following their own visibility emptied the whole cache every time one was
    // hidden / shown while walking, and thousands of raycasts started again.
    const surfaces: THREE.Object3D[] = [];
    this.scene.traverse(o => {
      if (o.userData[RAIN_STOP_KEY] && SurfaceHeights.parentsVisible(o)) {
        surfaces.push(o);
      }
    });
    const changed = surfaces.length !== this.surfaces.length || surfaces.some((o, i) => o !== this.surfaces[i]);
    if (changed) {
      this.surfaces = surfaces;
      this.cache.clear();
    }
  }

  private static parentsVisible(object: THREE.Object3D): boolean {
    for (let o = object.parent; o; o = o.parent) {
      if (!o.visible) {
        return false;
      }
    }
    return true;
  }

  /** Height of the highest surface at (x, z), or `fallback - 50` outside the map (falls out of sight). */
  heightAt(x: number, z: number, fallback: number): number {
    const cx = Math.round(x / HEIGHT_CELL);
    const cz = Math.round(z / HEIGHT_CELL);
    const key = cx * 1_000_003 + cz; // unique for any realistic map size, no string allocation
    const cached = this.cache.get(key);
    if (cached !== undefined) {
      return cached;
    }
    this.rayOrigin.set(cx * HEIGHT_CELL, fallback + 1000, cz * HEIGHT_CELL);
    this.raycaster.set(this.rayOrigin, this.down);
    this.raycaster.far = 2000;
    const hit = this.raycaster.intersectObjects(this.surfaces, false)[0];
    const height = hit ? hit.point.y : fallback - 50;
    this.cache.set(key, height);
    return height;
  }
}
