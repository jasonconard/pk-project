import { Square3, Vec2, Vec3 } from "./SceneUtils";
import { SceneBuilding } from "./SceneBuilding";
import * as THREE from "three";

export enum ObjSide {
  FRONT,
  BACK,
  BOTH,
}

/**
 * What a map is used for: the world (the default map, big), a town, an interior, a dungeon floor, a room (a piece of
 * a generated dungeon floor, linked to others by its room doors).
 */
export type MapKind = "world" | "town" | "interior" | "dungeon" | "room";

export interface SceneMap {
  id: string;
  name: string;
  kind: MapKind;
  /** Where the player arrives when nothing else is said (a passage without a point, a new game). */
  spawn?: Vec3;
  /** The time on this map (missing: it passes as outside). */
  time?: MapTime;
  chunks: SceneChunk[];
}

export interface SceneChunk {
  id: string;
  pos: Vec3;
  size: Vec2;
  visible?: boolean;
  group?: THREE.Group;
  buildings: SceneBuilding[];
  grounds: ChunkGround[];
  /** Ground tiles painted in the editor over the first ground: 'column,row' (TILE_SIZE cells from the chunk corner) → tile id. */
  tiles?: Record<string, string>;
  /** Ground levels (reliefs) set in the editor: 'column,row' → level (LEVEL_HEIGHT units), 0 when missing. */
  heights?: Record<string, number>;
  /** Stairs set in the editor: 'column,row' → side the ramp rises towards (n, e, s, w; true = n, first version). */
  stairs?: Record<string, StairsSide | boolean>;
}

/** Side a stairs cell rises towards (one level). */
export type StairsSide = "n" | "e" | "s" | "w";

/** Side of a stored stairs value (null = no stairs). */
export function stairsSide(
  value: StairsSide | boolean | undefined
): StairsSide | null {
  return value === true ? "n" : value || null;
}

export interface ChunkGround {
  id: string;
  link: string;
  points: Square3;
  passable: boolean;
  canHide: boolean;
  mesh?: THREE.Mesh;
}

/**
 * The time on a map (design/map-manager.pen, Réglages de la carte): it stops (a dungeon: the clock keeps the hour
 * the player came in at) or stays frozen at an hour (whatever the hour outside); outside it goes on again.
 */
export type MapTime = { mode: "stop" } | { mode: "frozen"; hour: number };
