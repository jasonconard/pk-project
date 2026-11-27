import * as THREE from "three";
import { SceneChunk, StairsSide, WallStyle } from "./SceneMap";
import { TILE_SIZE, TILESET_SIZE, tilesetPos } from "./Terrain";

/** Height of one ground level (world units). */
export const LEVEL_HEIGHT = 8;
/** Max level the editor can raise a cell to. */
export const MAX_LEVEL = 6;
/**
 * The looks of the relief walls, chosen per map (SceneMap.walls): the wall tiles of the tileset (alternated along
 * the walls so they don't look repeated) and the stairs tile (painted on the ramp).
 */
export const WALL_STYLES: Record<
  WallStyle,
  {
    label: string;
    walls: [number, number][];
    stairs: [number, number];
    /** How far a wall leans back per level of height (world units; 0: a straight cliff) and at most. */
    slope: number;
    slopeMax: number;
  }
> = {
  rock: {
    label: "Falaise droite",
    walls: [
      [20, 18],
      [21, 18],
    ],
    stairs: [20, 17],
    slope: 0,
    slopeMax: 0,
  },
  "rock-slope": {
    label: "Roche inclinée",
    walls: [
      [20, 18],
      [21, 18],
    ],
    stairs: [20, 17],
    slope: 5,
    slopeMax: 12,
  },
  cave: {
    label: "Grotte",
    walls: [
      [5, 47],
      [6, 47],
    ],
    stairs: [7, 47],
    slope: 5,
    slopeMax: 12,
  },
};

/** The leans the editor's wall tool paints (world units per level of height): straight, steep, medium, gentle. */
export const SLOPE_CHOICES = [0, 2, 4, 8];
/** How much the outline of leaning walls is rounded (world units, a quarter of a cell: staircases become diagonals). */
const ROUNDING = TILE_SIZE / 4;

/** How far a straight wall of a style leans back over `levels` of height (`painted`: the lean painted on its cells). */
export function wallLean(
  style: WallStyle,
  levels: number,
  painted?: number
): number {
  const { slope, slopeMax } = WALL_STYLES[style];
  return Math.min(
    painted === undefined ? slopeMax : TILE_SIZE,
    (painted ?? slope) * levels
  );
}

/** The triangles (9 numbers each, with their 6 texture coordinates) that have a surface. */
function withoutFlat(points: number[], uvs: number[]): [number[], number[]] {
  const kept: number[] = [];
  const keptUv: number[] = [];
  for (let i = 0; i < points.length; i += 9) {
    const [ax, ay, az, bx, by, bz, cx, cy, cz] = points.slice(i, i + 9);
    const [ux, uy, uz] = [bx - ax, by - ay, bz - az];
    const [vx, vy, vz] = [cx - ax, cy - ay, cz - az];
    const area = Math.hypot(
      uy * vz - uz * vy,
      uz * vx - ux * vz,
      ux * vy - uy * vx
    );
    if (area > 1e-4) {
      kept.push(...points.slice(i, i + 9));
      keptUv.push(...uvs.slice((i / 9) * 6, (i / 9) * 6 + 6));
    }
  }
  return [kept, keptUv];
}

/**
 * Ground of a chunk with reliefs: one square per cell at its level (UVs into the chunk ground texture / painted
 * canvas, like the flat ground quad), and vertical rock walls where a cell is higher than its neighbor.
 * Each wall is drawn by the higher cell only (no double walls), one tile per level of height.
 * The flat cells side by side in a row at the same level make a single quad (a mostly flat chunk is a few dozen
 * triangles instead of 2 per cell: drawn twice, for the view and for the shadows, and hit by the ground rays).
 * Geometry groups: 0 = the ground (its texture), 1 = the walls (tileset).
 * A style with a slope leans the walls back: the top of a raised cell is drawn in from its low sides, and the wall
 * goes from that edge down to the foot of the cell (the rock slopes of a cave or a mountain). Around a corner of the
 * grid, every cell at the same level uses the same point, so the tops and the walls stay joined. The outlines of
 * these walls are rounded (diagonals instead of staircases of cells), at their top and at their foot.
 * @param levelAt level of any cell around the chunk (columns / rows out of it are in the next chunks)
 */
export function buildGroundGeometry(
  chunk: SceneChunk,
  levelAt: (col: number, row: number) => number,
  stairsAt: (col: number, row: number) => StairsSide | null = () => null,
  style: WallStyle = "rock",
  slopeAt: (col: number, row: number) => number | undefined = () => undefined
): THREE.BufferGeometry {
  const { walls: wallTiles, slope: styleSlope, slopeMax } = WALL_STYLES[style];
  const cols = chunk.size.x / TILE_SIZE;
  const rows = chunk.size.y / TILE_SIZE;
  const halfX = chunk.size.x / 2;
  const halfZ = chunk.size.y / 2;
  const borderSlope = () => {
    for (let k = -1; k <= Math.max(cols, rows); k++) {
      if (
        slopeAt(k, -1) !== undefined ||
        slopeAt(k, rows) !== undefined ||
        slopeAt(-1, k) !== undefined ||
        slopeAt(cols, k) !== undefined
      ) {
        return true;
      }
    }
    return false;
  };
  // (slopes painted on cells, here or on the border of the next chunks, count like a sloped style)
  const slope =
    styleSlope || Object.keys(chunk.slopes ?? {}).length > 0 || borderSlope()
      ? 1
      : 0;
  const top: number[] = [];
  const topUv: number[] = [];
  const wall: number[] = [];
  const wallUv: number[] = [];

  // Two triangles (a b c, a c d), counter-clockwise seen from the side the face looks at
  const quad = (
    out: number[],
    uvOut: number[],
    p: number[][],
    uv: number[][]
  ) => {
    for (const i of [0, 1, 2, 0, 2, 3]) {
      out.push(...p[i]);
      uvOut.push(...uv[i]);
    }
  };
  const groundUv = (x: number, z: number) => [
    (x + halfX) / chunk.size.x,
    1 - (z + halfZ) / chunk.size.y,
  ];

  // The 4 cells around a corner of the grid: [column, row offset, direction from the cell to the corner]
  const around = [
    [-1, -1, 1, 1],
    [0, -1, -1, 1],
    [-1, 0, 1, -1],
    [0, 0, -1, -1],
  ];
  const points = new Map<string, [number, number]>();
  /**
   * How far the corner (i, j) of the outline of the cells lower than `level` is moved to round that outline: a
   * corner goes half way towards the middle of its two neighbors on the outline, so a staircase of cells becomes a
   * diagonal and a right angle is cut. Nothing along a straight edge.
   */
  const rounded = (i: number, j: number, level: number): [number, number] => {
    const low = (col: number, row: number) => levelAt(col, row) < level;
    let edges = 0;
    let sx = 0;
    let sz = 0;
    // The 4 grid edges leaving the corner, with the two cells each one separates
    const edge = (on: boolean, dx: number, dz: number) => {
      if (on) {
        edges++;
        sx += dx;
        sz += dz;
      }
    };
    edge(low(i, j - 1) !== low(i, j), 1, 0);
    edge(low(i - 1, j - 1) !== low(i - 1, j), -1, 0);
    edge(low(i - 1, j) !== low(i, j), 0, 1);
    edge(low(i - 1, j - 1) !== low(i, j - 1), 0, -1);
    return edges === 2 ? [sx * ROUNDING, sz * ROUNDING] : [0, 0];
  };
  /**
   * Where the ground at `level` ends around the grid corner (i, j): on the rounded outline of the lower cells and
   * pushed away from them (the top of a slope), or on the rounded outline of the higher cells (the foot of a slope).
   */
  const point = (i: number, j: number, level: number): [number, number] => {
    const x = i * TILE_SIZE - halfX;
    const z = j * TILE_SIZE - halfZ;
    if (!slope) {
      return [x, z];
    }
    const key = i + "," + j + "," + level;
    let found = points.get(key);
    if (!found) {
      let sx = 0;
      let sz = 0;
      let lowest = level;
      let above = Infinity;
      let straight = false;
      // The lean painted on the cells at this level around the corner (the steepest wins); else the style's
      let painted: number | undefined;
      for (const [dc, dr, dx, dz] of around) {
        // (next to stairs the walls stay straight: the ramp has its own sides)
        straight ||= !!stairsAt(i + dc, j + dr);
        const l = levelAt(i + dc, j + dr);
        if (l < level) {
          sx += dx;
          sz += dz;
          lowest = Math.min(lowest, l);
        } else if (l === level) {
          const own = slopeAt(i + dc, j + dr);
          if (own !== undefined) {
            painted = Math.min(painted ?? own, own);
          }
        } else {
          above = Math.min(above, l);
        }
      }
      if (straight || (lowest === level && above === Infinity)) {
        found = [x, z];
      } else if (lowest === level) {
        const [rx, rz] = rounded(i, j, above);
        found = [x + rx, z + rz];
      } else {
        const lean = painted ?? styleSlope;
        const most = painted === undefined ? slopeMax : TILE_SIZE;
        const inset = Math.min(most, lean * (level - lowest));
        const [rx, rz] = rounded(i, j, level);
        found = [
          x + rx + Math.sign(sx) * inset,
          z + rz + Math.sign(sz) * inset,
        ];
      }
      points.set(key, found);
    }
    return found;
  };
  /** A cell whose top is its whole square (no slope around it). */
  const plain = (col: number, row: number, level: number) =>
    !slope ||
    [
      [col, row],
      [col, row + 1],
      [col + 1, row + 1],
      [col + 1, row],
    ].every(([i, j]) => {
      const [px, pz] = point(i, j, level);
      return px === i * TILE_SIZE - halfX && pz === j * TILE_SIZE - halfZ;
    });

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
      const h = (high: boolean) => (high ? y + LEVEL_HEIGHT : y);
      // Corner heights: north-west, south-west, south-east, north-east
      const nw = h(stairs === "n" || stairs === "w");
      const sw = h(stairs === "s" || stairs === "w");
      const se = h(stairs === "s" || stairs === "e");
      const ne = h(stairs === "n" || stairs === "e");
      if (stairs) {
        quad(
          top,
          topUv,
          [
            [x0, nw, z0],
            [x0, sw, z1],
            [x1, se, z1],
            [x1, ne, z0],
          ],
          [
            groundUv(x0, z0),
            groundUv(x0, z1),
            groundUv(x1, z1),
            groundUv(x1, z0),
          ]
        );
      } else if (!plain(col, row, level)) {
        // A top cut by slopes: its own 4 points
        const corners = [
          point(col, row, level),
          point(col, row + 1, level),
          point(col + 1, row + 1, level),
          point(col + 1, row, level),
        ];
        quad(
          top,
          topUv,
          corners.map(([px, pz]) => [px, y, pz]),
          // (its own picture only: a corner pushed into the next cell must not show that cell's ground, e.g.
          // the rock of the bank at the level of the water)
          corners.map(([px, pz]) =>
            groundUv(
              Math.min(x1 - 0.25, Math.max(x0 + 0.25, px)),
              Math.min(z1 - 0.25, Math.max(z0 + 0.25, pz))
            )
          )
        );
      } else if (!(
        col > 0 &&
        !stairsAt(col - 1, row) &&
        levelAt(col - 1, row) === level &&
        plain(col - 1, row, level)
      )) {
        // First flat cell of a run: one quad up to the last flat cell at the same level in the row
        // (the ground texture coordinates follow the position: the same picture as one quad per cell)
        let end = col + 1;
        while (
          end < cols &&
          !stairsAt(end, row) &&
          levelAt(end, row) === level &&
          plain(end, row, level)
        ) {
          end++;
        }
        const xe = end * TILE_SIZE - halfX;
        quad(
          top,
          topUv,
          [
            [x0, y, z0],
            [x0, y, z1],
            [xe, y, z1],
            [xe, y, z0],
          ],
          [
            groundUv(x0, z0),
            groundUv(x0, z1),
            groundUv(xe, z1),
            groundUv(xe, z0),
          ]
        );
      }
      if (stairs) {
        // Ramp sides: triangles on the sides along the slope, where the neighbor isn't as high
        const t = tilesetPos(...wallTiles[0]);
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
          const [hx, hz, hy, hu] =
            ay > by ? [ax, az, ay, u0] : [bx, bz, by, u1];
          wall.push(ax, y, az, bx, y, bz, hx, hy, hz);
          wallUv.push(u0, vBottom, u1, vBottom, hu, vTop);
        }
      }
      if (!level) {
        continue;
      }
      // Walls towards the lower neighbors: [neighbor offset, grid corners from left to right seen from outside]
      const sides = [
        [0, 1, col, row + 1, col + 1, row + 1], // south (towards the camera)
        [0, -1, col + 1, row, col, row], // north
        [1, 0, col + 1, row + 1, col + 1, row], // east
        [-1, 0, col, row, col, row + 1], // west
      ];
      for (const [dc, dr, ai, aj, bi, bj] of sides) {
        const below = levelAt(col + dc, row + dr);
        if (below >= level) {
          continue;
        }
        // (a slope: from the foot, at the lower cell's level, up to the edge of this cell's top)
        const feet = [point(ai, aj, below), point(bi, bj, below)];
        const heads = [point(ai, aj, level), point(bi, bj, level)];
        const at = (end: number, l: number) => {
          const t = (l - below) / (level - below);
          return [
            feet[end][0] + (heads[end][0] - feet[end][0]) * t,
            l * LEVEL_HEIGHT,
            feet[end][1] + (heads[end][1] - feet[end][1]) * t,
          ];
        };
        for (let l = below; l < level; l++) {
          const tile = wallTiles[(col + row + l) % wallTiles.length];
          const t = tilesetPos(...tile);
          const u0 = t.x / TILESET_SIZE.x;
          const u1 = (t.x + TILE_SIZE) / TILESET_SIZE.x;
          const vTop = 1 - t.y / TILESET_SIZE.y;
          const vBottom = 1 - (t.y + TILE_SIZE) / TILESET_SIZE.y;
          quad(
            wall,
            wallUv,
            [at(0, l), at(1, l), at(1, l + 1), at(0, l + 1)],
            [
              [u0, vBottom],
              [u1, vBottom],
              [u1, vTop],
              [u0, vTop],
            ]
          );
        }
      }
    }
  }
  if (slope) {
    // Where three levels meet around a corner, the slopes leave a small triangle open: closed here (both faces)
    const t = tilesetPos(...wallTiles[0]);
    const u0 = t.x / TILESET_SIZE.x;
    const u1 = (t.x + TILE_SIZE) / TILESET_SIZE.x;
    const vTop = 1 - t.y / TILESET_SIZE.y;
    const vBottom = 1 - (t.y + TILE_SIZE) / TILESET_SIZE.y;
    for (let j = 0; j <= rows; j++) {
      for (let i = 0; i <= cols; i++) {
        const levels = [
          ...new Set(around.map(([dc, dr]) => levelAt(i + dc, j + dr))),
        ].sort((a, b) => a - b);
        for (let k = 0; k + 2 < levels.length; k++) {
          const [a, b, c] = [levels[k], levels[k + 1], levels[k + 2]].map(
            (l) => {
              const [px, pz] = point(i, j, l);
              return [px, l * LEVEL_HEIGHT, pz];
            }
          );
          wall.push(...a, ...b, ...c, ...a, ...c, ...b);
          wallUv.push(u0, vBottom, u1, vBottom, u1, vTop);
          wallUv.push(u0, vBottom, u1, vTop, u1, vBottom);
        }
      }
    }
  }

  // Triangles without a surface (a wall whose top meets its foot, a top squeezed to a line) are left out: they
  // have no normal, and their lighting would be an invalid number (black squares once blurred by the bloom)
  const [topKept, topUvKept] = withoutFlat(top, topUv);
  const [wallKept, wallUvKept] = withoutFlat(wall, wallUv);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([...topKept, ...wallKept], 3)
  );
  geometry.setAttribute(
    "uv",
    new THREE.Float32BufferAttribute([...topUvKept, ...wallUvKept], 2)
  );
  geometry.addGroup(0, topKept.length / 3, 0);
  geometry.addGroup(topKept.length / 3, wallKept.length / 3, 1);
  geometry.computeVertexNormals();
  return geometry;
}
