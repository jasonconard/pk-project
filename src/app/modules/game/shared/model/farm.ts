import {
  cachedFromStorage,
  readJson,
  writeJson,
} from "../../../../core/shared/local-store";
import {
  daysToRipe,
  DbCrop,
  GameDatabase,
} from "../../../database-editor/shared/database";
import { WeatherType } from "../weather/Weather";
import { dateOf, gameCalendar } from "./game-calendar";

/**
 * The crops in the game being played (docs/editeur/17-cultures.md; kept in the browser like the team, copied in a
 * saved game): the cells of farmland tilled on each map and what grows there, and what the weather did each day
 * (rain waters every crop, frost hurts those that fear it, some weathers make a crop grow faster). The days are
 * counted when the game's day changes (`advanceFarm`).
 */
export const FARM_KEY = "pk-farm";

/** A tilled cell, and its crop if one is planted. */
export interface Plot {
  /** The crop (database id); none: tilled soil. */
  crop?: string;
  /** Watered days counted since it was planted (with the weathers' bonus). */
  growth: number;
  /** The day it was last watered by the player. */
  watered?: number;
  /** Hurt by frost once (the next frost kills it). */
  wilted?: boolean;
  dead?: boolean;
}

/** What the weather did on a day (any time of it). */
export interface FarmDay {
  rain?: boolean;
  frost?: boolean;
  /** The weathers seen that day (the crops' faster growth). */
  weathers?: string[];
}

export interface FarmState {
  /** The last day counted (none: a new game, set on the first update). */
  day?: number;
  /** Map id → `<chunk>:<col>,<row>` → its plot. */
  plots: Record<string, Record<string, Plot>>;
  /** Day → its weather. Only the last few days are kept. */
  days: Record<number, FarmDay>;
}

const RAIN = new Set<string>([
  WeatherType.DRIZZLE,
  WeatherType.AUTUMN_DRIZZLE,
  WeatherType.SPRING_SHOWER,
  WeatherType.FREEZING_RAIN,
  WeatherType.HAIL,
  WeatherType.RAINY,
  WeatherType.STORM,
  WeatherType.THUNDER_RAIN,
  WeatherType.MONSOON,
  WeatherType.FLOOD,
  WeatherType.BLOOD_RAIN,
  WeatherType.ACID_RAIN,
]);

const FROST = new Set<string>([
  WeatherType.DEEP_FREEZE,
  WeatherType.FREEZING_RAIN,
  WeatherType.HAIL,
  WeatherType.SNOW,
  WeatherType.MAGIC_SNOW,
  WeatherType.BLIZZARD,
  WeatherType.FROST,
]);

function emptyFarm(): FarmState {
  return { plots: {}, days: {} };
}

function readFarm(): FarmState {
  const state = readJson<FarmState>(FARM_KEY);
  return state?.plots && state.days ? state : emptyFarm();
}

export const currentFarm = cachedFromStorage([FARM_KEY], readFarm);

export function writeFarm(state: FarmState): void {
  writeJson(FARM_KEY, state);
}

/** A saved game's crops put back (null: a new game). */
export function restoreFarm(state: FarmState | null | undefined): void {
  writeFarm(state?.plots ? structuredClone(state) : emptyFarm());
}

export function plotKey(chunk: string, col: number, row: number): string {
  return `${chunk}:${col},${row}`;
}

/** Changes the plots of a map (a copy is written). */
export function changePlots(
  map: string,
  change: (plots: Record<string, Plot>) => void
): void {
  const state = structuredClone(currentFarm());
  const plots = state.plots[map] ?? {};
  change(plots);
  state.plots[map] = plots;
  writeFarm(state);
}

/** The weather now, noted for today (written only when something new is seen). */
export function noteWeather(day: number, weather: string): void {
  const state = currentFarm();
  const seen = state.days[day] ?? {};
  const rain = RAIN.has(weather);
  const frost = FROST.has(weather);
  if (
    seen.weathers?.includes(weather) &&
    (!rain || seen.rain) &&
    (!frost || seen.frost)
  ) {
    return;
  }
  const next = structuredClone(state);
  next.days[day] = {
    ...seen,
    ...(rain ? { rain: true } : {}),
    ...(frost ? { frost: true } : {}),
    weathers: [...(seen.weathers ?? []), weather],
  };
  writeFarm(next);
}

/** Is the plot watered today (by the player or the rain)? */
export function isWatered(plot: Plot, day: number): boolean {
  return plot.watered === day || !!currentFarm().days[day]?.rain;
}

/** Does the crop grow in the month of that day? */
export function inSeason(crop: DbCrop, day: number): boolean {
  return (
    crop.months.length === 0 ||
    crop.months.includes(dateOf(day, gameCalendar()).month)
  );
}

/** Its growth stage now (0 seeds … 3 ripe). */
export function stageOf(plot: Plot, crop: DbCrop): number {
  let left = plot.growth;
  for (let i = 0; i < crop.stages.length - 1; i++) {
    left -= crop.stages[i].days;
    if (left < 0) {
      return i;
    }
  }
  return crop.stages.length - 1;
}

export function isRipe(plot: Plot, crop: DbCrop): boolean {
  return plot.growth >= daysToRipe(crop);
}

/** Watered days still needed. */
export function daysLeft(plot: Plot, crop: DbCrop): number {
  return Math.max(0, daysToRipe(crop) - plot.growth);
}

/** The end of a day for a plot: out of season it dies, frost hurts, a watered day makes it grow. */
function endOfDay(
  plot: Plot,
  crop: DbCrop | undefined,
  day: number,
  weather: FarmDay
): void {
  if (!plot.crop || plot.dead) {
    return;
  }
  if (!crop || !inSeason(crop, day)) {
    plot.dead = true;
    return;
  }
  if (weather.frost && crop.fearsFrost) {
    if (plot.wilted) {
      plot.dead = true;
    } else {
      plot.wilted = true;
    }
    return;
  }
  if (plot.watered === day || weather.rain) {
    const bonus = Math.max(
      0,
      ...crop.weathers
        .filter((w) => weather.weathers?.includes(w.weather))
        .map((w) => w.days)
    );
    plot.growth = Math.min(daysToRipe(crop), plot.growth + 1 + bonus);
    delete plot.wilted;
  }
}

/** The days gone by since the last update are counted on every plot (the game's day changed). */
export function advanceFarm(today: number, db: GameDatabase): void {
  const state = currentFarm();
  if (state.day === today) {
    return;
  }
  const next = structuredClone(state);
  // (a new game, or days going back: nothing to count)
  const from = next.day === undefined || next.day > today ? today : next.day;
  for (let day = from; day < today; day++) {
    const weather = next.days[day] ?? {};
    for (const plots of Object.values(next.plots)) {
      for (const plot of Object.values(plots)) {
        endOfDay(
          plot,
          db.crops.find((c) => c.id === plot.crop),
          day,
          weather
        );
      }
    }
  }
  next.day = today;
  for (const day of Object.keys(next.days).map(Number)) {
    if (day < today - 1) {
      delete next.days[day];
    }
  }
  writeFarm(next);
}
