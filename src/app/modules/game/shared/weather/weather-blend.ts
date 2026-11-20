import * as THREE from "three";
import {
  DAWN,
  DAWN_TINT,
  DAY_PRESETS,
  daylightAt,
  DUSK,
  DUSK_TINT,
  getWeatherParams,
  mistAt,
  twilightAt,
  WeatherParams,
  WeatherType,
} from "./Weather";

// The sky's clock and the weather's blending: where the sun / moon is at an hour, the params of a weather at an
// hour (day and night versions mixed, twilight colours, morning mist), and the live params easing towards them.

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
export function sunWorldPos(hour: number, out: THREE.Vector3): THREE.Vector3 {
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
  return out.set(
    THREE.MathUtils.lerp(fromX, toX, t),
    SUN_HEIGHT * (SUN_LOW + (1 - SUN_LOW) * arc),
    SUN_Z
  );
}
/** How fast the weather blends into the new one (higher = faster). */
export const TRANSITION_SPEED = 1.5;
/** Morning mist at full strength: extra fog, dew, sun rays. */
const MIST_FOG = 0.55;
const MIST_DEW = 0.6;
const MIST_RAYS = 0.9;

type NumberKey = {
  [K in keyof WeatherParams]: WeatherParams[K] extends number ? K : never;
}[keyof WeatherParams];
type ColorKey = {
  [K in keyof WeatherParams]: WeatherParams[K] extends THREE.Color ? K : never;
}[keyof WeatherParams];
const SAMPLE = DAY_PRESETS[WeatherType.NEUTRAL]!;
/** Densities snapped to 0 once faded out, so their helpers fully stop (the rain stops for good…). */
const SNAP_KEYS: NumberKey[] = [
  "rain",
  "snow",
  "drizzle",
  "embers",
  "lava",
  "fireflies",
  "fairyLights",
  "risingEnergy",
  "leaves",
  "pollen",
  "spores",
  "sand",
  "electric",
  "poisonRain",
  "bloodRain",
  "autumnLeaves",
  "hail",
  "sunRain",
  "ash",
  "magicSnow",
  "stardust",
  "crystals",
  "marsDust",
  "acidRain",
  "fumes",
  "poisonFumes",
  "curse",
  "petalWhirl",
  "haunt",
];
const NUMBER_KEYS = (Object.keys(SAMPLE) as (keyof WeatherParams)[]).filter(
  (k) => typeof SAMPLE[k] === "number"
) as NumberKey[];
const COLOR_KEYS = (Object.keys(SAMPLE) as (keyof WeatherParams)[]).filter(
  (k) => SAMPLE[k] instanceof THREE.Color
) as ColorKey[];

/** Params of a weather at an hour (into `to`): day and night versions mixed by the daylight, twilight colors. */
export function weatherAt(
  type: WeatherType,
  hour: number,
  to: WeatherParams
): WeatherParams {
  const day = getWeatherParams(type, false);
  const night = getWeatherParams(type, true);
  const d = daylightAt(hour);
  for (const key of NUMBER_KEYS) {
    to[key] = night[key] + (day[key] - night[key]) * d;
  }
  for (const key of COLOR_KEYS) {
    to[key].copy(night[key]).lerp(day[key], d);
  }
  const twilight = twilightAt(hour);
  if (twilight.amount > 0) {
    const tint = twilight.dusk ? DUSK_TINT : DAWN_TINT;
    const k =
      twilight.amount *
      TWILIGHT_STRENGTH *
      (1 - 0.6 * Math.min(to.cloudCover, 1));
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
    const mist = mistAt(hour);
    to.morningMist *= mist;
    to.fog += MIST_FOG * to.morningMist;
    to.dew = Math.max(to.dew, MIST_DEW * to.morningMist);
    to.godRays = Math.max(to.godRays, MIST_RAYS * to.morningMist * d);
  }
  return to;
}

/** The live params eased towards the target ones (dt: seconds); faded out densities snapped to 0. */
export function blendTowards(
  c: WeatherParams,
  to: WeatherParams,
  dt: number
): void {
  const k = 1 - Math.exp(-dt * TRANSITION_SPEED);
  for (const key of NUMBER_KEYS) {
    c[key] += (to[key] - c[key]) * k;
  }
  for (const key of COLOR_KEYS) {
    c[key].lerp(to[key], k);
  }
  for (const key of SNAP_KEYS) {
    if (to[key] === 0 && c[key] < 0.005) {
      c[key] = 0;
    }
  }
}
