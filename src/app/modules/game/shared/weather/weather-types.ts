// The weathers (ids) and everything a weather changes (its params). Presets: day-presets.ts, night-presets.ts.
import * as THREE from "three";
import type { LeafMode } from "./LeafHelper";

export type { LeafMode };

export enum WeatherType {
  NEUTRAL = "neutral",
  SUNNY = "sunny",
  CLOUDY = "cloudy",
  RAINY = "rainy",
  STORM = "storm",
  SNOW = "snow",
  AURORA = "aurora",
  FOG = "fog",
  DRIZZLE = "drizzle",
  BLOOD_MOON = "blood-moon",
  HEATWAVE = "heatwave",
  FIREFLIES = "fireflies",
  LEAVES = "leaves",
  SPORES = "spores",
  SANDSTORM = "sandstorm",
  ELECTRIC = "electric",
  FAIRY_MIST = "fairy-mist",
  RISING_ENERGY = "rising-energy",
  VOLCANIC = "volcanic",
  BLOOD_RAIN = "blood-rain",
  BLIZZARD = "blizzard",
  DARKNESS = "darkness",
  FOREST = "forest",
  JUNGLE = "jungle",
  MONSOON = "monsoon",
  AUTUMN_DRIZZLE = "autumn-drizzle",
  STARRY_NIGHT = "starry-night",
  SMOG = "smog",
  FIREWORKS = "fireworks",
  LIGHT_TIDE = "light-tide",
  EARTHQUAKE = "earthquake",
  GEYSERS = "geysers",
  TIME_WARP = "time-warp",
  INVERTED = "inverted",
  STALKING_FOG = "stalking-fog",
  ERUPTION = "eruption",
  ANTIGRAVITY = "antigravity",
  OLD_FILM = "old-film",
  THUNDER_RAIN = "thunder-rain",
  MORNING_MIST = "morning-mist",
  MIRAGE = "mirage",
  MOONLESS = "moonless",
  DEEP_FREEZE = "deep-freeze",
  CRYSTAL_MIST = "crystal-mist",
  MARS = "mars",
  ACID_RAIN = "acid-rain",
  HAIL = "hail",
  SEA_MIST = "sea-mist",
  SPRING_SHOWER = "spring-shower",
  ASH = "ash",
  FREEZING_RAIN = "freezing-rain",
  MAGIC_SNOW = "magic-snow",
  STARDUST = "stardust",
  SOLAR_STORM = "solar-storm",
  CURSE = "curse",
  PETAL_WHIRL = "petal-whirl",
  FROST = "frost",
  HAUNTED = "haunted",
  FLOOD = "flood",
  TORNADO = "tornado",
  POISON = "poison",
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
  /** Rising energy: teal sparks flowing up from the ground to the sky, 0 = none, 1 = max. */
  risingEnergy: number;
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
  /** Morning mist: low mist banks, sun rays and dew around dawn, fading as the sun climbs (see mistAt), 0 = none, 1 = full. */
  morningMist: number;
  /** Mirage: fake water patches far away, doubled picture, high shimmering tone, 0 = none, 1 = full. */
  mirage: number;
  /** Moonless night: pitch dark but a lantern around the player, eyes watching from the dark, 0 = none, 1 = full. */
  moonless: number;
  /** Low mist banks lying on the ground at any hour (the morning mist ones, without its dawn fading), 0 = none, 1 = full. */
  groundMist: number;
  /** Eyes watching from the dark (without the moonless night darkness and lantern), 0 = none, 1 = full. */
  watchingEyes: number;
  /** Deep freeze: frost climbing up the walls, the player's breath visible, ice cracking, 0 = none, 1 = full. */
  deepFreeze: number;
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
