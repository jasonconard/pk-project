import * as THREE from "three";
import { ActionZone, ZONE_COLOR, zoneCellRects } from "../../model/action-zone";

/** The cells' height above the object's base (just over the ground). */
const LIFT = 0.6;
/** Drawn over everything (seen through the object): the cells are under it. */
const ON_TOP = 999;

/**
 * The selected object's action zone on the map (Zone d'action → Changer): its footprint cut in cells, the zone's
 * cells in cyan, a strip on the side the player acts from. Drawn over the object (no depth test), editor only.
 */
export class ZoneOverlay {
  private group?: THREE.Group;

  show(scene: THREE.Scene, zone: ActionZone, bounds: THREE.Box3, rot: number) {
    this.hide();
    const group = new THREE.Group();
    const y = bounds.min.y + LIFT;
    const rects = zoneCellRects(zone, bounds, rot);
    const cell = (
      r: { minX: number; maxX: number; minZ: number; maxZ: number },
      color: number,
      opacity: number,
      inset: number
    ) => {
      const w = Math.max(1, r.maxX - r.minX - inset * 2);
      const d = Math.max(1, r.maxZ - r.minZ - inset * 2);
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(w, d),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity,
          depthTest: false,
          depthWrite: false,
        })
      );
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set((r.minX + r.maxX) / 2, y, (r.minZ + r.maxZ) / 2);
      mesh.renderOrder = ON_TOP;
      group.add(mesh);
    };
    rects.all.forEach((r) => cell(r, 0xff_ff_ff, 0.35, 1.5));
    rects.on.forEach((r) => cell(r, ZONE_COLOR, 0.85, 1.5));
    // The side the player acts from: a strip along that edge of the object
    const strip = this.sideStrip(zone, bounds, rot);
    if (strip) {
      cell(strip, ZONE_COLOR, 0.9, 0);
    }
    scene.add(group);
    this.group = group;
  }

  hide() {
    if (!this.group) {
      return;
    }
    this.group.removeFromParent();
    this.group.traverse((o) => {
      const mesh = o as THREE.Mesh;
      mesh.geometry?.dispose();
      (mesh.material as THREE.Material | undefined)?.dispose();
    });
    this.group = undefined;
  }

  private sideStrip(zone: ActionZone, bounds: THREE.Box3, rot: number) {
    if (zone.side === "all") {
      return null;
    }
    // (the side in the model's own axes, then turned with the object: front +z, right +x)
    const sides = ["front", "left", "back", "right"] as const;
    const index = sides.indexOf(zone.side);
    const world = sides[(index + (((rot % 4) + 4) % 4)) % 4];
    const t = 3;
    const { min, max } = bounds;
    switch (world) {
      case "front":
        return { minX: min.x, maxX: max.x, minZ: max.z, maxZ: max.z + t };
      case "back":
        return { minX: min.x, maxX: max.x, minZ: min.z - t, maxZ: min.z };
      case "left":
        return { minX: min.x - t, maxX: min.x, minZ: min.z, maxZ: max.z };
      default:
        return { minX: max.x, maxX: max.x + t, minZ: min.z, maxZ: max.z };
    }
  }
}
