import * as THREE from 'three';
import { SceneModel } from './SceneModel';
import { SceneBuilding } from './SceneBuilding';
import { BasicMeshService } from '../services/basic-mesh.service';

/** Room made when the copies don't fit anymore (the instanced meshes are created again, bigger). */
const GROWTH = 2;
const MIN_CAPACITY = 8;

/** Template of a model for instancing: its parts (geometry, material, place in the model) and its bounds. */
interface Template {
  parts: { mesh: THREE.Mesh, matrix: THREE.Matrix4 }[];
  bounds: THREE.Box3;
  /** All its parts are drawn with the depth test: their drawing order doesn't matter, they can be instanced. */
  instanceable: boolean;
}

const templates = new Map<string, Template>();

/** The model built once (merged parts), shared by all the copies of every chunk. */
function templateOf(model: SceneModel): Template {
  let template = templates.get(model.id);
  if (!template) {
    const group = BasicMeshService.makeModel(model);
    group.updateMatrixWorld(true);
    const parts = group.children
      .filter((c): c is THREE.Mesh => (c as THREE.Mesh).isMesh)
      .map(mesh => ({ mesh, matrix: mesh.matrix.clone() }));
    template = {
      parts,
      bounds: new THREE.Box3().setFromObject(group),
      instanceable: parts.every(p => (p.mesh.material as THREE.Material).depthTest),
    };
    templates.set(model.id, template);
  }
  return template;
}

/**
 * Can a building be drawn as a copy of its model (instancing)? Not if it fades when the player is behind it
 * (its own opacity), has events (they need its own mesh), or its look depends on the drawing order of its parts.
 */
export function canInstance(model: SceneModel, building: SceneBuilding): boolean {
  return !building.canHide && !building.events.length && templateOf(model).instanceable;
}

/**
 * All the copies of a model in a chunk drawn at once: one instanced mesh per part of the model (a tree is
 * 1 draw call for all the trees of the chunk instead of 1 per tree). Copy i of every part is building i.
 * The copies are never hidden one by one (they don't fade; the chunk itself is hidden when far away).
 */
export class ModelInstances {
  readonly buildings: SceneBuilding[] = [];
  /** Instanced meshes, one per part of the model (in the chunk group). */
  parts: THREE.InstancedMesh[] = [];
  private readonly template: Template;
  private capacity = 0;
  private readonly matrix = new THREE.Matrix4();
  private readonly position = new THREE.Matrix4();

  constructor(model: SceneModel, private readonly group: THREE.Group) {
    this.template = templateOf(model);
    this.grow(MIN_CAPACITY);
  }

  /** Bounds of a copy standing at `world` (collisions, editor selection). */
  boundsAt(world: THREE.Vector3): THREE.Box3 {
    return this.template.bounds.clone().translate(world);
  }

  has(building: SceneBuilding): boolean {
    return this.buildings.includes(building);
  }

  add(building: SceneBuilding, world: THREE.Vector3) {
    if (this.buildings.length >= this.capacity) {
      this.grow(this.capacity * GROWTH);
    }
    this.buildings.push(building);
    this.write(this.buildings.length - 1, world);
    this.updateCount();
  }

  /** Removes a copy: the last one takes its place (no hole). */
  remove(building: SceneBuilding) {
    const i = this.buildings.indexOf(building);
    if (i < 0) {
      return;
    }
    const last = this.buildings.length - 1;
    if (i !== last) {
      this.buildings[i] = this.buildings[last];
      this.parts.forEach(part => {
        part.getMatrixAt(last, this.matrix);
        part.setMatrixAt(i, this.matrix);
      });
    }
    this.buildings.pop();
    this.updateCount();
  }

  move(building: SceneBuilding, world: THREE.Vector3) {
    const i = this.buildings.indexOf(building);
    if (i >= 0) {
      this.write(i, world);
      this.updateCount();
    }
  }

  /** The building of a copy hit by a ray (instanceId of the hit). */
  buildingAt(instanceId: number | undefined): SceneBuilding | null {
    return instanceId === undefined ? null : this.buildings[instanceId] ?? null;
  }

  dispose() {
    this.parts.forEach(part => {
      part.removeFromParent();
      part.dispose();
    });
    this.parts = [];
  }

  private write(i: number, world: THREE.Vector3) {
    this.position.makeTranslation(world.x, world.y, world.z);
    this.template.parts.forEach(({ matrix }, p) =>
      this.parts[p].setMatrixAt(i, this.matrix.multiplyMatrices(this.position, matrix)));
  }

  private updateCount() {
    this.parts.forEach(part => {
      part.count = this.buildings.length;
      part.instanceMatrix.needsUpdate = true;
      // Bounds for the raycasts (editor clicks, rain): computed again from the copies
      part.boundingSphere = null;
      part.boundingBox = null;
    });
  }

  /** (Re)creates the instanced meshes with room for `capacity` copies, keeping the current ones. */
  private grow(capacity: number) {
    const old = this.parts;
    this.parts = this.template.parts.map(({ mesh }, p) => {
      const part = new THREE.InstancedMesh(mesh.geometry, mesh.material, capacity);
      part.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      part.castShadow = mesh.castShadow;
      part.receiveShadow = mesh.receiveShadow;
      part.userData = { ...mesh.userData };
      if (mesh.customDepthMaterial) {
        part.customDepthMaterial = mesh.customDepthMaterial;
      }
      // The copies are spread over the chunk: always drawn when the chunk is
      part.frustumCulled = false;
      (part.material as THREE.Material).forceSinglePass = true;
      for (let i = 0; i < this.buildings.length; i++) {
        old[p].getMatrixAt(i, this.matrix);
        part.setMatrixAt(i, this.matrix);
      }
      part.count = this.buildings.length;
      this.group.add(part);
      return part;
    });
    old.forEach(part => {
      part.removeFromParent();
      part.dispose();
    });
    this.capacity = capacity;
  }
}
