import * as THREE from 'three';

/** Small deterministic PRNG so the clouds look the same on every load. */
function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Lattice cells of the first (largest) noise octave across the texture: fewer = bigger cloud masses. */
const BASE_CELLS = 4;
/** Octaves of detail (each one twice smaller, half as strong). */
const OCTAVES = 5;

/** Size of the noise map, and its values (0..255, one per texel) kept for CPU sampling (see sampleNoiseMap). */
const NOISE_SIZE = 256;
let noiseValues: Uint8Array | undefined;

/**
 * Bilinear sample of the noise map at texture coordinates (wrapped), 0..1: the same value the shaders read
 * with texture2D(uCloudMap, uv), so the game logic can know where the puddles are.
 */
export function sampleNoiseMap(u: number, v: number): number {
  if (!noiseValues) {
    return 0;
  }
  const n = NOISE_SIZE;
  const x = (u - Math.floor(u)) * n - 0.5;
  const y = (v - Math.floor(v)) * n - 0.5;
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const at = (px: number, py: number) => noiseValues![(((py % n) + n) % n) * n + (((px % n) + n) % n)];
  const top = at(x0, y0) + (at(x0 + 1, y0) - at(x0, y0)) * fx;
  const bottom = at(x0, y0 + 1) + (at(x0 + 1, y0 + 1) - at(x0, y0 + 1)) * fx;
  return (top + (bottom - top) * fy) / 255;
}

/**
 * Procedural, tileable cloud map: fractal value noise (big soft masses with ragged detailed edges),
 * normalized to 0..1. The shader thresholds it with the cloud density: low = scattered clouds, high = overcast.
 * Also used for the puddles map (see PUDDLE_LAYERS).
 */
export function makeCloudTexture(size = NOISE_SIZE): THREE.DataTexture {
  const rand = seededRandom(42);
  const values = new Float32Array(size * size);

  for (let o = 0; o < OCTAVES; o++) {
    const cells = BASE_CELLS << o;
    const amplitude = Math.pow(0.5, o);
    // Random lattice, wrapped so the texture tiles seamlessly
    const lattice = Float32Array.from({ length: cells * cells }, () => rand());
    const at = (x: number, y: number) => lattice[(y % cells) * cells + (x % cells)];
    const cellSize = size / cells;
    for (let py = 0; py < size; py++) {
      const gy = py / cellSize;
      const y0 = Math.floor(gy);
      let fy = gy - y0;
      fy = fy * fy * (3 - 2 * fy);
      for (let px = 0; px < size; px++) {
        const gx = px / cellSize;
        const x0 = Math.floor(gx);
        let fx = gx - x0;
        fx = fx * fx * (3 - 2 * fx);
        const top = at(x0, y0) + (at(x0 + 1, y0) - at(x0, y0)) * fx;
        const bottom = at(x0, y0 + 1) + (at(x0 + 1, y0 + 1) - at(x0, y0 + 1)) * fx;
        values[py * size + px] += (top + (bottom - top) * fy) * amplitude;
      }
    }
  }

  // Normalize to the full 0..1 range
  let min = Infinity;
  let max = -Infinity;
  for (const v of values) {
    min = Math.min(min, v);
    max = Math.max(max, v);
  }
  const data = new Uint8Array(size * size * 4);
  noiseValues = new Uint8Array(size * size);
  for (let i = 0; i < values.length; i++) {
    const v = Math.round(255 * (values[i] - min) / (max - min));
    data.set([v, v, v, 255], i * 4);
    noiseValues[i] = v;
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.NoColorSpace; // data texture, not a color
  texture.needsUpdate = true;
  return texture;
}
