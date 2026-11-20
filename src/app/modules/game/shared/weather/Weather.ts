import * as THREE from "three";
import { DAY_PRESETS } from "./day-presets";
import type { LeafMode } from "./LeafHelper";
import { NIGHT_PRESETS } from "./night-presets";
import { WeatherParams, WeatherType } from "./weather-types";

// The weather module's entry: the types, the presets (by day, at night), the hours, the choices offered.
export * from "./weather-types";
export * from "./time-of-day";
export { DAY_PRESETS } from "./day-presets";
export { NIGHT_PRESETS } from "./night-presets";

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
  [WeatherType.JUNGLE]: [31, 26],
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
  [WeatherType.MORNING_MIST]: [13, 7],
  [WeatherType.MIRAGE]: [44, 44],
  [WeatherType.MOONLESS]: [9, 9],
  [WeatherType.DEEP_FREEZE]: [-22, -34],
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
  [WeatherType.RISING_ENERGY]: [17, 14],
  [WeatherType.VOLCANIC]: [48, 40],
};
for (const [presets, index] of [
  [DAY_PRESETS, 0],
  [NIGHT_PRESETS, 1],
] as const) {
  for (const type of Object.keys(presets) as WeatherType[]) {
    // Copy: some presets are the shared base objects
    presets[type] = {
      ...presets[type]!,
      temperature: TEMPERATURES[type][index],
    };
  }
}

/** Params for a weather at a time of day (unavailable at that time => neutral weather). */
export function getWeatherParams(
  type: WeatherType,
  night: boolean
): WeatherParams {
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
  { type: WeatherType.NEUTRAL, label: "Neutre", icon: "⚪" },
  { type: WeatherType.SUNNY, label: "Ensoleillé", icon: "☀️" },
  { type: WeatherType.HEATWAVE, label: "Canicule", icon: "🔥" },
  { type: WeatherType.MIRAGE, label: "Mirage", icon: "🫠" },
  { type: WeatherType.VOLCANIC, label: "Volcanique", icon: "🌋" },
  { type: WeatherType.ERUPTION, label: "Éruption imminente", icon: "💥" },
  { type: WeatherType.ASH, label: "Neige de cendres", icon: "🌫️" },
  { type: WeatherType.FOREST, label: "Forêt", icon: "🌲" },
  { type: WeatherType.JUNGLE, label: "Jungle", icon: "🌴" },
  { type: WeatherType.PETAL_WHIRL, label: "Vent de pétales", icon: "🌸" },
  { type: WeatherType.GEYSERS, label: "Geysers", icon: "♨️" },
  { type: WeatherType.LEAVES, label: "Feuilles", icon: "🍂" },
  { type: WeatherType.AUTUMN_DRIZZLE, label: "Bruine d'automne", icon: "🍁" },
  { type: WeatherType.SPORES, label: "Spores", icon: "🦠" },
  { type: WeatherType.SANDSTORM, label: "Tempête de sable", icon: "🏜️" },
  { type: WeatherType.ELECTRIC, label: "Champ électrique", icon: "⚡" },
  { type: WeatherType.CLOUDY, label: "Nuageux", icon: "☁️" },
  { type: WeatherType.FOG, label: "Brouillard", icon: "🌫️" },
  { type: WeatherType.MOONLESS, label: "Nuit sans lune", icon: "🌚" },
  { type: WeatherType.DEEP_FREEZE, label: "Aurore glacée", icon: "🧊" },
  { type: WeatherType.MORNING_MIST, label: "Brume matinale", icon: "🌄" },
  { type: WeatherType.STALKING_FOG, label: "Brouillard rôdeur", icon: "🌁" },
  { type: WeatherType.SEA_MIST, label: "Brume marine", icon: "🌊" },
  { type: WeatherType.SMOG, label: "Smog", icon: "🏭" },
  { type: WeatherType.DARKNESS, label: "Ténèbres", icon: "🌑" },
  { type: WeatherType.CURSE, label: "Malédiction", icon: "🕯️" },
  { type: WeatherType.HAUNTED, label: "Brume hantée", icon: "👻" },
  { type: WeatherType.DRIZZLE, label: "Bruine", icon: "🌦️" },
  { type: WeatherType.SPRING_SHOWER, label: "Pluie de printemps", icon: "🌤️" },
  { type: WeatherType.FREEZING_RAIN, label: "Pluie verglaçante", icon: "🥶" },
  { type: WeatherType.HAIL, label: "Grêle", icon: "🧊" },
  { type: WeatherType.RAINY, label: "Pluvieux", icon: "🌧️" },
  { type: WeatherType.STORM, label: "Orage", icon: "⛈️" },
  { type: WeatherType.THUNDER_RAIN, label: "Pluie de tonnerre", icon: "🌩️" },
  { type: WeatherType.MONSOON, label: "Mousson", icon: "🌴" },
  { type: WeatherType.TORNADO, label: "Tornade", icon: "🌪️" },
  { type: WeatherType.EARTHQUAKE, label: "Séisme", icon: "🫨" },
  { type: WeatherType.FLOOD, label: "Inondation", icon: "🌊" },
  { type: WeatherType.BLOOD_RAIN, label: "Pluie de mort", icon: "💀" },
  { type: WeatherType.POISON, label: "Climat empoisonné", icon: "☠️" },
  { type: WeatherType.ACID_RAIN, label: "Pluie acide", icon: "🧪" },
  { type: WeatherType.SNOW, label: "Neige", icon: "❄️" },
  { type: WeatherType.MAGIC_SNOW, label: "Neige magique", icon: "✨" },
  { type: WeatherType.CRYSTAL_MIST, label: "Brume de cristal", icon: "💎" },
  { type: WeatherType.BLIZZARD, label: "Blizzard", icon: "🌨️" },
  { type: WeatherType.FROST, label: "Gel", icon: "🧊" },
  { type: WeatherType.AURORA, label: "Aurore", icon: "🌌" },
  { type: WeatherType.STARRY_NIGHT, label: "Nuit étoilée", icon: "🌃" },
  { type: WeatherType.TIME_WARP, label: "Distorsion temporelle", icon: "⏳" },
  { type: WeatherType.INVERTED, label: "Monde inversé", icon: "🔮" },
  { type: WeatherType.ANTIGRAVITY, label: "Gravité inversée", icon: "🪐" },
  { type: WeatherType.OLD_FILM, label: "Vieux film", icon: "🎞️" },
  { type: WeatherType.MARS, label: "Vent de Mars", icon: "🪐" },
  { type: WeatherType.FIREWORKS, label: "Feu d'artifice", icon: "🎆" },
  { type: WeatherType.LIGHT_TIDE, label: "Marée de lumière", icon: "🌊" },
  { type: WeatherType.SOLAR_STORM, label: "Tempête solaire", icon: "☀️" },
  { type: WeatherType.STARDUST, label: "Poussière d'étoiles", icon: "🌠" },
  { type: WeatherType.FIREFLIES, label: "Lucioles", icon: "✨" },
  { type: WeatherType.FAIRY_MIST, label: "Brume féérique", icon: "🧚" },
  { type: WeatherType.RISING_ENERGY, label: "Énergie montante", icon: "💠" },
  { type: WeatherType.BLOOD_MOON, label: "Lune de sang", icon: "🩸" },
];

/** Firefly light colors offered in the weather panel (CSS hex for the swatch, three color for the light). */
export type FireflyColor = "green" | "pink" | "cyan" | "purple";

export const FIREFLY_COLORS: {
  color: FireflyColor;
  label: string;
  hex: string;
}[] = [
  { color: "green", label: "Vert", hex: "#c8ff4a" },
  { color: "pink", label: "Rose", hex: "#ff6ad5" },
  { color: "cyan", label: "Cyan", hex: "#4af0ff" },
  { color: "purple", label: "Mauve", hex: "#cc99ff" },
];

export function fireflyColorHex(color: FireflyColor): string {
  return (FIREFLY_COLORS.find((c) => c.color === color) ?? FIREFLY_COLORS[0])
    .hex;
}

export const LEAF_MODES: { mode: LeafMode; label: string }[] = [
  { mode: "autumn", label: "🍂 Normal" },
  { mode: "cherry", label: "🌸 Cerisier" },
];

/** Where the wind blows towards: 'east' = from west to east (+x), 'west' = from east to west (-x). */
export type WindDirection = "east" | "west";

export const WIND_DIRECTIONS: { direction: WindDirection; label: string }[] = [
  { direction: "east", label: "Ouest → Est" },
  { direction: "west", label: "Est → Ouest" },
];

/** Signed wind along x, -1..1 (strength 0..1 with the direction sign). */
export function windToX(strength: number, direction: WindDirection): number {
  return (
    THREE.MathUtils.clamp(strength, 0, 1) * (direction === "east" ? 1 : -1)
  );
}

export function cloneWeatherParams(p: WeatherParams): WeatherParams {
  return {
    ...p,
    ambientColor: p.ambientColor.clone(),
    sunColor: p.sunColor.clone(),
    unlitTint: p.unlitTint.clone(),
    fogColor: p.fogColor.clone(),
    sandColor: p.sandColor.clone(),
    sandTint: p.sandTint.clone(),
    windowTint: p.windowTint.clone(),
    lightningColor: p.lightningColor.clone(),
  };
}
