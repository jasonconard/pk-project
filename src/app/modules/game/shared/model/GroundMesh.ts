import * as THREE from 'three';
import { SceneChunk, StairsSide } from './SceneMap';
import { TILE_SIZE, TILESET_SIZE, tilesetPos } from './Terrain';

/** Height of one ground level (world units). */
export const LEVEL_HEIGHT = 8;
/** Max level the editor can raise a cell to. */
export const MAX_LEVEL = 6;
/** Rock wall tiles of the tileset (alternated along the walls so they don't look repeated). */
const WALL_TILES: [number, number][] = [[20, 18], [21, 18]];
/** Stairs tile of the tileset (painted on the ramp). */
export const STAIRS_TILE: [number, number] = [20, 17];

/**
 * Ground of a chunk with reliefs: one square per cell at its level (UVs into the chunk ground texture / painted
 * canvas, like the flat ground quad), and vertical rock walls where a cell is higher than its neighbor.
 * Each wall is drawn by the higher cell only (no double walls), one tile per level of height.
 * Geometry groups: 0 = the ground (its texture), 1 = the walls (tileset).
 * @param levelAt level of any cell around the chunk (columns / rows out of it are in the next chunks)
 */
export function buildGroundGeometry(chunk: SceneChunk, levelAt: (col: number, row: number) => number,
                                    stairsAt: (col: number, row: number) => StairsSide | null = () => null): THREE.BufferGeometry {
  const cols = chunk.size.x / TILE_SIZE;
  const rows = chunk.size.y / TILE_SIZE;
  const halfX = chunk.size.x / 2;
  const halfZ = chunk.size.y / 2;
  const top: number[] = [];
  const topUv: number[] = [];
  const wall: number[] = [];
  const wallUv: number[] = [];

  // Two triangles (a b c, a c d), counter-clockwise seen from the side the face looks at
  const quad = (out: number[], uvOut: number[], p: number[][], uv: number[][]) => {
    for (const i of [0, 1, 2, 0, 2, 3]) {
      out.push(...p[i]);
      uvOut.push(...uv[i]);
    }
  };
  const groundUv = (x: number, z: number) => [(x + halfX) / chunk.size.x, 1 - (z + halfZ) / chunk.size.y];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const level = levelAt(col, row);
      const y = level * LEVEL_HEIGHT;
      const x0 = col * TILE_SIZE - halfX;
      const z0 = row * TILE_SIZE - halfZ;
      const x1 = x0 + TILE_SIZE;
      const z1 = z0 + TILE_SIZE;
      // Top, facing up (stairs: a ramp, one level higher on the side it rises towards)
      const stairs = stairsAt(col, row);
      const h = (high: boolean) => high ? y + LEVEL_HEIGHT : y;
      // Corner heights: north-west, south-west, south-east, north-east
      const nw = h(stairs === 'n' || stairs === 'w');
      const sw = h(stairs === 's' || stairs === 'w');
      const se = h(stairs === 's' || stairs === 'e');
      const ne = h(stairs === 'n' || stairs === 'e');
      quad(top, topUv, [[x0, nw, z0], [x0, sw, z1], [x1, se, z1], [x1, ne, z0]],
        [groundUv(x0, z0), groundUv(x0, z1), groundUv(x1, z1), groundUv(x1, z0)]);
      if (stairs) {
        // Ramp sides: triangles on the sides along the slope, where the neighbor isn't as high
        const t = tilesetPos(...WALL_TILES[0]);
        const u0 = t.x / TILESET_SIZE.x;
        const u1 = (t.x + TILE_SIZE) / TILESET_SIZE.x;
        const vTop = 1 - t.y / TILESET_SIZE.y;
        const vBottom = 1 - (t.y + TILE_SIZE) / TILESET_SIZE.y;
        // [neighbor offset, side corners seen from outside (left, right) with their top heights]
        const slopeSides: [number, number, number[], number[]][] = [
          [0, 1, [x0, z1, sw], [x1, z1, se]],
          [0, -1, [x1, z0, ne], [x0, z0, nw]],
          [1, 0, [x1, z1, se], [x1, z0, ne]],
          [-1, 0, [x0, z0, nw], [x0, z1, sw]],
        ];
        for (const [dc, dr, [ax, az, ay], [bx, bz, by]] of slopeSides) {
          if (ay === by || levelAt(col + dc, row + dr) > level) {
            continue; // not along the slope (flat edge), or hidden by a higher neighbor
          }
          // Triangle: bottom left, bottom right, then the high corner
          const [hx, hz, hy, hu] = ay > by ? [ax, az, ay, u0] : [bx, bz, by, u1];
          wall.push(ax, y, az, bx, y, bz, hx, hy, hz);
          wallUv.push(u0, vBottom, u1, vBottom, hu, vTop);
        }
      }
      if (!level) {
        continue;
      }
      // Walls towards the lower neighbors: [neighbor offset, wall corners from left to right seen from outside]
      const sides: [number, number, number[], number[]][] = [
        [0, 1, [x0, z1], [x1, z1]],   // south (towards the camera)
        [0, -1, [x1, z0], [x0, z0]],  // north
        [1, 0, [x1, z1], [x1, z0]],   // east
        [-1, 0, [x0, z0], [x0, z1]],  // west
      ];
      for (const [dc, dr, [ax, az], [bx, bz]] of sides) {
        const below = levelAt(col + dc, row + dr);
        for (let l = below; l < level; l++) {
          const tile = WALL_TILES[(col + row + l) % WALL_TILES.length];
          const t = tilesetPos(...tile);
          const u0 = t.x / TILESET_SIZE.x;
          const u1 = (t.x + TILE_SIZE) / TILESET_SIZE.x;
          const vTop = 1 - t.y / TILESET_SIZE.y;
          const vBottom = 1 - (t.y + TILE_SIZE) / TILESET_SIZE.y;
          const yb = l * LEVEL_HEIGHT;
          const yt = yb + LEVEL_HEIGHT;
          quad(wall, wallUv, [[ax, yb, az], [bx, yb, bz], [bx, yt, bz], [ax, yt, az]],
            [[u0, vBottom], [u1, vBottom], [u1, vTop], [u0, vTop]]);
        }
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([...top, ...wall], 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute([...topUv, ...wallUv], 2));
  geometry.addGroup(0, top.length / 3, 0);
  geometry.addGroup(top.length / 3, wall.length / 3, 1);
  geometry.computeVertexNormals();
  return geometry;
}
