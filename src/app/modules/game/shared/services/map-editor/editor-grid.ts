import * as THREE from "three";
import type { Game } from "../../model/Game";
import { LEVEL_HEIGHT } from "../../model/GroundMesh";
import { SceneChunk, stairsSide } from "../../model/SceneMap";
import { TILE_SIZE } from "../../model/Terrain";

/** Cells grid: color, opacity, and height above the ground (world units). */
const GRID_COLOR = 0xff_ff_ff;
const GRID_OPACITY = 0.35;
const GRID_LIFT = 0.4;

/** The map editor's cells grid: one set of lines per chunk, built when the chunk comes into view. */
export class EditorGrid {
  private readonly grids = new Map<string, THREE.LineSegments>();
  private readonly material = new THREE.LineBasicMaterial({
    color: GRID_COLOR,
    transparent: true,
    opacity: GRID_OPACITY,
  });

  /** The grid of the chunks coming into view (and none for the chunks taken down: far away). */
  follow(game: Game) {
    game.mapHelper?.sceneMap.chunks.forEach((chunk) => {
      const grid = this.grids.get(chunk.id);
      if (grid && grid.parent !== chunk.group) {
        this.remove(chunk.id);
      }
      if (chunk.visible && !this.grids.has(chunk.id)) {
        this.build(game, chunk);
      }
    });
  }

  /**
   * Lines around every cell of a chunk, just above its ground: at the cell level, sloped on stairs. Rebuilt when the
   * reliefs of the chunk change.
   */
  build(game: Game, chunk: SceneChunk) {
    const mapHelper = game.mapHelper;
    if (!mapHelper || !chunk.group) {
      return;
    }
    this.remove(chunk.id);
    const cols = chunk.size.x / TILE_SIZE;
    const rows = chunk.size.y / TILE_SIZE;
    const points: number[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const y = mapHelper.levelAt(chunk, col, row) * LEVEL_HEIGHT + GRID_LIFT;
        const stairs = stairsSide(chunk.stairs?.[col + "," + row]);
        const x0 = col * TILE_SIZE - chunk.size.x / 2;
        const z0 = row * TILE_SIZE - chunk.size.y / 2;
        const x1 = x0 + TILE_SIZE;
        const z1 = z0 + TILE_SIZE;
        const h = (high: boolean) => (high ? y + LEVEL_HEIGHT : y);
        // Corners: north-west, north-east, south-east, south-west (stairs: the side they rise towards is higher)
        const corners = [
          [x0, h(stairs === "n" || stairs === "w"), z0],
          [x1, h(stairs === "n" || stairs === "e"), z0],
          [x1, h(stairs === "s" || stairs === "e"), z1],
          [x0, h(stairs === "s" || stairs === "w"), z1],
        ];
        corners.forEach((corner, i) =>
          points.push(...corner, ...corners[(i + 1) % 4])
        );
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(points, 3)
    );
    const grid = new THREE.LineSegments(geometry, this.material);
    grid.position.set(chunk.pos.x, chunk.pos.y, chunk.pos.z);
    chunk.group.add(grid);
    this.grids.set(chunk.id, grid);
  }

  remove(chunkId: string) {
    const grid = this.grids.get(chunkId);
    if (grid) {
      grid.removeFromParent();
      grid.geometry.dispose();
      this.grids.delete(chunkId);
    }
  }

  clear() {
    [...this.grids.keys()].forEach((id) => this.remove(id));
  }

  /** The reliefs of these chunks changed: their grid follows (if shown). */
  refresh(game: Game, chunks: Iterable<SceneChunk>) {
    new Set(chunks).forEach((chunk) => {
      if (this.grids.has(chunk.id)) {
        this.build(game, chunk);
      }
    });
  }
}
