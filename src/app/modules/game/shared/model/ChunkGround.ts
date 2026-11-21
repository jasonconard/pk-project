import * as THREE from "three";
import { SceneChunk, StairsSide, stairsSide } from "./SceneMap";
import {
  autotile,
  NEIGHBORS,
  terrainById,
  TILE_SIZE,
  TILESET_ANIM_LINK,
  TILESET_LINK,
  tilesetPos,
  waterFramePos,
} from "./Terrain";
import { applyWeatherShader } from "../weather/weather-shader";
import { buildGroundGeometry, STAIRS_TILE } from "./GroundMesh";
import { isGameAsleep } from "../../../../core/shared/app-visibility";

// The chunks' ground: the painted tiles (a canvas texture per chunk, autotiled borders, animated water), the
// reliefs (cells at their level with rock walls) and the stairs.

/** A ground cell: column, row from the chunk corner. */
export interface GroundCell {
  chunk: SceneChunk;
  col: number;
  row: number;
}

/** A chunk ground drawn on a canvas: its texture, then the painted tiles over it. */
interface PaintedGround {
  ctx: CanvasRenderingContext2D;
  texture: THREE.CanvasTexture;
  base: HTMLImageElement | null;
}

/** Water animation step (ms per frame). */
const WATER_STEP = 220;

/** Pictures loaded once (ground textures, tiles). */
const IMAGES = new Map<string, Promise<HTMLImageElement>>();
function loadImage(link: string): Promise<HTMLImageElement> {
  let image = IMAGES.get(link);
  if (!image) {
    image = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = link;
    });
    IMAGES.set(link, image);
  }
  return image;
}

export class ChunkGround {
  /**
   * @param chunks the current map's chunks
   * @param cellAt the ground cell under a world point
   */
  constructor(
    private readonly chunks: () => SceneChunk[],
    private readonly cellAt: (x: number, z: number) => GroundCell | null
  ) {}

  private readonly paintedGrounds = new Map<string, PaintedGround>();
  /** Water animation: current frame of the animated water tiles. */
  private waterFrame = 0;
  private waterTimer?: ReturnType<typeof setInterval>;

  /** Paints a ground cell with a tile (null = back to the original ground). */
  public paintCell(
    chunk: SceneChunk,
    col: number,
    row: number,
    tileId: string | null
  ) {
    const key = col + "," + row;
    chunk.tiles ??= {};
    if (tileId) {
      chunk.tiles[key] = tileId;
    } else {
      delete chunk.tiles[key];
    }
    const painted = this.paintedGround(chunk);
    if (painted) {
      this.drawCell(chunk, painted, col, row);
    }
    // The painted neighbors change their borders (autotiling), in this chunk or the next one
    for (const [dc, dr] of NEIGHBORS) {
      const n = this.neighborCell(chunk, col + dc, row + dr);
      const nPainted =
        n && n.chunk.tiles?.[n.col + "," + n.row]
          ? this.paintedGround(n.chunk)
          : null;
      if (n && nPainted) {
        this.drawCell(n.chunk, nPainted, n.col, n.row);
      }
    }
  }

  /** Ground level of a cell (possibly in the next chunk; 0 outside the map). */
  public levelAt(chunk: SceneChunk, col: number, row: number): number {
    const cell = this.neighborCell(chunk, col, row);
    return cell?.chunk.heights?.[cell.col + "," + cell.row] ?? 0;
  }

  /** Ground level under a world point (0 outside the map or on flat ground). */
  public levelAtWorld(x: number, z: number): number {
    const cell = this.cellAt(x, z);
    return cell ? (cell.chunk.heights?.[cell.col + "," + cell.row] ?? 0) : 0;
  }

  /** Side the stairs cell under a world point rises towards (null = no stairs there). */
  public stairsAt(x: number, z: number): StairsSide | null {
    const cell = this.cellAt(x, z);
    return cell
      ? stairsSide(cell.chunk.stairs?.[cell.col + "," + cell.row])
      : null;
  }

  /** Is there a stairs cell under a world point? */
  public isStairsAt(x: number, z: number): boolean {
    const cell = this.cellAt(x, z);
    return !!cell?.chunk.stairs?.[cell.col + "," + cell.row];
  }

  /**
   * Puts / removes stairs on a cell: a ramp up one level towards `side` (null = no stairs), the stairs tile painted
   * on it. 'auto' rises towards the neighbor exactly one level higher (north first), north if none.
   */
  public setStairs(
    chunk: SceneChunk,
    col: number,
    row: number,
    side: StairsSide | "auto" | null
  ) {
    const key = col + "," + row;
    chunk.stairs ??= {};
    if (side === "auto") {
      const level = this.levelAt(chunk, col, row);
      const sides: [StairsSide, number, number][] = [
        ["n", 0, -1],
        ["e", 1, 0],
        ["w", -1, 0],
        ["s", 0, 1],
      ];
      side =
        sides.find(
          ([, dc, dr]) => this.levelAt(chunk, col + dc, row + dr) === level + 1
        )?.[0] ?? "n";
    }
    if (side) {
      chunk.stairs[key] = side;
    } else {
      delete chunk.stairs[key];
    }
    this.rebuildGround(chunk);
    const painted = this.paintedGround(chunk);
    if (painted) {
      this.drawCell(chunk, painted, col, row);
    }
  }

  private wallMaterial?: THREE.MeshLambertMaterial;
  /** Original flat ground of the chunks given reliefs (put back once every cell is flat again). */
  private readonly flatGrounds = new Map<
    string,
    { geometry: THREE.BufferGeometry; castShadow: boolean }
  >();

  /**
   * The chunk ground becomes a grid of cells at their level, with rock walls (see buildGroundGeometry); without any
   * height nor stairs left, the original flat ground (2 triangles, one material, no shadow cast) comes back.
   */
  rebuildGround(chunk: SceneChunk) {
    const mesh = chunk.grounds[0]?.mesh;
    if (!mesh) {
      return;
    }
    const flat = this.flatGrounds.get(chunk.id);
    const hasRelief =
      Object.keys(chunk.heights ?? {}).length > 0 ||
      Object.keys(chunk.stairs ?? {}).length > 0;
    if (!hasRelief) {
      if (flat) {
        mesh.geometry.dispose();
        mesh.geometry = flat.geometry;
        mesh.castShadow = flat.castShadow;
        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material[0];
        }
        this.flatGrounds.delete(chunk.id);
      }
      return;
    }
    if (!flat) {
      this.flatGrounds.set(chunk.id, {
        geometry: mesh.geometry,
        castShadow: mesh.castShadow,
      });
    }
    const old = flat ? mesh.geometry : null;
    mesh.geometry = buildGroundGeometry(
      chunk,
      (col, row) => this.levelAt(chunk, col, row),
      (col, row) => stairsSide(chunk.stairs?.[col + "," + row])
    );
    old?.dispose(); // (the flat ground is kept)
    if (!this.wallMaterial) {
      const texture = new THREE.TextureLoader().load(TILESET_LINK);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      this.wallMaterial = applyWeatherShader(
        new THREE.MeshLambertMaterial({ map: texture })
      );
    }
    if (!Array.isArray(mesh.material)) {
      mesh.material = [mesh.material, this.wallMaterial];
    }
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }

  /** A cell given from a chunk, possibly out of it (then in the chunk next to it). */
  neighborCell(chunk: SceneChunk, col: number, row: number): GroundCell | null {
    const cols = chunk.size.x / TILE_SIZE;
    const rows = chunk.size.y / TILE_SIZE;
    if (col >= 0 && row >= 0 && col < cols && row < rows) {
      return { chunk, col, row };
    }
    const x = chunk.pos.x - chunk.size.x / 2 + (col + 0.5) * TILE_SIZE;
    const z = chunk.pos.z - chunk.size.y / 2 + (row + 0.5) * TILE_SIZE;
    return this.cellAt(x, z);
  }

  /** Does a neighbor terrain get a border? The water has none towards a beach (the sand tile draws the shore). */
  private differs(terrainId: string, neighborId: string | undefined): boolean {
    if (neighborId === terrainId) {
      return false;
    }
    return !(terrainById(terrainId)?.blocking && neighborId === "sand");
  }

  private terrainIdAt(
    chunk: SceneChunk,
    col: number,
    row: number
  ): string | undefined {
    const cell = this.neighborCell(chunk, col, row);
    return cell?.chunk.tiles?.[cell.col + "," + cell.row];
  }

  /**
   * The chunk ground switches to its own canvas texture (the original texture, the tiles over it), with its own
   * material (the textures are shared between chunks). The canvas has 1 px per world unit like the ground textures.
   */
  paintedGround(chunk: SceneChunk): PaintedGround | null {
    const existing = this.paintedGrounds.get(chunk.id);
    const ground = chunk.grounds[0];
    if (existing || !ground?.mesh) {
      return existing ?? null;
    }
    const canvas = document.createElement("canvas");
    canvas.width = chunk.size.x;
    canvas.height = chunk.size.y;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.NearestFilter;
    const current = ground.mesh.material;
    const old = (
      Array.isArray(current) ? current[0] : current
    ) as THREE.MeshLambertMaterial;
    const material = applyWeatherShader(
      new THREE.MeshLambertMaterial({ map: texture, side: old.side })
    );
    // (with reliefs, the mesh has a second material: the walls)
    ground.mesh.material = Array.isArray(current)
      ? [material, ...current.slice(1)]
      : material;
    const painted: PaintedGround = { ctx, texture, base: null };
    this.paintedGrounds.set(chunk.id, painted);
    // Once the original texture is there: drawn whole, then every painted cell
    this.waterTimer ??= setInterval(() => this.animateWater(), WATER_STEP);
    loadImage(ground.link).then((base) => {
      painted.base = base;
      ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
      Object.keys(chunk.tiles ?? {}).forEach((key) => {
        const [col, row] = key.split(",").map(Number);
        this.drawCell(chunk, painted, col, row);
      });
      texture.needsUpdate = true;
    });
    return painted;
  }

  /** Redraws the open water cells (no border) of the visible painted chunks with the next animation frame. */
  private animateWater() {
    if (isGameAsleep()) {
      return;
    }
    this.waterFrame++;
    loadImage(TILESET_ANIM_LINK).then((img) =>
      this.paintedGrounds.forEach((painted, chunkId) => {
        const chunk = this.chunks().find((c) => c.id === chunkId);
        if (!chunk?.visible || !chunk.tiles) {
          return;
        }
        let changed = false;
        Object.entries(chunk.tiles).forEach(([key, id]) => {
          const terrain = terrainById(id);
          if (!terrain?.blocking) {
            return;
          }
          const [col, row] = key.split(",").map(Number);
          const differs = NEIGHBORS.map(([dc, dr]) =>
            this.differs(id, this.terrainIdAt(chunk, col + dc, row + dr))
          );
          const [c, r] = autotile(terrain, differs);
          if (c !== terrain.center[0] || r !== terrain.center[1]) {
            return; // shores stay still
          }
          const src = waterFramePos(id, this.waterFrame);
          if (!src) {
            return;
          }
          painted.ctx.drawImage(
            img,
            src.x,
            src.y,
            TILE_SIZE,
            TILE_SIZE,
            col * TILE_SIZE,
            row * TILE_SIZE,
            TILE_SIZE,
            TILE_SIZE
          );
          changed = true;
        });
        if (changed) {
          painted.texture.needsUpdate = true;
        }
      })
    );
  }

  private drawCell(
    chunk: SceneChunk,
    painted: PaintedGround,
    col: number,
    row: number
  ) {
    const x = col * TILE_SIZE;
    const y = row * TILE_SIZE;
    const tileId = chunk.tiles?.[col + "," + row];
    const terrain = terrainById(tileId);
    const stairs = stairsSide(chunk.stairs?.[col + "," + row]);
    if (stairs) {
      loadImage(TILESET_LINK).then((img) => {
        if (stairsSide(chunk.stairs?.[col + "," + row]) === stairs) {
          // The steps are drawn for a ramp rising north: turned for the other sides
          const src = tilesetPos(...STAIRS_TILE);
          const ctx = painted.ctx;
          ctx.save();
          ctx.translate(x + TILE_SIZE / 2, y + TILE_SIZE / 2);
          ctx.rotate(
            { n: 0, e: Math.PI / 2, s: Math.PI, w: -Math.PI / 2 }[stairs]
          );
          ctx.drawImage(
            img,
            src.x,
            src.y,
            TILE_SIZE,
            TILE_SIZE,
            -TILE_SIZE / 2,
            -TILE_SIZE / 2,
            TILE_SIZE,
            TILE_SIZE
          );
          ctx.restore();
          painted.texture.needsUpdate = true;
        }
      });
    } else if (terrain) {
      loadImage(TILESET_LINK).then((img) => {
        // (still the same terrain once loaded: the cell may have been repainted meanwhile)
        if (chunk.tiles?.[col + "," + row] === tileId) {
          // The tile whose borders match the neighbors (autotiling)
          const ids = NEIGHBORS.map(([dc, dr]) =>
            this.terrainIdAt(chunk, col + dc, row + dr)
          );
          const differs = ids.map((id) => this.differs(tileId!, id));
          // Beach: every different neighbor is water
          const others = ids.filter((id) => id !== tileId);
          const shore =
            others.length > 0 &&
            others.every((id) => terrainById(id)?.blocking);
          const src = tilesetPos(...autotile(terrain, differs, shore));
          painted.ctx.drawImage(
            img,
            src.x,
            src.y,
            TILE_SIZE,
            TILE_SIZE,
            x,
            y,
            TILE_SIZE,
            TILE_SIZE
          );
          painted.texture.needsUpdate = true;
        }
      });
    } else if (painted.base) {
      const sx = painted.base.width / chunk.size.x;
      const sy = painted.base.height / chunk.size.y;
      painted.ctx.drawImage(
        painted.base,
        x * sx,
        y * sy,
        TILE_SIZE * sx,
        TILE_SIZE * sy,
        x,
        y,
        TILE_SIZE,
        TILE_SIZE
      );
      painted.texture.needsUpdate = true;
    }
  }

  /** Frees what was made for a chunk taken out of the scene (its painted texture, its flat ground). */
  forget(chunk: SceneChunk) {
    const painted = this.paintedGrounds.get(chunk.id);
    if (painted) {
      const material = chunk.grounds[0]?.mesh?.material;
      (Array.isArray(material) ? material[0] : material)?.dispose();
      painted.texture.dispose();
      this.paintedGrounds.delete(chunk.id);
    }
    this.flatGrounds.get(chunk.id)?.geometry.dispose();
    this.flatGrounds.delete(chunk.id);
  }
}
