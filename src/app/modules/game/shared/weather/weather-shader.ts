import * as THREE from 'three';
import { makeCloudTexture, sampleNoiseMap } from './cloud-texture';

/**
 * Uniforms shared by every lit material (same objects => updating a value updates all materials).
 * Driven each frame by WeatherHelper.
 */
export const WEATHER_UNIFORMS = {
  uCloudMap: { value: makeCloudTexture() as THREE.Texture },
  /** One cloud texture tile covers 1 / uCloudScale world units. */
  uCloudScale: { value: 1 / 900 },
  /** Cloud density (gauge), 0 = a few scattered clouds .. 1 = overcast with some gaps. */
  uCloudDensity: { value: 0.5 },
  uCloudOffset: { value: new THREE.Vector2() },
  uCloudCover: { value: 0 },
  /** Direction towards the sun (world space, normalized). */
  uSunDir: { value: new THREE.Vector3(0, 1, 0) },
  uSpecular: { value: 1 },
  /** How much clouds also dim the ambient light (makes cloud shadows stand out). */
  uCloudAmbient: { value: 0 },
  /** Extra light on the building facades facing the sun. */
  uSunGlow: { value: 0 },
  /** Animation time of the sun beams (shared with GodRaysPass so both patterns match). */
  uBeamTime: { value: 0 },
  /** How much the sun beams light the surfaces they hit (0 = no beams). */
  uBeamLight: { value: 0 },
  /** Night window lights strength (0 = off) and tint. */
  uWindowGlow: { value: 0 },
  uWindowTint: { value: new THREE.Color(1, 1, 1) },
  /** Aurora curtains light strength (0 = none). Animated with uBeamTime. */
  uAurora: { value: 0 },
  /** Snow layer on the surfaces facing up, 0 = none, 1 = roofs fully white (grows while it snows). */
  uSnowCover: { value: 0 },
  /** Sand layer (sandstorm): ground and roofs, plus the walls facing the wind. */
  uSandCover: { value: 0 },
  /** Color of the sand layer (linear). */
  uSandColor: { value: new THREE.Color().setRGB(0.86, 0.71, 0.48) },
  /** Wet surfaces (darker), puddles level on the ground, rain ripples in the puddles, reflected sky color. */
  uWetness: { value: 0 },
  uPuddles: { value: 0 },
  uRipples: { value: 0 },
  uSkyColor: { value: new THREE.Color() },
  /** Stained rain (blood, poison) in the wet surfaces and puddles: amount 0..1 and color (linear). */
  uBlood: { value: 0 },
  uStainColor: { value: new THREE.Color(0.42, 0.02, 0.03) },
  /** Signed wind along x, -1 (east -> west) .. 1 (west -> east). Bends the vegetation. */
  uWindX: { value: 0 },
  /** Vegetation flutter phase: integrated on the CPU (its speed follows the wind) so changing the wind never makes it jump. */
  uFlutterPhase: { value: 0 },
  /** Fog thickness (0 = none), color (linear) and drift of its patches (moves with the wind). */
  uFog: { value: 0 },
  uFogColor: { value: new THREE.Color() },
  uFogOffset: { value: new THREE.Vector2() },
  /** Darkness: strength, and the point it closes in around (the camera target / player). */
  uDarkness: { value: 0 },
  /** Freezing rain: shiny ice glazing the surfaces facing up, 0..1. */
  uIce: { value: 0 },
  /** Rainbow sheen on the sun reflections (star dust), red aurora share (solar storm). */
  uIridescence: { value: 0 },
  /** Frost cover (crystalline white on the surfaces, grass and roofs first), 0..1. */
  uFrost: { value: 0 },
  /** Stars twinkling in the puddles (starry night), 0..1. */
  uStars: { value: 0 },
  /** Light tide: bioluminescent waves on the ground, 0..1. */
  uTide: { value: 0 },
  /** Time warp: ripples spreading from the player (strength), and their center. */
  uWarp: { value: 0 },
  uStrikeOn: { value: 0 },
  uMirage: { value: 0 },
  /** Deep freeze: height (world units) the frost has climbed up the walls. */
  uFrostClimb: { value: 0 },
  /** Thunder rain ground discharges: x, z, age (s), power (0 = unused). */
  uStrikes: { value: [new THREE.Vector4(), new THREE.Vector4()] },
  uWarpCenter: { value: new THREE.Vector3() },
  uAuroraRed: { value: 0 },
  /** Forest canopy: dappled leaf shadows, 0 = none, 1 = full. */
  uCanopy: { value: 0 },
  uDarkCenter: { value: new THREE.Vector3() },
  uStalk: { value: 0 },
  uStalkRadius: { value: 0 },
};

/** Per-vertex flexibility of the vegetation (0 = rigid / base, up to the model sway at the top). */
export const SWAY_ATTRIBUTE = 'aSway';

/** World positions of a plant mesh: its own, or each copy's for an instanced mesh (one mesh for all the trees). */
export function plantPositions(object: THREE.Object3D): THREE.Vector3[] {
  const instanced = object as THREE.InstancedMesh;
  if (!instanced.isInstancedMesh) {
    return [object.getWorldPosition(new THREE.Vector3())];
  }
  const matrix = new THREE.Matrix4();
  const positions: THREE.Vector3[] = [];
  for (let i = 0; i < instanced.count; i++) {
    instanced.getMatrixAt(i, matrix);
    positions.push(new THREE.Vector3().setFromMatrixPosition(matrix.premultiply(object.matrixWorld)));
  }
  return positions;
}
/** Lean of a fully flexible vertex at full wind (world units). */
const SWAY_LEAN = 5.0;

/** Unlit materials (sprites...): tinted each frame by WeatherHelper so they follow day/night. */
export const UNLIT_MATERIALS = new Set<THREE.MeshBasicMaterial | THREE.SpriteMaterial>();

/**
 * Unlit materials use three's scene fog, normally mixed after the output color conversion: on screen it mixes
 * sRGB colors, in a post effect render target linear ones (the fog would jump when bloom / sun rays turn on or off).
 * Moves it before the conversion, like the weather fog of the lit materials.
 */
export function applyLinearFog<T extends THREE.Material>(mat: T): T {
  mat.onBeforeCompile = shader => {
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <fog_fragment>', '')
      .replace('#include <colorspace_fragment>', '#include <fog_fragment>\n#include <colorspace_fragment>');
  };
  mat.customProgramCacheKey = () => 'linear-fog-v1';
  return mat;
}

/** Registers an unlit material: follows the day / night tint and the fog. */
export function registerUnlitMaterial<T extends THREE.MeshBasicMaterial | THREE.SpriteMaterial>(mat: T): T {
  UNLIT_MATERIALS.add(mat);
  // Its own color is kept: the light tint multiplies it (white for the sprites, red for the blood drops...)
  mat.userData['unlitBaseColor'] = mat.color.clone();
  applyLinearFog(mat);
  return mat;
}

/**
 * Sun beams pattern, shared by the lit materials and the volumetric GodRaysPass:
 * a noise constant along the sun direction, so a beam lights the air and the surface it hits identically.
 * Returns 0 (between beams) .. 1 (inside a beam).
 */
export const BEAM_GLSL = /* glsl */`
// Hash without sine (Dave Hoskins): sin() of big values is imprecise on phone GPUs, the noise cells didn't
// match anymore and the fog showed straight seams every ~5 tiles
float wbHash(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float wbNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(wbHash(i), wbHash(i + vec2(1.0, 0.0)), f.x),
             mix(wbHash(i + vec2(0.0, 1.0)), wbHash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float beamPattern(vec3 p, vec3 sunDir, float time) {
  vec3 a1 = normalize(cross(sunDir, vec3(0.0, 0.0, 1.0)));
  vec3 a2 = cross(sunDir, a1);
  vec2 q = vec2(dot(p, a1), dot(p, a2)) * 0.03;
  return smoothstep(0.4, 0.9, wbNoise(q + vec2(time * 0.05, 0.0)));
}
`;

const VERTEX_HEAD = /* glsl */`
attribute float ${SWAY_ATTRIBUTE};
uniform float uWindX;
uniform float uBeamTime;
uniform float uFlutterPhase;
varying vec3 vWeatherWorldPos;
varying vec3 vWeatherWorldNormal;
`;

// Vegetation bending (before projection). Meshes without the attribute read 0 = rigid.
// Only x moves: stays correct for the tree layers tilted around x.
const SWAY_VERTEX = /* glsl */`
if (${SWAY_ATTRIBUTE} > 0.0) {
  #ifdef USE_INSTANCING
    vec3 swayWorld = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;
  #else
    vec3 swayWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;
  #endif
  float windAbs = abs(uWindX);
  // Slow gusts (the lean breathes) + fast flutter, both offset by position so plants don't move in sync
  float gust = 0.65 + 0.35 * sin(uBeamTime * 1.3 + swayWorld.x * 0.04 + swayWorld.z * 0.03);
  float flutter = sin(uFlutterPhase + swayWorld.x * 0.35 + swayWorld.z * 0.25);
  transformed.x += ${SWAY_ATTRIBUTE} * (uWindX * ${SWAY_LEAN.toFixed(1)} * gust + flutter * (0.25 + 1.2 * windAbs));
}
`;

const VERTEX_BODY = /* glsl */`
// (instanced copies: their own position / rotation too)
#ifdef USE_INSTANCING
  vWeatherWorldPos = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;
  vWeatherWorldNormal = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * objectNormal);
#else
  vWeatherWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
  vWeatherWorldNormal = normalize(mat3(modelMatrix) * objectNormal);
#endif
`;

/** Aurora light added everywhere (on top of the curtains), relative to the texture color. */
const AURORA_GLOBAL_TINT = 0.1;

/**
 * Puddles map: three samples of the noise texture mixed, each at its own scale, angle and offset, so the
 * texture tiling never shows: big wet / dry areas, the puddle shapes, ragged edges. Puddles where it is
 * above the level. Shared by the shader and puddleAt (footsteps).
 */
const PUDDLE_LAYERS = [
  { scale: 1 / 260, angle: 0, offset: [0.13, 0.57], weight: 0.5 },
  { scale: 1 / 83, angle: 0.6458, offset: [0.61, 0.29], weight: 0.35 },
  { scale: 1 / 31, angle: -1.0647, offset: [0.83, 0.07], weight: 0.15 },
] as const;
const PUDDLE_EDGE = 0.02;
/** Puddle threshold for a puddles level 0..1: ~2% of the ground at first, ~15% when full. */
const PUDDLE_LEVEL = [0.671, 0.553] as const;
export function puddleLevel(puddles: number): number {
  return PUDDLE_LEVEL[0] + (PUDDLE_LEVEL[1] - PUDDLE_LEVEL[0]) * Math.sqrt(Math.max(puddles, 0));
}
/** Is there a puddle at this ground position (same map as the shader)? */
export function puddleAt(x: number, z: number, puddles: number): boolean {
  if (puddles < 0.01) {
    return false;
  }
  let hollow = 0;
  for (const l of PUDDLE_LAYERS) {
    const c = Math.cos(l.angle);
    const s = Math.sin(l.angle);
    hollow += l.weight * sampleNoiseMap((c * x - s * z) * l.scale + l.offset[0], (s * x + c * z) * l.scale + l.offset[1]);
  }
  return hollow > puddleLevel(puddles) + PUDDLE_EDGE * 0.5;
}

/**
 * Forest canopy (dappled shadows): layers of the fbm map (scale = 1 / tile size in world units, angle, how much
 * the wind sways it), share of the sun blocked under the leaves, gaps threshold (lower = fewer sun flecks)
 * and edge softness.
 */
const CANOPY_LAYERS = [
  { scale: 1 / 170, angle: 0.4, sway: 0.5, weight: 0.55 },
  { scale: 1 / 61, angle: -0.9, sway: 1, weight: 0.3 },
  { scale: 1 / 23, angle: 1.7, sway: 1.8, weight: 0.15 },
] as const;
const CANOPY_SHADE = 0.8;
const CANOPY_GAPS = 0.47;
const CANOPY_EDGE = 0.025;
const CANOPY_GLSL = /* glsl */`
float canopyLeaves(vec2 p, vec2 sway) {
  float h = 0.0;
${CANOPY_LAYERS.map((l, i) => {
  const c = Math.cos(l.angle).toFixed(5);
  const sn = Math.sin(l.angle).toFixed(5);
  return `  { vec2 q = p + sway * ${l.sway.toFixed(2)};
    h += ${l.weight.toFixed(3)} * texture2D(uCloudMap, vec2(${c} * q.x - ${sn} * q.y, ${sn} * q.x + ${c} * q.y) * ${l.scale.toFixed(6)} + vec2(${(0.21 + i * 0.29).toFixed(2)}, ${(0.47 + i * 0.17).toFixed(2)})).r; }`;
}).join('\n')}
  return h;
}
`;

const PUDDLE_LEVEL_GLSL = /* glsl */`
float puddleLevel(float puddles) {
  return mix(${PUDDLE_LEVEL[0].toFixed(3)}, ${PUDDLE_LEVEL[1].toFixed(3)}, sqrt(max(puddles, 0.0)));
}
float puddleHollow(vec2 p) {
  float h = 0.0;
${PUDDLE_LAYERS.map(l => {
  const c = Math.cos(l.angle).toFixed(5);
  const s = Math.sin(l.angle).toFixed(5);
  return `  h += ${l.weight.toFixed(3)} * texture2D(uCloudMap, vec2(${c} * p.x - ${s} * p.y, ${s} * p.x + ${c} * p.y) * ${l.scale.toFixed(6)} + vec2(${l.offset[0].toFixed(2)}, ${l.offset[1].toFixed(2)})).r;`;
}).join('\n')}
  return h;
}
`;

const FRAGMENT_HEAD = /* glsl */`
#define AURORA_GLOBAL_TINT ${AURORA_GLOBAL_TINT.toFixed(3)}
uniform sampler2D uCloudMap;
uniform float uCloudScale;
uniform float uCloudDensity;
uniform vec2 uCloudOffset;
uniform float uCloudCover;
uniform vec3 uSunDir;
uniform float uSpecular;
uniform float uCloudAmbient;
uniform float uSunGlow;
uniform float uBeamTime;
uniform float uBeamLight;
uniform float uWindowGlow;
uniform vec3 uWindowTint;
uniform float uAurora;
uniform float uSnowCover;
uniform float uSandCover;
uniform vec3 uSandColor;
uniform float uWetness;
uniform float uPuddles;
uniform float uRipples;
uniform vec3 uSkyColor;
uniform float uBlood;
uniform vec3 uStainColor;
uniform float uWindX;
uniform float uFog;
uniform vec3 uFogColor;
uniform vec2 uFogOffset;
uniform float uDarkness;
uniform float uIce;
uniform float uIridescence;
uniform float uFrost;
uniform float uStars;
uniform float uTide;
uniform float uWarp;
uniform float uStrikeOn;
uniform float uMirage;
uniform float uFrostClimb;
uniform vec4 uStrikes[2];
uniform vec3 uWarpCenter;
uniform float uAuroraRed;
uniform float uCanopy;
uniform vec3 uDarkCenter;
uniform float uStalk;
uniform float uStalkRadius;
varying vec3 vWeatherWorldPos;
varying vec3 vWeatherWorldNormal;
` + BEAM_GLSL + PUDDLE_LEVEL_GLSL + CANOPY_GLSL;

/** Stars in the puddles: grid cells per world unit (star spacing), share of cells with a star (higher = fewer). */
/** Light tide: wave length (world units), speed (world units / s), color (linear, above 1 to bloom). */
const TIDE_WAVELENGTH = 70;
const TIDE_SPEED = 14;
const TIDE_COLOR = [0.15, 0.55, 1.1] as const;
const STAR_DENSITY = 1.2;
const STAR_RARITY = 0.985;

// Runs once all lights are accumulated: clouds only dim the sun (direct light), never the ambient.
/** Mirage: distance to the player (world units) under which there's no fake water / from which it's full. */
const MIRAGE_NEAR = 70;
const MIRAGE_FAR = 130;
/** Thunder rain: radius reached by the ground discharge (world units), time to reach it (s), its brightness. */
const STRIKE_RADIUS = 45;
const STRIKE_GROW = 0.25;
const STRIKE_GLOW = 1.6;

const FRAGMENT_BODY = /* glsl */`
{
  // Project the point along the sun direction onto the y = 0 plane,
  // so a roof and the ground below it receive a coherent cloud shadow.
  vec2 cloudPos = vWeatherWorldPos.xz - uSunDir.xz * (vWeatherWorldPos.y / max(uSunDir.y, 0.1));
  // The noise is thresholded by the density: higher density = lower threshold = more of the sky covered.
  // The soft band gives blurry edges.
  float cloudNoise = texture2D(uCloudMap, cloudPos * uCloudScale + uCloudOffset).r;
  float cloudThreshold = mix(0.72, 0.28, uCloudDensity);
  float cloud = smoothstep(cloudThreshold - 0.06, cloudThreshold + 0.14, cloudNoise);
  float sunVisibility = 1.0 - uCloudCover * cloud;
  // Forest canopy: the sun comes through gaps in the foliage (sun flecks). Three rotated layers of the fbm map:
  // leaf clusters, smaller holes, ragged leafy edges; the smaller ones sway more with the wind.
  if (uCanopy > 0.0) {
    vec2 sway = vec2(sin(uBeamTime * 1.3), cos(uBeamTime * 0.9)) * (0.4 + 1.6 * abs(uWindX));
    float leaves = canopyLeaves(cloudPos, sway);
    float shade = smoothstep(${CANOPY_GAPS.toFixed(3)} - ${CANOPY_EDGE.toFixed(3)}, ${CANOPY_GAPS.toFixed(3)} + ${CANOPY_EDGE.toFixed(3)}, leaves);
    sunVisibility *= 1.0 - uCanopy * ${CANOPY_SHADE.toFixed(2)} * shade;
  }

  // Facades (vertical faces) turned towards the sun get an extra warm glow.
  // directDiffuse is already 0 in the shadows, so the glow never lights a shaded wall.
  vec3 worldNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
  float facade = (1.0 - abs(worldNormal.y)) * smoothstep(0.05, 0.5, dot(worldNormal, uSunDir));
  reflectedLight.directDiffuse *= 1.0 + uSunGlow * facade * vec3(1.0, 0.92, 0.75);

  // Sun beams: brighter inside a beam, slightly dimmer between beams (still 0 in the shadows)
  if (uBeamLight > 0.0) {
    float beam = beamPattern(vWeatherWorldPos, uSunDir, uBeamTime);
    reflectedLight.directDiffuse *= mix(1.0 - 0.35 * uBeamLight, 1.0 + 0.8 * uBeamLight, beam);
  }

  reflectedLight.directDiffuse *= sunVisibility;
  reflectedLight.directSpecular *= sunVisibility * uSpecular;
  // Star dust: the sun reflections shimmer in rainbow colors, changing with the view angle and position
  if (uIridescence > 0.0) {
    vec3 irView = normalize(cameraPosition - vWeatherWorldPos);
    float h = fract(dot(vWeatherWorldPos.xz, vec2(0.011, 0.017)) + irView.y * 1.5 + uBeamTime * 0.04);
    vec3 rainbow = 0.5 + 0.5 * cos(6.2831 * (h + vec3(0.0, 0.33, 0.67)));
    reflectedLight.directSpecular *= mix(vec3(1.0), rainbow * 2.2, uIridescence);
  }
  reflectedLight.indirectDiffuse *= 1.0 - uCloudAmbient * cloud;

  // Aurora: slowly waving green / purple light curtains sweeping the ground and roofs
  if (uAurora > 0.0) {
    vec2 ap = vWeatherWorldPos.xz * 0.0035;
    float t = uBeamTime;
    float warp = wbNoise(ap * 2.0 + vec2(t * 0.04, -t * 0.03)) * 2.5;
    float curtain = sin((ap.x * 1.3 + ap.y * 0.6 + warp) * 6.2831 + t * 0.25);
    curtain = pow(max(curtain, 0.0), 2.5);
    // Thin vertical-looking rays inside the curtains
    float rays = 0.55 + 0.45 * wbNoise(vec2((ap.x * 0.9 - ap.y * 0.4) * 30.0 + t * 0.6, t * 0.2));
    float hue = smoothstep(0.35, 0.75, wbNoise(ap * 1.5 - vec2(t * 0.02)));
    vec3 auroraColor = mix(vec3(0.1, 1.0, 0.5), vec3(0.65, 0.25, 1.0), hue);
    auroraColor = mix(auroraColor, mix(vec3(1.0, 0.12, 0.08), vec3(1.0, 0.45, 0.15), hue), uAuroraRed);
    // Global tint everywhere (same slowly shifting green / purple as the curtains) + the brighter curtains
    float auroraLight = AURORA_GLOBAL_TINT + curtain * rays * 0.55;
    reflectedLight.indirectDiffuse += diffuseColor.rgb * auroraColor * (auroraLight * uAurora);
  }

  // Puddles: mirror-like water reflecting the sky (stronger at grazing angles) and the sun
  if (wbPuddle > 0.0) {
    vec3 viewDir = normalize(cameraPosition - vWeatherWorldPos);
    float fresnel = 0.55 + 0.45 * pow(1.0 - clamp(viewDir.y, 0.0, 1.0), 3.0);
    // Rain ripples: expanding rings in a grid of cells, each with its own rhythm
    float ripple = 0.0;
    if (uRipples > 0.0) {
      vec2 cell = floor(vWeatherWorldPos.xz / 2.5);
      vec2 local = fract(vWeatherWorldPos.xz / 2.5) - 0.5 - (vec2(wbHash(cell), wbHash(cell + 7.1)) - 0.5) * 0.5;
      float phase = fract(uBeamTime * 1.3 + wbHash(cell + 3.7));
      float ring = abs(length(local) - phase * 0.45);
      ripple = (1.0 - smoothstep(0.0, 0.04, ring)) * (1.0 - phase) * uRipples;
    }
    vec3 reflection = uSkyColor * mix(vec3(1.0), uStainColor * 1.3, uBlood) * fresnel * (0.7 + 0.7 * ripple);
    // Starry night: a few stars mirrored in the water, each twinkling on its own rhythm
    if (uStars > 0.0) {
      vec2 starCell = floor(vWeatherWorldPos.xz * ${STAR_DENSITY.toFixed(2)});
      float star = step(${STAR_RARITY.toFixed(3)}, wbHash(starCell));
      float twinkle = 0.4 + 0.6 * sin(uBeamTime * (2.0 + 3.0 * wbHash(starCell + 5.3)) + wbHash(starCell + 1.7) * 40.0);
      reflection += vec3(0.85, 0.9, 1.0) * star * max(twinkle, 0.0) * fresnel * uStars * 1.6;
    }
    float glint = pow(max(dot(reflect(-uSunDir, vec3(0.0, 1.0, 0.0)), viewDir), 0.0), 60.0);
    reflection += vec3(1.0, 0.97, 0.9) * glint * 1.5 * sunVisibility * uSpecular;
    reflectedLight.indirectDiffuse += reflection * wbPuddle;
  }
  // Time warp: rings of light spreading from the player across the ground, fading with the distance
  if (uWarp > 0.0) {
    vec3 warpNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
    float warpGround = smoothstep(0.6, 0.9, warpNormal.y);
    float warpDist = length(vWeatherWorldPos.xz - uWarpCenter.xz);
    float rings = smoothstep(0.93, 1.0, sin(warpDist * 0.14 - uBeamTime * 2.5));
    reflectedLight.indirectDiffuse += vec3(0.55, 0.45, 1.0) * rings * exp(-warpDist / 110.0) * uWarp * warpGround * 0.6;
  }
  // Thunder rain: from each lightning impact, an electric discharge spreads on the ground as branching lines
  // (Lichtenberg figure): iso-lines of a noise sampled on a circle around the impact (so they run outwards),
  // a second finer layer further out for the branching, jagged by a small noise. The puddles nearby light up.
  if (uStrikeOn > 0.0) {
    vec3 strikeNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
    float strikeGround = smoothstep(0.6, 0.9, strikeNormal.y);
    float discharge = 0.0;
    for (int i = 0; i < 2; i++) {
      vec4 st = uStrikes[i];
      if (st.w <= 0.0) {
        continue;
      }
      vec2 d = vWeatherWorldPos.xz - st.xy;
      float r = length(d);
      vec2 dir = d / max(r, 0.001);
      float reach = ${STRIKE_RADIUS.toFixed(1)} * smoothstep(0.0, ${STRIKE_GROW.toFixed(2)}, st.z);
      float fade = exp(-st.z * 2.2);
      float jag = wbNoise(vWeatherWorldPos.xz * 0.35) * 0.12;
      vec2 seed = st.xy * 0.13;
      float n1 = wbNoise(dir * 4.0 + r * 0.008 + seed) + jag;
      float n2 = wbNoise(dir * 11.0 + r * 0.012 + seed + 7.3) + jag;
      float thin = 1.0 - r / max(reach, 0.001);
      float veins = smoothstep(0.06 * thin, 0.0, abs(n1 - 0.5)) * 1.5
        + smoothstep(0.045 * thin, 0.0, abs(n2 - 0.5)) * smoothstep(8.0, 22.0, r);
      float inside = step(r, reach) * thin;
      float flick = 0.6 + 0.4 * sin(uBeamTime * 70.0 + float(i) * 2.0);
      // Scorched bright core at the impact
      float core = exp(-r / 5.0) * 2.0;
      discharge += (veins * inside + core) * fade * flick * strikeGround;
      // Puddles nearby: the water carries the current, flickering longer
      discharge += wbPuddle * (1.0 - smoothstep(${(STRIKE_RADIUS * 0.8).toFixed(1)}, ${(STRIKE_RADIUS * 1.6).toFixed(1)}, r))
        * exp(-st.z * 1.2) * (0.55 + 0.45 * sin(uBeamTime * 45.0) * sin(uBeamTime * 31.0 + float(i))) * 0.6;
    }
    reflectedLight.indirectDiffuse += vec3(0.55, 0.75, 1.0) * discharge * ${STRIKE_GLOW.toFixed(2)};
  }
  // Mirage: patches of fake water on the ground, only far from the player (fading out as they come closer, so they
  // can never be reached): the ground there shows the bright sky instead of its own color, rippling.
  if (uMirage > 0.0) {
    vec3 mirageNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
    float mirageGround = smoothstep(0.6, 0.9, mirageNormal.y) * (1.0 - step(1.0, vWeatherWorldPos.y));
    float mirageDist = length(vWeatherWorldPos.xz - uDarkCenter.xz);
    float distant = smoothstep(${MIRAGE_NEAR.toFixed(1)}, ${MIRAGE_FAR.toFixed(1)}, mirageDist);
    vec2 mp = vWeatherWorldPos.xz * 0.02;
    float patches = smoothstep(0.52, 0.62, wbNoise(mp + vec2(uBeamTime * 0.01, 0.0)) * 0.7 + wbNoise(mp * 2.7 - uBeamTime * 0.015) * 0.3);
    float pool = patches * distant * mirageGround * uMirage;
    if (pool > 0.0) {
      // Thin horizontal shimmer lines moving fast, like heat over water
      float ripple = 0.5 + 0.5 * sin(vWeatherWorldPos.z * 1.7 + uBeamTime * 5.0 + wbNoise(vWeatherWorldPos.xz * 0.3) * 6.0);
      vec3 sky = vec3(0.72, 0.84, 0.98) * (0.85 + 0.35 * ripple);
      reflectedLight.directDiffuse *= 1.0 - 0.7 * pool;
      reflectedLight.indirectDiffuse = mix(reflectedLight.indirectDiffuse, sky, pool * 0.85);
    }
  }
  // Light tide: bioluminescent waves sweeping the ground. Two wave trains crossing at an angle, their crests
  // warped by noise (no straight lines); the plankton glows as tiny sparkles where a crest passes, with a soft halo.
  if (uTide > 0.0) {
    vec3 tideNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
    float tideGround = smoothstep(0.6, 0.9, tideNormal.y) * (1.0 - step(1.0, vWeatherWorldPos.y));
    if (tideGround > 0.0) {
      vec2 tp = vWeatherWorldPos.xz;
      // Crests bent by two octaves of noise: organic fronts, never straight lines
      float warp = (wbNoise(tp * 0.015 + uBeamTime * 0.02) * 0.7 + wbNoise(tp * 0.05 - uBeamTime * 0.03) * 0.3) * 45.0;
      float k = 6.2831 / ${TIDE_WAVELENGTH.toFixed(1)};
      float wave = sin((dot(tp, vec2(0.8, 0.6)) + warp - uBeamTime * ${TIDE_SPEED.toFixed(1)}) * k);
      // A slow second wave only modulates the strength (some crests bright, others faint), no grid
      float swell = 0.35 + 0.65 * smoothstep(-0.3, 1.0, sin((dot(tp, vec2(-0.5, 0.86)) + warp * 0.5 - uBeamTime * 6.0) * k * 0.45));
      float crest = smoothstep(0.86, 1.0, wave) * swell;
      // Light lingering behind the crest (the plankton fades slowly after the wave)
      float trail = smoothstep(0.2, 0.86, wave) * (1.0 - smoothstep(0.86, 1.0, wave)) * 0.25 * swell;
      vec2 cell = floor(tp * 1.8);
      float plankton = step(0.8, wbHash(cell)) * (0.5 + 0.5 * sin(uBeamTime * 4.0 + wbHash(cell + 3.1) * 30.0));
      vec3 tideColor = vec3(${TIDE_COLOR.join(', ')});
      reflectedLight.indirectDiffuse += tideColor * uTide * tideGround * (crest * 0.18 + (crest + trail) * plankton * 1.8);
    }
  }
  // Frost: tiny ice crystals glittering in the sun
  if (wbFrost > 0.0) {
    float glitter = step(0.97, wbHash(floor(vWeatherWorldPos.xz * 2.5) + floor(vWeatherWorldPos.y * 2.5)));
    float twinkle = 0.5 + 0.5 * sin(uBeamTime * 3.0 + wbHash(floor(vWeatherWorldPos.xz * 2.5)) * 30.0);
    reflectedLight.indirectDiffuse += vec3(0.9, 0.95, 1.0) * glitter * twinkle * wbFrost * (0.25 + 0.75 * sunVisibility) * 0.8;
  }
  // Ice glaze: glassy sky reflection and a sharp sun glint
  if (wbIce > 0.0) {
    vec3 iceView = normalize(cameraPosition - vWeatherWorldPos);
    float iceFresnel = 0.3 + 0.7 * pow(1.0 - clamp(iceView.y, 0.0, 1.0), 3.0);
    reflectedLight.indirectDiffuse += uSkyColor * iceFresnel * 0.35 * wbIce;
    float iceGlint = pow(max(dot(reflect(-uSunDir, vec3(0.0, 1.0, 0.0)), iceView), 0.0), 40.0);
    reflectedLight.indirectDiffuse += vec3(1.0) * iceGlint * 1.2 * sunVisibility * wbIce;
  }
}
`;

/** Ground level: surfaces below this height are the ground (snow stays patchy there). */
const SNOW_GROUND_HEIGHT = 1.0;
/** Max snow coverage of the ground relative to roofs (keeps paths readable). */
const SNOW_GROUND_MAX = 0.42;

// Runs right after the texture is read: turns the surfaces facing up white (before lighting).
const SNOW_FRAGMENT = /* glsl */`
if (uSnowCover > 0.0) {
  vec3 snowNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
  float facingUp = smoothstep(0.25, 0.75, snowNormal.y);
  float isGround = 1.0 - step(${SNOW_GROUND_HEIGHT.toFixed(1)}, vWeatherWorldPos.y);
  // Roofs end fully covered; the ground stays patchy so paths remain readable
  float level = uSnowCover * mix(1.0, ${SNOW_GROUND_MAX.toFixed(2)}, isGround) * 1.2;
  float patches = wbNoise(vWeatherWorldPos.xz * 0.12) * 0.6 + wbNoise(vWeatherWorldPos.xz * 0.5) * 0.4;
  float snow = facingUp * smoothstep(patches - 0.08, patches + 0.08, level);
  // Keep a hint of the texture shading under the snow (outlines, tiles) instead of a flat white
  float textureLum = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
  vec3 snowColor = vec3(0.92, 0.95, 1.0) * min(0.72 + 0.4 * textureLum, 1.0);
  diffuseColor.rgb = mix(diffuseColor.rgb, snowColor, snow);
}
`;

/**
 * Shadow depth material of the swaying vegetation: same bending as the lit material, so the shadows
 * move with the leaves. three copies map / alphaTest / side from the mesh material before each shadow draw,
 * so a single instance serves every swaying mesh.
 */
let swayDepthMaterial: THREE.MeshDepthMaterial | undefined;
export function getSwayDepthMaterial(): THREE.MeshDepthMaterial {
  if (!swayDepthMaterial) {
    swayDepthMaterial = new THREE.MeshDepthMaterial();
    swayDepthMaterial.onBeforeCompile = shader => {
      shader.uniforms['uWindX'] = WEATHER_UNIFORMS.uWindX;
      shader.uniforms['uBeamTime'] = WEATHER_UNIFORMS.uBeamTime;
      shader.uniforms['uFlutterPhase'] = WEATHER_UNIFORMS.uFlutterPhase;
      shader.vertexShader = `attribute float ${SWAY_ATTRIBUTE};\nuniform float uWindX;\nuniform float uBeamTime;\nuniform float uFlutterPhase;\n`
        + shader.vertexShader.replace('#include <project_vertex>', SWAY_VERTEX + '#include <project_vertex>');
    };
    swayDepthMaterial.customProgramCacheKey = () => 'weather-sway-depth-v4';
  }
  return swayDepthMaterial;
}

/**
 * Shadow filtering: three's PCF rotates its samples with a screen-space noise, so a moving shadow edge
 * crawls through a fixed dither pattern (looks jerky). Replace it with 4 bilinear hardware taps on a fixed grid:
 * noise-free, and the result changes continuously when the shadow moves (also one tap cheaper).
 */
// First occurrence = the directional / spot light version (the point light one comes later)
const PCF_NOISY = 'float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;';
function patchShadowFilter() {
  const chunk = THREE.ShaderChunk.shadowmap_pars_fragment;
  const start = chunk.indexOf(PCF_NOISY);
  const end = start < 0 ? -1 : chunk.indexOf(') * 0.2;', start);
  if (end < 0) {
    console.warn('Shadow filter patch not applied (three shader chunk changed)');
    return;
  }
  THREE.ShaderChunk.shadowmap_pars_fragment = chunk.slice(0, start) + /* glsl */`
				vec2 o = 0.5 * radius;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vec2( -o.x, -o.y ), shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vec2( o.x, -o.y ), shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vec2( -o.x, o.y ), shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vec2( o.x, o.y ), shadowCoord.z ) )
				) * 0.25;` + chunk.slice(end + ') * 0.2;'.length);
}
patchShadowFilter();

/** Fog: distance where it starts thickening / reaches its full thickness (camera to target is ~210). */
const FOG_NEAR = 120;
/** Darkness: radius around the player where one can still see (world units, 8 = one tile), and the darkening
 * share inside / beyond it. */
export const DARK_RADIUS = 64;
const DARK_NEAR = 0.45;
const DARK_FAR = 0.99;
const FOG_FAR = 420;
/** Stalking fog: fog share inside the clearing / in the fog wall. */
const STALK_NEAR = 0.12;
const STALK_FAR = 0.97;

// Replaces three's fog (runs on the final color): patchy fog, thicker far away and near the ground
const FOG_FRAGMENT = /* glsl */`
if (uFog > 0.0) {
  float fogDist = length(vWeatherWorldPos - cameraPosition);
  vec2 fogPos = vWeatherWorldPos.xz;
  // Two noise layers drifting at different speeds: the fog rolls instead of sliding as a block
  float fogNoise = wbNoise(fogPos * 0.012 + uFogOffset) * 0.65
    + wbNoise(fogPos * 0.035 - uFogOffset * 1.6 + vec2(uBeamTime * 0.02, 0.0)) * 0.35;
  float fogAmount = uFog * (0.35 + 0.65 * smoothstep(${FOG_NEAR.toFixed(1)}, ${FOG_FAR.toFixed(1)}, fogDist));
  fogAmount *= mix(0.45, 1.25, fogNoise);
  // Ground fog: roofs stick out of it a bit
  fogAmount *= 1.0 - 0.35 * smoothstep(5.0, 60.0, vWeatherWorldPos.y);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, uFogColor, clamp(fogAmount, 0.0, 0.92));
}
// Darkness: the fog closes in around the player, its ragged edge slowly wavering.
// Never fully opaque: lit windows (very bright) still shine faintly through.
if (uDarkness > 0.0) {
  float darkDist = length(vWeatherWorldPos.xz - uDarkCenter.xz);
  float wisp = wbNoise(vWeatherWorldPos.xz * 0.045 + uFogOffset * 2.0 + vec2(0.0, uBeamTime * 0.03));
  float edge = ${DARK_RADIUS.toFixed(1)} * mix(0.7, 1.3, wisp);
  float dark = smoothstep(edge * 0.3, edge, darkDist);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, uFogColor, uDarkness * mix(${DARK_NEAR.toFixed(2)}, ${DARK_FAR.toFixed(2)}, dark));
}
// Stalking fog: a wall of fog with a clearing around the player, whose radius (uStalkRadius) opens while walking
// and closes in when standing still. The edge is torn by drifting noise, like the darkness.
if (uStalk > 0.0) {
  float stalkDist = length(vWeatherWorldPos.xz - uDarkCenter.xz);
  float curl = wbNoise(vWeatherWorldPos.xz * 0.05 + uFogOffset * 2.5 + vec2(uBeamTime * 0.04, 0.0));
  float stalkEdge = uStalkRadius * mix(0.65, 1.35, curl);
  float stalkFog = smoothstep(stalkEdge * 0.35, stalkEdge, stalkDist);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, uFogColor, uStalk * mix(${STALK_NEAR.toFixed(2)}, ${STALK_FAR.toFixed(2)}, stalkFog));
}
`;

/** Max sand coverage: surfaces facing up / walls facing the wind. */
const SAND_UP_MAX = 0.6;
const SAND_WALL_MAX = 0.45;

// Right after the texture is read (after the snow): patchy sand on the ground / roofs and on the windward walls
const SAND_FRAGMENT = /* glsl */`
if (uSandCover > 0.0) {
  vec3 sandNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
  float up = smoothstep(0.25, 0.75, sandNormal.y);
  // Walls whose face looks against the wind (the wind blows towards +x when uWindX > 0)
  float windward = (1.0 - abs(sandNormal.y)) * smoothstep(0.2, 0.8, -sandNormal.x * sign(uWindX + 0.0001));
  // Drifts: elongated along the wind, thicker at the bottom of the walls
  float drift = wbNoise(vWeatherWorldPos.xz * vec2(0.05, 0.2)) * 0.65 + wbNoise(vWeatherWorldPos.xz * 0.6) * 0.35;
  float wallLow = 1.0 - smoothstep(0.0, 14.0, vWeatherWorldPos.y);
  float amount = up * ${SAND_UP_MAX.toFixed(2)} + windward * wallLow * ${SAND_WALL_MAX.toFixed(2)};
  float sand = amount * smoothstep(drift - 0.15, drift + 0.15, uSandCover * 1.1);
  float sandLum = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
  vec3 sandColor = uSandColor * min(0.75 + 0.35 * sandLum, 1.0);
  diffuseColor.rgb = mix(diffuseColor.rgb, sandColor, sand);
}
`;

/** Wet surfaces darkening, puddles darkening (their color is mostly the reflection). */
const WET_DARKEN = 0.22;
const PUDDLE_DARKEN = 0.45;
/** Rain of death: how red the wet surfaces and the puddles get. */
const BLOOD_WET_STAIN = 0.4;
const BLOOD_PUDDLE_STAIN = 0.9;


// After the snow / sand: wet surfaces facing up get darker, puddles appear in the hollows of the ground.
// wbPuddle is declared here (main scope) and read by FRAGMENT_BODY for the reflection.
const PUDDLE_FRAGMENT = /* glsl */`
float wbPuddle = 0.0;
if (uWetness > 0.0 || uPuddles > 0.0) {
  vec3 wetNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
  float wetUp = smoothstep(0.5, 0.9, wetNormal.y);
  // Hidden under the snow / sand layer
  float dry = max(uSnowCover, uSandCover);
  float wet = uWetness * wetUp * (1.0 - dry);
  float onGround = 1.0 - step(${SNOW_GROUND_HEIGHT.toFixed(1)}, vWeatherWorldPos.y);
  // Puddles fill the "hollows" of the noise map (also sampled on the CPU for the footsteps, see puddleAt):
  // they grow from their center while it rains, shrink as they dry. Visible early (sqrt).
  float hollow = puddleHollow(vWeatherWorldPos.xz);
  float level = puddleLevel(uPuddles);
  wbPuddle = smoothstep(level, level + ${PUDDLE_EDGE.toFixed(3)}, hollow) * step(0.01, uPuddles) * wetUp * onGround * (1.0 - dry);
  diffuseColor.rgb *= 1.0 - ${WET_DARKEN.toFixed(2)} * wet - ${PUDDLE_DARKEN.toFixed(2)} * wbPuddle;
  // (blood / poison below)
  if (uBlood > 0.0) {
    float stain = uBlood * max(${BLOOD_WET_STAIN.toFixed(2)} * wet, ${BLOOD_PUDDLE_STAIN.toFixed(2)} * wbPuddle);
    float shade = dot(diffuseColor.rgb, vec3(0.3, 0.55, 0.15));
    diffuseColor.rgb = mix(diffuseColor.rgb, uStainColor * (0.6 + 0.8 * shade), stain);
  }
}
float wbIce = 0.0;
if (uIce > 0.0) {
  // Ice glaze: surfaces facing up get bluish, glassy (reflections added in FRAGMENT_BODY)
  vec3 iceNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
  wbIce = uIce * smoothstep(0.4, 0.9, iceNormal.y) * (1.0 - uSnowCover);
  diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.8, 0.88, 1.0) + vec3(0.04, 0.06, 0.1), wbIce * 0.7);
}
float wbFrost = 0.0;
if (uFrost > 0.0) {
  // Frost: spreads with uFrost over a crystalline pattern; reaches the surfaces facing up and the grass first
  vec3 frostNormal = normalize(vWeatherWorldNormal) * (gl_FrontFacing ? 1.0 : -1.0);
  float frostUp = smoothstep(0.2, 0.8, frostNormal.y);
  float green = clamp((diffuseColor.g - max(diffuseColor.r, diffuseColor.b)) * 4.0, 0.0, 1.0);
  float crystals = texture2D(uCloudMap, vWeatherWorldPos.xz * 0.09 + vWeatherWorldPos.y * 0.05).r * 0.6
    + wbNoise(vWeatherWorldPos.xz * 1.6 + vWeatherWorldPos.y * 0.8) * 0.4;
  float reach = uFrost * (0.3 + 0.22 * frostUp + 0.32 * green);
  // Deep freeze: the frost also climbs up the walls from the ground, up to uFrostClimb
  reach += uFrost * 0.55 * (1.0 - frostUp) * (1.0 - smoothstep(uFrostClimb * 0.6, uFrostClimb + 0.01, vWeatherWorldPos.y));
  wbFrost = smoothstep(crystals - 0.08, crystals + 0.08, reach) * (1.0 - uSnowCover);
  float frostLuma = dot(diffuseColor.rgb, vec3(0.3, 0.55, 0.15));
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.84, 0.91, 1.0) * (0.8 + 0.3 * frostLuma), wbFrost * 0.7);
}
`;

/** Plugs the weather effects (cloud shadows, sun reflections strength) into a lit three.js material. */
export function applyWeatherShader<T extends THREE.MeshLambertMaterial | THREE.MeshPhongMaterial>(mat: T): T {
  mat.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, WEATHER_UNIFORMS);
    shader.vertexShader = VERTEX_HEAD + shader.vertexShader.replace(
      '#include <project_vertex>',
      SWAY_VERTEX + '#include <project_vertex>\n' + VERTEX_BODY
    );
    shader.fragmentShader = FRAGMENT_HEAD + shader.fragmentShader
      .replace(
        '#include <map_fragment>',
        '#include <map_fragment>\n' + SNOW_FRAGMENT + SAND_FRAGMENT + PUDDLE_FRAGMENT
      )
      .replace(
        '#include <emissivemap_fragment>',
        // Emissive is only used for the night window lights
        '#include <emissivemap_fragment>\ntotalEmissiveRadiance *= uWindowGlow * uWindowTint;'
      )
      .replace(
        '#include <lights_fragment_end>',
        '#include <lights_fragment_end>\n' + FRAGMENT_BODY
      )
      // Fog mixed before the output color conversion (linear): same result whether the frame is rendered
      // on screen or through a post effect (bloom, sun rays)
      .replace('#include <fog_fragment>', '')
      .replace('#include <colorspace_fragment>', FOG_FRAGMENT + '#include <colorspace_fragment>');
  };
  mat.customProgramCacheKey = () => 'weather-v39';
  return mat;
}
