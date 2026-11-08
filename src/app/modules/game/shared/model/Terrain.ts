/** Size of a ground tile (world units = texture pixels: the ground textures are 1 px per unit). */
export const TILE_SIZE = 16;
/** The tileset picture: 16 px tiles on a 17 px grid (1 px white separators), tile (col, row) at 1 + 17 × index. */
export const TILESET_LINK = 'assets/tex/tileset.png';
export const TILESET_SIZE = { x: 477, y: 800 };

/** Top left pixel of a tileset cell. */
export function tilesetPos(col: number, row: number): { x: number, y: number } {
  return { x: 1 + 17 * col, y: 1 + 17 * row };
}

/**
 * A ground terrain the editor paints. `variants` are its tiles with borders (autotiling, see step 2 of
 * docs/editeur/plan-sols-reliefs.md): [col, row, signature], the signature telling which border zones show the
 * surrounding grass (bits: N, E, S, W, NE, SE, SW, NW). Computed from the tileset picture (see the plan).
 */
export interface Terrain {
  id: string;
  label: string;
  center: [number, number];
  /** The player can't walk on it (water). */
  blocking: boolean;
  variants: [number, number, number][];
  /** Variants used when the different neighbors are all water (beaches), same format. */
  shoreVariants?: [number, number, number][];
}

export const TERRAINS: Terrain[] = [
  { id: 'sand', label: 'Sable', center: [0, 0], blocking: false,
    shoreVariants: [[0, 27, 0], [2, 27, 50], [4, 27, 100], [3, 27, 145], [1, 27, 200], [2, 28, 118], [4, 28, 179], [3, 28, 217], [1, 28, 236]],
    variants: [[0, 0, 0], [3, 2, 16], [1, 2, 32], [2, 2, 64], [4, 2, 128], [2, 0, 50], [4, 0, 100], [3, 0, 145], [1, 0, 200], [2, 1, 118], [4, 1, 179], [3, 1, 217], [1, 1, 236]] },
  { id: 'grass-light', label: 'Herbe claire', center: [0, 3], blocking: false,
    variants: [[0, 3, 0], [1, 5, 0], [2, 5, 0], [3, 5, 0], [4, 5, 0], [2, 3, 34], [1, 3, 72], [4, 3, 100], [3, 3, 145], [2, 4, 102], [1, 4, 108], [4, 4, 179], [3, 4, 217]] },
  { id: 'dirt', label: 'Terre', center: [0, 6], blocking: false,
    variants: [[0, 6, 0], [3, 8, 16], [1, 8, 32], [2, 8, 64], [4, 8, 128], [2, 6, 50], [4, 6, 100], [3, 6, 145], [1, 6, 200], [2, 7, 118], [4, 7, 179], [3, 7, 217], [1, 7, 236]] },
  { id: 'speckled', label: 'Herbe mouchetée', center: [0, 9], blocking: false,
    variants: [[0, 9, 0], [1, 11, 0], [2, 11, 0], [3, 11, 0], [4, 11, 0], [2, 9, 50], [4, 9, 100], [3, 9, 145], [1, 9, 200], [2, 10, 118], [4, 10, 179], [3, 10, 217], [1, 10, 236]] },
  { id: 'stone', label: 'Dalles', center: [0, 12], blocking: false,
    variants: [[0, 12, 0], [1, 14, 0], [2, 14, 0], [3, 14, 0], [4, 14, 0], [2, 12, 50], [4, 12, 100], [3, 12, 145], [1, 12, 200], [2, 13, 118], [4, 13, 179], [3, 13, 217], [1, 13, 236]] },
  { id: 'paving', label: 'Pavés', center: [0, 15], blocking: false,
    variants: [[0, 15, 0], [3, 17, 16], [1, 17, 32], [2, 17, 64], [4, 17, 128], [2, 15, 50], [4, 15, 100], [3, 15, 145], [1, 15, 200], [2, 16, 118], [4, 16, 179], [3, 16, 217], [1, 16, 236]] },
  { id: 'gravel', label: 'Gravier', center: [0, 24], blocking: false,
    variants: [[0, 24, 0], [3, 26, 16], [1, 26, 32], [2, 26, 64], [4, 26, 128], [2, 24, 50], [4, 24, 100], [3, 24, 145], [1, 24, 200], [2, 25, 118], [4, 25, 179], [3, 25, 217], [1, 25, 236]] },
  { id: 'water', label: 'Eau', center: [11, 1], blocking: true,
    variants: [[11, 1, 0], [11, 2, 100], [12, 1, 55], [11, 0, 155], [10, 1, 205], [12, 2, 119], [10, 2, 237], [12, 0, 191], [10, 0, 223]] },
  { id: 'grass', label: 'Herbe', center: [6, 1], blocking: false, variants: [] },
  { id: 'grass-tuft', label: 'Herbe touffue', center: [6, 0], blocking: false, variants: [] },
  { id: 'deep-water', label: 'Eau profonde', center: [11, 12], blocking: true, variants: [] },
  { id: 'planks', label: 'Planches', center: [0, 18], blocking: false, variants: [] },
];

/** Neighbors in the signature bit order: N, E, S, W, NE, SE, SW, NW (column, row offsets). */
export const NEIGHBORS: [number, number][] = [[0, -1], [1, 0], [0, 1], [-1, 0], [1, -1], [1, 1], [-1, 1], [-1, -1]];

/**
 * Autotiling: the tile of a terrain matching its neighbors. `differs[i]` tells if the NEIGHBORS[i] cell is another
 * terrain. A border zone shows grass if its neighbor differs; a corner zone too, or if one of its two sides does.
 * The variant whose signature is the closest (fewest different zones) wins.
 */
export function autotile(terrain: Terrain, differs: boolean[], shore = false): [number, number] {
  const variants = shore && terrain.shoreVariants ? terrain.shoreVariants : terrain.variants;
  if (!variants.length) {
    return terrain.center;
  }
  const [n, e, s, w, ne, se, sw, nw] = differs;
  const zones = [n, e, s, w, ne || n || e, se || s || e, sw || s || w, nw || n || w];
  const needed = zones.reduce((bits, on, i) => on ? bits | (1 << i) : bits, 0);
  let best = variants[0];
  let bestScore = Infinity;
  for (const variant of variants) {
    let x = variant[2] ^ needed;
    let score = 0;
    while (x) {
      score += x & 1;
      x >>= 1;
    }
    if (score < bestScore) {
      best = variant;
      bestScore = score;
    }
  }
  return [best[0], best[1]];
}

/** Animated tiles picture: water frames (16 px, 17 px apart) of the open water terrains. */
export const TILESET_ANIM_LINK = 'assets/tex/tileset-anim.png';
export const WATER_FRAMES = 8;
const WATER_ANIM: Record<string, { x: number, y: number }> = {
  water: { x: 121, y: 32 },
  'deep-water': { x: 121, y: 66 },
};

/** Top left pixel of an animation frame of a terrain (null = not animated). */
export function waterFramePos(terrainId: string, frame: number): { x: number, y: number } | null {
  const anim = WATER_ANIM[terrainId];
  return anim ? { x: anim.x + 17 * (frame % WATER_FRAMES), y: anim.y } : null;
}

export function terrainById(id: string | undefined): Terrain | undefined {
  return id ? TERRAINS.find(t => t.id === id) : undefined;
}

/** Tile ids of the first version (one picture per tile) → terrains (null = dropped: the flowers are a 3D model). */
export const LEGACY_TILE_IDS: Record<string, string | null> = {
  shallow: 'water', water: 'deep-water', flowers: null,
};
