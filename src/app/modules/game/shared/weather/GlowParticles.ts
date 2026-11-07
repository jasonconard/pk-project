import * as THREE from 'three';
import { SurfaceHeights } from './SurfaceHeights';
import { registerUnlitMaterial, SWAY_ATTRIBUTE } from './weather-shader';

/** Area (relative to the point the camera looks at) where particles live: covers the screen. */
const AREA = { minX: -240, maxX: 240, minZ: -300, maxZ: 140 };
/** How often the plants list is refreshed (s), and how far from a plant a particle can appear. */
const PLANTS_REFRESH = 2;
const PLANT_RADIUS = 10;

/** Look and motion of glowing particles (blood moon embers, later fireflies, spores...). */
export interface GlowStyle {
  /** Particles at density = 1. */
  maxParticles: number;
  /** Glow color (additive: bright colors pick up the bloom at night). */
  color: number;
  /** Optional extra colors: each particle picks one of `color` + these at random. */
  palette?: number[];
  /**
   * 'additive' (default): pure light, fades by dimming; great at night, washes to white on a bright ground.
   * 'normal': colored blobs that keep their color by day, fade by shrinking.
   */
  blending?: 'additive' | 'normal';
  /** Color multiplier: above 1 the particle core gets bright enough for the bloom. */
  intensity: number;
  /** Upward speed range (world units / s), negative = sinks. */
  rise: readonly [number, number];
  /** Side-to-side wandering amplitude (world units) and speed. */
  wobble: number;
  wobbleSpeed: number;
  /** Life range (s): fades in, then out. */
  life: readonly [number, number];
  /** Size range (world units). */
  size: readonly [number, number];
  /** Spawn height above the surface below (world units). */
  spawnHeight: readonly [number, number];
  /** Brightness flicker amount (0 = steady, 1 = fully off at times) and speed (rad / s). */
  flicker: number;
  flickerSpeed: number;
  /** Share of the particles appearing around the plants (swaying models), the others anywhere. */
  nearPlants: number;
  /** Horizontal speed at full wind (world units / s). */
  windSpeed: number;
  /** Not a light: tinted by the scene light like the sprites (dim at night), e.g. vapor, dust. */
  followLight?: boolean;
  /** Taller than wide (height / width), e.g. 1.8 for vapor wisps. */
  stretchY?: number;
  /** Grows while it rises (size × this at the end of its life), e.g. vapor spreading out. */
  grow?: number;
  /** Smoke puffs: irregular cloudy texture, each puff slowly turning on itself (rad / s). */
  smoke?: { spin: number };
  /** Max opacity of normal-blended smoke puffs (overlapping light puffs melt into a plume). */
  smokeOpacity?: number;
}

/** Blood moon: red embers slowly rising from the ground. */
export const EMBER_STYLE: GlowStyle = {
  maxParticles: 240,
  color: 0xff4020,
  intensity: 2.2,
  rise: [5, 12],
  wobble: 1.8,
  wobbleSpeed: 1.4,
  life: [3, 7],
  size: [1.6, 3],
  spawnHeight: [0, 15],
  flicker: 0.35,
  flickerSpeed: 9,
  nearPlants: 0,
  windSpeed: 25,
};

/**
 * Volcanic: small orange / yellow embers bursting from the ground, rising fast and fading out.
 * Normal blending keeps them orange by day (additive would wash to white); bright enough to bloom at night.
 */
export const LAVA_STYLE: GlowStyle = {
  maxParticles: 420,
  color: 0xff7a1a,
  palette: [0xffb020, 0xff4a10, 0xffd060],
  intensity: 1.8,
  blending: 'normal',
  rise: [10, 22],
  wobble: 1.2,
  wobbleSpeed: 2,
  life: [1.5, 4],
  size: [2.6, 4.4],
  spawnHeight: [0, 2],
  flicker: 0.5,
  flickerSpeed: 12,
  nearPlants: 0,
  windSpeed: 20,
};

/** Forest: tiny golden pollen / dust motes slowly drifting in the light, mostly around the plants. */
export const POLLEN_STYLE: GlowStyle = {
  maxParticles: 220,
  color: 0xfff0a0,
  palette: [0xffffff, 0xe8ffb0],
  intensity: 1.3,
  blending: 'normal',
  rise: [-0.6, 0.9],
  wobble: 3,
  wobbleSpeed: 0.4,
  life: [6, 12],
  size: [1.3, 2.2],
  spawnHeight: [2, 30],
  flicker: 0.3,
  flickerSpeed: 1.5,
  nearPlants: 0.5,
  windSpeed: 12,
};

/** Ash fall: grey flakes slowly falling and swirling (not glowing). */
export const ASH_STYLE: GlowStyle = {
  maxParticles: 700,
  color: 0x8c8884,
  palette: [0x5c5856, 0xb0aaa4],
  intensity: 1,
  blending: 'normal',
  rise: [-14, -7],
  wobble: 4,
  wobbleSpeed: 0.8,
  life: [6, 11],
  size: [1.4, 2.6],
  spawnHeight: [30, 110],
  flicker: 0,
  flickerSpeed: 1,
  nearPlants: 0,
  windSpeed: 30,
};

/** Magic snow: blue / cyan / white sparkles slowly falling, twinkling fast. */
export const MAGIC_SNOW_STYLE: GlowStyle = {
  maxParticles: 600,
  color: 0x6cc8ff,
  palette: [0xd8f4ff, 0x3a90ff, 0xa080ff],
  intensity: 2.2,
  blending: 'normal',
  rise: [-9, -4],
  wobble: 3,
  wobbleSpeed: 0.9,
  life: [6, 12],
  size: [2.6, 4.2],
  spawnHeight: [15, 70],
  flicker: 0.8,
  flickerSpeed: 9,
  nearPlants: 0,
  windSpeed: 25,
};

/**
 * Crystal mist: tiny ice shards hanging in the air, glinting in prism colors as they turn
 * (fast, deep flicker: on and off like facets catching the light).
 */
export const CRYSTAL_STYLE: GlowStyle = {
  maxParticles: 520,
  color: 0x40d8ff,
  palette: [0xff60d0, 0xffd040, 0x9070ff, 0x40ffa0, 0xffffff],
  intensity: 2.2,
  blending: 'normal',
  rise: [-0.8, 0.8],
  wobble: 2,
  wobbleSpeed: 0.35,
  life: [5, 10],
  size: [2.2, 3.6],
  spawnHeight: [2, 45],
  flicker: 0.95,
  flickerSpeed: 11,
  nearPlants: 0,
  windSpeed: 8,
};

/** Mars: reddish dust motes drifting very slowly, up and down, for a long time (as in a low gravity). */
export const MARS_DUST_STYLE: GlowStyle = {
  maxParticles: 500,
  color: 0xb4583a,
  palette: [0xd8805a, 0x8a3c28, 0xe8a080],
  intensity: 1,
  blending: 'normal',
  rise: [-2.5, 1.5],
  wobble: 5,
  wobbleSpeed: 0.25,
  life: [10, 18],
  size: [1.6, 3],
  spawnHeight: [2, 60],
  flicker: 0,
  flickerSpeed: 1,
  nearPlants: 0,
  windSpeed: 22,
};

/** Acid rain fumes: pale green smoke puffs rising from the puddles, spreading and fading. */
export const FUME_STYLE: GlowStyle = {
  maxParticles: 420,
  color: 0x4a5244,
  palette: [0x3e463a, 0x565e50],
  intensity: 0.7,
  // Additive: the puffs fade out with their color (smoke can't be faded by shrinking), they lighten the air like steam
  blending: 'additive',
  followLight: true,
  smoke: { spin: 0.6 },
  rise: [5, 9],
  wobble: 1.5,
  wobbleSpeed: 0.8,
  life: [2, 3.5],
  size: [5, 8],
  spawnHeight: [0, 1],
  flicker: 0,
  flickerSpeed: 1,
  nearPlants: 0,
  windSpeed: 18,
  stretchY: 1.3,
  grow: 2.6,
}

/** Poisoned climate: toxic purple smoke rising from the puddles (same smoke as the acid fumes). */
export const POISON_FUME_STYLE: GlowStyle = {
  ...FUME_STYLE,
  // Lighter than the acid fumes: they must stand out of the thick purple haze
  color: 0x9a78bc,
  palette: [0x8462a8, 0xb090d0],
  maxParticles: 480,
};

/** Haunted mist: pale wisps slowly rising from the ground, curling and stretching before fading. */
export const HAUNT_WISP_STYLE: GlowStyle = {
  ...FUME_STYLE,
  maxParticles: 220,
  color: 0x3c4450,
  palette: [0x343b46, 0x48505c],
  smoke: { spin: 0.25 },
  rise: [2, 4.5],
  wobble: 5,
  wobbleSpeed: 0.35,
  life: [5, 8],
  size: [13, 19],
  stretchY: 1.25,
  grow: 2.2,
  windSpeed: 10,
};

/** Darkness: black wisps creeping low around the edge of the visible area (wider than tall, slowly crawling). */
export const DARK_WISP_STYLE: GlowStyle = {
  maxParticles: 200,
  color: 0x060609,
  palette: [0x0a0a10, 0x040406],
  intensity: 1,
  blending: 'normal',
  smoke: { spin: 0.2 },
  smokeOpacity: 0.7,
  rise: [0.3, 1.8],
  wobble: 6,
  wobbleSpeed: 0.3,
  life: [4, 7],
  size: [14, 22],
  spawnHeight: [0, 4],
  flicker: 0,
  flickerSpeed: 1,
  nearPlants: 0,
  windSpeed: 6,
  stretchY: 0.75,
  grow: 1.6,
};

/** Ash fall: wide grey smoke banks drifting with the wind (lit by the scene, fading in and out). */
export const ASH_SMOKE_STYLE: GlowStyle = {
  maxParticles: 70,
  color: 0x7a726c,
  palette: [0x6a625c, 0x8a827c],
  intensity: 1,
  blending: 'normal',
  followLight: true,
  smoke: { spin: 0.08 },
  smokeOpacity: 0.35,
  rise: [-0.5, 1.5],
  wobble: 3,
  wobbleSpeed: 0.2,
  life: [7, 11],
  size: [22, 32],
  spawnHeight: [5, 40],
  flicker: 0,
  flickerSpeed: 1,
  nearPlants: 0,
  windSpeed: 40,
  stretchY: 0.6,
  grow: 1.7,
};

/** Blizzard: powder snow swept up from the ground, long white gusts racing low with the wind. */
export const SPINDRIFT_STYLE: GlowStyle = {
  maxParticles: 170,
  color: 0xf4f8ff,
  palette: [0xe8eef8, 0xffffff],
  intensity: 1,
  blending: 'normal',
  followLight: true,
  smoke: { spin: 0.05 },
  smokeOpacity: 0.5,
  rise: [-0.5, 1.2],
  wobble: 1.5,
  wobbleSpeed: 1.2,
  life: [1.5, 3],
  size: [16, 26],
  spawnHeight: [0, 5],
  flicker: 0,
  flickerSpeed: 1,
  nearPlants: 0,
  windSpeed: 170,
  stretchY: 0.35,
  grow: 1.6,
};

/** Earthquake: dust and grit shaken off the roofs, falling along the walls. */
export const QUAKE_DEBRIS_STYLE: GlowStyle = {
  maxParticles: 700,
  color: 0x6e604e,
  palette: [0x54483a, 0x8a7a66],
  intensity: 1,
  blending: 'normal',
  followLight: true,
  rise: [-30, -14],
  wobble: 1,
  wobbleSpeed: 2,
  life: [1.2, 2.2],
  size: [2, 3.6],
  spawnHeight: [18, 38],
  flicker: 0,
  flickerSpeed: 1,
  nearPlants: 0,
  windSpeed: 4,
};

/** Earthquake: dust clouds rising from the shaken ground. */
export const QUAKE_DUST_STYLE: GlowStyle = {
  maxParticles: 260,
  color: 0x8a7860,
  palette: [0x74644e, 0x9c8a72],
  intensity: 1,
  blending: 'normal',
  followLight: true,
  smoke: { spin: 0.3 },
  smokeOpacity: 0.65,
  rise: [2, 5],
  wobble: 2,
  wobbleSpeed: 0.6,
  life: [1.5, 3],
  size: [11, 17],
  spawnHeight: [0, 1],
  flicker: 0,
  flickerSpeed: 1,
  nearPlants: 0,
  windSpeed: 10,
  stretchY: 0.7,
  grow: 2,
};

/** Geysers, at rest: thin white steam wisps rising lazily from the vents. */
export const STEAM_STYLE: GlowStyle = {
  maxParticles: 140,
  color: 0xf0f4f8,
  palette: [0xe4eaf0, 0xffffff],
  intensity: 1,
  blending: 'normal',
  followLight: true,
  smoke: { spin: 0.3 },
  smokeOpacity: 0.45,
  rise: [5, 9],
  wobble: 1.5,
  wobbleSpeed: 0.7,
  life: [2, 3.5],
  size: [5, 8],
  spawnHeight: [0, 1],
  flicker: 0,
  flickerSpeed: 1,
  nearPlants: 0,
  windSpeed: 14,
  stretchY: 1.2,
  grow: 2.4,
};

/** Geysers, erupting: a fast, dense white jet of steam shooting up and spreading at the top. */
export const STEAM_JET_STYLE: GlowStyle = {
  ...STEAM_STYLE,
  maxParticles: 420,
  smokeOpacity: 0.7,
  rise: [55, 85],
  wobble: 1,
  life: [1.1, 1.8],
  size: [6, 9],
  windSpeed: 10,
  stretchY: 1.5,
  grow: 3.2,
};

/** Time warp: motes of light hanging in the air, barely moving (time almost stopped), gold and pale blue. */
export const TIME_MOTE_STYLE: GlowStyle = {
  maxParticles: 260,
  color: 0xffe0a0,
  palette: [0xb0d0ff, 0xd8c0ff, 0xffffff],
  intensity: 1.8,
  blending: 'normal',
  rise: [-0.3, 0.3],
  wobble: 0.8,
  wobbleSpeed: 0.15,
  life: [8, 14],
  size: [1.4, 2.6],
  spawnHeight: [2, 50],
  flicker: 0.4,
  flickerSpeed: 0.8,
  nearPlants: 0,
  windSpeed: 1,
};

/** Reversed gravity: pebbles and clods of earth slowly falling upwards, lit by the scene. */
export const GRAVITY_PEBBLE_STYLE: GlowStyle = {
  maxParticles: 650,
  color: 0x5a4a3a,
  palette: [0x3e3630, 0x7a6e60, 0x4e5a38],
  intensity: 1,
  blending: 'normal',
  followLight: true,
  rise: [5, 13],
  wobble: 1.5,
  wobbleSpeed: 0.6,
  life: [5, 9],
  size: [2.4, 4.6],
  spawnHeight: [0, 3],
  flicker: 0,
  flickerSpeed: 1,
  nearPlants: 0.2,
  windSpeed: 3,
};

/** Reversed gravity: water drops streaking up from the ground, like rain played backwards. */
export const GRAVITY_DROP_STYLE: GlowStyle = {
  maxParticles: 500,
  color: 0xf0f8ff,
  palette: [0xffffff, 0xd0e4f8],
  intensity: 1.3,
  blending: 'normal',
  followLight: true,
  stretchY: 4,
  rise: [30, 55],
  wobble: 0.2,
  wobbleSpeed: 1,
  life: [1.5, 2.5],
  size: [0.9, 1.4],
  spawnHeight: [0, 1],
  flicker: 0,
  flickerSpeed: 1,
  nearPlants: 0,
  windSpeed: 6,
};

/** Thunder rain: blue-white sparks jumping from a lightning impact. */
export const STRIKE_SPARK_STYLE: GlowStyle = {
  maxParticles: 160,
  color: 0xc8e0ff,
  palette: [0xffffff, 0x88b8ff],
  intensity: 2.4,
  rise: [8, 30],
  wobble: 4,
  wobbleSpeed: 9,
  life: [0.2, 0.6],
  size: [0.7, 1.4],
  spawnHeight: [0, 3],
  flicker: 0.5,
  flickerSpeed: 40,
  nearPlants: 0,
  windSpeed: 0,
};

/** Volcanic: dark smoke puffs rising here and there from the ground, spreading and fading (lit by the scene). */
export const VOLCANO_SMOKE_STYLE: GlowStyle = {
  maxParticles: 300,
  color: 0x3a3330,
  palette: [0x2c2624, 0x4a4240],
  intensity: 1,
  blending: 'normal',
  followLight: true,
  smoke: { spin: 0.4 },
  rise: [8, 12],
  wobble: 1.2,
  wobbleSpeed: 0.5,
  life: [3.5, 5.5],
  size: [9, 13],
  spawnHeight: [0, 1],
  flicker: 0,
  flickerSpeed: 1,
  nearPlants: 0,
  windSpeed: 26,
  stretchY: 1.2,
  grow: 3,
  smokeOpacity: 0.55,
};

/** Star dust: golden and violet motes floating lazily, shimmering. */
export const STARDUST_STYLE: GlowStyle = {
  maxParticles: 480,
  color: 0xffc840,
  palette: [0xc890ff, 0xfff2c0, 0x90b0ff],
  intensity: 1.6,
  blending: 'normal',
  rise: [-1, 1.5],
  wobble: 4,
  wobbleSpeed: 0.5,
  life: [7, 13],
  size: [2.6, 4.2],
  spawnHeight: [2, 40],
  flicker: 0.6,
  flickerSpeed: 4,
  nearPlants: 0,
  windSpeed: 10,
};

/** Fireflies: yellow-green lights drifting slowly around the trees and flowers, glowing on and off. */
export const FIREFLY_STYLE: GlowStyle = {
  maxParticles: 260,
  color: 0xc8ff4a,
  intensity: 3.2,
  rise: [-1.2, 1.5],
  wobble: 5,
  wobbleSpeed: 0.6,
  life: [6, 12],
  size: [2, 3.4],
  spawnHeight: [1, 12],
  flicker: 0.85,
  flickerSpeed: 1.6,
  nearPlants: 0.75,
  windSpeed: 8,
};

/**
 * Fairy mist: pink fireflies drifting in the pink haze. Normal blending keeps them pink by day
 * (additive light would wash to white on the bright mist); they still bloom at night (color above 1).
 */
export const FAIRY_STYLE: GlowStyle = {
  maxParticles: 280,
  color: 0xff6fd2,
  palette: [0xffa3e6, 0xff4fc0],
  intensity: 1.6,
  blending: 'normal',
  rise: [-0.8, 1.6],
  wobble: 5,
  wobbleSpeed: 0.55,
  life: [6, 12],
  size: [3.2, 5],
  spawnHeight: [1, 18],
  flicker: 0.8,
  flickerSpeed: 1.4,
  nearPlants: 0.6,
  windSpeed: 8,
};

/** Spores: big soft green / purple lights slowly floating up from the ground and the plants. */
export const SPORE_STYLE: GlowStyle = {
  maxParticles: 320,
  color: 0x6dff9a,
  palette: [0xb070ff, 0x52ffd8],
  intensity: 1.15,
  blending: 'normal',
  rise: [1.5, 4],
  wobble: 3.5,
  wobbleSpeed: 0.5,
  life: [8, 14],
  // Normal blending shows mostly the bright core of the glow texture: bigger quads
  size: [4.5, 7.5],
  spawnHeight: [0, 25],
  flicker: 0.35,
  flickerSpeed: 1.2,
  nearPlants: 0.35,
  windSpeed: 15,
};

/**
 * A puff of smoke: several soft blobs of random size and position melted together, so the outline is
 * irregular and cloudy (a single round gradient looks like a glowing ball, not smoke).
 */
/**
 * Per-instance opacity for an instanced material: a float attribute aOpacity multiplied into the alpha.
 * Wraps the existing onBeforeCompile (the unlit materials already patch the fog).
 */
function addInstanceOpacity(material: THREE.MeshBasicMaterial) {
  const previous = material.onBeforeCompile;
  const previousKey = material.customProgramCacheKey();
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    shader.vertexShader = 'attribute float aOpacity;\nvarying float vOpacity;\n' + shader.vertexShader
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvOpacity = aOpacity;');
    shader.fragmentShader = 'varying float vOpacity;\n' + shader.fragmentShader
      .replace('#include <map_fragment>', '#include <map_fragment>\ndiffuseColor.a *= vOpacity;');
  };
  material.customProgramCacheKey = () => previousKey + '-instance-opacity';
}

export function makeSmokeTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  let seed = 7;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 14; i++) {
    const r = size * (0.12 + 0.18 * rand());
    const angle = rand() * Math.PI * 2;
    const dist = size * 0.18 * rand();
    const x = size / 2 + Math.cos(angle) * dist;
    const y = size / 2 + Math.sin(angle) * dist;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(255,255,255,${0.18 + 0.12 * rand()})`);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeGlowTexture(): THREE.CanvasTexture {
  const size = 32;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.85)');
  g.addColorStop(0.6, 'rgba(255,255,255,0.2)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Small glowing particles around the camera target (camera-facing, additive).
 * Each one appears above a surface, rises while wandering, fades out, then respawns elsewhere.
 */
export class GlowParticles {
  private readonly mesh: THREE.InstancedMesh;
  private readonly x: Float32Array;
  private readonly y: Float32Array;
  private readonly z: Float32Array;
  private readonly rise: Float32Array;
  private readonly age: Float32Array;
  private readonly life: Float32Array;
  private readonly size: Float32Array;
  private readonly phase: Float32Array;
  private readonly alive: Uint8Array;
  /** Palette index of each particle (0 = the style color). */
  private readonly colorIndex: Uint8Array;
  private readonly paletteColors: THREE.Color[];
  private active = 0;
  private time = 0;
  /** World positions of the plants (swaying meshes), refreshed regularly. */
  private plants: THREE.Vector3[] = [];
  private plantsAge = PLANTS_REFRESH;

  private readonly matrix = new THREE.Matrix4();
  private readonly position = new THREE.Vector3();
  private readonly scale = new THREE.Vector3();
  /** Per-instance opacity (normal-blended smoke only). */
  private opacity?: THREE.InstancedBufferAttribute;
  private readonly spin = new THREE.Quaternion();
  private readonly turned = new THREE.Quaternion();
  private static readonly FORWARD = new THREE.Vector3(0, 0, 1);
  /** Displayed color (with the style intensity) and the one it blends to after setColor. */
  private readonly baseColor: THREE.Color;
  private readonly targetColor: THREE.Color;
  private readonly tmpColor = new THREE.Color();

  constructor(private readonly scene: THREE.Scene, private readonly surfaces: SurfaceHeights, private readonly style: GlowStyle) {
    const n = style.maxParticles;
    this.x = new Float32Array(n);
    this.y = new Float32Array(n);
    this.z = new Float32Array(n);
    this.rise = new Float32Array(n);
    this.age = new Float32Array(n);
    this.life = new Float32Array(n);
    this.size = new Float32Array(n);
    this.phase = new Float32Array(n);
    this.alive = new Uint8Array(n);
    this.colorIndex = new Uint8Array(n);
    this.paletteColors = (style.palette ?? []).map(c => new THREE.Color(c).multiplyScalar(style.intensity));
    this.baseColor = new THREE.Color(style.color).multiplyScalar(style.intensity);
    this.targetColor = this.baseColor.clone();

    const additive = style.blending !== 'normal';
    const material = new THREE.MeshBasicMaterial({
      map: style.smoke ? makeSmokeTexture() : makeGlowTexture(),
      transparent: true,
      // Additive: fading the instance color to black hides the particle
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
      fog: false, // the fog would add its color (additive) or hide the glow
    });
    if (style.followLight) {
      registerUnlitMaterial(material);
    }
    // Normal-blended smoke fades with a per-instance opacity (a dark smoke can't be faded out additively)
    const fadeAlpha = !additive && !!style.smoke;
    const geometry = new THREE.PlaneGeometry(1, 1);
    if (fadeAlpha) {
      this.opacity = new THREE.InstancedBufferAttribute(new Float32Array(n), 1);
      this.opacity.setUsage(THREE.DynamicDrawUsage);
      geometry.setAttribute('aOpacity', this.opacity);
      addInstanceOpacity(material);
    }
    this.mesh = new THREE.InstancedMesh(geometry, material, n);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.setColorAt(0, this.baseColor); // creates the instance color buffer
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 10; // after the (possibly transparent) buildings, like the rain
    this.mesh.count = 0;
    this.mesh.visible = false;
    scene.add(this.mesh);
  }

  /** Changes the particles color (blended smoothly). */
  setColor(color: THREE.ColorRepresentation) {
    this.targetColor.set(color).multiplyScalar(this.style.intensity);
  }

  /**
   * @param density 0..1, share of the style maxParticles
   * @param camera particles always face it
   * @param windX signed wind, -1..1
   */
  update(dt: number, target: THREE.Vector3, density: number, camera: THREE.Camera, windX = 0) {
    const s = this.style;
    const count = Math.round(s.maxParticles * THREE.MathUtils.clamp(density, 0, 1));
    for (let i = count; i < this.active; i++) {
      this.alive[i] = 0;
    }
    this.active = count;
    this.mesh.visible = count > 0;
    if (!count) {
      return;
    }
    this.time += dt;
    this.baseColor.lerp(this.targetColor, 1 - Math.exp(-dt * 3));
    const vx = windX * s.windSpeed;
    if (s.nearPlants > 0) {
      this.refreshPlants(dt);
    }

    for (let i = 0; i < count; i++) {
      if (!this.alive[i]) {
        this.respawn(i, target, true);
      }
      this.age[i] += dt;
      this.y[i] += this.rise[i] * dt;
      this.x[i] += vx * dt;
      const dx = this.x[i] - target.x;
      const dz = this.z[i] - target.z;
      if (this.age[i] >= this.life[i] || dx < AREA.minX || dx > AREA.maxX || dz < AREA.minZ || dz > AREA.maxZ) {
        this.respawn(i, target, false);
      }

      // Fade in / out over the life, plus a flicker
      const t = this.age[i] / this.life[i];
      const flicker = 1 - s.flicker * (0.5 + 0.5 * Math.sin(this.time * s.flickerSpeed + this.phase[i] * 3));
      const brightness = Math.sin(Math.PI * t) * flicker;
      const color = this.colorIndex[i] ? this.paletteColors[this.colorIndex[i] - 1] : this.baseColor;
      // Normal blending can't dim to transparent with the color: the particle shrinks instead
      const additive = s.blending !== 'normal';
      this.mesh.setColorAt(i, additive ? this.tmpColor.copy(color).multiplyScalar(brightness) : color);

      const p = this.phase[i];
      const w = this.time * s.wobbleSpeed + p;
      this.position.set(this.x[i] + Math.sin(w) * s.wobble, this.y[i], this.z[i] + Math.cos(w * 0.7) * s.wobble * 0.5);
      const grow = 1 + ((s.grow ?? 1) - 1) * t;
      // Normal blending fades by shrinking, unless the smoke has its own opacity
      const size = this.size[i] * grow * (additive || this.opacity ? 1 : Math.sqrt(Math.max(brightness, 0)));
      this.scale.set(size, size * (s.stretchY ?? 1), size);
      if (s.smoke) {
        // Facing the camera, turned around the view axis
        this.spin.setFromAxisAngle(GlowParticles.FORWARD, this.phase[i] * 3 + this.age[i] * s.smoke.spin * (this.phase[i] > Math.PI ? 1 : -1));
        this.matrix.compose(this.position, this.turned.copy(camera.quaternion).multiply(this.spin), this.scale);
      } else {
        this.matrix.compose(this.position, camera.quaternion, this.scale);
      }
      this.mesh.setMatrixAt(i, this.matrix);
      this.opacity?.setX(i, Math.max(brightness, 0) * (s.smokeOpacity ?? 1));
    }
    this.mesh.count = count;
    this.mesh.instanceMatrix.needsUpdate = true;
    this.mesh.instanceColor!.needsUpdate = true;
    if (this.opacity) {
      this.opacity.needsUpdate = true;
    }
  }

  private refreshPlants(dt: number) {
    this.plantsAge += dt;
    if (this.plantsAge < PLANTS_REFRESH) {
      return;
    }
    this.plantsAge = 0;
    const plants: THREE.Vector3[] = [];
    this.scene.traverseVisible(o => {
      const geometry = (o as THREE.Mesh).geometry as THREE.BufferGeometry | undefined;
      if (geometry?.getAttribute?.(SWAY_ATTRIBUTE)) {
        plants.push(o.getWorldPosition(new THREE.Vector3()));
      }
    });
    this.plants = plants;
  }

  /** Spawn point: around a plant in the area (for a `nearPlants` share), anywhere in the area otherwise. */
  /** Where particles may appear (e.g. only in the puddles); tried a few times, else anywhere. */
  spawnFilter?: (x: number, z: number) => boolean;
  /** Where particles appear, decided by the caller (e.g. a few smoke vents); null = default spawn. */
  spawnAt?: (target: THREE.Vector3) => [number, number] | null;

  private spawnPoint(target: THREE.Vector3): [number, number] {
    const forced = this.spawnAt?.(target);
    if (forced) {
      return forced;
    }
    if (this.spawnFilter) {
      for (let attempt = 0; attempt < 40; attempt++) {
        const x = target.x + THREE.MathUtils.randFloat(AREA.minX, AREA.maxX);
        const z = target.z + THREE.MathUtils.randFloat(AREA.minZ, AREA.maxZ);
        if (this.spawnFilter(x, z)) {
          return [x, z];
        }
      }
    }
    if (this.plants.length && Math.random() < this.style.nearPlants) {
      for (let attempt = 0; attempt < 6; attempt++) {
        const plant = this.plants[Math.floor(Math.random() * this.plants.length)];
        const dx = plant.x - target.x;
        const dz = plant.z - target.z;
        if (dx > AREA.minX && dx < AREA.maxX && dz > AREA.minZ && dz < AREA.maxZ) {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * PLANT_RADIUS;
          return [plant.x + Math.cos(angle) * r, plant.z + Math.sin(angle) * r];
        }
      }
    }
    return [target.x + THREE.MathUtils.randFloat(AREA.minX, AREA.maxX), target.z + THREE.MathUtils.randFloat(AREA.minZ, AREA.maxZ)];
  }

  private respawn(i: number, target: THREE.Vector3, randomAge: boolean) {
    const s = this.style;
    const [x, z] = this.spawnPoint(target);
    const ground = this.surfaces.heightAt(x, z, target.y);
    this.x[i] = x;
    this.z[i] = z;
    this.y[i] = ground + THREE.MathUtils.randFloat(s.spawnHeight[0], s.spawnHeight[1]);
    this.rise[i] = THREE.MathUtils.randFloat(s.rise[0], s.rise[1]);
    this.life[i] = THREE.MathUtils.randFloat(s.life[0], s.life[1]);
    // Random age on (re)activation so they don't all fade in together
    this.age[i] = randomAge ? Math.random() * this.life[i] : 0;
    this.size[i] = THREE.MathUtils.randFloat(s.size[0], s.size[1]);
    this.phase[i] = Math.random() * Math.PI * 2;
    this.colorIndex[i] = Math.floor(Math.random() * (this.paletteColors.length + 1));
    this.alive[i] = 1;
  }
}
