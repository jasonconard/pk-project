import { LEVEL_HEIGHT } from "./GroundMesh";
import { isLightObject } from "./light";
import { loadModelThumb, MODEL_CHOICES } from "./ModelChoice";
import { isNpc } from "./npc-sprite";
import { passageOf } from "./Passage";
import { SceneChunk, SceneMap } from "./SceneMap";
import { SceneModel } from "./SceneModel";
import { isFoe } from "./dungeon-object";
import { terrainById, TILE_SIZE, TILESET_LINK, tilesetPos } from "./Terrain";
import { findModel, isZone } from "./Zone";

/**
 * A map's plan (Menu → Carte): the map seen from above, drawn from its data alone (every chunk, built in the scene
 * or not): the painted ground, the reliefs as lighter tops (darker in a cave) with a dark cliff under them, the objects drawn with their
 * model's picture standing on their footprint (a house shows its front, like on an old town map). The passages to
 * other maps are listed apart, for the markers.
 */
export interface MapPlan {
  canvas: HTMLCanvasElement;
  /** Plan pixels per world unit. */
  scale: number;
  /** The world point of the plan's top left corner. */
  origin: { x: number; z: number };
  /** The passages to other maps, where they stand (world). */
  passages: PlanPassage[];
}

export interface PlanPassage {
  x: number;
  z: number;
  /** The map it leads to (`dungeon:<id>` for a dungeon). */
  map: string;
}

/** Plan pixels per world unit: a ground cell (16 units) is 8 px. */
export const PLAN_SCALE = 0.5;
/** How dark a cliff's face is, and how much lighter each level of height makes a top. */
const CLIFF = "rgba(12, 10, 20, 0.55)";
const TOP_LIGHT = 0.07;

/** Pictures loaded once. */
const IMAGES = new Map<string, Promise<HTMLImageElement | null>>();
function loadImage(link: string): Promise<HTMLImageElement | null> {
  let image = IMAGES.get(link);
  if (!image) {
    image = new Promise((resolve) => {
      const img = new Image();
      img.addEventListener("load", () => resolve(img), { once: true });
      img.addEventListener("error", () => resolve(null), { once: true });
      img.src = link;
    });
    IMAGES.set(link, image);
  }
  return image;
}

/** A chunk's top left corner (world). */
function corner(chunk: SceneChunk): { x: number; z: number } {
  return {
    x: chunk.pos.x - chunk.size.x / 2,
    z: chunk.pos.z - chunk.size.y / 2,
  };
}

/** The level of a cell given in world cells (0 outside the map). */
function levelReader(map: SceneMap): (col: number, row: number) => number {
  const levels = new Map<string, number>();
  for (const chunk of map.chunks) {
    const c = corner(chunk);
    for (const [key, level] of Object.entries(chunk.heights ?? {})) {
      const [col, row] = key.split(",").map(Number);
      levels.set(
        `${Math.round(c.x / TILE_SIZE) + col},${Math.round(c.z / TILE_SIZE) + row}`,
        level
      );
    }
  }
  return (col, row) => levels.get(`${col},${row}`) ?? 0;
}

/** A model's footprint on the ground, from its parts: how wide (x) and how deep (z) it is. */
function footprint(model: SceneModel): { wide: number; deep: number } {
  const parts = [...model.boxes, ...model.planes];
  const span = (axis: "x" | "z") => {
    const from = Math.min(...parts.map((o) => o.pos[axis] - o.size[axis] / 2));
    const to = Math.max(...parts.map((o) => o.pos[axis] + o.size[axis] / 2));
    return parts.length > 0 ? to - from : 0;
  };
  return { wide: span("x"), deep: span("z") };
}

/** Draws a map's plan. The objects put by the game (enemies, NPCs) and the invisible ones are left out. */
export async function drawMapPlan(map: SceneMap): Promise<MapPlan> {
  const s = PLAN_SCALE;
  const corners = map.chunks.map((chunk) => corner(chunk));
  const origin = {
    x: Math.min(...corners.map((c) => c.x)),
    z: Math.min(...corners.map((c) => c.z)),
  };
  const end = {
    x: Math.max(...map.chunks.map((c, i) => corners[i].x + c.size.x)),
    z: Math.max(...map.chunks.map((c, i) => corners[i].z + c.size.y)),
  };
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round((end.x - origin.x) * s));
  canvas.height = Math.max(1, Math.round((end.z - origin.z) * s));
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = false;
  const px = (x: number) => Math.round((x - origin.x) * s);
  const pz = (z: number) => Math.round((z - origin.z) * s);
  const cell = TILE_SIZE * s;

  // The ground: each chunk's first texture, then its painted tiles (their plain tile, without the borders)
  const tileset = await loadImage(TILESET_LINK);
  for (const [i, chunk] of map.chunks.entries()) {
    const at = corners[i];
    const base = chunk.grounds[0]?.link
      ? await loadImage(chunk.grounds[0].link)
      : null;
    if (base) {
      ctx.drawImage(
        base,
        px(at.x),
        pz(at.z),
        chunk.size.x * s,
        chunk.size.y * s
      );
    }
    for (const [key, id] of Object.entries(chunk.tiles ?? {})) {
      const terrain = terrainById(id);
      if (!terrain || !tileset) {
        continue;
      }
      const [col, row] = key.split(",").map(Number);
      const from = tilesetPos(terrain.center[0], terrain.center[1]);
      ctx.drawImage(
        tileset,
        from.x,
        from.y,
        TILE_SIZE,
        TILE_SIZE,
        px(at.x + col * TILE_SIZE),
        pz(at.z + row * TILE_SIZE),
        cell,
        cell
      );
    }
  }

  // The reliefs: a raised top is lighter, and shows a dark cliff on the cells south of it that are lower
  const level = levelReader(map);
  const tone = map.walls === "cave" ? "6, 6, 14" : "255, 255, 255";
  for (const [i, chunk] of map.chunks.entries()) {
    const at = corners[i];
    for (const [key, own] of Object.entries(chunk.heights ?? {})) {
      const [col, row] = key.split(",").map(Number);
      const x = at.x + col * TILE_SIZE;
      const z = at.z + row * TILE_SIZE;
      if (own > 0) {
        // (outside, a height is lighter; in a cave the raised rock is the wall around the floor: darker)
        ctx.fillStyle = `rgba(${tone}, ${Math.min(0.5, own * TOP_LIGHT)})`;
        ctx.fillRect(px(x), pz(z), cell, cell);
      }
      const south = level(
        Math.round(x / TILE_SIZE),
        Math.round(z / TILE_SIZE) + 1
      );
      if (own > south) {
        const face = Math.min(
          cell * 2,
          Math.max(2, (own - south) * LEVEL_HEIGHT * s * 0.5)
        );
        ctx.fillStyle = CLIFF;
        ctx.fillRect(px(x), pz(z + TILE_SIZE), cell, Math.round(face));
      }
    }
  }

  // The objects, the farthest first: their model's picture standing on their footprint
  const objects = map.chunks
    .flatMap((chunk) =>
      chunk.buildings.map((b) => ({
        b,
        x: chunk.pos.x + b.pos.x,
        z: chunk.pos.z + b.pos.z,
      }))
    )
    .filter(
      ({ b }) =>
        !b.generated &&
        !isZone(b) &&
        !isLightObject(b) &&
        !isFoe(b) &&
        !isNpc({ id: b.modelId })
    )
    .sort((a, b) => a.z - b.z);
  const passages: PlanPassage[] = [];
  for (const { b, x, z } of objects) {
    const passage = passageOf(b);
    if (passage) {
      passages.push({ x, z, map: passage.map });
    }
    const model = findModel(b.modelId);
    if (!model) {
      continue;
    }
    const choice = MODEL_CHOICES.find((c) => c.model.id === model.id) ?? {
      model,
    };
    const thumb = await loadImage(await loadModelThumb(choice));
    if (!thumb?.width) {
      continue;
    }
    const foot = footprint(model);
    // (turned a quarter: its footprint's width is its depth)
    const turned = (b.rot ?? 0) % 2 === 1;
    const wide = turned ? foot.deep : foot.wide;
    const deep = turned ? foot.wide : foot.deep;
    const w = Math.max(4, wide * s);
    const h = (w * thumb.height) / thumb.width;
    ctx.drawImage(
      thumb,
      Math.round(px(x) - w / 2),
      Math.round(pz(z + deep / 2) - h),
      Math.round(w),
      Math.round(h)
    );
  }
  return { canvas, scale: s, origin, passages };
}
