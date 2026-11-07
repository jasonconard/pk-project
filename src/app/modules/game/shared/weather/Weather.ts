import * as THREE from 'three';
import type { LeafMode } from './LeafHelper';

export type { LeafMode };

export enum WeatherType {
  NEUTRAL = 'neutral',
  SUNNY = 'sunny',
  CLOUDY = 'cloudy',
  RAINY = 'rainy',
  STORM = 'storm',
  SNOW = 'snow',
  AURORA = 'aurora',
  FOG = 'fog',
  DRIZZLE = 'drizzle',
  BLOOD_MOON = 'blood-moon',
  HEATWAVE = 'heatwave',
  FIREFLIES = 'fireflies',
  LEAVES = 'leaves',
  SPORES = 'spores',
  SANDSTORM = 'sandstorm',
  ELECTRIC = 'electric',
  FAIRY_MIST = 'fairy-mist',
  VOLCANIC = 'volcanic',
  BLOOD_RAIN = 'blood-rain',
  BLIZZARD = 'blizzard',
  DARKNESS = 'darkness',
  FOREST = 'forest',
  MONSOON = 'monsoon',
  AUTUMN_DRIZZLE = 'autumn-drizzle',
  STARRY_NIGHT = 'starry-night',
  SMOG = 'smog',
  FIREWORKS = 'fireworks',
  LIGHT_TIDE = 'light-tide',
  EARTHQUAKE = 'earthquake',
  GEYSERS = 'geysers',
  TIME_WARP = 'time-warp',
  INVERTED = 'inverted',
  STALKING_FOG = 'stalking-fog',
  ERUPTION = 'eruption',
  ANTIGRAVITY = 'antigravity',
  OLD_FILM = 'old-film',
  THUNDER_RAIN = 'thunder-rain',
  CRYSTAL_MIST = 'crystal-mist',
  MARS = 'mars',
  ACID_RAIN = 'acid-rain',
  HAIL = 'hail',
  SEA_MIST = 'sea-mist',
  SPRING_SHOWER = 'spring-shower',
  ASH = 'ash',
  FREEZING_RAIN = 'freezing-rain',
  MAGIC_SNOW = 'magic-snow',
  STARDUST = 'stardust',
  SOLAR_STORM = 'solar-storm',
  CURSE = 'curse',
  PETAL_WHIRL = 'petal-whirl',
  FROST = 'frost',
  HAUNTED = 'haunted',
  FLOOD = 'flood',
  TORNADO = 'tornado',
  POISON = 'poison',
}

/**
 * Everything a weather changes. Values are blended when switching weather.
 * Brightness levels are relative to the texture color (1 = exact texture color).
 */
export interface WeatherParams {
  /** Brightness of a flat ground in direct sunlight. */
  litLevel: number;
  /** Brightness in the shade (ambient light only). */
  shadowLevel: number;
  /** Tint of the ambient light. */
  ambientColor: THREE.Color;
  /** Color of the sun (the moon at night). */
  sunColor: THREE.Color;
  /** Tint applied to unlit sprites (player, pokemons...) so they match the scene light. */
  unlitTint: THREE.Color;
  /** Strength of the sun reflections on shiny surfaces (see SceneModelObj.shininess). */
  specular: number;
  /** 0 = no clouds, 1 = clouds fully block the sun. */
  cloudCover: number;
  /** 0..1 how much clouds also dim the ambient light: higher = more contrasted cloud shadows. */
  cloudAmbient: number;
  /** Extra light on the facades facing the sun (0 = none, 1 = +100% sunlight). */
  sunGlow: number;
  /** Night window lights strength (0 = off, 1 = full). */
  windowGlow: number;
  /** Tint of the window lights (white = their warm yellow). */
  windowTint: THREE.Color;
  /** Slow "breathing" of the light, 0 = steady, 0.2 = +-20%. */
  lightPulse: number;
  /** Sun rays ("god rays") overlay strength, 0 = none. */
  godRays: number;
  /** Speed of the cloud shadows on the ground, in world units per second. */
  cloudSpeed: number;
  /** Rain density, 0 = no rain, 1 = max drops (storm). */
  rain: number;
  /** Rain of blood density ("pluie de mort"), 0 = none, 1 = max. Leaves red puddles. */
  bloodRain: number;
  /** Poison rain density (toxic purple drops), 0 = none, 1 = max. Leaves purple puddles. */
  poisonRain: number;
  /** Drizzle density (tiny slow drops), 0 = none, 1 = max. */
  drizzle: number;
  /** Lightning frequency, 0 = never, 1 = a strike every few seconds. */
  lightning: number;
  /** Color of the lightning flashes. */
  lightningColor: THREE.Color;
  /** Aurora curtains light strength, 0 = none. */
  aurora: number;
  /** Snowfall density, 0 = none, 1 = snow, 2 = blizzard. The snow layer on roofs grows while it snows. */
  snow: number;
  /** How much the wind carries the flakes: 1 = normal, more = blown almost horizontally (blizzard). */
  snowDrift: number;
  /** Minimum wind strength whatever the wind gauge (sandstorm, blizzard), in the chosen direction. */
  minWind: number;
  /** Heat shimmer and washed-out warm colors (screen effect), 0 = none, 1 = scorching. */
  heatHaze: number;
  /** Washed-out warm colors of the heatwave (screen effect), 0 = none, 1 = full. */
  heatWash: number;
  /** Rising red embers density (blood moon), 0 = none, 1 = max. */
  embers: number;
  /** Volcanic embers bursting from the ground density, 0 = none, 1 = max. */
  lava: number;
  /** Fireflies density, 0 = none, 1 = max. */
  fireflies: number;
  /** Fairy mist pink lights density, 0 = none, 1 = max. */
  fairyLights: number;
  /** Electric field: crackling arcs on the shiny surfaces, 0 = none, 1 = max. */
  electric: number;
  /** Sandstorm: blown sand density (the wind is forced strong, the sand piles up), 0 = none, 1 = max. */
  sand: number;
  /** Floating glowing spores density, 0 = none, 1 = max. */
  spores: number;
  /** Golden pollen / dust motes floating in the light (forest), 0 = none, 1 = max. */
  pollen: number;
  /** Forest canopy: dappled leaf shadows on the ground (swaying with the wind) and forest sounds, 0 = none, 1 = full. */
  canopy: number;
  /** Falling leaves / petals density, 0 = none, 1 = max (see LeafMode). */
  leaves: number;
  /** Fog thickness, 0 = none, 1 = thick fog (thicker far away and near the ground, drifting with the wind). */
  fog: number;
  /** How fast the ground gets wet and the puddles fill (1 = normal rain, more = tropical downpour). */
  soak: number;
  /** Lightning only far away: smallest strike distance, 0 = anywhere .. 1 = always on the horizon. */
  lightningFar: number;
  /** Frogs croaking (monsoon), 0 = none, 1 = full chorus. */
  frogs: number;
  /** Autumn leaves falling whatever the leaves mode chosen for the "Feuilles" weather, 0 = none, 1 = max. */
  autumnLeaves: number;
  /** Night dew: the ground stays slightly wet with shallow puddles, 0 = none, 1 = full. */
  dew: number;
  /** Stars twinkling in the puddles, 0 = none, 1 = full. */
  stars: number;
  /** Light tide: waves of bioluminescent plankton glowing on the ground, 0 = none, 1 = full. */
  tide: number;
  /** Earthquakes: how often and how hard the ground shakes, 0 = never, 1 = full. */
  quake: number;
  /** Geysers steaming and erupting on the map, 0 = none, 1 = active. */
  geysers: number;
  /** Time distortion: the weather runs in slow motion, ripples spread around the player, 0 = none, 1 = full. */
  timeWarp: number;
  /** Inverted world: photographic negative of the whole image, sounds played backwards, 0 = none, 1 = full. */
  invert: number;
  /** Stalking fog: a fog wall that clears around the walking player and closes in when they stop, 0 = none, 1 = full. */
  stalkingFog: number;
  /** Imminent eruption: tremors growing more frequent until a big quake that throws up embers and smoke, 0 = none, 1 = full. */
  eruption: number;
  /** Reversed gravity: pebbles and drops falling upwards, the player floating, 0 = none, 1 = full. */
  antigravity: number;
  /** Old film: black and white, grain, scratches, flicker, projector sound, 0 = none, 1 = full. */
  oldFilm: number;
  /** Thunder rain: lightning striking the ground, electric discharges spreading on it, 0 = none, 1 = full. */
  thunderRain: number;
  /** Crickets chirping at night (without the forest), 0 = none, 1 = full. */
  crickets: number;
  /** Distant city sounds (traffic, horns, sirens), 0 = none, 1 = full. */
  city: number;
  /** Fireworks: how often rockets are launched, 0 = none, 1 = a show. */
  fireworks: number;
  /** Floating ice crystals catching the light (prismatic glints), 0 = none, 1 = max. */
  crystals: number;
  /** Dust motes floating for a long time as in a low gravity (Mars), 0 = none, 1 = max. */
  marsDust: number;
  /** Acid rain density (sickly green drops staining the ground), 0 = none, 1 = max. */
  acidRain: number;
  /** Acid fumes rising from the ground where the rain eats it, 0 = none, 1 = max. */
  fumes: number;
  /** Toxic purple fumes rising from the puddles (poisoned climate), 0 = none, 1 = max. */
  poisonFumes: number;
  /** Color of the sand layer on the ground (linear RGB). */
  sandColor: THREE.Color;
  /** Tint of the blown sand grains and dust puffs (white = their own sandy colors). */
  sandTint: THREE.Color;
  /** Hail density (white pellets, ticking on the roofs), 0 = none, 1 = max. */
  hail: number;
  /** Sea sounds (waves, gulls), 0 = none, 1 = full. */
  sea: number;
  /** Sun shower: golden backlit drops, 0 = none, 1 = max. */
  sunRain: number;
  /** Birds singing (without the forest), 0 = none, 1 = full. */
  birds: number;
  /** Grey ash flakes falling, 0 = none, 1 = max. */
  ash: number;
  /** Freezing rain: the surfaces facing up get glazed with shiny ice (grows while it lasts), 0 = none, 1 = full. */
  ice: number;
  /** Magic snow: glowing blue sparkles falling and twinkling, 0 = none, 1 = max. */
  magicSnow: number;
  /** Star dust: golden / violet motes floating, 0 = none, 1 = max. */
  stardust: number;
  /** Rainbow sheen on the shiny surfaces (roofs), 0 = none, 1 = full. */
  iridescence: number;
  /** Aurora colors turned red (solar storm), 0 = green / purple, 1 = red. */
  auroraRed: number;
  /** Light interferences: random brief dips of the light, windows blinking, radio static, 0 = none, 1 = max. */
  flicker: number;
  /** Curse: violet wisps circling the player, whispers, 0 = none, 1 = full. */
  curse: number;
  /** The sun / moon slowly wanders by itself (shadows moving on their own), 0 = still, 1 = full. */
  sunWander: number;
  /** Whirlwinds of cherry petals, 0 = none, 1 = max. */
  petalWhirl: number;
  /** Frost slowly covering everything (grass and roofs first), 0 = none, 1 = full. */
  frost: number;
  /** Haunted mist: misty silhouettes in the fog, moans, 0 = none, 1 = full. */
  haunt: number;
  /** Flood: water level rising above the ground, 0 = none, 1 = max level. */
  flood: number;
  /** Tornado crossing the area, 0 = none, 1 = full. */
  tornado: number;
  /** Color of the fog. */
  fogColor: THREE.Color;
  /** Darkness: the fog closes in around the player (fog color beyond a short radius), 0 = none, 1 = pitch dark. */
  darkness: number;
  /** Air temperature shown on the thermometer (°C), see TEMPERATURES. */
  temperature: number;
}

const DAY_BASE: WeatherParams = {
  litLevel: 1,
  shadowLevel: 0.6,
  ambientColor: new THREE.Color(0xffffff),
  sunColor: new THREE.Color(0xffffff),
  unlitTint: new THREE.Color(0xffffff),
  specular: 0.3,
  cloudCover: 0,
  cloudAmbient: 0,
  sunGlow: 0,
  windowGlow: 0,
  windowTint: new THREE.Color(0xffffff),
  lightPulse: 0,
  godRays: 0,
  cloudSpeed: 12,
  rain: 0,
  bloodRain: 0,
  poisonRain: 0,
  drizzle: 0,
  lightning: 0,
  lightningColor: new THREE.Color(0xe4ecff),
  aurora: 0,
  snow: 0,
  snowDrift: 1,
  minWind: 0,
  heatHaze: 0,
  heatWash: 0,
  embers: 0,
  lava: 0,
  fireflies: 0,
  fairyLights: 0,
  leaves: 0,
  spores: 0,
  pollen: 0,
  canopy: 0,
  sand: 0,
  electric: 0,
  fog: 0,
  soak: 1,
  lightningFar: 0,
  frogs: 0,
  autumnLeaves: 0,
  dew: 0,
  stars: 0,
  tide: 0,
  quake: 0,
  geysers: 0,
  timeWarp: 0,
  invert: 0,
  stalkingFog: 0,
  eruption: 0,
  antigravity: 0,
  oldFilm: 0,
  thunderRain: 0,
  crickets: 0,
  city: 0,
  fireworks: 0,
  crystals: 0,
  marsDust: 0,
  acidRain: 0,
  fumes: 0,
  poisonFumes: 0,
  sandColor: new THREE.Color().setRGB(0.86, 0.71, 0.48),
  sandTint: new THREE.Color(0xffffff),
  hail: 0,
  sea: 0,
  sunRain: 0,
  birds: 0,
  ash: 0,
  ice: 0,
  magicSnow: 0,
  stardust: 0,
  iridescence: 0,
  auroraRed: 0,
  flicker: 0,
  curse: 0,
  sunWander: 0,
  petalWhirl: 0,
  frost: 0,
  haunt: 0,
  flood: 0,
  tornado: 0,
  fogColor: new THREE.Color(0xdde3e8),
  darkness: 0,
  temperature: 0,
};

/** Moonlight: the "sun" light becomes a dim blue moon, windows are lit. */
const NIGHT_BASE: WeatherParams = {
  ...DAY_BASE,
  litLevel: 0.45,
  shadowLevel: 0.26,
  ambientColor: new THREE.Color(0x6d7fb3),
  sunColor: new THREE.Color(0xb3c4ff),
  unlitTint: new THREE.Color(0x707ea8),
  specular: 0.4,
  windowGlow: 1,
  fogColor: new THREE.Color(0x939eb3),
};

const preset = (base: WeatherParams, overrides: Partial<WeatherParams>): WeatherParams => ({ ...base, ...overrides });

/** Day versions. A weather missing here is never shown by day (falls back to NEUTRAL). */
export const DAY_PRESETS: Partial<Record<WeatherType, WeatherParams>> = {
  // Clear and plain: building shadows only, no clouds, rain or sun effects
  [WeatherType.NEUTRAL]: DAY_BASE,
  [WeatherType.SUNNY]: preset(DAY_BASE, {
    specular: 1,
    sunGlow: 0.8,
    godRays: 0.5,
  }),
  // Forest: green-tinted light filtered by the leaves, dappled shadows, sun beams, pollen floating, birds singing
  [WeatherType.FOREST]: preset(DAY_BASE, {
    litLevel: 1,
    shadowLevel: 0.55,
    ambientColor: new THREE.Color(0xd4ecc8),
    sunColor: new THREE.Color(0xfff6d8),
    unlitTint: new THREE.Color(0xe4f0dc),
    specular: 0.3,
    sunGlow: 0.3,
    godRays: 0.7,
    cloudSpeed: 6,
    canopy: 1,
    pollen: 1,
    leaves: 0.2,
    fog: 0.2,
    fogColor: new THREE.Color(0xb8d8b0),
  }),
  // Hail: dark grey sky, white pellets bouncing everywhere, ticking on the roofs
  [WeatherType.HAIL]: preset(DAY_BASE, {
    litLevel: 0.7,
    shadowLevel: 0.6,
    ambientColor: new THREE.Color(0xc8d0dc),
    sunColor: new THREE.Color(0xe8eef8),
    unlitTint: new THREE.Color(0xccd4e0),
    specular: 0.2,
    cloudCover: 0.8,
    cloudAmbient: 0.15,
    cloudSpeed: 35,
    hail: 1,
    fog: 0.15,
    fogColor: new THREE.Color(0xc8d0d8),
  }),
  // Sea mist: blue-grey banks of mist rolling in with the wind, waves and gulls far away
  [WeatherType.SEA_MIST]: preset(DAY_BASE, {
    litLevel: 0.85,
    shadowLevel: 0.64,
    ambientColor: new THREE.Color(0xd4e0ea),
    sunColor: new THREE.Color(0xf0f6ff),
    unlitTint: new THREE.Color(0xd8e2ec),
    specular: 0.3,
    cloudCover: 0.5,
    cloudAmbient: 0.08,
    cloudSpeed: 20,
    minWind: 0.25,
    sea: 1,
    fog: 0.75,
    fogColor: new THREE.Color(0xa8bac8),
  }),
  // Sun shower: bright sun, sun beams, a light rain of golden backlit drops, birds singing
  [WeatherType.SPRING_SHOWER]: preset(DAY_BASE, {
    litLevel: 1.02,
    shadowLevel: 0.62,
    ambientColor: new THREE.Color(0xfff8ec),
    sunColor: new THREE.Color(0xfff0d0),
    unlitTint: new THREE.Color(0xfff8f0),
    specular: 0.8,
    sunGlow: 0.5,
    godRays: 0.6,
    cloudCover: 0.2,
    cloudSpeed: 15,
    sunRain: 0.45,
    birds: 0.8,
  }),
  // Ash fall: dim orange sun through a grey haze, grey flakes slowly falling
  [WeatherType.ASH]: preset(DAY_BASE, {
    litLevel: 0.72,
    shadowLevel: 0.55,
    ambientColor: new THREE.Color(0xd4bca8),
    sunColor: new THREE.Color(0xffa870),
    unlitTint: new THREE.Color(0xd8c4b4),
    specular: 0.1,
    cloudCover: 0.6,
    cloudAmbient: 0.12,
    cloudSpeed: 5,
    ash: 1,
    fog: 0.45,
    fogColor: new THREE.Color(0xa89488),
  }),
  // Freezing rain: grey light, fine rain, everything facing up gets glazed with shiny ice
  [WeatherType.FREEZING_RAIN]: preset(DAY_BASE, {
    litLevel: 0.8,
    shadowLevel: 0.62,
    ambientColor: new THREE.Color(0xd4dcea),
    sunColor: new THREE.Color(0xeef4ff),
    unlitTint: new THREE.Color(0xd8e0ec),
    specular: 1.2,
    cloudCover: 0.6,
    cloudAmbient: 0.1,
    cloudSpeed: 15,
    drizzle: 0.9,
    ice: 1,
    fog: 0.25,
    fogColor: new THREE.Color(0xc8d4e0),
  }),
  // Magic snow: soft blue light, a light snowfall mixed with glowing blue sparkles, crystal chimes
  [WeatherType.MAGIC_SNOW]: preset(DAY_BASE, {
    litLevel: 0.95,
    shadowLevel: 0.68,
    ambientColor: new THREE.Color(0xdce8ff),
    sunColor: new THREE.Color(0xf0f4ff),
    unlitTint: new THREE.Color(0xe0eaff),
    specular: 0.4,
    cloudCover: 0.3,
    cloudSpeed: 6,
    snow: 0.5,
    magicSnow: 1,
    fog: 0.2,
    fogColor: new THREE.Color(0xd0dcff),
  }),
  // Star dust: soft violet light, golden / violet motes floating, rainbow sheen on the roofs
  [WeatherType.STARDUST]: preset(DAY_BASE, {
    litLevel: 0.96,
    shadowLevel: 0.62,
    ambientColor: new THREE.Color(0xf0e6ff),
    sunColor: new THREE.Color(0xfff4ec),
    unlitTint: new THREE.Color(0xf4ecff),
    specular: 1.3,
    sunGlow: 0.3,
    cloudSpeed: 6,
    iridescence: 1,
    stardust: 1,
    fog: 0.15,
    fogColor: new THREE.Color(0xe4d4f4),
  }),
  // Solar storm: red auroras in broad daylight, the light and the windows flicker, radio static
  [WeatherType.SOLAR_STORM]: preset(DAY_BASE, {
    litLevel: 0.92,
    shadowLevel: 0.6,
    ambientColor: new THREE.Color(0xffe0d8),
    sunColor: new THREE.Color(0xfff0e0),
    unlitTint: new THREE.Color(0xffe8e0),
    specular: 0.6,
    sunGlow: 0.3,
    cloudSpeed: 8,
    aurora: 3,
    auroraRed: 1,
    flicker: 1,
  }),
  // Curse: dim violet light, wisps circling the player, shadows moving on their own, whispers
  [WeatherType.CURSE]: preset(DAY_BASE, {
    litLevel: 0.6,
    shadowLevel: 0.36,
    ambientColor: new THREE.Color(0xb8a0d0),
    sunColor: new THREE.Color(0xd8c0ff),
    unlitTint: new THREE.Color(0xbcaad0),
    specular: 0.3,
    cloudCover: 0.3,
    cloudSpeed: 4,
    lightPulse: 0.08,
    curse: 1,
    sunWander: 1,
    fog: 0.35,
    fogColor: new THREE.Color(0x584070),
  }),
  // Petal gusts: soft warm light, strong wind, whirlwinds of cherry petals crossing
  [WeatherType.PETAL_WHIRL]: preset(DAY_BASE, {
    litLevel: 1.02,
    shadowLevel: 0.62,
    ambientColor: new THREE.Color(0xfff0f4),
    sunColor: new THREE.Color(0xfff2ea),
    unlitTint: new THREE.Color(0xfff4f6),
    specular: 0.4,
    sunGlow: 0.3,
    cloudCover: 0.2,
    cloudSpeed: 25,
    minWind: 0.5,
    petalWhirl: 1,
  }),
  // Frost: cold clear light, the frost slowly spreads on the grass, the roofs, then the walls
  [WeatherType.FROST]: preset(DAY_BASE, {
    litLevel: 0.95,
    shadowLevel: 0.66,
    ambientColor: new THREE.Color(0xdce8ff),
    sunColor: new THREE.Color(0xfff4e8),
    unlitTint: new THREE.Color(0xe2ecff),
    specular: 0.6,
    cloudSpeed: 4,
    frost: 1,
    fog: 0.2,
    fogColor: new THREE.Color(0xe0eaf8),
  }),
  // Haunted mist: thick grey mist, silhouettes forming in it and dissolving when approached
  [WeatherType.HAUNTED]: preset(DAY_BASE, {
    litLevel: 0.65,
    shadowLevel: 0.5,
    ambientColor: new THREE.Color(0xc4ccd4),
    sunColor: new THREE.Color(0xdde4ec),
    unlitTint: new THREE.Color(0xc0c8d0),
    specular: 0.1,
    cloudCover: 0.6,
    cloudSpeed: 4,
    minWind: 0.15,
    haunt: 1,
    fog: 0.85,
    fogColor: new THREE.Color(0x9aa4b0),
    darkness: 0.5,
  }),
  // Flood: heavy rain, the water slowly rises above the ground
  [WeatherType.FLOOD]: preset(DAY_BASE, {
    litLevel: 0.72,
    shadowLevel: 0.58,
    ambientColor: new THREE.Color(0xc0cad8),
    sunColor: new THREE.Color(0xe0e8f4),
    unlitTint: new THREE.Color(0xc4ccda),
    specular: 0.2,
    cloudCover: 0.85,
    cloudAmbient: 0.15,
    cloudSpeed: 30,
    rain: 0.8,
    flood: 1,
    fog: 0.2,
  }),
  // Tornado: dark green-grey stormy sky, violent wind, a funnel crossing the area
  [WeatherType.TORNADO]: preset(DAY_BASE, {
    litLevel: 0.62,
    shadowLevel: 0.5,
    ambientColor: new THREE.Color(0xb8c4b0),
    sunColor: new THREE.Color(0xd8e0c8),
    unlitTint: new THREE.Color(0xbcc6b4),
    specular: 0.1,
    cloudCover: 0.9,
    cloudAmbient: 0.2,
    cloudSpeed: 50,
    minWind: 0.8,
    rain: 0.25,
    lightning: 0.3,
    tornado: 1,
    fog: 0.25,
    fogColor: new THREE.Color(0x8a9480),
  }),
  [WeatherType.CLOUDY]: preset(DAY_BASE, {
    shadowLevel: 0.62,
    ambientColor: new THREE.Color(0xf2f4f8),
    unlitTint: new THREE.Color(0xf4f6fa),
    specular: 0.25,
    cloudCover: 1,
    cloudAmbient: 0.3,
    sunGlow: 0.15,
  }),
  [WeatherType.RAINY]: preset(DAY_BASE, {
    litLevel: 0.78,
    ambientColor: new THREE.Color(0xc4cfe0),
    unlitTint: new THREE.Color(0xc9d2e0),
    specular: 0,
    cloudCover: 0.7,
    cloudAmbient: 0.15,
    cloudSpeed: 30,
    rain: 0.6,
  }),
  // Rain of death: dark sky with a red cast, blood falling instead of water, a dark red mist
  [WeatherType.BLOOD_RAIN]: preset(DAY_BASE, {
    litLevel: 0.7,
    shadowLevel: 0.5,
    ambientColor: new THREE.Color(0xc8a8a8),
    sunColor: new THREE.Color(0xf0c4c0),
    unlitTint: new THREE.Color(0xd0b0b0),
    specular: 0.2,
    cloudCover: 0.75,
    cloudAmbient: 0.15,
    cloudSpeed: 25,
    bloodRain: 0.8,
    lightning: 0.6,
    lightningColor: new THREE.Color(0xff2a22),
    fog: 0.3,
    fogColor: new THREE.Color(0x8a5458),
  }),
  // Poisoned air: thick purple haze, sickly light, purple rain, the stifling air ripples
  [WeatherType.POISON]: preset(DAY_BASE, {
    litLevel: 0.78,
    shadowLevel: 0.56,
    ambientColor: new THREE.Color(0xc8a8e0),
    sunColor: new THREE.Color(0xe0c4ff),
    unlitTint: new THREE.Color(0xd0b4e4),
    specular: 0.3,
    cloudCover: 0.5,
    cloudAmbient: 0.1,
    cloudSpeed: 6,
    lightPulse: 0.06,
    heatHaze: 1,
    poisonRain: 0.6,
    poisonFumes: 1,
    fog: 0.8,
    fogColor: new THREE.Color(0x9a62c8),
  }),
  // Dark sky in the middle of the day: windows are lit, heavy rain, lightning
  [WeatherType.STORM]: preset(DAY_BASE, {
    litLevel: 0.55,
    shadowLevel: 0.45,
    ambientColor: new THREE.Color(0x9aa6bd),
    sunColor: new THREE.Color(0xd8e0ff),
    unlitTint: new THREE.Color(0xa3adc2),
    specular: 0,
    cloudCover: 0.8,
    cloudAmbient: 0.25,
    cloudSpeed: 55,
    windowGlow: 0.5,
    rain: 1,
    lightning: 1,
  }),
  // Thunder rain: a dark downpour, lightning striking the ground all around, electricity crawling on the ground
  [WeatherType.THUNDER_RAIN]: preset(DAY_BASE, {
    litLevel: 0.45,
    shadowLevel: 0.38,
    ambientColor: new THREE.Color(0x8c98b8),
    sunColor: new THREE.Color(0xc8d4ff),
    unlitTint: new THREE.Color(0x96a2c0),
    specular: 0.3,
    cloudCover: 0.9,
    cloudAmbient: 0.3,
    cloudSpeed: 60,
    windowGlow: 0.5,
    rain: 1,
    soak: 2,
    thunderRain: 1,
    electric: 0.35,
    fog: 0.2,
    fogColor: new THREE.Color(0x6a7490),
  }),
  // Monsoon: warm tropical downpour, green steamy haze, puddles filling fast, frogs, thunder far away
  [WeatherType.MONSOON]: preset(DAY_BASE, {
    litLevel: 0.66,
    shadowLevel: 0.54,
    ambientColor: new THREE.Color(0xb4cdb8),
    sunColor: new THREE.Color(0xdcecd8),
    unlitTint: new THREE.Color(0xbcd2c0),
    specular: 0.3,
    cloudCover: 0.85,
    cloudAmbient: 0.2,
    cloudSpeed: 35,
    rain: 1,
    soak: 3,
    lightning: 0.25,
    lightningFar: 0.65,
    frogs: 0.6,
    fog: 0.45,
    fogColor: new THREE.Color(0x8fae94),
  }),
  // Overcast white sky: soft shadows, bright diffuse light bounced by the snow
  [WeatherType.SNOW]: preset(DAY_BASE, {
    litLevel: 0.95,
    shadowLevel: 0.68,
    ambientColor: new THREE.Color(0xe6edf8),
    sunColor: new THREE.Color(0xf4f8ff),
    unlitTint: new THREE.Color(0xe8eef8),
    specular: 0.2,
    cloudCover: 0.4,
    cloudAmbient: 0.1,
    cloudSpeed: 8,
    snow: 1,
  }),
  // Blizzard: white-out, thick snow blown sideways by a violent wind, almost no visibility
  [WeatherType.BLIZZARD]: preset(DAY_BASE, {
    litLevel: 0.85,
    shadowLevel: 0.72,
    ambientColor: new THREE.Color(0xe4ecf8),
    sunColor: new THREE.Color(0xf0f4ff),
    unlitTint: new THREE.Color(0xe2eaf6),
    specular: 0.1,
    cloudCover: 0.85,
    cloudAmbient: 0.15,
    cloudSpeed: 40,
    snow: 1.8,
    snowDrift: 3.5,
    minWind: 0.95,
    fog: 1,
    fogColor: new THREE.Color(0xdce3ec),
  }),
  // Darkness: a black mist swallows everything a few steps away, even in the middle of the day
  [WeatherType.DARKNESS]: preset(DAY_BASE, {
    litLevel: 0.4,
    shadowLevel: 0.28,
    ambientColor: new THREE.Color(0x8890a0),
    sunColor: new THREE.Color(0xa0a4b0),
    unlitTint: new THREE.Color(0x707680),
    specular: 0.1,
    cloudCover: 0.6,
    cloudSpeed: 4,
    windowGlow: 0.25,
    fog: 0.7,
    fogColor: new THREE.Color(0x07070a),
    darkness: 1,
  }),
  // Scorching sun: warm orange light, washed-out colors, hot air shimmering above the ground
  [WeatherType.HEATWAVE]: preset(DAY_BASE, {
    litLevel: 1.12,
    shadowLevel: 0.68,
    ambientColor: new THREE.Color(0xffe6c8),
    sunColor: new THREE.Color(0xffd9a0),
    unlitTint: new THREE.Color(0xfff0dc),
    specular: 0.9,
    sunGlow: 0.6,
    cloudSpeed: 4,
    heatHaze: 1,
    heatWash: 1,
    fog: 0.18,
    fogColor: new THREE.Color(0xf3dcb8),
  }),
  // Soft golden light, leaves (or cherry petals) gliding down from the trees
  // Golden autumn drizzle: low warm orange light, fine drizzle and dead leaves falling together
  // Acid rain: sickly yellow-green sky, greenish rain eating the ground: fumes rising, sizzling
  [WeatherType.ACID_RAIN]: preset(DAY_BASE, {
    litLevel: 0.72,
    shadowLevel: 0.58,
    ambientColor: new THREE.Color(0xccd8a4),
    sunColor: new THREE.Color(0xeaf2b8),
    unlitTint: new THREE.Color(0xd0dcac),
    specular: 0.3,
    cloudCover: 0.75,
    cloudAmbient: 0.14,
    cloudSpeed: 25,
    acidRain: 0.7,
    fumes: 1,
    fog: 0.3,
    fogColor: new THREE.Color(0xaec486),
  }),
  // Mars: rust-colored sky, red sand blown by the wind and piling up, dust floating as in a low gravity
  [WeatherType.MARS]: preset(DAY_BASE, {
    litLevel: 0.8,
    shadowLevel: 0.56,
    ambientColor: new THREE.Color(0xe4a684),
    sunColor: new THREE.Color(0xffd2b0),
    unlitTint: new THREE.Color(0xe8b496),
    specular: 0.15,
    cloudCover: 0.4,
    cloudAmbient: 0.08,
    cloudSpeed: 30,
    sand: 0.7,
    minWind: 0.5,
    sandColor: new THREE.Color().setRGB(0.6, 0.24, 0.12),
    sandTint: new THREE.Color(0xff8a6a),
    marsDust: 1,
    fog: 0.5,
    fogColor: new THREE.Color(0xc27a52),
  }),
  // Earthquake: dusty air; now and then the ground shakes, dust falls along the walls and rises from the ground
  [WeatherType.EARTHQUAKE]: preset(DAY_BASE, {
    litLevel: 0.92,
    shadowLevel: 0.6,
    ambientColor: new THREE.Color(0xeee2d0),
    sunColor: new THREE.Color(0xfff0dc),
    unlitTint: new THREE.Color(0xf0e6d8),
    specular: 0.2,
    cloudCover: 0.2,
    cloudSpeed: 6,
    quake: 1,
    fog: 0.18,
    fogColor: new THREE.Color(0xc8b8a0),
  }),
  // Geysers: warm misty air, vents steaming gently then erupting into tall jets of steam
  [WeatherType.GEYSERS]: preset(DAY_BASE, {
    litLevel: 0.92,
    shadowLevel: 0.62,
    ambientColor: new THREE.Color(0xe8eef0),
    sunColor: new THREE.Color(0xfff8ec),
    unlitTint: new THREE.Color(0xeef2f4),
    specular: 0.5,
    cloudCover: 0.25,
    cloudSpeed: 8,
    dew: 0.5,
    geysers: 1,
    fog: 0.3,
    fogColor: new THREE.Color(0xd8e0e4),
  }),
  // Time warp: pale violet light, everything in slow motion, ripples spreading from the player, frozen motes
  [WeatherType.TIME_WARP]: preset(DAY_BASE, {
    litLevel: 0.9,
    shadowLevel: 0.62,
    ambientColor: new THREE.Color(0xdcd6f2),
    sunColor: new THREE.Color(0xf2ecff),
    unlitTint: new THREE.Color(0xe2dcf4),
    specular: 0.5,
    cloudCover: 0.3,
    cloudSpeed: 10,
    heatHaze: 0.3,
    timeWarp: 1,
    fog: 0.22,
    fogColor: new THREE.Color(0xc8c0e8),
  }),
  // Inverted world: the image turns to its negative (dark skies of light, glowing shadows), sounds play backwards
  [WeatherType.INVERTED]: preset(DAY_BASE, {
    litLevel: 0.95,
    shadowLevel: 0.5,
    specular: 0.4,
    cloudCover: 0.3,
    cloudSpeed: 10,
    invert: 1,
    fog: 0.12,
  }),
  // Crystal mist: icy blue haze, tiny ice crystals floating and glinting in prism colors, rainbow sheen, chimes
  [WeatherType.CRYSTAL_MIST]: preset(DAY_BASE, {
    litLevel: 0.95,
    shadowLevel: 0.66,
    ambientColor: new THREE.Color(0xe0ecff),
    sunColor: new THREE.Color(0xf4f8ff),
    unlitTint: new THREE.Color(0xe6eeff),
    specular: 1.2,
    sunGlow: 0.3,
    cloudCover: 0.2,
    cloudSpeed: 4,
    iridescence: 0.7,
    crystals: 1,
    fog: 0.4,
    fogColor: new THREE.Color(0xd8e6fa),
  }),
  // Smog: thick yellow-brown haze, pale orange sun, dull washed-out colors, the city rumbling far away
  [WeatherType.SMOG]: preset(DAY_BASE, {
    litLevel: 0.74,
    shadowLevel: 0.58,
    ambientColor: new THREE.Color(0xd6cba4),
    sunColor: new THREE.Color(0xffd498),
    unlitTint: new THREE.Color(0xd8cdaa),
    specular: 0.1,
    cloudCover: 0.4,
    cloudAmbient: 0.08,
    cloudSpeed: 4,
    heatWash: 0.7,
    city: 1,
    fog: 0.7,
    fogColor: new THREE.Color(0xb2a26e),
  }),
  [WeatherType.AUTUMN_DRIZZLE]: preset(DAY_BASE, {
    litLevel: 0.92,
    shadowLevel: 0.6,
    ambientColor: new THREE.Color(0xecd2b2),
    sunColor: new THREE.Color(0xffb468),
    unlitTint: new THREE.Color(0xffe2c0),
    specular: 0.5,
    sunGlow: 0.55,
    godRays: 0.25,
    cloudCover: 0.35,
    cloudAmbient: 0.06,
    cloudSpeed: 12,
    drizzle: 0.55,
    autumnLeaves: 0.6,
    birds: 0.35,
    fog: 0.2,
    fogColor: new THREE.Color(0xe2c49a),
  }),
  [WeatherType.LEAVES]: preset(DAY_BASE, {
    litLevel: 1.02,
    shadowLevel: 0.62,
    ambientColor: new THREE.Color(0xfff4e6),
    sunColor: new THREE.Color(0xffebcc),
    unlitTint: new THREE.Color(0xfff6ea),
    specular: 0.3,
    sunGlow: 0.3,
    cloudCover: 0.25,
    cloudAmbient: 0.05,
    cloudSpeed: 10,
    leaves: 1,
  }),
  // Alien air: green-tinted ambient, purple sun, a light green haze, glowing spores floating up
  [WeatherType.SPORES]: preset(DAY_BASE, {
    litLevel: 0.95,
    shadowLevel: 0.6,
    ambientColor: new THREE.Color(0xcdeedd),
    sunColor: new THREE.Color(0xe9dcff),
    unlitTint: new THREE.Color(0xdcefe6),
    specular: 0.4,
    sunGlow: 0.3,
    cloudCover: 0.2,
    cloudSpeed: 8,
    lightPulse: 0.05,
    spores: 1,
    fog: 0.22,
    fogColor: new THREE.Color(0xb8e6cc),
  }),
  // Ochre sky: dimmed orange sun, soft shadows, low visibility, sand streaking with a strong wind
  [WeatherType.SANDSTORM]: preset(DAY_BASE, {
    litLevel: 0.82,
    shadowLevel: 0.62,
    ambientColor: new THREE.Color(0xe8cba2),
    sunColor: new THREE.Color(0xffd29a),
    unlitTint: new THREE.Color(0xecd4b2),
    specular: 0.1,
    cloudCover: 0.55,
    cloudAmbient: 0.1,
    cloudSpeed: 40,
    sand: 1,
    minWind: 0.6,
    fog: 0.65,
    fogColor: new THREE.Color(0xcfa874),
  }),
  // Charged air: cold bluish light, a faint blue haze, sparks crackling on the roofs and metal
  [WeatherType.ELECTRIC]: preset(DAY_BASE, {
    litLevel: 0.9,
    shadowLevel: 0.58,
    ambientColor: new THREE.Color(0xd9e4ff),
    sunColor: new THREE.Color(0xeef3ff),
    unlitTint: new THREE.Color(0xe2eaff),
    specular: 1,
    cloudCover: 0.45,
    cloudAmbient: 0.12,
    cloudSpeed: 25,
    electric: 1,
    fog: 0.18,
    fogColor: new THREE.Color(0xc4d4ff),
  }),
  // Fairy mist: dreamy pink haze shimmering like hot air, pink lights floating around the plants
  [WeatherType.FAIRY_MIST]: preset(DAY_BASE, {
    litLevel: 0.95,
    shadowLevel: 0.64,
    ambientColor: new THREE.Color(0xffe4f3),
    sunColor: new THREE.Color(0xfff0fa),
    unlitTint: new THREE.Color(0xffeaf6),
    specular: 0.4,
    sunGlow: 0.2,
    cloudSpeed: 6,
    lightPulse: 0.04,
    heatHaze: 0.6,
    fairyLights: 1,
    fog: 0.45,
    fogColor: new THREE.Color(0xffb0dc),
  }),
  // Volcanic: orange light through an ash haze, stifling hot air, embers bursting from the ground
  [WeatherType.VOLCANIC]: preset(DAY_BASE, {
    litLevel: 0.92,
    shadowLevel: 0.55,
    ambientColor: new THREE.Color(0xffa874),
    sunColor: new THREE.Color(0xff9444),
    unlitTint: new THREE.Color(0xffc49c),
    specular: 0.5,
    sunGlow: 0.3,
    cloudCover: 0.35,
    cloudAmbient: 0.08,
    cloudSpeed: 6,
    lightPulse: 0.06,
    heatHaze: 0.9,
    lava: 1,
    fog: 0.65,
    fogColor: new THREE.Color(0xe08a50),
  }),
  // Imminent eruption: the volcanic heat, falling ash and tremors building up to a big quake
  [WeatherType.ERUPTION]: preset(DAY_BASE, {
    litLevel: 0.85,
    shadowLevel: 0.5,
    ambientColor: new THREE.Color(0xff9a68),
    sunColor: new THREE.Color(0xff8840),
    unlitTint: new THREE.Color(0xffb890),
    specular: 0.5,
    sunGlow: 0.3,
    cloudCover: 0.5,
    cloudAmbient: 0.1,
    cloudSpeed: 8,
    lightPulse: 0.1,
    heatHaze: 0.9,
    lava: 1,
    ash: 0.4,
    quake: 1,
    eruption: 1,
    fog: 0.7,
    fogColor: new THREE.Color(0xc8704a),
  }),
  // Reversed gravity: a strange cool light, everything loose drifting up into the sky
  [WeatherType.ANTIGRAVITY]: preset(DAY_BASE, {
    litLevel: 0.95,
    shadowLevel: 0.6,
    ambientColor: new THREE.Color(0xdcd8f4),
    sunColor: new THREE.Color(0xf4f0ff),
    unlitTint: new THREE.Color(0xe4e0f8),
    specular: 0.3,
    cloudCover: 0.3,
    cloudSpeed: -8,
    antigravity: 1,
    fog: 0.15,
    fogColor: new THREE.Color(0xd8d4f0),
  }),
  // Old film: the world as an old black and white movie
  [WeatherType.OLD_FILM]: preset(DAY_BASE, {
    litLevel: 1,
    shadowLevel: 0.55,
    cloudCover: 0.3,
    cloudSpeed: 6,
    oldFilm: 1,
    fog: 0.12,
  }),
  // Light grey sky, dense fine drizzle, a hint of mist
  [WeatherType.DRIZZLE]: preset(DAY_BASE, {
    litLevel: 0.86,
    shadowLevel: 0.64,
    ambientColor: new THREE.Color(0xdbe1ea),
    sunColor: new THREE.Color(0xeef2f8),
    unlitTint: new THREE.Color(0xdde3ec),
    specular: 0.1,
    cloudCover: 0.6,
    cloudAmbient: 0.1,
    cloudSpeed: 15,
    drizzle: 1,
    fog: 0.25,
    fogColor: new THREE.Color(0xd5dbe3),
  }),
  // Stalking fog: a white wall that parts in front of the walking player and closes back in when they stop
  [WeatherType.STALKING_FOG]: preset(DAY_BASE, {
    litLevel: 0.8,
    shadowLevel: 0.66,
    ambientColor: new THREE.Color(0xe6eaef),
    sunColor: new THREE.Color(0xeff1f4),
    unlitTint: new THREE.Color(0xe0e5ea),
    specular: 0,
    cloudCover: 0.3,
    cloudSpeed: 4,
    fog: 0.3,
    fogColor: new THREE.Color(0xdde2e8),
    stalkingFog: 1,
  }),
  // Thick white fog: soft diffuse light, faint shadows, the far side of the map fades away
  [WeatherType.FOG]: preset(DAY_BASE, {
    litLevel: 0.82,
    shadowLevel: 0.68,
    ambientColor: new THREE.Color(0xe9edf2),
    sunColor: new THREE.Color(0xf2f4f6),
    unlitTint: new THREE.Color(0xe4e9ee),
    specular: 0,
    cloudCover: 0.3,
    cloudAmbient: 0.05,
    cloudSpeed: 6,
    fog: 0.85,
  }),
};

/** Night versions. A weather missing here is never shown at night (falls back to NEUTRAL): no sunny night. */
export const NIGHT_PRESETS: Partial<Record<WeatherType, WeatherParams>> = {
  // Clear night: moonlight and its shadows, no clouds
  [WeatherType.NEUTRAL]: NIGHT_BASE,
  [WeatherType.CLOUDY]: preset(NIGHT_BASE, {
    litLevel: 0.42,
    unlitTint: new THREE.Color(0x6f7ca6),
    specular: 0.35,
    cloudCover: 0.8,
    cloudAmbient: 0.2,
  }),
  [WeatherType.RAINY]: preset(NIGHT_BASE, {
    litLevel: 0.34,
    shadowLevel: 0.24,
    ambientColor: new THREE.Color(0x5f6f9c),
    sunColor: new THREE.Color(0xa9b8e8),
    unlitTint: new THREE.Color(0x606c92),
    specular: 0,
    cloudCover: 0.6,
    cloudAmbient: 0.15,
    cloudSpeed: 30,
    rain: 0.6,
  }),
  [WeatherType.BLOOD_RAIN]: preset(NIGHT_BASE, {
    litLevel: 0.32,
    shadowLevel: 0.2,
    ambientColor: new THREE.Color(0x7a4a56),
    sunColor: new THREE.Color(0xd08a90),
    unlitTint: new THREE.Color(0x7c5460),
    specular: 0.2,
    cloudCover: 0.6,
    cloudAmbient: 0.15,
    cloudSpeed: 25,
    windowGlow: 0.6,
    windowTint: new THREE.Color(0xff8070),
    bloodRain: 0.8,
    lightning: 0.6,
    lightningColor: new THREE.Color(0xff2a22),
    fog: 0.35,
    fogColor: new THREE.Color(0x4a2228),
  }),
  [WeatherType.POISON]: preset(NIGHT_BASE, {
    litLevel: 0.36,
    shadowLevel: 0.24,
    ambientColor: new THREE.Color(0x6e4a96),
    sunColor: new THREE.Color(0xb88aff),
    unlitTint: new THREE.Color(0x7a5a9c),
    specular: 0.3,
    cloudCover: 0.4,
    cloudSpeed: 6,
    windowGlow: 0.6,
    windowTint: new THREE.Color(0xd090ff),
    lightPulse: 0.08,
    heatHaze: 1,
    poisonRain: 0.6,
    poisonFumes: 1,
    fog: 0.8,
    fogColor: new THREE.Color(0x4a2a6e),
  }),
  // Starry night: clear sky, bright crisp moonlight, dew puddles with stars twinkling in them, crickets
  [WeatherType.STARRY_NIGHT]: preset(NIGHT_BASE, {
    litLevel: 0.52,
    shadowLevel: 0.26,
    ambientColor: new THREE.Color(0x6c86c4),
    sunColor: new THREE.Color(0xd4e2ff),
    unlitTint: new THREE.Color(0x7a8cbc),
    specular: 0.6,
    windowGlow: 0.45,
    fireflies: 0.2,
    dew: 1,
    stars: 1,
    crickets: 0.8,
  }),
  // Light tide: a dark blue night, waves of bioluminescent light sweeping the ground like plankton
  [WeatherType.LIGHT_TIDE]: preset(NIGHT_BASE, {
    litLevel: 0.3,
    shadowLevel: 0.18,
    ambientColor: new THREE.Color(0x2c3c70),
    sunColor: new THREE.Color(0x8aa8ff),
    unlitTint: new THREE.Color(0x4a5a88),
    specular: 0.6,
    windowGlow: 0.4,
    dew: 0.6,
    tide: 1,
    fog: 0.18,
    fogColor: new THREE.Color(0x101c40),
  }),
  // Fireworks: a clear night, rockets bursting into colored sparks above the map, lighting the scene
  [WeatherType.FIREWORKS]: preset(NIGHT_BASE, {
    litLevel: 0.4,
    shadowLevel: 0.24,
    ambientColor: new THREE.Color(0x5a6a9a),
    unlitTint: new THREE.Color(0x6a7698),
    specular: 0.5,
    windowGlow: 0.6,
    fireworks: 1,
  }),
  [WeatherType.CRYSTAL_MIST]: preset(NIGHT_BASE, {
    litLevel: 0.46,
    shadowLevel: 0.3,
    ambientColor: new THREE.Color(0x6c84c4),
    sunColor: new THREE.Color(0xd0e0ff),
    unlitTint: new THREE.Color(0x7888b8),
    specular: 1.1,
    iridescence: 0.7,
    crystals: 1,
    fog: 0.4,
    fogColor: new THREE.Color(0x384a74),
  }),
  [WeatherType.ACID_RAIN]: preset(NIGHT_BASE, {
    litLevel: 0.32,
    shadowLevel: 0.22,
    ambientColor: new THREE.Color(0x56664a),
    sunColor: new THREE.Color(0xc8d8a0),
    unlitTint: new THREE.Color(0x5c6c50),
    specular: 0.3,
    cloudCover: 0.6,
    cloudSpeed: 25,
    windowGlow: 0.5,
    acidRain: 0.7,
    fumes: 1,
    fog: 0.3,
    fogColor: new THREE.Color(0x323e26),
  }),
  // Mars night: dark red-brown haze under a cold light
  [WeatherType.MARS]: preset(NIGHT_BASE, {
    litLevel: 0.34,
    shadowLevel: 0.22,
    ambientColor: new THREE.Color(0x6a4440),
    sunColor: new THREE.Color(0xa8b8e0),
    unlitTint: new THREE.Color(0x70504c),
    specular: 0.15,
    cloudCover: 0.3,
    cloudSpeed: 30,
    sand: 0.6,
    minWind: 0.5,
    sandColor: new THREE.Color().setRGB(0.6, 0.24, 0.12),
    sandTint: new THREE.Color(0xff8a6a),
    marsDust: 1,
    fog: 0.5,
    fogColor: new THREE.Color(0x3c2020),
  }),
  [WeatherType.EARTHQUAKE]: preset(NIGHT_BASE, {
    litLevel: 0.4,
    shadowLevel: 0.25,
    ambientColor: new THREE.Color(0x6a6a84),
    unlitTint: new THREE.Color(0x707088),
    specular: 0.2,
    windowGlow: 0.6,
    quake: 1,
    fog: 0.18,
    fogColor: new THREE.Color(0x3a3634),
  }),
  [WeatherType.GEYSERS]: preset(NIGHT_BASE, {
    litLevel: 0.4,
    shadowLevel: 0.26,
    ambientColor: new THREE.Color(0x5c6c8c),
    unlitTint: new THREE.Color(0x6a7890),
    specular: 0.5,
    windowGlow: 0.5,
    dew: 0.5,
    geysers: 1,
    fog: 0.3,
    fogColor: new THREE.Color(0x2c3644),
  }),
  [WeatherType.TIME_WARP]: preset(NIGHT_BASE, {
    litLevel: 0.4,
    shadowLevel: 0.26,
    ambientColor: new THREE.Color(0x5c5490),
    sunColor: new THREE.Color(0xc0b0ff),
    unlitTint: new THREE.Color(0x6a6294),
    specular: 0.5,
    windowGlow: 0.5,
    heatHaze: 0.3,
    timeWarp: 1,
    fog: 0.22,
    fogColor: new THREE.Color(0x2c2650),
  }),
  [WeatherType.INVERTED]: preset(NIGHT_BASE, {
    windowGlow: 0.5,
    invert: 1,
    fog: 0.12,
  }),
  // Smog night: the haze glows orange-brown with the city lights
  [WeatherType.SMOG]: preset(NIGHT_BASE, {
    litLevel: 0.38,
    shadowLevel: 0.28,
    ambientColor: new THREE.Color(0x7a6a50),
    sunColor: new THREE.Color(0xc8a878),
    unlitTint: new THREE.Color(0x7c6c54),
    specular: 0.1,
    cloudCover: 0.3,
    cloudSpeed: 4,
    windowGlow: 0.6,
    windowTint: new THREE.Color(0xffc890),
    heatWash: 0.5,
    city: 0.7,
    fog: 0.7,
    fogColor: new THREE.Color(0x4c4030),
  }),
  [WeatherType.AUTUMN_DRIZZLE]: preset(NIGHT_BASE, {
    litLevel: 0.36,
    shadowLevel: 0.24,
    ambientColor: new THREE.Color(0x6e5a54),
    sunColor: new THREE.Color(0xd8b090),
    unlitTint: new THREE.Color(0x76645c),
    specular: 0.4,
    cloudCover: 0.3,
    cloudSpeed: 12,
    windowGlow: 0.7,
    windowTint: new THREE.Color(0xffc080),
    drizzle: 0.55,
    autumnLeaves: 0.5,
    fog: 0.22,
    fogColor: new THREE.Color(0x3c3029),
  }),
  [WeatherType.MONSOON]: preset(NIGHT_BASE, {
    litLevel: 0.32,
    shadowLevel: 0.22,
    ambientColor: new THREE.Color(0x4f6a5c),
    unlitTint: new THREE.Color(0x587060),
    specular: 0.3,
    cloudCover: 0.6,
    cloudSpeed: 35,
    windowGlow: 0.6,
    rain: 1,
    soak: 3,
    lightning: 0.25,
    lightningFar: 0.65,
    frogs: 1,
    fog: 0.45,
    fogColor: new THREE.Color(0x2c4034),
  }),
  [WeatherType.STORM]: preset(NIGHT_BASE, {
    litLevel: 0.3,
    shadowLevel: 0.2,
    ambientColor: new THREE.Color(0x56648f),
    sunColor: new THREE.Color(0xa0aedd),
    unlitTint: new THREE.Color(0x56628a),
    specular: 0,
    cloudCover: 0.7,
    cloudAmbient: 0.2,
    cloudSpeed: 55,
    rain: 1,
    lightning: 1,
  }),
  [WeatherType.THUNDER_RAIN]: preset(NIGHT_BASE, {
    litLevel: 0.26,
    shadowLevel: 0.18,
    ambientColor: new THREE.Color(0x4c5a88),
    sunColor: new THREE.Color(0xa0aedd),
    unlitTint: new THREE.Color(0x50608a),
    specular: 0.3,
    cloudCover: 0.8,
    cloudAmbient: 0.2,
    cloudSpeed: 60,
    windowGlow: 0.5,
    rain: 1,
    soak: 2,
    thunderRain: 1,
    electric: 0.35,
    fog: 0.2,
    fogColor: new THREE.Color(0x1c2234),
  }),
  // The snow reflects the moonlight: slightly brighter night
  [WeatherType.SNOW]: preset(NIGHT_BASE, {
    litLevel: 0.47,
    shadowLevel: 0.3,
    ambientColor: new THREE.Color(0x7486b8),
    unlitTint: new THREE.Color(0x7884ac),
    specular: 0.2,
    cloudCover: 0.4,
    cloudAmbient: 0.1,
    cloudSpeed: 8,
    snow: 1,
  }),
  [WeatherType.BLIZZARD]: preset(NIGHT_BASE, {
    litLevel: 0.4,
    shadowLevel: 0.32,
    ambientColor: new THREE.Color(0x7888b4),
    unlitTint: new THREE.Color(0x7a86aa),
    specular: 0.1,
    cloudCover: 0.7,
    cloudAmbient: 0.1,
    cloudSpeed: 40,
    snow: 1.8,
    snowDrift: 3.5,
    minWind: 0.95,
    fog: 1,
    fogColor: new THREE.Color(0x8c98b8),
  }),
  [WeatherType.DARKNESS]: preset(NIGHT_BASE, {
    litLevel: 0.22,
    shadowLevel: 0.14,
    ambientColor: new THREE.Color(0x4a5470),
    unlitTint: new THREE.Color(0x3c4458),
    specular: 0.1,
    cloudCover: 0.4,
    cloudSpeed: 4,
    windowGlow: 0.35,
    fog: 0.75,
    fogColor: new THREE.Color(0x030305),
    darkness: 1,
  }),
  // Clear night lit by green / purple curtains, the moon turns slightly green
  [WeatherType.AURORA]: preset(NIGHT_BASE, {
    litLevel: 0.4,
    shadowLevel: 0.24,
    ambientColor: new THREE.Color(0x5f7fae),
    sunColor: new THREE.Color(0xa8e0d0),
    unlitTint: new THREE.Color(0x6f8faa),
    aurora: 1,
  }),
  [WeatherType.DRIZZLE]: preset(NIGHT_BASE, {
    litLevel: 0.37,
    shadowLevel: 0.25,
    ambientColor: new THREE.Color(0x63739c),
    unlitTint: new THREE.Color(0x67739a),
    specular: 0.1,
    cloudCover: 0.5,
    cloudAmbient: 0.1,
    cloudSpeed: 15,
    drizzle: 1,
    fog: 0.3,
  }),
  // Calm clear summer night: fireflies glowing around the trees and flowers
  // Forest night: deep green-blue shadows under the moon, a few fireflies, crickets and owls
  [WeatherType.FOREST]: preset(NIGHT_BASE, {
    litLevel: 0.4,
    shadowLevel: 0.22,
    ambientColor: new THREE.Color(0x4f7a78),
    sunColor: new THREE.Color(0xb8d4e8),
    unlitTint: new THREE.Color(0x5c7c80),
    canopy: 1,
    fireflies: 0.35,
    fog: 0.25,
    fogColor: new THREE.Color(0x24403c),
  }),
  [WeatherType.HAIL]: preset(NIGHT_BASE, {
    litLevel: 0.34,
    shadowLevel: 0.24,
    ambientColor: new THREE.Color(0x5f6f9c),
    unlitTint: new THREE.Color(0x66729a),
    specular: 0.2,
    cloudCover: 0.6,
    cloudSpeed: 35,
    windowGlow: 0.5,
    hail: 1,
    fog: 0.15,
  }),
  [WeatherType.SEA_MIST]: preset(NIGHT_BASE, {
    litLevel: 0.36,
    shadowLevel: 0.26,
    ambientColor: new THREE.Color(0x5a7090),
    unlitTint: new THREE.Color(0x627890),
    specular: 0.3,
    cloudCover: 0.4,
    cloudSpeed: 20,
    minWind: 0.25,
    sea: 1,
    fog: 0.75,
    fogColor: new THREE.Color(0x34465a),
  }),
  [WeatherType.ASH]: preset(NIGHT_BASE, {
    litLevel: 0.34,
    shadowLevel: 0.22,
    ambientColor: new THREE.Color(0x7a5a4c),
    sunColor: new THREE.Color(0xd08a60),
    unlitTint: new THREE.Color(0x7c6458),
    specular: 0.1,
    cloudCover: 0.5,
    cloudSpeed: 5,
    windowGlow: 0.6,
    ash: 1,
    fog: 0.45,
    fogColor: new THREE.Color(0x3c2e2a),
  }),
  [WeatherType.FREEZING_RAIN]: preset(NIGHT_BASE, {
    litLevel: 0.36,
    shadowLevel: 0.25,
    ambientColor: new THREE.Color(0x6474a0),
    unlitTint: new THREE.Color(0x6a78a0),
    specular: 1.2,
    cloudCover: 0.5,
    cloudSpeed: 15,
    windowGlow: 0.5,
    drizzle: 0.9,
    ice: 1,
    fog: 0.25,
    fogColor: new THREE.Color(0x3c4860),
  }),
  [WeatherType.MAGIC_SNOW]: preset(NIGHT_BASE, {
    litLevel: 0.45,
    shadowLevel: 0.3,
    ambientColor: new THREE.Color(0x6a80c0),
    unlitTint: new THREE.Color(0x7484b4),
    specular: 0.4,
    cloudCover: 0.3,
    cloudSpeed: 6,
    snow: 0.5,
    magicSnow: 1,
    fog: 0.2,
    fogColor: new THREE.Color(0x3c4c7c),
  }),
  [WeatherType.STARDUST]: preset(NIGHT_BASE, {
    litLevel: 0.42,
    shadowLevel: 0.26,
    ambientColor: new THREE.Color(0x6a5aa0),
    sunColor: new THREE.Color(0xd0c0ff),
    unlitTint: new THREE.Color(0x7468a4),
    specular: 1.2,
    iridescence: 1,
    stardust: 1,
    fog: 0.15,
    fogColor: new THREE.Color(0x3a2c5c),
  }),
  [WeatherType.SOLAR_STORM]: preset(NIGHT_BASE, {
    litLevel: 0.42,
    shadowLevel: 0.26,
    ambientColor: new THREE.Color(0x8a5a6a),
    sunColor: new THREE.Color(0xffb0a0),
    unlitTint: new THREE.Color(0x8c6470),
    specular: 0.5,
    aurora: 1,
    auroraRed: 1,
    flicker: 1,
  }),
  [WeatherType.CURSE]: preset(NIGHT_BASE, {
    litLevel: 0.3,
    shadowLevel: 0.18,
    ambientColor: new THREE.Color(0x4a3a6a),
    sunColor: new THREE.Color(0xb090ff),
    unlitTint: new THREE.Color(0x504270),
    specular: 0.3,
    cloudCover: 0.3,
    cloudSpeed: 4,
    windowGlow: 0.4,
    windowTint: new THREE.Color(0xc080ff),
    lightPulse: 0.1,
    curse: 1,
    sunWander: 1,
    fog: 0.4,
    fogColor: new THREE.Color(0x281838),
  }),
  [WeatherType.PETAL_WHIRL]: preset(NIGHT_BASE, {
    litLevel: 0.42,
    shadowLevel: 0.26,
    ambientColor: new THREE.Color(0x7a6a9a),
    unlitTint: new THREE.Color(0x84749c),
    cloudSpeed: 25,
    minWind: 0.5,
    petalWhirl: 1,
  }),
  [WeatherType.FROST]: preset(NIGHT_BASE, {
    litLevel: 0.46,
    shadowLevel: 0.3,
    ambientColor: new THREE.Color(0x6a84c0),
    unlitTint: new THREE.Color(0x7488b4),
    specular: 0.6,
    frost: 1,
    fog: 0.2,
    fogColor: new THREE.Color(0x34446c),
  }),
  [WeatherType.HAUNTED]: preset(NIGHT_BASE, {
    litLevel: 0.32,
    shadowLevel: 0.22,
    ambientColor: new THREE.Color(0x5a6478),
    unlitTint: new THREE.Color(0x5e6878),
    specular: 0.1,
    cloudCover: 0.4,
    cloudSpeed: 4,
    windowGlow: 0.4,
    minWind: 0.15,
    haunt: 1,
    fog: 0.85,
    fogColor: new THREE.Color(0x2a3038),
    darkness: 0.5,
  }),
  [WeatherType.FLOOD]: preset(NIGHT_BASE, {
    litLevel: 0.32,
    shadowLevel: 0.22,
    ambientColor: new THREE.Color(0x5a6a94),
    unlitTint: new THREE.Color(0x5e6a90),
    specular: 0.2,
    cloudCover: 0.6,
    cloudSpeed: 30,
    windowGlow: 0.6,
    rain: 0.8,
    flood: 1,
    fog: 0.2,
  }),
  [WeatherType.TORNADO]: preset(NIGHT_BASE, {
    litLevel: 0.3,
    shadowLevel: 0.2,
    ambientColor: new THREE.Color(0x4e5c58),
    unlitTint: new THREE.Color(0x56625e),
    specular: 0.1,
    cloudCover: 0.6,
    cloudSpeed: 50,
    windowGlow: 0.5,
    minWind: 0.8,
    rain: 0.25,
    lightning: 0.4,
    tornado: 1,
    fog: 0.25,
    fogColor: new THREE.Color(0x2a3230),
  }),
  [WeatherType.FIREFLIES]: preset(NIGHT_BASE, {
    litLevel: 0.42,
    shadowLevel: 0.25,
    ambientColor: new THREE.Color(0x637fa6),
    unlitTint: new THREE.Color(0x6e7fa6),
    fireflies: 1,
  }),
  [WeatherType.LEAVES]: preset(NIGHT_BASE, {
    leaves: 1,
  }),
  [WeatherType.SPORES]: preset(NIGHT_BASE, {
    litLevel: 0.4,
    shadowLevel: 0.25,
    ambientColor: new THREE.Color(0x4f7f7a),
    sunColor: new THREE.Color(0xb49cff),
    unlitTint: new THREE.Color(0x5f8a88),
    specular: 0.3,
    lightPulse: 0.06,
    spores: 1,
    fog: 0.3,
    fogColor: new THREE.Color(0x4c7a6c),
  }),
  [WeatherType.ELECTRIC]: preset(NIGHT_BASE, {
    litLevel: 0.36,
    shadowLevel: 0.24,
    ambientColor: new THREE.Color(0x5f74b8),
    sunColor: new THREE.Color(0xa8c0ff),
    unlitTint: new THREE.Color(0x6a7cb0),
    specular: 0.8,
    cloudCover: 0.4,
    cloudSpeed: 25,
    electric: 1,
    fog: 0.2,
    fogColor: new THREE.Color(0x4a5a90),
  }),
  [WeatherType.FAIRY_MIST]: preset(NIGHT_BASE, {
    litLevel: 0.4,
    shadowLevel: 0.27,
    ambientColor: new THREE.Color(0x8a6aa8),
    sunColor: new THREE.Color(0xe2b8ff),
    unlitTint: new THREE.Color(0x8c76a6),
    specular: 0.3,
    cloudSpeed: 6,
    lightPulse: 0.05,
    heatHaze: 0.6,
    fairyLights: 1,
    fog: 0.45,
    fogColor: new THREE.Color(0xb06aa0),
  }),
  // Volcanic night: glowing orange ground light, dark ash haze, bright embers
  [WeatherType.VOLCANIC]: preset(NIGHT_BASE, {
    litLevel: 0.42,
    shadowLevel: 0.22,
    ambientColor: new THREE.Color(0x9a5a3c),
    sunColor: new THREE.Color(0xff8a4a),
    unlitTint: new THREE.Color(0xa86a4c),
    specular: 0.5,
    cloudCover: 0.3,
    cloudSpeed: 6,
    windowGlow: 0.7,
    windowTint: new THREE.Color(0xffa060),
    lightPulse: 0.1,
    heatHaze: 0.9,
    lava: 1,
    fog: 0.65,
    fogColor: new THREE.Color(0x6a3424),
  }),
  [WeatherType.ERUPTION]: preset(NIGHT_BASE, {
    litLevel: 0.4,
    shadowLevel: 0.2,
    ambientColor: new THREE.Color(0x9a4a30),
    sunColor: new THREE.Color(0xff7a3a),
    unlitTint: new THREE.Color(0xa85a3c),
    specular: 0.5,
    cloudCover: 0.4,
    cloudSpeed: 8,
    windowGlow: 0.7,
    windowTint: new THREE.Color(0xffa060),
    lightPulse: 0.16,
    heatHaze: 0.9,
    lava: 1,
    ash: 0.4,
    quake: 1,
    eruption: 1,
    fog: 0.7,
    fogColor: new THREE.Color(0x5a2618),
  }),
  [WeatherType.ANTIGRAVITY]: preset(NIGHT_BASE, {
    ambientColor: new THREE.Color(0x6a68a8),
    unlitTint: new THREE.Color(0x7470a8),
    specular: 0.3,
    cloudCover: 0.3,
    cloudSpeed: -8,
    windowGlow: 0.5,
    antigravity: 1,
    fog: 0.15,
    fogColor: new THREE.Color(0x24223c),
  }),
  [WeatherType.OLD_FILM]: preset(NIGHT_BASE, {
    litLevel: 0.5,
    shadowLevel: 0.3,
    windowGlow: 0.6,
    oldFilm: 1,
    fog: 0.12,
  }),
  // Blood moon: oppressive red moonlight, deep shadows, red window lights, a red mist, the light slowly breathes
  [WeatherType.BLOOD_MOON]: preset(NIGHT_BASE, {
    litLevel: 0.44,
    shadowLevel: 0.15,
    ambientColor: new THREE.Color(0x8a3a42),
    sunColor: new THREE.Color(0xff5446),
    unlitTint: new THREE.Color(0x9c5056),
    specular: 0.6,
    cloudCover: 0.2,
    cloudAmbient: 0.1,
    cloudSpeed: 6,
    windowGlow: 0.9,
    windowTint: new THREE.Color(0xff6a50),
    lightPulse: 0.12,
    embers: 1,
    fog: 0.45,
    fogColor: new THREE.Color(0x8a3036),
  }),
  [WeatherType.STALKING_FOG]: preset(NIGHT_BASE, {
    litLevel: 0.34,
    shadowLevel: 0.27,
    ambientColor: new THREE.Color(0x6a7aa6),
    unlitTint: new THREE.Color(0x6a7798),
    specular: 0,
    windowGlow: 0.5,
    fog: 0.3,
    fogColor: new THREE.Color(0x2a3040),
    stalkingFog: 1,
  }),
  // Night fog: windows glow through a dark blue haze
  [WeatherType.FOG]: preset(NIGHT_BASE, {
    litLevel: 0.34,
    shadowLevel: 0.27,
    ambientColor: new THREE.Color(0x6a7aa6),
    unlitTint: new THREE.Color(0x6a7798),
    specular: 0,
    cloudCover: 0.3,
    cloudSpeed: 6,
    fog: 1,
  }),
};

/** Air temperature (°C) of each weather [by day, at night], shown on the thermometer. */
export const TEMPERATURES: Record<WeatherType, [number, number]> = {
  [WeatherType.NEUTRAL]: [18, 12],
  [WeatherType.SUNNY]: [26, 16],
  [WeatherType.CLOUDY]: [16, 11],
  [WeatherType.RAINY]: [13, 9],
  [WeatherType.BLOOD_RAIN]: [12, 8],
  [WeatherType.POISON]: [29, 24],
  [WeatherType.ACID_RAIN]: [19, 15],
  [WeatherType.STORM]: [17, 13],
  [WeatherType.MONSOON]: [30, 26],
  [WeatherType.AUTUMN_DRIZZLE]: [14, 9],
  [WeatherType.STARRY_NIGHT]: [16, 11],
  [WeatherType.SNOW]: [-4, -10],
  [WeatherType.BLIZZARD]: [-14, -19],
  [WeatherType.DARKNESS]: [9, 4],
  [WeatherType.FOREST]: [21, 14],
  [WeatherType.HAIL]: [7, 4],
  [WeatherType.SEA_MIST]: [14, 11],
  [WeatherType.SMOG]: [27, 21],
  [WeatherType.FIREWORKS]: [22, 18],
  [WeatherType.LIGHT_TIDE]: [19, 16],
  [WeatherType.SPRING_SHOWER]: [19, 13],
  [WeatherType.ASH]: [24, 18],
  [WeatherType.FREEZING_RAIN]: [-2, -5],
  [WeatherType.MAGIC_SNOW]: [-3, -8],
  [WeatherType.CRYSTAL_MIST]: [-2, -6],
  [WeatherType.MARS]: [-15, -40],
  [WeatherType.STARDUST]: [18, 12],
  [WeatherType.SOLAR_STORM]: [23, 15],
  [WeatherType.CURSE]: [11, 7],
  [WeatherType.PETAL_WHIRL]: [17, 12],
  [WeatherType.FROST]: [-6, -12],
  [WeatherType.HAUNTED]: [8, 5],
  [WeatherType.FLOOD]: [14, 11],
  [WeatherType.TORNADO]: [24, 19],
  [WeatherType.EARTHQUAKE]: [17, 12],
  [WeatherType.GEYSERS]: [23, 17],
  [WeatherType.TIME_WARP]: [15, 12],
  // Inverted: warmer at night than by day
  [WeatherType.INVERTED]: [12, 18],
  [WeatherType.STALKING_FOG]: [8, 5],
  [WeatherType.ERUPTION]: [54, 46],
  [WeatherType.ANTIGRAVITY]: [18, 13],
  [WeatherType.OLD_FILM]: [16, 11],
  [WeatherType.THUNDER_RAIN]: [16, 12],
  [WeatherType.AURORA]: [-6, -8],
  [WeatherType.FOG]: [8, 5],
  [WeatherType.DRIZZLE]: [11, 8],
  [WeatherType.BLOOD_MOON]: [15, 13],
  [WeatherType.HEATWAVE]: [42, 30],
  [WeatherType.FIREFLIES]: [23, 19],
  [WeatherType.LEAVES]: [14, 9],
  [WeatherType.SPORES]: [24, 20],
  [WeatherType.SANDSTORM]: [37, 24],
  [WeatherType.ELECTRIC]: [21, 16],
  [WeatherType.FAIRY_MIST]: [20, 16],
  [WeatherType.VOLCANIC]: [48, 40],
};
for (const [presets, index] of [[DAY_PRESETS, 0], [NIGHT_PRESETS, 1]] as const) {
  for (const type of Object.keys(presets) as WeatherType[]) {
    // Copy: some presets are the shared base objects
    presets[type] = { ...presets[type]!, temperature: TEMPERATURES[type][index] };
  }
}

/** Dawn and dusk hours: the light goes from night to day (dawn) and back (dusk) between these hours. */
export const DAWN: readonly [number, number] = [6, 8];
export const DUSK: readonly [number, number] = [18, 20];

/** Hour set when choosing a day-only weather at night / a night-only weather by day. */
export const DAY_ONLY_HOUR = 12;
export const NIGHT_ONLY_HOUR = 22;

/** Daylight at an hour (0..24): 0 = night, 1 = day, in between at dawn / dusk. */
export function daylightAt(hour: number): number {
  const h = ((hour % 24) + 24) % 24;
  if (h < DAWN[0] || h >= DUSK[1]) {
    return 0;
  }
  if (h < DAWN[1]) {
    return THREE.MathUtils.smoothstep(h, DAWN[0], DAWN[1]);
  }
  if (h < DUSK[0]) {
    return 1;
  }
  return 1 - THREE.MathUtils.smoothstep(h, DUSK[0], DUSK[1]);
}

/** Dawn / dusk colors strength at an hour, 0..1 (peaks in the middle of dawn and dusk), and which one. */
export function twilightAt(hour: number): { amount: number, dusk: boolean } {
  const h = ((hour % 24) + 24) % 24;
  const bell = (from: number, to: number) => h > from && h < to ? Math.sin(Math.PI * (h - from) / (to - from)) : 0;
  const dawn = bell(DAWN[0] - 0.5, DAWN[1] + 0.5);
  const dusk = bell(DUSK[0] - 0.5, DUSK[1] + 0.5);
  return dusk > dawn ? { amount: dusk, dusk: true } : { amount: dawn, dusk: false };
}

/** Night for the weather choices (night-only / day-only weathers): darker than half daylight. */
export function isNightHour(hour: number): boolean {
  return daylightAt(hour) < 0.5;
}

export type TimeOfDay = 'night' | 'dawn' | 'day' | 'dusk';

export function timeOfDayAt(hour: number): TimeOfDay {
  const h = ((hour % 24) + 24) % 24;
  if (h >= DAWN[0] && h < DAWN[1]) {
    return 'dawn';
  }
  if (h >= DUSK[0] && h < DUSK[1]) {
    return 'dusk';
  }
  return h >= DAWN[1] && h < DUSK[0] ? 'day' : 'night';
}

export const TIME_OF_DAY_LABELS: Record<TimeOfDay, { label: string, icon: string }> = {
  night: { label: 'Nuit', icon: '🌙' },
  dawn: { label: 'Aube', icon: '🌅' },
  day: { label: 'Jour', icon: '🌞' },
  dusk: { label: 'Crépuscule', icon: '🌇' },
};

/** "07:30" */
export function formatHour(hour: number): string {
  const minutes = Math.round((((hour % 24) + 24) % 24) * 60) % (24 * 60);
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}

/** Light colors of the dawn (pink, peach) and the dusk (orange, purple shadows), mixed into the weather colors. */
export interface TwilightTint {
  sunColor: THREE.Color;
  ambientColor: THREE.Color;
  unlitTint: THREE.Color;
  fogColor: THREE.Color;
}

export const DAWN_TINT: TwilightTint = {
  sunColor: new THREE.Color(0xffa070),
  ambientColor: new THREE.Color(0xe0b0c0),
  unlitTint: new THREE.Color(0xffc8b8),
  fogColor: new THREE.Color(0xffc0b0),
};

export const DUSK_TINT: TwilightTint = {
  sunColor: new THREE.Color(0xff7a28),
  ambientColor: new THREE.Color(0xd0907a),
  unlitTint: new THREE.Color(0xffb890),
  fogColor: new THREE.Color(0xf0a070),
};

/** Params for a weather at a time of day (unavailable at that time => neutral weather). */
export function getWeatherParams(type: WeatherType, night: boolean): WeatherParams {
  const presets = night ? NIGHT_PRESETS : DAY_PRESETS;
  return presets[type] ?? presets[WeatherType.NEUTRAL]!;
}

export function isWeatherAvailable(type: WeatherType, night: boolean): boolean {
  return !!(night ? NIGHT_PRESETS : DAY_PRESETS)[type];
}

export interface WeatherChoice {
  type: WeatherType;
  label: string;
  icon: string;
}

export const WEATHER_CHOICES: WeatherChoice[] = [
  { type: WeatherType.NEUTRAL, label: 'Neutre', icon: '⚪' },
  { type: WeatherType.SUNNY, label: 'Ensoleillé', icon: '☀️' },
  { type: WeatherType.HEATWAVE, label: 'Canicule', icon: '🔥' },
  { type: WeatherType.VOLCANIC, label: 'Volcanique', icon: '🌋' },
  { type: WeatherType.ERUPTION, label: 'Éruption imminente', icon: '💥' },
  { type: WeatherType.ASH, label: 'Neige de cendres', icon: '🌫️' },
  { type: WeatherType.FOREST, label: 'Forêt', icon: '🌲' },
  { type: WeatherType.PETAL_WHIRL, label: 'Vent de pétales', icon: '🌸' },
  { type: WeatherType.GEYSERS, label: 'Geysers', icon: '♨️' },
  { type: WeatherType.LEAVES, label: 'Feuilles', icon: '🍂' },
  { type: WeatherType.AUTUMN_DRIZZLE, label: 'Bruine d\'automne', icon: '🍁' },
  { type: WeatherType.SPORES, label: 'Spores', icon: '🦠' },
  { type: WeatherType.SANDSTORM, label: 'Tempête de sable', icon: '🏜️' },
  { type: WeatherType.ELECTRIC, label: 'Champ électrique', icon: '⚡' },
  { type: WeatherType.CLOUDY, label: 'Nuageux', icon: '☁️' },
  { type: WeatherType.FOG, label: 'Brouillard', icon: '🌫️' },
  { type: WeatherType.STALKING_FOG, label: 'Brouillard rôdeur', icon: '🌁' },
  { type: WeatherType.SEA_MIST, label: 'Brume marine', icon: '🌊' },
  { type: WeatherType.SMOG, label: 'Smog', icon: '🏭' },
  { type: WeatherType.DARKNESS, label: 'Ténèbres', icon: '🌑' },
  { type: WeatherType.CURSE, label: 'Malédiction', icon: '🕯️' },
  { type: WeatherType.HAUNTED, label: 'Brume hantée', icon: '👻' },
  { type: WeatherType.DRIZZLE, label: 'Bruine', icon: '🌦️' },
  { type: WeatherType.SPRING_SHOWER, label: 'Pluie de printemps', icon: '🌤️' },
  { type: WeatherType.FREEZING_RAIN, label: 'Pluie verglaçante', icon: '🥶' },
  { type: WeatherType.HAIL, label: 'Grêle', icon: '🧊' },
  { type: WeatherType.RAINY, label: 'Pluvieux', icon: '🌧️' },
  { type: WeatherType.STORM, label: 'Orage', icon: '⛈️' },
  { type: WeatherType.THUNDER_RAIN, label: 'Pluie de tonnerre', icon: '🌩️' },
  { type: WeatherType.MONSOON, label: 'Mousson', icon: '🌴' },
  { type: WeatherType.TORNADO, label: 'Tornade', icon: '🌪️' },
  { type: WeatherType.EARTHQUAKE, label: 'Séisme', icon: '🫨' },
  { type: WeatherType.FLOOD, label: 'Inondation', icon: '🌊' },
  { type: WeatherType.BLOOD_RAIN, label: 'Pluie de mort', icon: '💀' },
  { type: WeatherType.POISON, label: 'Climat empoisonné', icon: '☠️' },
  { type: WeatherType.ACID_RAIN, label: 'Pluie acide', icon: '🧪' },
  { type: WeatherType.SNOW, label: 'Neige', icon: '❄️' },
  { type: WeatherType.MAGIC_SNOW, label: 'Neige magique', icon: '✨' },
  { type: WeatherType.CRYSTAL_MIST, label: 'Brume de cristal', icon: '💎' },
  { type: WeatherType.BLIZZARD, label: 'Blizzard', icon: '🌨️' },
  { type: WeatherType.FROST, label: 'Gel', icon: '🧊' },
  { type: WeatherType.AURORA, label: 'Aurore', icon: '🌌' },
  { type: WeatherType.STARRY_NIGHT, label: 'Nuit étoilée', icon: '🌃' },
  { type: WeatherType.TIME_WARP, label: 'Distorsion temporelle', icon: '⏳' },
  { type: WeatherType.INVERTED, label: 'Monde inversé', icon: '🔮' },
  { type: WeatherType.ANTIGRAVITY, label: 'Gravité inversée', icon: '🪐' },
  { type: WeatherType.OLD_FILM, label: 'Vieux film', icon: '🎞️' },
  { type: WeatherType.MARS, label: 'Vent de Mars', icon: '🪐' },
  { type: WeatherType.FIREWORKS, label: 'Feu d\'artifice', icon: '🎆' },
  { type: WeatherType.LIGHT_TIDE, label: 'Marée de lumière', icon: '🌊' },
  { type: WeatherType.SOLAR_STORM, label: 'Tempête solaire', icon: '☀️' },
  { type: WeatherType.STARDUST, label: 'Poussière d\'étoiles', icon: '🌠' },
  { type: WeatherType.FIREFLIES, label: 'Lucioles', icon: '✨' },
  { type: WeatherType.FAIRY_MIST, label: 'Brume féérique', icon: '🧚' },
  { type: WeatherType.BLOOD_MOON, label: 'Lune de sang', icon: '🩸' },
];

/** Firefly light colors offered in the weather panel (CSS hex for the swatch, three color for the light). */
export type FireflyColor = 'green' | 'pink' | 'cyan' | 'purple';

export const FIREFLY_COLORS: { color: FireflyColor, label: string, hex: string }[] = [
  { color: 'green', label: 'Vert', hex: '#c8ff4a' },
  { color: 'pink', label: 'Rose', hex: '#ff6ad5' },
  { color: 'cyan', label: 'Cyan', hex: '#4af0ff' },
  { color: 'purple', label: 'Mauve', hex: '#cc99ff' },
];

export function fireflyColorHex(color: FireflyColor): string {
  return (FIREFLY_COLORS.find(c => c.color === color) ?? FIREFLY_COLORS[0]).hex;
}

export const LEAF_MODES: { mode: LeafMode, label: string }[] = [
  { mode: 'autumn', label: '🍂 Normal' },
  { mode: 'cherry', label: '🌸 Cerisier' },
];

/** Where the wind blows towards: 'east' = from west to east (+x), 'west' = from east to west (-x). */
export type WindDirection = 'east' | 'west';

export const WIND_DIRECTIONS: { direction: WindDirection, label: string }[] = [
  { direction: 'east', label: 'Ouest → Est' },
  { direction: 'west', label: 'Est → Ouest' },
];

/** Signed wind along x, -1..1 (strength 0..1 with the direction sign). */
export function windToX(strength: number, direction: WindDirection): number {
  return THREE.MathUtils.clamp(strength, 0, 1) * (direction === 'east' ? 1 : -1);
}

export function cloneWeatherParams(p: WeatherParams): WeatherParams {
  return { ...p, ambientColor: p.ambientColor.clone(), sunColor: p.sunColor.clone(), unlitTint: p.unlitTint.clone(), fogColor: p.fogColor.clone(), sandColor: p.sandColor.clone(), sandTint: p.sandTint.clone(), windowTint: p.windowTint.clone(), lightningColor: p.lightningColor.clone() };
}
