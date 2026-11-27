import * as THREE from "three";
import type { Game } from "../../model/Game";
import { SceneChunk, StairsSide, stairsSide } from "../../model/SceneMap";
import { TILE_SIZE } from "../../model/Terrain";
import type { EditAction } from "./edit-history";
import type { EditorGrid } from "./editor-grid";

/** Max cells painted by one bucket fill. */
const FILL_MAX = 4096;

/** One painting stroke: each painted cell with its tile before and after (for undo / redo). */
interface Stroke {
  cells: Map<
    string,
    {
      chunk: SceneChunk;
      col: number;
      row: number;
      before: string | null;
      after: string | null;
    }
  >;
  /** Height tool: each cell's level before / after (each cell moves one level per stroke). */
  levels: Map<
    string,
    {
      chunk: SceneChunk;
      col: number;
      row: number;
      before: number;
      after: number;
    }
  >;
  /** Stairs tool / eraser: each cell's stairs before / after. */
  stairs: Map<
    string,
    {
      chunk: SceneChunk;
      col: number;
      row: number;
      before: StairsSide | null;
      after: StairsSide | null;
    }
  >;
  /** Wall lean tool: each cell's lean before / after (null: the map's style). */
  slopes: Map<
    string,
    {
      chunk: SceneChunk;
      col: number;
      row: number;
      before: number | null;
      after: number | null;
    }
  >;
  /** Chunk tools: done once per stroke. */
  chunkDone?: boolean;
}

/** Prefix of the wall lean tools: `slope:<lean>` (see SLOPE_CHOICES), `slope:auto`. */
export const SLOPE_TOOL = "slope:";

type Cell = { chunk: SceneChunk; col: number; row: number };

/** Bucket: the cells of the same terrain connected to the one at (x, z) (4 neighbors, at most FILL_MAX). */
function fillCells(game: Game, x: number, z: number): Cell[] {
  const mapHelper = game.mapHelper!;
  const start = mapHelper.cellAt(x, z);
  if (!start) {
    return [];
  }
  const terrainOf = (cell: Cell) =>
    cell.chunk.tiles?.[cell.col + "," + cell.row];
  const target = terrainOf(start);
  const centerOf = (cell: { chunk: SceneChunk; col: number; row: number }) => [
    cell.chunk.pos.x - cell.chunk.size.x / 2 + (cell.col + 0.5) * TILE_SIZE,
    cell.chunk.pos.z - cell.chunk.size.y / 2 + (cell.row + 0.5) * TILE_SIZE,
  ];
  const seen = new Set<string>();
  const result: Cell[] = [];
  const queue = [start];
  while (queue.length > 0 && result.length < FILL_MAX) {
    const cell = queue.shift()!;
    const key = cell.chunk.id + ":" + cell.col + "," + cell.row;
    if (seen.has(key) || terrainOf(cell) !== target) {
      continue;
    }
    seen.add(key);
    result.push(cell);
    const [cx, cz] = centerOf(cell);
    for (const [dx, dz] of [
      [TILE_SIZE, 0],
      [-TILE_SIZE, 0],
      [0, TILE_SIZE],
      [0, -TILE_SIZE],
    ]) {
      const next = mapHelper.cellAt(cx + dx, cz + dz);
      if (next) {
        queue.push(next);
      }
    }
  }
  return result;
}

/**
 * Painting the map's ground in the editor: terrains, the eraser, the height tool, stairs. A stroke (the press and
 * the moves until the release, or one tap) is one undo step.
 */
export class GroundPainter {
  private stroke: Stroke | null = null;

  constructor(
    private readonly grid: EditorGrid,
    private readonly record: (game: Game, action: EditAction) => void
  ) {}

  get painting(): boolean {
    return this.stroke !== null;
  }

  begin() {
    this.stroke = {
      cells: new Map(),
      levels: new Map(),
      stairs: new Map(),
      slopes: new Map(),
    };
  }

  /** Drops the stroke (leaving the editor) without keeping it as a step. */
  cancel() {
    this.stroke = null;
  }

  /** Chunk tools act once per stroke: true the first time. */
  chunkTurn(): boolean {
    if (this.stroke && !this.stroke.chunkDone) {
      this.stroke.chunkDone = true;
      return true;
    }
    return false;
  }

  /**
   * Paints the cells under the brush at this point of the ground: a square of `editBrush` cells, or with the bucket
   * ('fill', terrains only), the whole area of the same terrain around it (once per stroke).
   */
  paint(game: Game, ground: THREE.Vector3) {
    const mapHelper = game.mapHelper;
    if (!this.stroke || !mapHelper) {
      return;
    }
    const terrainTool =
      !["raise", "lower", "stairs", "unstairs"].includes(
        game.editTileId ?? ""
      ) && !game.editTileId?.startsWith(SLOPE_TOOL);
    if (game.editBrush === "fill" && terrainTool) {
      if (this.stroke.cells.size === 0) {
        fillCells(game, ground.x, ground.z).forEach((cell) =>
          this.paintCell(game, cell)
        );
      }
      return;
    }
    const size = game.editBrush === "fill" ? 1 : game.editBrush;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const cell = mapHelper.cellAt(
          ground.x + i * TILE_SIZE,
          ground.z + j * TILE_SIZE
        );
        if (cell) {
          this.paintCell(game, cell);
        }
      }
    }
  }

  /** One cell of a stroke, with the current tool (terrain, eraser, height, stairs). */
  private paintCell(game: Game, cell: Cell) {
    if (!this.stroke || !game.mapHelper) {
      return;
    }
    const key = cell.chunk.id + ":" + cell.col + "," + cell.row;
    if (game.editTileId === "raise" || game.editTileId === "lower") {
      // Height tool: one level up / down per cell and per stroke
      if (!this.stroke.levels.has(key)) {
        const before = game.mapHelper.levelAt(cell.chunk, cell.col, cell.row);
        const after = before + (game.editTileId === "raise" ? 1 : -1);
        game.mapHelper.setLevel(cell.chunk, cell.col, cell.row, after);
        this.stroke.levels.set(key, {
          ...cell,
          before,
          after: game.mapHelper.levelAt(cell.chunk, cell.col, cell.row),
        });
        this.grid.refresh(game, [cell.chunk]);
      }
      return;
    }
    if (game.editTileId?.startsWith(SLOPE_TOOL)) {
      // Wall lean tool: 'slope:<lean>' paints it, 'slope:auto' gives the cell back to the map's style
      const value = game.editTileId.slice(SLOPE_TOOL.length);
      const after = value === "auto" ? null : Number(value);
      const before =
        game.mapHelper.slopeAt(cell.chunk, cell.col, cell.row) ?? null;
      if (!this.stroke.slopes.has(key) && before !== after) {
        game.mapHelper.setSlope(cell.chunk, cell.col, cell.row, after);
        this.stroke.slopes.set(key, { ...cell, before, after });
      }
      return;
    }
    // Stairs tool puts stairs; "no stairs" removes them, and so does the eraser (with the painted terrain)
    if (
      game.editTileId === "stairs" ||
      game.editTileId === "unstairs" ||
      game.editTileId === "erase"
    ) {
      const before = stairsSide(cell.chunk.stairs?.[cell.col + "," + cell.row]);
      if (
        !this.stroke.stairs.has(key) &&
        (before || game.editTileId === "stairs")
      ) {
        game.mapHelper.setStairs(
          cell.chunk,
          cell.col,
          cell.row,
          game.editTileId === "stairs" ? "auto" : null
        );
        const after = stairsSide(
          cell.chunk.stairs?.[cell.col + "," + cell.row]
        );
        this.stroke.stairs.set(key, { ...cell, before, after });
        this.grid.refresh(game, [cell.chunk]);
      }
      if (game.editTileId !== "erase") {
        return;
      }
    }
    const after = game.editTileId === "erase" ? null : game.editTileId;
    const before = cell.chunk.tiles?.[cell.col + "," + cell.row] ?? null;
    if (before === after) {
      return;
    }
    if (!this.stroke.cells.has(key)) {
      this.stroke.cells.set(key, { ...cell, before, after });
    }
    game.mapHelper.paintCell(cell.chunk, cell.col, cell.row, after);
  }

  /** A stroke is undone / redone as a whole. */
  end(game: Game) {
    const cells = [...(this.stroke?.cells.values() ?? [])];
    const levels = [...(this.stroke?.levels.values() ?? [])].filter(
      (l) => l.before !== l.after
    );
    const stairs = [...(this.stroke?.stairs.values() ?? [])];
    const slopes = [...(this.stroke?.slopes.values() ?? [])];
    this.stroke = null;
    if (
      (cells.length === 0 &&
        levels.length === 0 &&
        stairs.length === 0 &&
        slopes.length === 0) ||
      !game.mapHelper
    ) {
      return;
    }
    const mapHelper = game.mapHelper;
    const reliefChunks = [...levels, ...stairs].map((c) => c.chunk);
    this.record(game, {
      undo: () => {
        cells.forEach((c) =>
          mapHelper.paintCell(c.chunk, c.col, c.row, c.before)
        );
        levels.forEach((l) =>
          mapHelper.setLevel(l.chunk, l.col, l.row, l.before)
        );
        stairs.forEach((s) =>
          mapHelper.setStairs(s.chunk, s.col, s.row, s.before)
        );
        slopes.forEach((s) =>
          mapHelper.setSlope(s.chunk, s.col, s.row, s.before)
        );
        this.grid.refresh(game, reliefChunks);
      },
      redo: () => {
        cells.forEach((c) =>
          mapHelper.paintCell(c.chunk, c.col, c.row, c.after)
        );
        levels.forEach((l) =>
          mapHelper.setLevel(l.chunk, l.col, l.row, l.after)
        );
        stairs.forEach((s) =>
          mapHelper.setStairs(s.chunk, s.col, s.row, s.after)
        );
        slopes.forEach((s) =>
          mapHelper.setSlope(s.chunk, s.col, s.row, s.after)
        );
        this.grid.refresh(game, reliefChunks);
      },
    });
  }
}
