import * as THREE from 'three';
import { RENDER_DETAIL } from '../model/Quality';
import type { Game } from '../model/Game';
import { cloneWeatherParams, DAWN, DAWN_TINT, DAY_PRESETS, daylightAt, mistAt, DUSK, DUSK_TINT, getWeatherParams, isNightHour, twilightAt, WeatherParams, WeatherType } from './Weather';
import { DARK_RADIUS, puddleAt, UNLIT_MATERIALS, WEATHER_UNIFORMS } from './weather-shader';
import { StrikeHelper } from './StrikeHelper';
import { EyesHelper } from './EyesHelper';
import { StepSurface, ThunderBolt, WeatherAudio } from './WeatherAudio';
import { ACID_RAIN_STYLE, BLOOD_RAIN_STYLE, DRIZZLE_STYLE, HAIL_STYLE, POISON_RAIN_STYLE, RainHelper, SUN_RAIN_STYLE } from './RainHelper';
import { SnowHelper } from './SnowHelper';
import { SurfaceHeights } from './SurfaceHeights';
import { GodRaysPass } from './GodRaysPass';
import { BloomPass } from './BloomPass';
import { HeatHazePass } from './HeatHazePass';
import { ASH_SMOKE_STYLE, BREATH_STYLE, MIST_STYLE, STRIKE_SPARK_STYLE, GRAVITY_DROP_STYLE, GRAVITY_PEBBLE_STYLE, TIME_MOTE_STYLE, QUAKE_DEBRIS_STYLE, QUAKE_DUST_STYLE, SPINDRIFT_STYLE, STEAM_JET_STYLE, STEAM_STYLE, ASH_STYLE, CRYSTAL_STYLE, DARK_WISP_STYLE, FUME_STYLE, HAUNT_WISP_STYLE, POISON_FUME_STYLE, MARS_DUST_STYLE, VOLCANO_SMOKE_STYLE, EMBER_STYLE, FAIRY_STYLE, MAGIC_SNOW_STYLE, POLLEN_STYLE, STARDUST_STYLE, LAVA_STYLE, FIREFLY_STYLE, GlowParticles, SPORE_STYLE } from './GlowParticles';
import { LeafHelper, LeafMode } from './LeafHelper';
import { SandHelper } from './SandHelper';
import { ElectricHelper } from './ElectricHelper';
import { WispHelper } from './WispHelper';
import { FireworksHelper } from './FireworksHelper';
import { GeyserHelper } from './GeyserHelper';
import { WhirlHelper } from './WhirlHelper';
import { TornadoHelper } from './TornadoHelper';
import { GhostHelper } from './GhostHelper';
import { FloodHelper } from './FloodHelper';

/**
 * Where the sun is on the map (world coordinates), see sunWorldPos. Shadows and reflections are computed from
 * this point, so they change as the player walks around. Kept in front (+z) of the map so front walls stay lit.
 * The sun goes from the east (SUN_EAST_X, at dawn) to the west (SUN_WEST_X, at dusk), highest at midday;
 * the moon then slowly goes back over the night (so the shadows never jump while changing the hour).
 */
const SUN_EAST_X = 900;
const SUN_WEST_X = -900;
const SUN_HEIGHT = 900;
const SUN_Z = 900;
/** Lowest point of the sun / moon path, share of SUN_HEIGHT. */
const SUN_LOW = 0.55;
/** Twilight colors strength at the peak of dawn / dusk (less under clouds). */
const TWILIGHT_STRENGTH = 0.9;
/** Extra light at the peak of dawn / dusk: the low sun is still bright (relative to the texture color). */
const TWILIGHT_LIGHT = 0.12;
/** Extra light on the facades facing the low sun at dawn / dusk. */
const TWILIGHT_SUN_GLOW = 0.35;

/** Sun (by day) or moon (at night) position at an hour. */
function sunWorldPos(hour: number, out: THREE.Vector3): THREE.Vector3 {
  const h = ((hour % 24) + 24) % 24;
  const dayLength = DUSK[1] - DAWN[0];
  let t: number;
  let fromX: number;
  let toX: number;
  if (h >= DAWN[0] && h < DUSK[1]) {
    t = (h - DAWN[0]) / dayLength;
    fromX = SUN_EAST_X;
    toX = SUN_WEST_X;
  } else {
    t = ((h - DUSK[1] + 24) % 24) / (24 - dayLength);
    fromX = SUN_WEST_X;
    toX = SUN_EAST_X;
  }
  const arc = Math.sin(Math.PI * t);
  return out.set(THREE.MathUtils.lerp(fromX, toX, t), SUN_HEIGHT * (SUN_LOW + (1 - SUN_LOW) * arc), SUN_Z);
}
/** Lowest sun elevation (sin of the angle): prevents endless shadows far from the sun. */
const MIN_SUN_ELEVATION = 0.45;
/** How fast the weather blends into the new one (higher = faster). */
const TRANSITION_SPEED = 1.5;
/** Seconds between two lightning strikes at lightning = 1 (random in this range). */
const LIGHTNING_INTERVAL = [2.5, 8] as const;
/** Extra light added by a lightning flash at its peak (relative to the texture color). */
const LIGHTNING_AMBIENT = 0.9;
const LIGHTNING_SUN = 0.8;
/** Electric field: faint blue light flicker following the sparks (relative to the texture color). */
const ELECTRIC_FLICKER = 0.07;
const ELECTRIC_COLOR = new THREE.Color(0x9cc4ff);
/** Seconds of full snowfall to cover the roofs completely. */
const SNOW_ACCUMULATION_TIME = 40;
/** Seconds for a full snow layer to melt once it stopped snowing. */
const SNOW_MELT_TIME = 25;
/** Magic snow: chimes level (volume and how often), 1 = full. */
const MAGIC_SNOW_CHIMES = 0.45;
/** Star dust: chimes level (volume and how often), 1 = full. */
const STARDUST_CHIMES = 0.3;
/** Crystal mist: chimes level (fine tinkling). */
const CRYSTAL_CHIMES = 0.4;
/** Frost: seconds to cover everything / to melt. Flood: water depth (share) from which every step splashes. */
const FROST_SPREAD_TIME = 45;
const FROST_MELT_TIME = 30;
const FLOOD_STEPS = 0.1;
/** The tornado roar is heard within this distance (world units). */
const TORNADO_HEARING = 350;
/** Petal whirlwinds are heard within this distance (world units). */
const WHIRL_HEARING = 110;
/** Tornado: catches the player within this distance of its axis (world units); flight duration (s), height
 * (world units), spin speed (rad / s), and the delay before being caught again (s). */
const TORNADO_CATCH = 16;
const FLIGHT_TIME = 3.2;
const FLIGHT_HEIGHT = 50;
const FLIGHT_SPIN = 16;
const FLIGHT_COOLDOWN = 5;
/** Share of the flight height the camera follows (1 = the player stays still on screen). */
const FLIGHT_CAMERA_FOLLOW = 0.8;
/** Freezing rain: seconds for the ice glaze to cover everything / to melt, and from which glaze the steps crunch. */
const ICE_GLAZE_TIME = 20;
const ICE_MELT_TIME = 45;
const ICE_STEPS = 0.4;
/** Seconds of full sandstorm to cover the surfaces with sand, and for the wind to blow it away. */
const SAND_ACCUMULATION_TIME = 30;
const SAND_CLEAR_TIME = 20;
/**
 * Rain wetness: surfaces get wet in WET_TIME s of full rain and dry in DRY_TIME s; puddles fill in
 * PUDDLE_FILL_TIME s and dry slower (PUDDLE_DRY_TIME s). Drying is faster in a bright sun, slower at night.
 */
const WHITE = new THREE.Color(1, 1, 1);
/** Electric arcs are heard within this distance of the player (world units, 8 = one tile). */
const ARC_HEARING = 90;
/** Solar storm: seconds between two light dips (at flicker = 1). Curse: how far the sun wanders (world units). */
const DIP_INTERVAL = [0.4, 3] as const;
const SUN_WANDER = 1100;
/** Fireworks: extra ambient light at the moment of a burst (relative to the texture color). */
const FIREWORK_LIGHT = 0.35;
/** Earthquake: seconds between two quakes, quake length (s), camera shake amplitude (world units). */
/** Geysers: an erupting one throws the player within this distance; heard within this distance (world units). */
const GEYSER_CATCH = 10;
/** Time warp: share of the weather speed removed (0.8 = 5 times slower). */
/** Stalking fog: clearing radius while walking / standing still (world units, 8 = one tile), and how fast it
 * opens / closes (share of the gap per second, exponential). */
const STALK_OPEN = 90;
const STALK_CLOSED = 14;
const STALK_OPEN_RATE = 1.2;
const STALK_CLOSE_RATE = 0.25;
/** Reversed gravity: player float height, bobbing amplitude (world units), bobbing speed (rad / s), sway (rad). */
const FLOAT_HEIGHT = 8;
const FLOAT_BOB = 2.5;
const FLOAT_SPEED = 1.6;
const FLOAT_SWAY = 0.08;
/** Thunder rain: distance (world units) of a strike heard / seen as "far", camera jolt below this distance and its
 * length (s), crackles heard up to this distance. */
const STRIKE_FAR = 300;
const STRIKE_JOLT_DISTANCE = 70;
const STRIKE_JOLT_LENGTH = 0.7;
const STRIKE_HEARING = 160;
/** Morning mist at full strength: extra fog, dew, sun rays. */
const MIST_FOG = 0.55;
const MIST_DEW = 0.6;
const MIST_RAYS = 0.9;
/** Deep freeze: seconds per breath, how far in front of the player it comes out, frost climbing speed up the walls
 * (world units / s) and max height. */
const BREATH_PERIOD = 3.2;
const BREATH_FORWARD = 4;
/** Puffs per second while breathing out. */
const BREATH_PUFFS = 22;
const FROST_CLIMB_SPEED = 0.6;
const FROST_CLIMB_MAX = 28;
/** Earthquake debris: area scanned for wall feet (around the view), grid step, points per frame, rescan distance. */
const WALL_AREA = { minX: -240, maxX: 240, minZ: -300, maxZ: 140 };
const WALL_STEP = 8;
const WALL_SCAN_PER_FRAME = 40;
const WALL_RESCAN = 96;
const TIME_WARP_SLOWDOWN = 0.8;
const GEYSER_HEARING = 220;
const QUAKE_INTERVAL = [7, 18] as const;
const QUAKE_LENGTH = [2, 4.5] as const;
/** Imminent eruption: seconds for the tension to build up to the big quake, its length and strength, quake rate
 * at no / full tension, and how much the tension and the shaking stir up the embers and smoke. */
const ERUPTION_BUILDUP = 60;
const ERUPTION_QUAKE_LENGTH = 7;
const ERUPTION_QUAKE_POWER = 1.4;
const ERUPTION_RATE = [0.5, 2.5] as const;
const ERUPTION_TENSION_BOOST = 0.8;
const ERUPTION_SHAKE_BOOST = 2.5;
const ERUPTION_HEADROOM = 1;
const SHAKE_AMPLITUDE = 2.2;
const WET_TIME = 6;
/** Rain of death: seconds of full rain for the wet surfaces and puddles to turn to blood (or be washed back to water). */
const BLOOD_STAIN_TIME = 10;
/** Night dew (starry night): wetness and puddles level it keeps the ground at. */
const DEW_WETNESS = 0.35;
const DEW_PUDDLES = 0.45;
/** Spores: the toxic bubbles sound, much quieter and sparser than the poisoned climate (share of it). */
const SPORE_BUBBLES = 0.35;
/** Stain colors (linear) of the blood and poison puddles. */
const BLOOD_STAIN = new THREE.Color(0.42, 0.02, 0.03);
const POISON_STAIN = new THREE.Color(0.22, 0.04, 0.42);
const ACID_STAIN = new THREE.Color(0.2, 0.34, 0.04);
const TMP_STAIN = new THREE.Color();
const STAIN_MIX = new THREE.Color();
const DRY_TIME = 40;
const PUDDLE_FILL_TIME = 25;
const PUDDLE_DRY_TIME = 90;
/** Distance between two footsteps, walking / running (world units; a map tile is 8). */
const STEP_DISTANCE = 22;
const RUN_STEP_DISTANCE = 30;
/** Moves longer than this in one frame are teleports, not steps. */
const MAX_STEP_MOVE = 20;
/** The game moves the player by 1 unit per frame walking, 2 running (frame based, not time based). */
const RUN_MOVE_PER_FRAME = 1.5;
/** Still for longer than this (s): the player stopped, the next step comes right after starting to walk. */
const STOP_TIME = 0.2;
/** Snow layer from which steps crunch; wetness from which they squelch. */
const SNOW_STEPS = 0.35;
const WET_STEPS = 0.55;

/** Blue sky reflected by the puddles under a clear day sky (clouds and night turn it to the ambient grey / blue). */
const SKY_BLUE = new THREE.Color(0x7fb2ea);
/** Cloud drift direction for a west -> east wind (x is flipped for east -> west). */
const CLOUD_DRIFT = new THREE.Vector2(1, 0.15).normalize();
/** Cloud speed multiplier: without wind clouds barely move, at full wind they race. */
const CLOUD_SPEED_NO_WIND = 0.6;
const CLOUD_SPEED_FULL_WIND = 1.8;
/**
 * Wind gusts: every GUST_INTERVAL seconds (random), the wind strengthens for GUST_DURATION seconds.
 * Extra wind at the gust peak = GUST_CALM (even without wind) + GUST_STRENGTH x the wind setting.
 */
const GUST_INTERVAL = [3, 9] as const;
const GUST_DURATION = [1.5, 3.5] as const;
const GUST_CALM = 0.12;
const GUST_STRENGTH = 0.7;
/** Gusts rise in this time (s) and calm down in this time (s). */
const GUST_RISE = 0.45;
const GUST_FALL = 1.2;
/** Wind can exceed the gauge max during a gust, up to this. */
const MAX_GUSTY_WIND = 1.25;
/** Fog patches drift (noise units / s): a slow roll without wind, faster with it. */
const FOG_DRIFT_NO_WIND = 0.01;
const FOG_DRIFT_FULL_WIND = 0.2;
/** Unlit sprites (three's fog) get this share of the fog at the camera target distance, like the ground around them. */
const UNLIT_FOG_SHARE = 0.4;
const CAMERA_TARGET_DISTANCE = 212;

/** One flash pulse of a lightning strike: start (s), brightness 0..1, rise time (s), decay speed (1 / s). */
interface FlashPulse {
  start: number;
  peak: number;
  rise: number;
  decay: number;
}

/**
 * A random lightning strike: 1 bolt, or 2 (double strike) a little apart. Each bolt has its own distance:
 * - far (30%): dim diffuse glow behind the clouds, thunder late, low and long;
 * - mid (50%): bright flicker, thunder after 1-3 s;
 * - close (20%): blinding flash, immediate loud crack.
 */
function newStrike(minDistance = 0): ThunderBolt[] {
  const r = Math.random();
  const picked = r < 0.3 ? THREE.MathUtils.randFloat(0.7, 1) : r < 0.8 ? THREE.MathUtils.randFloat(0.35, 0.7) : Math.random() * 0.35;
  // Some weathers only rumble far away (monsoon): the strike is pushed to the horizon
  const distance = minDistance + (1 - minDistance) * picked;
  const pan = THREE.MathUtils.randFloat(-0.8, 0.8);
  const bolts: ThunderBolt[] = [{ at: 0, distance, pan }];
  // Double strike: more often from the closer storms
  if (Math.random() < 0.15 + 0.25 * (1 - distance)) {
    bolts.push({
      at: THREE.MathUtils.randFloat(0.35, 1.4),
      distance: THREE.MathUtils.clamp(distance + THREE.MathUtils.randFloat(-0.2, 0.2), 0, 1),
      pan: THREE.MathUtils.clamp(pan + THREE.MathUtils.randFloat(-0.4, 0.4), -1, 1),
    });
  }
  return bolts;
}

/** Flash pulses of a bolt: far = 1-2 soft dim glows, close = several sharp blinding flickers. */
function boltPulses(bolt: ThunderBolt): FlashPulse[] {
  const near = 1 - bolt.distance;
  const count = bolt.distance > 0.7 ? 1 + Math.floor(Math.random() * 2) : 1 + Math.floor(Math.random() * (2 + 2 * near));
  const pulses: FlashPulse[] = [];
  let start = bolt.at;
  for (let i = 0; i < count; i++) {
    pulses.push({
      start,
      peak: (0.25 + 0.75 * near * near) * (i === 0 ? 1 : THREE.MathUtils.randFloat(0.55, 1)),
      rise: THREE.MathUtils.lerp(0.12, 0.02, near),
      decay: THREE.MathUtils.lerp(3.5, 12, near),
    });
    start += THREE.MathUtils.randFloat(0.06, 0.22);
  }
  return pulses;
}

export class WeatherHelper {
  private weatherType = WeatherType.SUNNY;
  /** Time of day (0..24 h) and the matching params the weather blends towards. */
  private hour = 12;
  private readonly target: WeatherParams = cloneWeatherParams(DAY_PRESETS[WeatherType.SUNNY]!);
  private readonly sunPos = sunWorldPos(12, new THREE.Vector3());
  private readonly sunTarget = new THREE.Vector3();
  private readonly current: WeatherParams = cloneWeatherParams(DAY_PRESETS[WeatherType.SUNNY]!);
  private readonly audio = new WeatherAudio();
  /** Footsteps: last player position, distance walked since the last step. */
  private readonly lastPlayerPos = new THREE.Vector3(NaN, 0, 0);
  private stepDistance = 0;
  private stillTime = 0;
  /** Stalking fog: clearing radius around the player, and the player position at the previous frame. */
  private stalkRadius = STALK_CLOSED;
  private readonly stalkLastPos = new THREE.Vector3(NaN, 0, 0);
  private readonly surfaces: SurfaceHeights;
  private readonly rain: RainHelper;
  private readonly bloodRain: RainHelper;
  private readonly poisonRain: RainHelper;
  /** Share of blood / poison in the wetness / puddles: set by what falls, washed away by water rain. */
  private blood = 0;
  private readonly drizzle: RainHelper;
  private readonly embers: GlowParticles;
  private readonly fireflies: GlowParticles;
  /** Fairy mist lights: pink fireflies, independent of the fireflies color choice. */
  private readonly fairyLights: GlowParticles;
  private readonly lava: GlowParticles;
  private readonly volcanoSmoke: GlowParticles;
  private readonly leaves: LeafHelper;
  /** Always autumn leaves (golden drizzle), independent of the leaves mode setting. */
  private readonly autumnLeaves: LeafHelper;
  private readonly spores: GlowParticles;
  private readonly pollen: GlowParticles;
  private readonly ashFall: GlowParticles;
  private readonly ashSmoke: GlowParticles;
  private readonly spindrift: GlowParticles;
  private readonly quakeDebris: GlowParticles;
  private readonly quakeDust: GlowParticles;
  private readonly geysers = new GeyserHelper();
  private readonly steam: GlowParticles;
  private readonly steamJet: GlowParticles;
  private readonly timeMotes: GlowParticles;
  private readonly gravityPebbles: GlowParticles;
  private readonly gravityDrops: GlowParticles;
  /** Earthquake debris: wall feet around the view (x, z), the view center they were found around, the scan going on. */
  private wallFeet: [number, number][] = [];
  private wallFeetCenter: THREE.Vector2 | null = null;
  private wallScan: { center: THREE.Vector2, index: number, found: [number, number][] } | null = null;
  private readonly strikes: StrikeHelper;
  private readonly strikeSparks: GlowParticles;
  private readonly mist: GlowParticles;
  private readonly eyes: EyesHelper;
  private readonly breath: GlowParticles;
  /** Deep freeze: height the frost has climbed up the walls, breathing clock. */
  private frostClimb = 0;
  private breathTime = 0;
  /** Puffs allowed to appear (accumulated while breathing out: a steady stream, not all at once). */
  private breathTokens = 0;
  private readonly breathPos = new THREE.Vector3();
  /** Moonless night: the player's position on screen (uv), for the lantern. */
  private readonly lanternAt = new THREE.Vector2(0.5, 0.5);
  private readonly lanternPos = new THREE.Vector3();
  /** Reversed gravity: current float height added to the player, and its bobbing clock. */
  private floatOffset = 0;
  private floatTime = 0;
  /** Earthquake: time until the next quake, current quake age (-1 = calm), length, power, and the camera
   * offset applied this frame (removed before the next one). */
  private quakeTimer = 3;
  private quakeAge = -1;
  private quakeLength = 0;
  private quakePower = 0;
  private quakeShake = 0;
  /** Imminent eruption: builds from 0 to 1 over ERUPTION_BUILDUP, the next quake is then the big one. */
  private eruptionTension = 0;
  private readonly shakeOffset = new THREE.Vector3();
  private readonly magicSnow: GlowParticles;
  private readonly stardust: GlowParticles;
  private readonly crystals: GlowParticles;
  private readonly marsDust: GlowParticles;
  private readonly acidRain: RainHelper;
  private readonly fumes: GlowParticles;
  private readonly poisonFumes: GlowParticles;
  private readonly hauntWisps: GlowParticles;
  private readonly darkWisps: GlowParticles;
  private readonly wisps: WispHelper;
  private readonly fireworks: FireworksHelper;
  private readonly whirls: WhirlHelper;
  private readonly tornado: TornadoHelper;
  private readonly ghosts: GhostHelper;
  private readonly flood: FloodHelper;
  /** Frost cover, 0..1: spreads while it freezes, melts after. */
  private frostCover = 0;
  /** Player caught by the tornado: flight time (-1 = on the ground), cooldown before being caught again,
   * the sprite resting height and the spin angle. */
  private flightTime = -1;
  private flightCooldown = 0;
  private flightBaseY = 0;
  private flightSpin = 0;
  /** Height the camera was raised by to follow the flying player (removed again on landing). */
  private cameraLift = 0;
  /** Light interferences (solar storm): time until the next dip, current dip age / length / depth. */
  private dipTimer = 1;
  private dipAge = -1;
  private dipLength = 0;
  private dipDepth = 0;
  private readonly hail: RainHelper;
  private readonly sunRain: RainHelper;
  /** Ice glaze of the freezing rain, 0..1: grows while it lasts, melts after. */
  private iceCover = 0;
  private readonly sand: SandHelper;
  private readonly electric: ElectricHelper;
  private readonly snow: SnowHelper;
  /** Snow layer on the roofs, 0..1: grows while it snows, melts otherwise. */
  private snowCover = 0;
  /** Sand layer (ground, roofs, walls facing the wind), 0..1. */
  private sandCover = 0;
  /** Rain left on the surfaces: wet look and puddles, 0..1. */
  private wetness = 0;
  private puddles = 0;
  private readonly godRays = new GodRaysPass();
  private readonly bloom = new BloomPass();
  private readonly heatHaze = new HeatHazePass();
  private readonly sunDir = new THREE.Vector3();
  private readonly cloudVelocity = new THREE.Vector2();
  /** Signed wind along x, -1..1 (current blended value and setting). */
  private windX = 0;
  private targetWindX = 0;
  /** Wind without the gusts (blended to the setting). */
  private baseWindX = 0;
  private gustsEnabled = true;
  /** Cloud density setting (gauge), blended smoothly. */
  private targetCloudDensity = 0.5;
  /** Time until the next gust, current gust age (-1 = none), duration and peak (0..1). */
  private gustTimer = 2;
  private gustAge = -1;
  private gustDuration = 0;
  private gustPeak = 0;
  private gustTime = 0;
  private readonly tmpColor = new THREE.Color();
  /** three's fog, only used by the unlit materials (sprites, particles): the lit ones use the weather fog. */
  private readonly sceneFog = new THREE.FogExp2(0xffffff, 0);
  /** Lightning: time until the next strike, time since the current strike (-1 = none), its flash pulses. */
  private lightningTimer = 1;
  private flashTime = -1;
  private flashPulses: FlashPulse[] = [];

  constructor(private readonly game: Game) {
    this.surfaces = new SurfaceHeights(game.scene);
    this.rain = new RainHelper(game.scene, this.surfaces);
    this.drizzle = new RainHelper(game.scene, this.surfaces, DRIZZLE_STYLE);
    this.bloodRain = new RainHelper(game.scene, this.surfaces, BLOOD_RAIN_STYLE);
    this.poisonRain = new RainHelper(game.scene, this.surfaces, POISON_RAIN_STYLE);
    this.embers = new GlowParticles(game.scene, this.surfaces, EMBER_STYLE);
    this.fireflies = new GlowParticles(game.scene, this.surfaces, FIREFLY_STYLE);
    this.fairyLights = new GlowParticles(game.scene, this.surfaces, FAIRY_STYLE);
    this.lava = new GlowParticles(game.scene, this.surfaces, LAVA_STYLE);
    this.volcanoSmoke = new GlowParticles(game.scene, this.surfaces, VOLCANO_SMOKE_STYLE);
    this.leaves = new LeafHelper(game.scene, this.surfaces);
    this.autumnLeaves = new LeafHelper(game.scene, this.surfaces);
    this.spores = new GlowParticles(game.scene, this.surfaces, SPORE_STYLE);
    this.pollen = new GlowParticles(game.scene, this.surfaces, POLLEN_STYLE);
    this.ashFall = new GlowParticles(game.scene, this.surfaces, ASH_STYLE);
    this.ashSmoke = new GlowParticles(game.scene, this.surfaces, ASH_SMOKE_STYLE);
    this.spindrift = new GlowParticles(game.scene, this.surfaces, SPINDRIFT_STYLE);
    this.quakeDebris = new GlowParticles(game.scene, this.surfaces, QUAKE_DEBRIS_STYLE);
    this.quakeDust = new GlowParticles(game.scene, this.surfaces, QUAKE_DUST_STYLE);
    this.steam = new GlowParticles(game.scene, this.surfaces, STEAM_STYLE);
    this.steam.spawnAt = () => this.geysers.spawnPoint(false);
    this.steamJet = new GlowParticles(game.scene, this.surfaces, STEAM_JET_STYLE);
    this.timeMotes = new GlowParticles(game.scene, this.surfaces, TIME_MOTE_STYLE);
    this.gravityPebbles = new GlowParticles(game.scene, this.surfaces, GRAVITY_PEBBLE_STYLE);
    this.gravityDrops = new GlowParticles(game.scene, this.surfaces, GRAVITY_DROP_STYLE);
    this.strikes = new StrikeHelper(game.scene, this.surfaces);
    this.strikes.onStrike = impact => this.onGroundStrike(impact);
    this.strikes.onCrackle = (pos, strength) => {
      const player = this.playerPosition();
      const dx = pos.x - player.x;
      const closeness = Math.max(0, 1 - Math.hypot(dx, pos.z - player.z) / STRIKE_HEARING);
      if (closeness > 0) {
        this.audio.zap(closeness * strength, THREE.MathUtils.clamp(dx / 60, -1, 1), THREE.MathUtils.randFloat(0.05, 0.25));
      }
    };
    this.strikeSparks = new GlowParticles(game.scene, this.surfaces, STRIKE_SPARK_STYLE);
    this.mist = new GlowParticles(game.scene, this.surfaces, MIST_STYLE);
    this.eyes = new EyesHelper(game.scene, this.surfaces);
    this.breath = new GlowParticles(game.scene, this.surfaces, BREATH_STYLE);
    // The breath comes out in front of the player's face (a bit towards the camera, so it's drawn over the sprite)
    this.breath.spawnAt = () => {
      const player = this.playerPosition();
      this.breathPos.subVectors(this.game.camera.position, player).setY(0).setLength(BREATH_FORWARD);
      return [player.x + this.breathPos.x + THREE.MathUtils.randFloatSpread(0.8), player.z + this.breathPos.z];
    };
    // New puffs only while breathing out; the others finish fading
    this.breath.spawnGate = () => {
      if (this.breathTokens < 1) {
        return false;
      }
      this.breathTokens--;
      return true;
    };
    this.eyes.onFlee = pos => {
      const player = this.playerPosition();
      const dx = pos.x - player.x;
      this.audio.scurry(THREE.MathUtils.clamp(dx / 80, -1, 1));
    };
    this.strikeSparks.spawnAt = () => {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 5;
      return [this.strikes.sparkAt.x + Math.cos(a) * r, this.strikes.sparkAt.z + Math.sin(a) * r];
    };
    this.steamJet.spawnAt = () => this.geysers.spawnPoint(true);
    this.geysers.onEruption = g => {
      const player = this.playerPosition();
      const d = Math.hypot(g.x - player.x, g.z - player.z);
      this.audio.geyserBurst(Math.max(0, 1 - d / GEYSER_HEARING), THREE.MathUtils.clamp((g.x - player.x) / 150, -1, 1));
    };
    // Debris falls along the walls: at one of the wall feet found beforehand (see updateWallFeet)
    this.quakeDebris.spawnAt = () => {
      if (!this.wallFeet.length) {
        return null;
      }
      const [x, z] = this.wallFeet[Math.floor(Math.random() * this.wallFeet.length)];
      return [x + THREE.MathUtils.randFloatSpread(4), z + THREE.MathUtils.randFloatSpread(4)];
    };
    this.magicSnow = new GlowParticles(game.scene, this.surfaces, MAGIC_SNOW_STYLE);
    this.stardust = new GlowParticles(game.scene, this.surfaces, STARDUST_STYLE);
    this.crystals = new GlowParticles(game.scene, this.surfaces, CRYSTAL_STYLE);
    this.marsDust = new GlowParticles(game.scene, this.surfaces, MARS_DUST_STYLE);
    this.acidRain = new RainHelper(game.scene, this.surfaces, ACID_RAIN_STYLE);
    this.fumes = new GlowParticles(game.scene, this.surfaces, FUME_STYLE);
    // Vapor rises from the puddles, where the acid gathers
    this.fumes.spawnFilter = (x, z) => puddleAt(x, z, this.puddles);
    this.poisonFumes = new GlowParticles(game.scene, this.surfaces, POISON_FUME_STYLE);
    this.hauntWisps = new GlowParticles(game.scene, this.surfaces, HAUNT_WISP_STYLE);
    this.darkWisps = new GlowParticles(game.scene, this.surfaces, DARK_WISP_STYLE);
    // Darkness: the black wisps crawl on a ring around the player, where the visible area ends
    this.darkWisps.spawnAt = () => {
      const player = this.playerPosition();
      const a = Math.random() * Math.PI * 2;
      const r = DARK_RADIUS * THREE.MathUtils.randFloat(0.7, 1.15);
      return [player.x + Math.cos(a) * r, player.z + Math.sin(a) * r];
    };
    this.poisonFumes.spawnFilter = (x, z) => puddleAt(x, z, this.puddles);
    this.wisps = new WispHelper(game.scene);
    this.fireworks = new FireworksHelper(game.scene);
    this.fireworks.onLaunch = (climb, side) => this.audio.rocketWhistle(climb, side);
    this.fireworks.onBurst = (closeness, side) => this.audio.fireworkBang(closeness, side);
    this.whirls = new WhirlHelper(game.scene);
    this.tornado = new TornadoHelper(game.scene);
    this.ghosts = new GhostHelper(game.scene);
    this.flood = new FloodHelper(game.scene);
    this.hail = new RainHelper(game.scene, this.surfaces, HAIL_STYLE);
    this.sunRain = new RainHelper(game.scene, this.surfaces, SUN_RAIN_STYLE);
    this.sand = new SandHelper(game.scene, this.surfaces);
    this.electric = new ElectricHelper(game.scene, this.surfaces);
    // Arcs crackle when the player is close to them (louder the closer, on their side)
    this.electric.onArc = (pos, life) => {
      const player = this.game.mapHelper?.scenePlayer?.mesh?.position ?? this.game.getCameraTarget();
      const dx = pos.x - player.x;
      const dist = Math.hypot(dx, pos.z - player.z);
      if (dist < ARC_HEARING) {
        const closeness = 1 - dist / ARC_HEARING;
        this.audio.zap(closeness * closeness, THREE.MathUtils.clamp(dx / 60, -1, 1), life);
      }
    };
    this.snow = new SnowHelper(game.scene, this.surfaces);
    // Always set (density 0 = no fog): adding / removing it later would recompile every material
    game.scene.fog = this.sceneFog;
  }

  get type(): WeatherType {
    return this.weatherType;
  }

  /** Current air temperature (°C), following the weather transitions. */
  get temperature(): number {
    return this.current.temperature;
  }

  get night(): boolean {
    return isNightHour(this.hour);
  }

  setWeather(type: WeatherType) {
    this.weatherType = type;
  }

  /** Night: the sun becomes the moon. A weather not available at night is shown as a neutral night. */
  /** Wind setting (blended smoothly like the weather). @param windX signed wind, -1 (east -> west) .. 1 (west -> east) */
  setWind(windX: number) {
    this.targetWindX = THREE.MathUtils.clamp(windX, -1, 1);
  }

  /** Color of the fireflies light (CSS color). */
  setFireflyColor(color: string) {
    this.fireflies.setColor(color);
  }

  /** Falling leaves look: autumn leaves or cherry petals. */
  setLeafMode(mode: LeafMode) {
    this.leaves.setMode(mode);
  }

  /** Cloud density, 0 = a few scattered clouds .. 1 = overcast. */
  setCloudDensity(density: number) {
    this.targetCloudDensity = THREE.MathUtils.clamp(density, 0, 1);
  }

  /** Random wind gusts on top of the wind setting. */
  setGusts(enabled: boolean) {
    this.gustsEnabled = enabled;
  }

  /** Sound volume 0..1 and mute. */
  setSoundVolume(volume: number, muted: boolean) {
    this.audio.setVolume(volume, muted);
  }

  /** Time of day, 0..24 h: night, dawn (6-8 h), day, dusk (18-20 h). */
  setHour(hour: number) {
    this.hour = ((hour % 24) + 24) % 24;
  }

  update(dt: number) {
    // The earthquake shake of the last frame is removed first (the camera target must not shake)
    this.game.camera.position.sub(this.shakeOffset);
    this.shakeOffset.set(0, 0, 0);
    this.blendParams(dt);
    // Time warp: everything of the weather after this runs in slow motion (light, clouds, particles, shaders)
    dt *= 1 - TIME_WARP_SLOWDOWN * Math.min(this.current.timeWarp, 1);
    const p = this.current;
    const target = this.game.getCameraTarget();

    // Sun direction seen from the camera target (the sun moves smoothly when the hour changes)
    sunWorldPos(this.hour, this.sunTarget);
    // Curse: the sun wanders by itself, the shadows slowly move on their own
    if (p.sunWander > 0.01) {
      const w = WEATHER_UNIFORMS.uBeamTime.value;
      this.sunTarget.x += SUN_WANDER * p.sunWander * (0.7 * Math.sin(w * 0.11) + 0.3 * Math.sin(w * 0.27 + 1));
    }
    this.sunPos.lerp(this.sunTarget, 1 - Math.exp(-dt * TRANSITION_SPEED));
    const dir = this.sunDir.copy(this.sunPos).sub(target).normalize();
    if (dir.y < MIN_SUN_ELEVATION) {
      const horizontal = Math.sqrt(1 - MIN_SUN_ELEVATION * MIN_SUN_ELEVATION) / Math.hypot(dir.x, dir.z);
      dir.set(dir.x * horizontal, MIN_SUN_ELEVATION, dir.z * horizontal);
    }
    this.game.placeSun(target, dir);

    // three's Lambert/Phong divide by PI: these intensities give exactly litLevel on a flat ground in the sun
    // and shadowLevel in the shade, whatever the sun elevation.
    // Lightning flash: everything gets a short white-blue light boost (stronger sun = shadows "snap")
    const flash = this.updateLightning(dt, p.lightning) * Math.min(Math.max(p.lightning, p.thunderRain), 1);
    // Slow uneven "breathing" of the light (blood moon)
    const t = WEATHER_UNIFORMS.uBeamTime.value;
    // Solar storm interferences: brief random dips of all the lights
    const dip = this.updateDips(dt, p.flicker);
    const pulse = (1 + p.lightPulse * (0.7 * Math.sin(t * 0.8) + 0.3 * Math.sin(t * 2.3))) * (1 - dip);
    const spark = this.electric.flicker * Math.min(p.electric, 1);
    // Fireworks: each burst tints the whole scene with its colors for a moment
    const burst = this.fireworks.flash * this.fireworks.flash;
    this.game.ambientLight.intensity = Math.PI * (p.shadowLevel * pulse + LIGHTNING_AMBIENT * flash
      + ELECTRIC_FLICKER * spark + FIREWORK_LIGHT * burst);
    this.game.ambientLight.color.copy(p.ambientColor).lerp(ELECTRIC_COLOR, spark * 0.3).lerp(p.lightningColor, flash)
      .lerp(this.fireworks.flashColor, burst * 0.6);
    this.game.sun.color.copy(p.sunColor).lerp(p.lightningColor, flash);
    this.tmpColor.copy(p.unlitTint).lerp(p.lightningColor, flash);
    UNLIT_MATERIALS.forEach(mat => mat.color.copy(this.tmpColor).multiply(mat.userData['unlitBaseColor'] ?? WHITE));
    this.game.sun.intensity = Math.PI * (Math.max(p.litLevel - p.shadowLevel, 0) * pulse + LIGHTNING_SUN * flash) / dir.y;

    const u = WEATHER_UNIFORMS;
    u.uSunDir.value.copy(dir);
    u.uCloudCover.value = p.cloudCover;
    u.uSpecular.value = p.specular;
    u.uCloudAmbient.value = p.cloudAmbient;
    u.uSunGlow.value = p.sunGlow;
    u.uBeamTime.value += dt;
    u.uBeamLight.value = p.godRays;
    u.uWindowGlow.value = p.windowGlow * (1 - Math.min(dip * 1.5, 1));
    u.uWindowTint.value.copy(p.windowTint);
    u.uAurora.value = p.aurora;
    // Wind: blended to the setting, drives the clouds, the precipitations and the vegetation
    // Sandstorm, blizzard: always blow hard (whatever the gauge), in the chosen direction
    const windTarget = Math.sign(this.targetWindX || 1) * Math.max(Math.abs(this.targetWindX), p.minWind);
    this.baseWindX += (windTarget - this.baseWindX) * (1 - Math.exp(-dt * TRANSITION_SPEED));
    this.windX = THREE.MathUtils.clamp(this.baseWindX + this.updateGusts(dt), -MAX_GUSTY_WIND, MAX_GUSTY_WIND);
    const windAbs = Math.abs(this.windX);
    // Clouds are high up: they follow the wind setting, not the gusts near the ground
    const cloudWind = Math.min(Math.abs(this.baseWindX), 1);
    const cloudSpeed = p.cloudSpeed * THREE.MathUtils.lerp(CLOUD_SPEED_NO_WIND, CLOUD_SPEED_FULL_WIND, cloudWind);
    this.cloudVelocity.set(CLOUD_DRIFT.x * Math.sign(this.baseWindX || 1), CLOUD_DRIFT.y).multiplyScalar(cloudSpeed);
    u.uCloudDensity.value += (this.targetCloudDensity - u.uCloudDensity.value) * (1 - Math.exp(-dt * TRANSITION_SPEED));
    u.uCloudOffset.value.addScaledVector(this.cloudVelocity, -dt * u.uCloudScale.value);
    u.uWindX.value = this.windX;
    this.updateFog(dt, p, windAbs);
    // Flutter gets faster with the wind; wrapped to keep float precision in the shader
    u.uFlutterPhase.value = (u.uFlutterPhase.value + dt * (2.5 + 5 * windAbs)) % (Math.PI * 2);

    if (p.rain > 0 || p.bloodRain > 0 || p.poisonRain > 0 || p.drizzle > 0 || p.snow > 0 || p.embers > 0 || p.lava > 0 || p.fireflies > 0 || p.fairyLights > 0 || p.leaves > 0 || p.autumnLeaves > 0 || p.spores > 0 || p.pollen > 0 || p.ash > 0 || p.magicSnow > 0 || p.stardust > 0 || p.crystals > 0 || p.marsDust > 0 || p.acidRain > 0 || p.fumes > 0 || p.poisonFumes > 0 || p.haunt > 0 || p.darkness > 0 || p.quake > 0 || p.geysers > 0 || p.timeWarp > 0 || p.antigravity > 0 || p.thunderRain > 0 || p.morningMist > 0 || p.moonless > 0 || p.deepFreeze > 0 || p.hail > 0 || p.sunRain > 0 || p.sand > 0 || p.electric > 0) {
      this.surfaces.update(dt);
    }
    this.rain.update(dt, target, p.rain, this.windX);
    this.bloodRain.update(dt, target, p.bloodRain, this.windX);
    this.poisonRain.update(dt, target, p.poisonRain, this.windX);
    this.drizzle.update(dt, target, p.drizzle, this.windX);
    this.embers.update(dt, target, p.embers, this.game.camera, this.windX);
    this.fireflies.update(dt, target, p.fireflies, this.game.camera, this.windX);
    this.fairyLights.update(dt, target, p.fairyLights, this.game.camera, this.windX);
    // Imminent eruption: more embers and smoke as the tension builds, a burst while the ground shakes
    // (the densities are capped at 1: the calm level is lowered to leave room for the bursts)
    const stir = (1 + p.eruption * (ERUPTION_TENSION_BOOST * this.eruptionTension + ERUPTION_SHAKE_BOOST * this.quakeShake))
      / (1 + p.eruption * ERUPTION_HEADROOM);
    this.lava.update(dt, target, p.lava * stir, this.game.camera, this.windX);
    this.volcanoSmoke.update(dt, target, p.lava * stir, this.game.camera, this.windX);
    this.leaves.update(dt, target, p.leaves, this.windX);
    this.autumnLeaves.update(dt, target, p.autumnLeaves, this.windX);
    this.spores.update(dt, target, p.spores, this.game.camera, this.windX);
    this.pollen.update(dt, target, p.pollen, this.game.camera, this.windX);
    this.ashFall.update(dt, target, p.ash, this.game.camera, this.windX);
    this.ashSmoke.update(dt, target, p.ash, this.game.camera, this.windX);
    // Blizzard: powder snow swept up by the wind (only when the snow is blown: snowDrift above 1)
    this.spindrift.update(dt, target, THREE.MathUtils.clamp((p.snowDrift - 1) / 2.5, 0, 1), this.game.camera, this.windX);
    this.magicSnow.update(dt, target, p.magicSnow, this.game.camera, this.windX);
    this.stardust.update(dt, target, p.stardust, this.game.camera, this.windX);
    this.crystals.update(dt, target, p.crystals, this.game.camera, this.windX);
    this.marsDust.update(dt, target, p.marsDust, this.game.camera, this.windX);
    this.acidRain.update(dt, target, p.acidRain, this.windX);
    // Fumes only where it's wet enough to be eaten
    this.fumes.update(dt, target, p.fumes * Math.min(this.wetness * 1.5, 1), this.game.camera, this.windX);
    this.poisonFumes.update(dt, target, p.poisonFumes * Math.min(this.wetness * 1.5, 1), this.game.camera, this.windX);
    this.hauntWisps.update(dt, target, p.haunt, this.game.camera, this.windX);
    // Only the real darkness (the haunted mist's half darkness has its own pale wisps)
    this.darkWisps.update(dt, target, Math.max(0, p.darkness - 0.6) / 0.4, this.game.camera, this.windX);
    this.wisps.update(dt, this.playerPosition(), p.curse, this.game.camera);
    this.fireworks.update(dt, target, p.fireworks, this.game.camera);
    this.whirls.update(dt, target, p.petalWhirl, this.windX);
    this.tornado.update(dt, this.playerPosition(), p.tornado, this.game.camera, this.windX);
    this.updateFlight(dt);
    if (p.eruption > 0.01) {
      this.eruptionTension = Math.min(1, this.eruptionTension + dt * p.eruption / ERUPTION_BUILDUP);
    } else {
      this.eruptionTension = 0;
    }
    const quakeRate = p.eruption > 0.01 ? THREE.MathUtils.lerp(ERUPTION_RATE[0], ERUPTION_RATE[1], this.eruptionTension) : 1;
    this.quakeShake = this.updateQuake(dt, p.quake * quakeRate);
    this.updateWallFeet(target, p.quake > 0.05 || p.thunderRain > 0.05);
    this.quakeDebris.update(dt, target, this.quakeShake, this.game.camera, this.windX);
    this.quakeDust.update(dt, target, this.quakeShake, this.game.camera, this.windX);
    this.geysers.update(dt, target, p.geysers > 0.5);
    this.steam.update(dt, target, Math.min(p.geysers, 1), this.game.camera, this.windX);
    this.steamJet.update(dt, target, Math.min(this.geysers.eruptions / 2, 1), this.game.camera, this.windX);
    this.timeMotes.update(dt, target, p.timeWarp, this.game.camera, this.windX);
    this.gravityPebbles.update(dt, target, p.antigravity, this.game.camera, this.windX);
    this.gravityDrops.update(dt, target, p.antigravity, this.game.camera, this.windX);
    this.strikes.update(dt, target, this.playerPosition(), p.thunderRain, this.game.camera);
    this.strikeSparks.update(dt, target, this.strikes.sparks, this.game.camera, 0);
    this.mist.update(dt, target, p.morningMist, this.game.camera, this.windX);
    this.eyes.update(dt, target, this.playerPosition(), p.moonless, this.game.camera);
    // Breathing: a puff every BREATH_PERIOD, exhaled during the first third of it
    this.breathTime += dt;
    const breathPhase = (this.breathTime % BREATH_PERIOD) / BREATH_PERIOD;
    this.breathTokens = breathPhase < 0.3 ? Math.min(this.breathTokens + dt * BREATH_PUFFS, 3) : 0;
    this.breath.update(dt, target, p.deepFreeze, this.game.camera, this.windX);
    this.frostClimb = p.deepFreeze > 0.05
      ? Math.min(FROST_CLIMB_MAX, this.frostClimb + dt * p.deepFreeze * FROST_CLIMB_SPEED)
      : Math.max(0, this.frostClimb - dt * FROST_CLIMB_SPEED * 3);
    WEATHER_UNIFORMS.uFrostClimb.value = this.frostClimb;
    this.updateFloat(dt, p.antigravity);
    this.ghosts.update(dt, this.playerPosition(), p.haunt);
    this.flood.update(dt, target, p.flood, this.surfaces.heightAt(target.x, target.z, target.y), this.windX);
    this.frostCover = p.frost > 0.05
      ? Math.min(1, this.frostCover + dt * p.frost / FROST_SPREAD_TIME)
      : Math.max(0, this.frostCover - dt / FROST_MELT_TIME);
    u.uFrost.value = this.frostCover;
    u.uIridescence.value = p.iridescence;
    u.uAuroraRed.value = p.auroraRed;
    this.hail.update(dt, target, p.hail, this.windX);
    this.sunRain.update(dt, target, p.sunRain, this.windX);
    this.sand.setTint(p.sandTint);
    this.sand.update(dt, target, p.sand, this.game.camera, this.windX);
    this.electric.update(dt, target, p.electric, this.game.camera);
    this.snow.update(dt, target, p.snow, this.game.camera, this.windX, p.snowDrift);

    this.snowCover = p.snow > 0.05
      ? Math.min(1, this.snowCover + dt * p.snow / SNOW_ACCUMULATION_TIME)
      : Math.max(0, this.snowCover - dt / SNOW_MELT_TIME);
    u.uSnowCover.value = this.snowCover;
    this.iceCover = p.ice > 0.05
      ? Math.min(1, this.iceCover + dt * p.ice / ICE_GLAZE_TIME)
      : Math.max(0, this.iceCover - dt / ICE_MELT_TIME);
    u.uIce.value = this.iceCover;
    this.sandCover = p.sand > 0.05
      ? Math.min(1, this.sandCover + dt * p.sand / SAND_ACCUMULATION_TIME)
      : Math.max(0, this.sandCover - dt / SAND_CLEAR_TIME);
    u.uSandCover.value = this.sandCover;
    u.uSandColor.value.copy(p.sandColor);
    this.updatePuddles(dt, p);
    this.audio.update(dt, { rain: Math.min(p.rain + p.bloodRain + p.poisonRain + p.acidRain + p.sunRain * 0.6 + p.hail * 0.05, 1), drizzle: p.drizzle, wind: Math.abs(this.windX), sand: p.sand, lava: p.lava * (1 + 0.5 * p.eruption * this.eruptionTension), poison: Math.max(p.poisonRain > 0 ? Math.min(p.poisonRain / 0.6, 1) : 0, SPORE_BUBBLES * Math.min(p.spores, 1)),
      howl: THREE.MathUtils.clamp((p.snowDrift - 1) / 2.5, 0, 1) * Math.min(Math.abs(this.windX), 1),
      darkness: p.darkness,
      forest: p.canopy,
      daylight: daylightAt(this.hour),
      hail: p.hail,
      sea: p.sea,
      birds: p.birds,
      chimes: Math.max(p.magicSnow * MAGIC_SNOW_CHIMES, p.stardust * STARDUST_CHIMES, p.crystals * CRYSTAL_CHIMES),
      static: p.flicker,
      whispers: Math.max(p.curse, p.haunt * 0.6),
      crackle: this.frostCover > 0.05 && p.frost > 0.05 ? 0.5 + 0.5 * this.frostCover : 0,
      moan: p.haunt > 0.3 ? 0.35 + 0.65 * this.ghosts.nearest : 0,
      lapping: Math.max(Math.min(this.flood.depth * 1.5, 1) * 0.5, p.tide * 0.35),
      roar: this.tornado.strength * Math.max(0, 1 - Math.hypot(this.tornado.position.x - this.playerPosition().x,
        this.tornado.position.z - this.playerPosition().z) / TORNADO_HEARING),
      ashCrackle: Math.min(p.ash, 1),
      whirl: Math.max(p.petalWhirl > 0.05 ? this.whirls.closeness(this.playerPosition(), WHIRL_HEARING) : 0, this.flightTime >= 0 ? 1 : 0),
      // The rising red embers only exist under the blood moon
      bloodMoon: Math.min(p.embers, 1),
      quake: this.quakeShake,
      steam: this.steamLevel(),
      timeWarp: p.timeWarp,
      antigravity: p.antigravity,
      oldFilm: p.oldFilm,
      mirage: p.mirage,
      deepFreeze: p.deepFreeze,
      inverted: p.invert,
      frogs: p.frogs,
      crickets: p.crickets,
      city: p.city,
      sizzle: p.acidRain > 0.05 ? Math.min(p.acidRain / 0.7, 1) * Math.min(this.wetness * 1.5, 1) : 0 });
    this.updateFootsteps(dt);
  }

  private updateFog(dt: number, p: WeatherParams, windAbs: number) {
    const u = WEATHER_UNIFORMS;
    u.uFog.value = p.fog;
    u.uCanopy.value = p.canopy;
    u.uDarkness.value = p.darkness;
    u.uStalk.value = p.stalkingFog;
    u.uMirage.value = p.mirage;
    this.updateStalkingFog(dt, p.stalkingFog);
    u.uDarkCenter.value.copy(this.game.getCameraTarget());
    u.uFogColor.value.copy(p.fogColor);
    const drift = THREE.MathUtils.lerp(FOG_DRIFT_NO_WIND, FOG_DRIFT_FULL_WIND, windAbs) * Math.sign(this.windX || 1);
    u.uFogOffset.value.x -= drift * dt;
    u.uFogOffset.value.y -= FOG_DRIFT_NO_WIND * 0.5 * dt;

    // FogExp2: 1 - exp(-(density * depth)^2) = wanted share at the camera target distance
    const share = Math.min(p.fog * UNLIT_FOG_SHARE, 0.95);
    this.sceneFog.density = share > 0.001 ? Math.sqrt(-Math.log(1 - share)) / CAMERA_TARGET_DISTANCE : 0;
    this.sceneFog.color.copy(u.uFogColor.value);
  }

  /**
   * Renders the frame through the post effects the weather needs: sun rays by day, window bloom at night
   * (never both: during a day/night transition the rays win until they fade out), then the heat shimmer on top.
   * @returns false when no effect is needed: the caller renders the scene normally (no extra cost).
   */
  renderPostEffects(): boolean {
    const g = this.game;
    const p = this.current;
    // Frame with rays or bloom, into `target` (null = screen). False if none is needed.
    const drawFrame = (target: THREE.WebGLRenderTarget | null): boolean => {
      // (no full screen effects at a low graphics quality)
      if (RENDER_DETAIL.postEffects && p.godRays >= 0.01 && this.godRays.render(g.renderer, g.scene, g.camera, g.sun, this.sunDir, p.godRays, target)) {
        return true;
      }
      if (RENDER_DETAIL.postEffects && p.windowGlow >= 0.01) {
        this.bloom.render(g.renderer, g.scene, g.camera, p.windowGlow, target);
        return true;
      }
      if (target) {
        g.renderer.setRenderTarget(target);
        g.renderer.render(g.scene, g.camera);
        g.renderer.setRenderTarget(null);
        return true;
      }
      return false;
    };
    if (p.moonless >= 0.01) {
      // The lantern light follows the player (at hip height) on screen
      this.lanternPos.copy(this.playerPosition()).y += 8;
      this.lanternPos.project(g.camera);
      this.lanternAt.set(this.lanternPos.x * 0.5 + 0.5, this.lanternPos.y * 0.5 + 0.5);
    }
    // The heat shimmer / warm wash alone are dropped at a low graphics quality (a whole extra pass); the effects
    // a weather is made of (negative, old film, mirage, lantern) are kept
    const essential = p.invert >= 0.01 || p.oldFilm >= 0.01 || p.mirage >= 0.01 || p.moonless >= 0.01;
    const shimmer = RENDER_DETAIL.postEffects && (p.heatHaze >= 0.01 || p.heatWash >= 0.01);
    if (essential || shimmer) {
      this.heatHaze.render(g.renderer, drawFrame, {
        heat: p.heatHaze, wash: p.heatWash, time: WEATHER_UNIFORMS.uBeamTime.value, invert: p.invert, film: p.oldFilm,
        mirage: p.mirage, lantern: p.moonless, lanternAt: this.lanternAt,
      });
      return true;
    }
    return drawFrame(null);
  }

  /**
   * Stalking fog: the clearing opens quickly while the player walks and closes slowly once they stop.
   * Exponential approach: each second covers a fixed share of the remaining gap, fast to open, slow to close.
   */
  private updateStalkingFog(dt: number, level: number) {
    const pos = this.playerPosition();
    const moved = Math.hypot(pos.x - this.stalkLastPos.x, pos.z - this.stalkLastPos.z);
    this.stalkLastPos.copy(pos);
    if (level < 0.01) {
      this.stalkRadius = STALK_CLOSED;
      return;
    }
    const walking = moved > 0 && moved < MAX_STEP_MOVE;
    const goal = walking ? STALK_OPEN : STALK_CLOSED;
    const rate = walking ? STALK_OPEN_RATE : STALK_CLOSE_RATE;
    this.stalkRadius += (goal - this.stalkRadius) * (1 - Math.exp(-rate * dt));
    WEATHER_UNIFORMS.uStalkRadius.value = this.stalkRadius;
  }

  /** Plays a footstep every STEP_DISTANCE walked, with the sound of the surface under the player. */
  private updateFootsteps(dt: number) {
    const player = this.game.mapHelper?.scenePlayer.mesh;
    if (!player) {
      return;
    }
    const pos = player.position;
    const moved = Math.hypot(pos.x - this.lastPlayerPos.x, pos.z - this.lastPlayerPos.z);
    this.lastPlayerPos.copy(pos);
    if (!(moved > 0) || moved > MAX_STEP_MOVE) {
      // Standing still (short pauses between two map tiles don't count) or teleported
      this.stillTime += dt;
      if (this.stillTime > STOP_TIME || moved > MAX_STEP_MOVE) {
        this.stepDistance = STEP_DISTANCE * 0.75; // first step right after starting to walk
      }
      return;
    }
    this.stillTime = 0;
    const running = moved > RUN_MOVE_PER_FRAME;
    this.stepDistance += moved;
    if (this.stepDistance < (running ? RUN_STEP_DISTANCE : STEP_DISTANCE)) {
      return;
    }
    this.stepDistance = 0;
    const flooded = this.flood.depth > FLOOD_STEPS;
    const inPuddle = flooded || (puddleAt(pos.x, pos.z, this.puddles) && this.snowCover < SNOW_STEPS);
    let surface: StepSurface = 'ground';
    if (!flooded && (this.snowCover >= SNOW_STEPS || this.iceCover >= ICE_STEPS || this.frostCover >= ICE_STEPS)) {
      surface = 'snow'; // crunchy
    } else if (inPuddle || this.wetness >= WET_STEPS) {
      surface = 'water';
    }
    this.audio.footstep(surface, inPuddle, running);
  }

  /** Rain makes the surfaces wet and fills puddles; they dry once it stops (faster in a hot sun). */
  private updatePuddles(dt: number, p: WeatherParams) {
    const raining = Math.max(p.rain, p.bloodRain, p.poisonRain, p.acidRain, p.sunRain * 0.6, p.drizzle * 0.5);
    if (raining > 0.05) {
      // What falls sets the color: blood / poison stain, water rain washes them away
      const stained = p.bloodRain + p.poisonRain + p.acidRain;
      const water = p.rain + p.sunRain + p.drizzle * 0.5;
      const share = stained / Math.max(stained + water, 0.001);
      const k = Math.min(1, dt * raining / BLOOD_STAIN_TIME);
      this.blood += (share - this.blood) * k;
      if (stained > 0.01) {
        STAIN_MIX.copy(BLOOD_STAIN).multiplyScalar(p.bloodRain / stained)
          .add(TMP_STAIN.copy(POISON_STAIN).multiplyScalar(p.poisonRain / stained))
          .add(TMP_STAIN.copy(ACID_STAIN).multiplyScalar(p.acidRain / stained));
        WEATHER_UNIFORMS.uStainColor.value.lerp(STAIN_MIX, k);
      }
    } else if (this.puddles <= 0 && this.wetness <= 0) {
      this.blood = 0;
    }
    WEATHER_UNIFORMS.uBlood.value = this.blood;
    if (raining > 0.05) {
      this.wetness = Math.min(1, this.wetness + dt * raining * p.soak / WET_TIME);
      this.puddles = Math.min(1, this.puddles + dt * raining * p.soak / PUDDLE_FILL_TIME);
    } else {
      const sun = THREE.MathUtils.clamp(p.litLevel, 0.3, 1.2) * (1 + 2 * p.heatWash);
      this.wetness = Math.max(0, this.wetness - dt * sun / DRY_TIME);
      this.puddles = Math.max(0, this.puddles - dt * sun / PUDDLE_DRY_TIME);
    }
    // Night dew: the ground stays a bit wet, with shallow puddles (they dry normally once it's gone)
    if (p.dew > 0.01) {
      this.wetness = Math.max(this.wetness, Math.min(DEW_WETNESS * p.dew, this.wetness + dt / WET_TIME));
      this.puddles = Math.max(this.puddles, Math.min(DEW_PUDDLES * p.dew, this.puddles + dt / PUDDLE_FILL_TIME));
    }
    const u = WEATHER_UNIFORMS;
    u.uStars.value = p.stars;
    u.uTide.value = p.tide;
    u.uWarp.value = p.timeWarp;
    u.uWarpCenter.value.copy(this.playerPosition());
    u.uWetness.value = this.wetness;
    u.uPuddles.value = this.puddles;
    u.uRipples.value = Math.min(raining * 1.5, 1) * (1 - Math.max(this.iceCover, this.frostCover)); // frozen puddles don't ripple
    // Sky seen in the water: blue when the day is clear, the ambient light color under clouds / at night
    const clearSky = (1 - Math.min(p.cloudCover, 1) * 0.85) * THREE.MathUtils.smoothstep(p.litLevel, 0.6, 0.95);
    u.uSkyColor.value.copy(p.ambientColor).lerp(SKY_BLUE, clearSky).multiplyScalar(Math.min(p.litLevel * 0.85, 1));
  }

  /** Extra signed wind of the current gust (0 between gusts), in the wind direction. */
  private updateGusts(dt: number): number {
    this.gustTime += dt;
    if (this.gustAge < 0) {
      this.gustTimer -= dt;
      if (this.gustTimer <= 0 && this.gustsEnabled) {
        this.gustAge = 0;
        this.gustDuration = THREE.MathUtils.randFloat(GUST_DURATION[0], GUST_DURATION[1]);
        this.gustPeak = THREE.MathUtils.randFloat(0.55, 1);
      }
      if (this.gustAge < 0) {
        return 0;
      }
    }
    this.gustAge += dt;
    const t = this.gustAge;
    if (t >= this.gustDuration) {
      this.gustAge = -1;
      this.gustTimer = THREE.MathUtils.randFloat(GUST_INTERVAL[0], GUST_INTERVAL[1]);
      return 0;
    }
    // Rises fast, shakes a little at its peak, then calms down
    const envelope = THREE.MathUtils.smoothstep(t, 0, GUST_RISE)
      * (1 - THREE.MathUtils.smoothstep(t, this.gustDuration - GUST_FALL, this.gustDuration));
    const shake = 1 + 0.15 * Math.sin(this.gustTime * 7.3) * Math.sin(this.gustTime * 2.9);
    const strength = GUST_CALM + GUST_STRENGTH * Math.abs(this.baseWindX);
    return Math.sign(this.baseWindX || 1) * strength * this.gustPeak * envelope * shake;
  }

  /**
   * Lightning strikes at random intervals, each one different (see newStrike): far away (soft dim glow,
   * late distant rumble), mid-distance, or close (blinding flash, immediate crack), sometimes a double strike.
   * @returns current flash brightness, 0..1
   */
  private updateLightning(dt: number, frequency: number): number {
    // (also runs the flashes of the thunder rain strikes, see onGroundStrike)
    if (frequency < 0.05 && this.flashTime < 0) {
      return 0;
    }
    this.lightningTimer -= dt * frequency;
    if (frequency >= 0.05 && this.lightningTimer <= 0) {
      this.lightningTimer = THREE.MathUtils.randFloat(LIGHTNING_INTERVAL[0], LIGHTNING_INTERVAL[1]);
      const bolts = newStrike(this.current.lightningFar);
      this.flashPulses = bolts.flatMap(boltPulses);
      this.flashTime = 0;
      this.audio.thunder(bolts);
    }
    if (this.flashTime < 0) {
      return 0;
    }
    this.flashTime += dt;
    let flash = 0;
    let end = 0;
    for (const pulse of this.flashPulses) {
      const t = this.flashTime - pulse.start;
      if (t >= 0) {
        // Fast rise, exponential decay (slower for the far, diffuse ones)
        flash = Math.max(flash, pulse.peak * Math.min(t / pulse.rise, 1) * Math.exp(-Math.max(t - pulse.rise, 0) * pulse.decay));
      }
      end = Math.max(end, pulse.start);
    }
    if (this.flashTime > end + 1.2) {
      this.flashTime = -1;
    }
    return flash;
  }

  /** Jumps straight to the current weather and time of day (no transition): used when the game starts. */
  snapToTarget() {
    this.blendParams(60);
    sunWorldPos(this.hour, this.sunPos);
  }

  /** True while the tornado carries the player away (the game freezes their moves). */
  /** Ledge hop sounds (the map moves): the drop whoosh, the landing thud. */
  playLedgeHop() {
    this.audio.ledgeHop();
  }

  playLanding() {
    this.audio.thud();
  }

  get playerFlying(): boolean {
    return this.flightTime >= 0;
  }

  /**
   * Tornado: a player walking into it is lifted, spinning on themselves, then falls back down where they were.
   * Only the sprite inside the player group moves (the game logic position stays on its tile).
   */
  /**
   * Reversed gravity: the player floats above the ground, slowly bobbing and swaying. Relative offset (the previous
   * one is removed first) so it never drifts, and left out while thrown in the air by a tornado / geyser.
   */
  /**
   * Earthquake debris spawn points: the feet of the walls (ground right next to something much higher) in the
   * view, found a few grid points per frame while a weather with quakes is on, again after moving away.
   * Looking for them when a quake starts (up to 40 random tries x 5 heights for hundreds of debris at once)
   * froze the game for a moment.
   */
  private updateWallFeet(target: THREE.Vector3, active: boolean) {
    if (!active) {
      return;
    }
    if (!this.wallScan) {
      const moved = !this.wallFeetCenter || this.wallFeetCenter.distanceTo(new THREE.Vector2(target.x, target.z)) > WALL_RESCAN;
      if (!moved) {
        return;
      }
      this.wallScan = { center: new THREE.Vector2(target.x, target.z), index: 0, found: [] };
    }
    const scan = this.wallScan;
    const cols = Math.floor((WALL_AREA.maxX - WALL_AREA.minX) / WALL_STEP) + 1;
    const rows = Math.floor((WALL_AREA.maxZ - WALL_AREA.minZ) / WALL_STEP) + 1;
    const end = Math.min(scan.index + WALL_SCAN_PER_FRAME, cols * rows);
    for (; scan.index < end; scan.index++) {
      const x = scan.center.x + WALL_AREA.minX + (scan.index % cols) * WALL_STEP;
      const z = scan.center.y + WALL_AREA.minZ + Math.floor(scan.index / cols) * WALL_STEP;
      const ground = this.surfaces.heightAt(x, z, target.y);
      if (ground < target.y + 2 && [[6, 0], [-6, 0], [0, 6], [0, -6]].some(([dx, dz]) => this.surfaces.heightAt(x + dx, z + dz, target.y) > ground + 15)) {
        scan.found.push([x, z]);
      }
    }
    if (scan.index >= cols * rows) {
      this.wallFeet = scan.found;
      this.wallFeetCenter = scan.center;
      this.wallScan = null;
    }
  }

  private updateFloat(dt: number, level: number) {
    const plane = this.game.mapHelper?.scenePlayer?.mesh?.children[0];
    if (!plane) {
      return;
    }
    plane.position.y -= this.floatOffset;
    this.floatOffset = 0;
    if (level < 0.01 || this.flightTime >= 0) {
      plane.rotation.z = 0;
      return;
    }
    this.floatTime += dt;
    this.floatOffset = level * (FLOAT_HEIGHT + FLOAT_BOB * Math.sin(this.floatTime * FLOAT_SPEED));
    plane.position.y += this.floatOffset;
    plane.rotation.z = level * FLOAT_SWAY * Math.sin(this.floatTime * FLOAT_SPEED * 0.7);
  }

  /**
   * Thunder rain: a bolt just hit the ground. Flash and thunder like a storm bolt, as close as the impact is to the
   * player (blinding and immediate crack when close); right next to them, a short jolt of the camera.
   */
  private onGroundStrike(impact: THREE.Vector3) {
    const player = this.playerPosition();
    const dist = Math.hypot(impact.x - player.x, impact.z - player.z);
    const bolt: ThunderBolt = {
      at: 0,
      distance: THREE.MathUtils.clamp(dist / STRIKE_FAR, 0, 1),
      pan: THREE.MathUtils.clamp((impact.x - player.x) / 150, -1, 1),
    };
    this.flashPulses = boltPulses(bolt);
    this.flashTime = 0;
    this.audio.thunder([bolt]);
    if (dist < STRIKE_JOLT_DISTANCE && this.quakeAge < 0) {
      // Reuses the earthquake shake: a short, sharp one
      this.quakeAge = 0;
      this.quakeLength = STRIKE_JOLT_LENGTH;
      this.quakePower = 0.4 + 0.6 * (1 - dist / STRIKE_JOLT_DISTANCE);
    }
  }

  private updateFlight(dt: number) {
    const plane = this.game.mapHelper?.scenePlayer?.mesh?.children[0];
    if (!plane) {
      return;
    }
    this.flightCooldown = Math.max(0, this.flightCooldown - dt);
    if (this.flightTime < 0) {
      const player = this.playerPosition();
      const dist = Math.hypot(this.tornado.position.x - player.x, this.tornado.position.z - player.z);
      // Thrown by an erupting geyser too
      const geyser = this.geysers.nearestErupting(player.x, player.z);
      const onGeyser = !!geyser && geyser.distance < GEYSER_CATCH;
      if (((this.tornado.strength > 0.8 && dist < TORNADO_CATCH) || onGeyser) && !this.flightCooldown) {
        this.flightTime = 0;
        this.flightBaseY = plane.position.y;
        this.flightSpin = 0;
      }
      return;
    }
    this.flightTime += dt;
    const t = this.flightTime / FLIGHT_TIME;
    if (t >= 1) {
      plane.position.y = this.flightBaseY;
      plane.rotation.y = 0;
      this.liftCamera(0);
      this.flightTime = -1;
      this.flightCooldown = FLIGHT_COOLDOWN;
      this.audio.thud();
      return;
    }
    // Up fast and slowing (60% of the time), then falling faster and faster, a little bounce at the end
    const up = 0.6;
    const lift = t < up ? 1 - Math.pow(1 - t / up, 2) : 1 - Math.pow((t - up) / (1 - up), 2);
    const bounce = t > 0.93 ? Math.sin((t - 0.93) / 0.07 * Math.PI) * 0.05 : 0;
    plane.position.y = this.flightBaseY + FLIGHT_HEIGHT * Math.max(lift, bounce);
    // The camera follows the player up (a bit less, so the rise is still felt on screen)
    this.liftCamera(FLIGHT_HEIGHT * lift * FLIGHT_CAMERA_FOLLOW);
    // Spinning on themselves: fast in the air, slowing to land facing the camera again
    const speed = FLIGHT_SPIN * Math.sin(Math.PI * Math.min(t / 0.9, 1));
    this.flightSpin += speed * dt;
    plane.rotation.y = t < 0.9 ? this.flightSpin : this.flightSpin * (1 - (t - 0.9) / 0.1) % (Math.PI * 2);
  }

  /**
   * Earthquake: now and then a quake of a few seconds (rising, then dying out); the camera shakes by an
   * irregular offset (sum of fast sines of unrelated frequencies). @returns the current quake strength 0..1
   */
  private updateQuake(dt: number, quake: number): number {
    if (quake < 0.05 && this.quakeAge < 0) {
      return 0;
    }
    if (this.quakeAge < 0) {
      this.quakeTimer -= dt * quake;
      if (this.quakeTimer > 0) {
        return 0;
      }
      this.quakeTimer = THREE.MathUtils.randFloat(QUAKE_INTERVAL[0], QUAKE_INTERVAL[1]);
      this.quakeAge = 0;
      this.quakeLength = THREE.MathUtils.randFloat(QUAKE_LENGTH[0], QUAKE_LENGTH[1]);
      this.quakePower = THREE.MathUtils.randFloat(0.5, 1);
      if (this.eruptionTension >= 1) {
        // The big one: longer, stronger, then the tension starts building again
        this.quakeLength = ERUPTION_QUAKE_LENGTH;
        this.quakePower = ERUPTION_QUAKE_POWER;
        this.eruptionTension = 0;
      }
    }
    this.quakeAge += dt;
    const t = this.quakeAge / this.quakeLength;
    if (t >= 1) {
      this.quakeAge = -1;
      return 0;
    }
    // Quick rise, long tail, with jolts
    const envelope = Math.pow(Math.sin(Math.PI * Math.pow(t, 0.6)), 0.8) * this.quakePower;
    const jolt = 0.75 + 0.25 * Math.sin(this.quakeAge * 7.3) * Math.sin(this.quakeAge * 2.1);
    const s = envelope * jolt;
    const a = this.quakeAge;
    this.shakeOffset.set(
      (Math.sin(a * 31) * 0.6 + Math.sin(a * 53 + 1) * 0.4) * SHAKE_AMPLITUDE * s,
      (Math.sin(a * 41 + 2) * 0.5 + Math.sin(a * 67) * 0.5) * SHAKE_AMPLITUDE * 0.5 * s,
      (Math.sin(a * 37 + 3) * 0.6 + Math.sin(a * 59 + 2) * 0.4) * SHAKE_AMPLITUDE * s,
    );
    this.game.camera.position.add(this.shakeOffset);
    return s;
  }

  /** Steam hiss loudness: the erupting geysers near the player (plus a faint hiss of the resting ones). */
  private steamLevel(): number {
    const player = this.playerPosition();
    let level = 0;
    for (const g of this.geysers.geysers) {
      const near = Math.max(0, 1 - Math.hypot(g.x - player.x, g.z - player.z) / GEYSER_HEARING);
      level = Math.max(level, near * (0.15 + 0.85 * g.power));
    }
    return level;
  }

  /** Raises the camera by `height` above its normal position (relative: the game keeps moving it on the ground). */
  private liftCamera(height: number) {
    const camera = this.game.camera;
    camera.position.y += height - this.cameraLift;
    this.cameraLift = height;
    this.game.mapHelper?.updateCameraAim();
  }

  /** Where the player stands (the camera target if there is none, e.g. in a fight). */
  private playerPosition(): THREE.Vector3 {
    return this.game.mapHelper?.scenePlayer?.mesh?.position ?? this.game.getCameraTarget();
  }

  /** Solar storm: random brief dips of the light (0 = none .. 1 = black), more often with a higher flicker. */
  private updateDips(dt: number, flicker: number): number {
    if (flicker < 0.05) {
      this.dipAge = -1;
      return 0;
    }
    if (this.dipAge < 0) {
      this.dipTimer -= dt * flicker;
      if (this.dipTimer > 0) {
        return 0;
      }
      this.dipTimer = THREE.MathUtils.randFloat(DIP_INTERVAL[0], DIP_INTERVAL[1]);
      this.dipAge = 0;
      this.dipLength = THREE.MathUtils.randFloat(0.05, 0.3);
      this.dipDepth = THREE.MathUtils.randFloat(0.25, 0.65) * flicker;
    }
    this.dipAge += dt;
    if (this.dipAge >= this.dipLength) {
      this.dipAge = -1;
      return 0;
    }
    // Stuttering: the dip itself flickers
    return this.dipDepth * (Math.random() < 0.7 ? 1 : 0.3);
  }

  /** Params of the weather at the current hour: day and night versions mixed by the daylight, twilight colors. */
  private targetParams(): WeatherParams {
    const day = getWeatherParams(this.weatherType, false);
    const night = getWeatherParams(this.weatherType, true);
    const d = daylightAt(this.hour);
    const to = this.target;
    for (const key of NUMBER_KEYS) {
      to[key] = night[key] + (day[key] - night[key]) * d;
    }
    for (const key of COLOR_KEYS) {
      to[key].copy(night[key]).lerp(day[key], d);
    }
    const twilight = twilightAt(this.hour);
    if (twilight.amount > 0) {
      const tint = twilight.dusk ? DUSK_TINT : DAWN_TINT;
      const k = twilight.amount * TWILIGHT_STRENGTH * (1 - 0.6 * Math.min(to.cloudCover, 1));
      to.sunColor.lerp(tint.sunColor, k);
      to.ambientColor.lerp(tint.ambientColor, k);
      to.unlitTint.lerp(tint.unlitTint, k);
      to.fogColor.lerp(tint.fogColor, k);
      to.sunGlow += TWILIGHT_SUN_GLOW * k;
      to.litLevel += TWILIGHT_LIGHT * k;
    }
    // Morning mist: the preset only says "misty morning", the hour decides how much mist there is (it burns off
    // as the sun climbs, the rays shine through it while the sun is low)
    if (to.morningMist > 0) {
      const mist = mistAt(this.hour);
      to.morningMist *= mist;
      to.fog += MIST_FOG * to.morningMist;
      to.dew = Math.max(to.dew, MIST_DEW * to.morningMist);
      to.godRays = Math.max(to.godRays, MIST_RAYS * to.morningMist * d);
    }
    return to;
  }

  private blendParams(dt: number) {
    const to = this.targetParams();
    const k = 1 - Math.exp(-dt * TRANSITION_SPEED);
    const c = this.current;
    for (const key of NUMBER_KEYS) {
      c[key] += (to[key] - c[key]) * k;
    }
    for (const key of COLOR_KEYS) {
      c[key].lerp(to[key], k);
    }
    if (to.poisonRain === 0 && c.poisonRain < 0.005) {
      c.poisonRain = 0;
    }
    if (to.bloodRain === 0 && c.bloodRain < 0.005) {
      c.bloodRain = 0;
    }
    if (to.rain === 0 && c.rain < 0.005) {
      c.rain = 0; // snap so the rain fully stops
    }
    if (to.snow === 0 && c.snow < 0.005) {
      c.snow = 0;
    }
    if (to.drizzle === 0 && c.drizzle < 0.005) {
      c.drizzle = 0;
    }
    if (to.embers === 0 && c.embers < 0.005) {
      c.embers = 0;
    }
    if (to.lava === 0 && c.lava < 0.005) {
      c.lava = 0;
    }
    if (to.fireflies === 0 && c.fireflies < 0.005) {
      c.fireflies = 0;
    }
    if (to.fairyLights === 0 && c.fairyLights < 0.005) {
      c.fairyLights = 0;
    }
    if (to.leaves === 0 && c.leaves < 0.005) {
      c.leaves = 0;
    }
    for (const key of SNAP_KEYS) {
      if (to[key] === 0 && c[key] < 0.005) {
        c[key] = 0;
      }
    }
    if (to.pollen === 0 && c.pollen < 0.005) {
      c.pollen = 0;
    }
    if (to.spores === 0 && c.spores < 0.005) {
      c.spores = 0;
    }
    if (to.sand === 0 && c.sand < 0.005) {
      c.sand = 0;
    }
    if (to.electric === 0 && c.electric < 0.005) {
      c.electric = 0;
    }
  }
}

type NumberKey = { [K in keyof WeatherParams]: WeatherParams[K] extends number ? K : never }[keyof WeatherParams];
type ColorKey = { [K in keyof WeatherParams]: WeatherParams[K] extends THREE.Color ? K : never }[keyof WeatherParams];
const SAMPLE = DAY_PRESETS[WeatherType.NEUTRAL]!;
/** Particle densities snapped to 0 once faded out, so their helpers fully stop. */
const SNAP_KEYS: NumberKey[] = ['autumnLeaves', 'hail', 'sunRain', 'ash', 'magicSnow', 'stardust', 'crystals', 'marsDust', 'acidRain', 'fumes', 'poisonFumes', 'curse', 'petalWhirl', 'haunt'];
const NUMBER_KEYS = (Object.keys(SAMPLE) as (keyof WeatherParams)[]).filter(k => typeof SAMPLE[k] === 'number') as NumberKey[];
const COLOR_KEYS = (Object.keys(SAMPLE) as (keyof WeatherParams)[]).filter(k => SAMPLE[k] instanceof THREE.Color) as ColorKey[];
