import * as THREE from "three";
import { PlayerDirection } from "./ScenePlayer";
import { TILE_SIZE } from "./Terrain";

/**
 * An object's action zone (design/main-view.pen, Zones d'action; model-editor-mobile.pen screen 11): where the player
 * acts on it. Some cells of the object seen from above (its footprint cut into a grid of map cells; none: the whole
 * object) and the side the player acts from (front: the +z side of the model, facing the camera when not turned).
 * The model gives the default zone (`SceneModel.zone`), a placed object may have its own (`SceneBuilding.zone`), an
 * event too (`SceneEventCondition.zone`). The cells are kept with the grid they were drawn on (its columns and rows),
 * so they still fit when the model's size changes a little.
 */
export type ZoneSide = "front" | "back" | "left" | "right" | "all";

export interface ActionZone {
  /** The grid the cells were drawn on: columns along x, rows along z (from the back to the front). */
  grid: { cols: number; rows: number };
  /** Column, row of each cell of the zone; empty: the whole object. */
  cells: { c: number; r: number }[];
  side: ZoneSide;
}

export const ZONE_SIDES: { id: ZoneSide; label: string }[] = [
  { id: "front", label: "Devant" },
  { id: "back", label: "Derrière" },
  { id: "left", label: "Gauche" },
  { id: "right", label: "Droite" },
  { id: "all", label: "Tous" },
];

/** The zone's colour in the editors (cyan). */
export const ZONE_COLOR = 0x4f_d1_e8;

/** The grid of an object's footprint: one cell per map cell (at least 1 × 1, at most 12 × 12). */
export function zoneGrid(
  width: number,
  depth: number
): { cols: number; rows: number } {
  const count = (size: number) =>
    Math.min(12, Math.max(1, Math.round(size / TILE_SIZE)));
  return { cols: count(width), rows: count(depth) };
}

/** A zone that changes nothing: no cell, every side (the object as before zones). */
export function isWholeObject(zone: ActionZone | null | undefined): boolean {
  return !zone || (zone.cells.length === 0 && zone.side === "all");
}

/** « 1 case · devant », « Tout l'objet · devant », « Tout l'objet ». */
export function zoneSummary(zone: ActionZone | null | undefined): string {
  if (isWholeObject(zone)) {
    return "Tout l'objet, de tous les côtés";
  }
  const cells = zone!.cells.length;
  const where =
    cells === 0 ? "Tout l'objet" : `${cells} case${cells > 1 ? "s" : ""}`;
  const side = ZONE_SIDES.find((s) => s.id === zone!.side)!.label;
  return zone!.side === "all"
    ? `${where} · tous les côtés`
    : `${where} · ${side.toLowerCase()}`;
}

/** The zone with a cell added or taken out. */
export function toggleCell(zone: ActionZone, c: number, r: number): ActionZone {
  const has = zone.cells.some((cell) => cell.c === c && cell.r === r);
  return {
    ...zone,
    cells: has
      ? zone.cells.filter((cell) => cell.c !== c || cell.r !== r)
      : [...zone.cells, { c, r }],
  };
}

interface Rect {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

/** A local point (around the footprint's centre, not turned) once the object is turned (quarter turns, clockwise). */
function turn(x: number, z: number, rot: number): { x: number; z: number } {
  let p = { x, z };
  for (let i = 0; i < ((rot % 4) + 4) % 4; i++) {
    p = { x: -p.z, z: p.x };
  }
  return p;
}

function turnRect(rect: Rect, rot: number): Rect {
  const a = turn(rect.minX, rect.minZ, rot);
  const b = turn(rect.maxX, rect.maxZ, rot);
  return {
    minX: Math.min(a.x, b.x),
    maxX: Math.max(a.x, b.x),
    minZ: Math.min(a.z, b.z),
    maxZ: Math.max(a.z, b.z),
  };
}

/** The footprint not turned (its size along the model's own x and z). */
function localSize(bounds: THREE.Box3, rot: number) {
  const w = bounds.max.x - bounds.min.x;
  const d = bounds.max.z - bounds.min.z;
  return rot % 2 === 0 ? { w, d } : { w: d, d: w };
}

/** The cells of a zone, in local coordinates (around the footprint's centre). */
function localCells(zone: ActionZone, w: number, d: number): Rect[] {
  const cw = w / zone.grid.cols;
  const cd = d / zone.grid.rows;
  if (zone.cells.length === 0) {
    return [{ minX: -w / 2, maxX: w / 2, minZ: -d / 2, maxZ: d / 2 }];
  }
  return zone.cells.map(({ c, r }) => ({
    minX: -w / 2 + c * cw,
    maxX: -w / 2 + (c + 1) * cw,
    minZ: -d / 2 + r * cd,
    maxZ: -d / 2 + (r + 1) * cd,
  }));
}

/** How far the player's centre may be beside a cell, along the side (half a step: the sprite is wider than a point). */
const SIDE_MARGIN = 4;

/**
 * Is the player where the zone lets them act? `reach`: how far from the object (24 a door, 20 talking); `walk`:
 * stepping on it (the cells themselves, any side).
 */
export function inZone(
  zone: ActionZone,
  bounds: THREE.Box3,
  rot: number,
  player: THREE.Vector3,
  reach: number,
  walk: boolean
): boolean {
  const { w, d } = localSize(bounds, rot);
  const cx = (bounds.min.x + bounds.max.x) / 2;
  const cz = (bounds.min.z + bounds.max.z) / 2;
  return localCells(zone, w, d).some((cell) => {
    let rect: Rect;
    if (walk) {
      rect = cell;
    } else {
      const m = SIDE_MARGIN;
      switch (zone.side) {
        case "front":
          rect = {
            ...cell,
            minX: cell.minX - m,
            maxX: cell.maxX + m,
            maxZ: d / 2 + reach,
          };
          break;
        case "back":
          rect = {
            ...cell,
            minX: cell.minX - m,
            maxX: cell.maxX + m,
            minZ: -d / 2 - reach,
          };
          break;
        case "right":
          rect = {
            ...cell,
            minZ: cell.minZ - m,
            maxZ: cell.maxZ + m,
            maxX: w / 2 + reach,
          };
          break;
        case "left":
          rect = {
            ...cell,
            minZ: cell.minZ - m,
            maxZ: cell.maxZ + m,
            minX: -w / 2 - reach,
          };
          break;
        default:
          rect = {
            minX: cell.minX - reach,
            maxX: cell.maxX + reach,
            minZ: cell.minZ - reach,
            maxZ: cell.maxZ + reach,
          };
      }
    }
    const world = turnRect(rect, rot);
    return (
      player.x >= cx + world.minX &&
      player.x <= cx + world.maxX &&
      player.z >= cz + world.minZ &&
      player.z <= cz + world.maxZ
    );
  });
}

/** Where the player faces to act from the zone's side (towards the object); undefined: any way (every side). */
export function zoneFacing(
  zone: ActionZone,
  rot: number
): PlayerDirection | undefined {
  const normal = {
    front: { x: 0, z: 1 },
    back: { x: 0, z: -1 },
    right: { x: 1, z: 0 },
    left: { x: -1, z: 0 },
    all: null,
  }[zone.side];
  if (!normal) {
    return undefined;
  }
  const n = turn(normal.x, normal.z, rot);
  if (Math.round(n.z) === 1) {
    return PlayerDirection.UP;
  }
  if (Math.round(n.z) === -1) {
    return PlayerDirection.DOWN;
  }
  return Math.round(n.x) === 1 ? PlayerDirection.LEFT : PlayerDirection.RIGHT;
}

/** The cell of the zone's grid under a point of the map (null: outside the object). The map editor's taps. */
export function cellAt(
  grid: { cols: number; rows: number },
  bounds: THREE.Box3,
  rot: number,
  point: { x: number; z: number }
): { c: number; r: number } | null {
  const { w, d } = localSize(bounds, rot);
  const cx = (bounds.min.x + bounds.max.x) / 2;
  const cz = (bounds.min.z + bounds.max.z) / 2;
  // (back to the model's own axes: the opposite turn)
  const local = turn(point.x - cx, point.z - cz, 4 - (((rot % 4) + 4) % 4));
  const c = Math.floor(((local.x + w / 2) / w) * grid.cols);
  const r = Math.floor(((local.z + d / 2) / d) * grid.rows);
  return c >= 0 && c < grid.cols && r >= 0 && r < grid.rows ? { c, r } : null;
}

/** The zone's cells on the map (world rectangles, for the editor's overlay). */
export function zoneCellRects(
  zone: ActionZone,
  bounds: THREE.Box3,
  rot: number
): { all: Rect[]; on: Rect[] } {
  const { w, d } = localSize(bounds, rot);
  const cx = (bounds.min.x + bounds.max.x) / 2;
  const cz = (bounds.min.z + bounds.max.z) / 2;
  const toWorld = (rect: Rect) => {
    const t = turnRect(rect, rot);
    return {
      minX: cx + t.minX,
      maxX: cx + t.maxX,
      minZ: cz + t.minZ,
      maxZ: cz + t.maxZ,
    };
  };
  const every: ActionZone = {
    ...zone,
    cells: Array.from({ length: zone.grid.cols * zone.grid.rows }, (_, i) => ({
      c: i % zone.grid.cols,
      r: Math.floor(i / zone.grid.cols),
    })),
  };
  return {
    all: localCells(every, w, d).map(toWorld),
    on: zone.cells.length > 0 ? localCells(zone, w, d).map(toWorld) : [],
  };
}
