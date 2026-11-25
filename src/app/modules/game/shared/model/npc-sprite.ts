import * as THREE from "three";
import { SceneModel } from "./SceneModel";
import { SceneBuilding } from "./SceneBuilding";
import { CAMERA_LOOK } from "./Game";
import { BasicMeshService } from "../services/basic-mesh.service";
import { cachedFromStorage } from "../../../../core/shared/local-store";
import {
  DATABASE_KEY,
  loadDatabase,
} from "../../../database-editor/shared/database-storage";
import {
  DbNpc,
  WALK_CELL,
  WALK_DIRS,
  WALK_FRAMES,
  WALK_STAND,
} from "../../../database-editor/shared/database";
import { SCENE_PLAYER } from "../../../../../assets/characters/player";

/**
 * An NPC of the database placed on a map (design/main-view.pen, Poser un PNJ): an object of the map whose model id is
 * `npc:<id>`, drawn like the player (its walking sheet's standing picture, upright and facing the camera) and turned
 * with the editor's Tourner (rot 0 down, 1 left, 2 up, 3 right). An invisible box gives it a body: it blocks the way
 * and the player talks to it like to any object with events.
 */
export const NPC_PREFIX = "npc:";

export function npcModelId(npcId: string): string {
  return NPC_PREFIX + npcId;
}

/** Is it an NPC (an object, or a model)? */
export function isNpc(
  item: Pick<SceneBuilding, "modelId"> | Pick<SceneModel, "id">
): boolean {
  return ("modelId" in item ? item.modelId : item.id).startsWith(NPC_PREFIX);
}

/** The body (blocks the way, the player talks to it): a box at the feet, narrower than the picture. */
const BODY = { x: 12, y: 20, z: 8 };

const models = new Map<string, SceneModel>();

/** A model with no part: what an NPC's object points to (its mesh is made by makeNpcMesh). */
export function npcModel(modelId: string): SceneModel {
  let model = models.get(modelId);
  if (!model) {
    model = {
      id: modelId,
      tex: { link: "", size: { x: 1, y: 1 } },
      boxes: [],
      planes: [],
      hitBox: {
        min: { x: -BODY.x / 2, y: 0, z: -BODY.z / 2 },
        max: { x: BODY.x / 2, y: BODY.y, z: BODY.z / 2 },
      },
    };
    models.set(modelId, model);
  }
  return model;
}

const npcsById = cachedFromStorage(
  [DATABASE_KEY],
  () => new Map(loadDatabase().npcs.map((n) => [n.id, n]))
);

/** The NPC of the database an object shows (undefined: removed from the database). */
export function npcOf(modelId: string): DbNpc | undefined {
  return npcsById().get(modelId.slice(NPC_PREFIX.length));
}

/** The NPCs of the database (the editor's palette). */
export function allNpcs(): DbNpc[] {
  return [...npcsById().values()];
}

/** The sheet's row of each turn: rot 0 faces +z (down), 1 west (left), 2 back (up), 3 east (right). */
const ROW_OF_ROT = [0, 1, 3, 2];

const bodyGeometry = new THREE.BoxGeometry(BODY.x, BODY.y, BODY.z).translate(
  0,
  BODY.y / 2,
  0
);
// (never drawn: the fading of objects near the camera sets mesh.visible, not the material's)
const bodyMaterial = new THREE.MeshBasicMaterial({ visible: false });

/**
 * The NPC's picture turned `rot` quarter turns: the standing picture of its walking sheet (without one, the first
 * player sprite as a stand-in), upright and stretched like the player's, with its invisible body.
 */
export function makeNpcMesh(modelId: string, rot: number): THREE.Group {
  const walk = npcOf(modelId)?.walk;
  const old = SCENE_PLAYER.tex;
  const size = walk
    ? new THREE.Vector2(WALK_CELL.w, WALK_CELL.h)
    : new THREE.Vector2(old.size.x, old.size.y);
  const plane = BasicMeshService.makePlane(walk ?? old.link, size, true);
  const row = ROW_OF_ROT[rot % 4];
  // u from left to right, v from bottom to top (the old sprite: its first standing picture, top left 14×22 of 59×65)
  const box = walk
    ? {
        u0: WALK_STAND / WALK_FRAMES,
        u1: (WALK_STAND + 1) / WALK_FRAMES,
        v0: 1 - (row + 1) / WALK_DIRS.length,
        v1: 1 - row / WALK_DIRS.length,
      }
    : { u0: 0, u1: 14 / 59, v0: 44 / 65, v1: 1 };
  const uv = plane.geometry.getAttribute("uv");
  uv.setXY(0, box.u0, box.v1);
  uv.setXY(1, box.u1, box.v1);
  uv.setXY(2, box.u0, box.v0);
  uv.setXY(3, box.u1, box.v0);
  uv.needsUpdate = true;
  // Upright and stretched like the player (see MapHelper.makePlayerSprite)
  const stretch = 1 / Math.cos(Math.atan2(CAMERA_LOOK.y, CAMERA_LOOK.z));
  plane.scale.y = stretch;
  plane.position.y = (size.y / 2) * stretch;
  plane.castShadow = false;

  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);

  const group = new THREE.Group();
  group.add(plane, body);
  return group;
}
