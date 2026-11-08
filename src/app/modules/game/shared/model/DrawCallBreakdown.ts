import * as THREE from 'three';
import type { MapHelper } from './MapHelper';

/** Draw calls of one origin: how many calls (main pass), from how many objects. */
export interface DrawCallGroup {
  label: string;
  calls: number;
  /** Meshes drawn, and the map objects they belong to (copies of the model). */
  objects: number;
  copies: number;
}

const frustum = new THREE.Frustum();
const matrix = new THREE.Matrix4();
const sphere = new THREE.Sphere();

/** Is the object drawn by the main pass: visible (with all its parents) and, if culled, in the camera view. */
function drawn(object: THREE.Object3D): boolean {
  for (let o: THREE.Object3D | null = object; o; o = o.parent) {
    if (!o.visible) {
      return false;
    }
  }
  const mesh = object as THREE.Mesh;
  if (!object.frustumCulled || !mesh.geometry) {
    return true;
  }
  if (!mesh.geometry.boundingSphere) {
    mesh.geometry.computeBoundingSphere();
  }
  sphere.copy(mesh.geometry.boundingSphere!).applyMatrix4(object.matrixWorld);
  return frustum.intersectsSphere(sphere);
}

/** Draw calls of a mesh: one per material group (the reliefs ground has two: ground and walls). */
function callsOf(object: THREE.Object3D): number {
  const mesh = object as THREE.Mesh;
  return Array.isArray(mesh.material) ? Math.max(mesh.geometry?.groups.length ?? 1, 1) : 1;
}

/**
 * Where the draw calls of the main pass come from (shadows not counted): each model of the map (all its
 * copies), the unique buildings, the ground, the player, the weather / other effects. Sorted, biggest first.
 * Approximation of the renderer's own culling (bounding spheres in the camera frustum).
 */
export function drawCallBreakdown(scene: THREE.Scene, camera: THREE.Camera, mapHelper?: MapHelper): DrawCallGroup[] {
  matrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  frustum.setFromProjectionMatrix(matrix);

  // Which origin each map mesh belongs to: the model of the building, or the ground
  const origin = new Map<THREE.Object3D, { label: string, root: THREE.Object3D, copies?: number }>();
  if (mapHelper) {
    for (const chunk of mapHelper.sceneMap.chunks) {
      chunk.grounds.forEach(ground => ground.mesh && origin.set(ground.mesh, { label: 'sol', root: ground.mesh }));
      for (const building of chunk.buildings) {
        const root = mapHelper.meshes[chunk.id + '-' + building.id];
        root?.traverse(o => origin.set(o, { label: building.modelId, root }));
      }
    }
    const player = mapHelper.scenePlayer.mesh;
    player?.traverse(o => origin.set(o, { label: 'joueur', root: player }));
    // Instanced copies: one mesh per part of the model for all its copies
    for (const set of mapHelper.instancedSets()) {
      set.parts.forEach(part => origin.set(part, { label: set.modelId, root: part, copies: set.copies }));
    }
  }

  const groups = new Map<string, DrawCallGroup>();
  const roots = new Map<string, Set<THREE.Object3D>>();
  const instanced = new Map<string, number>();
  scene.traverse(object => {
    if (!(object as THREE.Mesh).isMesh && !(object as THREE.Sprite).isSprite && !(object as THREE.LineSegments).isLine) {
      return;
    }
    if (!drawn(object)) {
      return;
    }
    const from = origin.get(object);
    const label = from?.label ?? 'météo / effets';
    const group = groups.get(label) ?? { label, calls: 0, objects: 0, copies: 0 };
    group.calls += callsOf(object);
    group.objects++;
    groups.set(label, group);
    if (from?.copies !== undefined) {
      instanced.set(label, Math.max(instanced.get(label) ?? 0, from.copies));
      return;
    }
    const set = roots.get(label) ?? new Set();
    set.add(from?.root ?? object);
    roots.set(label, set);
  });
  groups.forEach((group, label) => group.copies = (roots.get(label)?.size ?? 0) + (instanced.get(label) ?? 0));
  return [...groups.values()].sort((a, b) => b.calls - a.calls);
}
