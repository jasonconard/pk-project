import {
  dungeonModel,
  foeModel,
  isDungeonObject,
  isFoe,
} from "./dungeon-object";
import * as THREE from "three";
import { SceneModel } from "./SceneModel";
import { SceneBuilding } from "./SceneBuilding";
import { MODELS } from "../../../../../assets/models/models";
import { isNpc, npcModel } from "./npc-sprite";
import { LIGHT_ID, MD_LIGHT } from "./light";

/**
 * An invisible zone: an object of the map editor (tab Événements) that only exists for its events (walking into
 * it, a hidden thing to look at). Seen in the editor as a see-through orange box, never in the game: its meshes are
 * on their own layer, that only the editor's camera shows. Its size is set in cells (building.size).
 */
export const ZONE_ID = "zone";
/** The camera layer of the zones (the game's camera only sees layer 0). */
export const ZONE_LAYER = 1;
/** One cell of a zone: the editor's grid step. */
export const ZONE_CELL = 8;
export const ZONE_HEIGHT = 8;
export const ZONE_MAX_CELLS = 32;
export const ZONE_DEFAULT_SIZE = { x: 2, z: 2 };

/** A model with no part: what a zone's building points to (its mesh is made by makeZoneMesh). */
export const MD_ZONE: SceneModel = {
  id: ZONE_ID,
  tex: { link: "", size: { x: 1, y: 1 } },
  boxes: [],
  planes: [],
  hitBox: { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } },
};

/** Is it a zone (an object, or a model)? */
export function isZone(
  item: Pick<SceneBuilding, "modelId"> | Pick<SceneModel, "id">
): boolean {
  return ("modelId" in item ? item.modelId : item.id) === ZONE_ID;
}

/** A model by its id: the exported and browser models, the zone, and the NPCs (see npc-sprite.ts). */
export function findModel(id: string): SceneModel | undefined {
  if (id === ZONE_ID) {
    return MD_ZONE;
  }
  if (id === LIGHT_ID) {
    return MD_LIGHT;
  }
  if (isDungeonObject({ id })) {
    return dungeonModel(id);
  }
  if (isFoe({ modelId: id })) {
    return foeModel(id);
  }
  return isNpc({ id }) ? npcModel(id) : MODELS.find((m) => m.id === id);
}

const fillMaterial = new THREE.MeshBasicMaterial({
  color: 0xff_b0_4a,
  transparent: true,
  opacity: 0.3,
  depthWrite: false,
});
const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xff_d3_4d });
const boxGeometry = new THREE.BoxGeometry(
  ZONE_CELL,
  ZONE_HEIGHT,
  ZONE_CELL
).translate(0, ZONE_HEIGHT / 2, 0);
const edgeGeometry = new THREE.EdgesGeometry(boxGeometry);

/** The zone's box, centred on its position, `size` cells wide (x) and deep (z). */
export function makeZoneMesh(
  size: { x: number; z: number } = ZONE_DEFAULT_SIZE,
  opacity?: number
): THREE.Group {
  const group = new THREE.Group();
  const fill = new THREE.Mesh(
    boxGeometry,
    opacity === undefined
      ? fillMaterial
      : Object.assign(fillMaterial.clone(), { opacity })
  );
  const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
  group.add(fill, edges);
  group.scale.set(size.x, 1, size.z);
  group.traverse((o) => o.layers.set(ZONE_LAYER));
  return group;
}
