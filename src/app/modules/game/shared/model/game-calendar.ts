import { cachedFromStorage } from "../../../../core/shared/local-store";
import {
  DATABASE_KEY,
  loadDatabase,
} from "../../../database-editor/shared/database-storage";
import {
  DAY_TIMES,
  DayTime,
  DbCalendar,
  DbSpecialDay,
  newCalendar,
} from "../../../database-editor/shared/database";

/**
 * The game's calendar (database, table « calendar », docs/editeur/10-base-de-donnees.md): the game's date is a day
 * number (0: the 1st day of the 1st month of year 1), its date, day of the week, moment and special days come from
 * the calendar's shape.
 */
export const gameCalendar = cachedFromStorage(
  [DATABASE_KEY],
  (): DbCalendar => loadDatabase().calendar[0] ?? newCalendar()
);

export interface GameDate {
  /** From 1. */
  year: number;
  /** Index in the calendar's months. */
  month: number;
  /** From 1. */
  day: number;
  /** Index in the calendar's week. */
  weekday: number;
}

export function yearLength(calendar: DbCalendar): number {
  return Math.max(
    1,
    calendar.months.reduce((sum, m) => sum + m.days, 0)
  );
}

/** The date of a day number (0: year 1, first month, 1st). */
export function dateOf(dayNumber: number, calendar: DbCalendar): GameDate {
  const days = Math.max(0, Math.floor(dayNumber));
  const length = yearLength(calendar);
  let rest = days % length;
  let month = 0;
  while (
    month < calendar.months.length - 1 &&
    rest >= calendar.months[month].days
  ) {
    rest -= calendar.months[month].days;
    month++;
  }
  const week = Math.max(1, calendar.week.length);
  return {
    year: Math.floor(days / length) + 1,
    month,
    day: rest + 1,
    weekday: (calendar.firstWeekday + days) % week,
  };
}

/** The day number of a date. */
export function dayNumberOf(
  year: number,
  month: number,
  day: number,
  calendar: DbCalendar
): number {
  let days = (Math.max(1, year) - 1) * yearLength(calendar);
  for (let m = 0; m < Math.min(month, calendar.months.length); m++) {
    days += calendar.months[m].days;
  }
  return days + Math.max(1, day) - 1;
}

/** The day a new game starts on. */
export function startDayNumber(calendar: DbCalendar): number {
  return dayNumberOf(1, calendar.start.month, calendar.start.day, calendar);
}

/** The moment of the day at this hour (the moment started last). */
export function momentAt(hour: number, calendar: DbCalendar): DayTime {
  let found: DayTime = "night";
  let since = Infinity;
  for (const t of DAY_TIMES) {
    const s = (hour - calendar.moments[t.id] + 24) % 24;
    if (s < since) {
      since = s;
      found = t.id;
    }
  }
  return found;
}

/** The hours a moment lasts (from its start to the next moment's). */
export function momentHours(
  moment: DayTime,
  calendar: DbCalendar
): { from: number; to: number } {
  const from = calendar.moments[moment];
  const next = DAY_TIMES.map((t) => calendar.moments[t.id])
    .filter((h) => h !== from)
    .map((h) => ({ h, after: (h - from + 24) % 24 }))
    .sort((a, b) => a.after - b.after)[0];
  return { from, to: next ? next.h : from };
}

export function momentLabel(moment: DayTime): string {
  return DAY_TIMES.find((t) => t.id === moment)?.label ?? "";
}

/** « Ven. » (the 3 first letters of the day's name). */
export function shortWeekday(name: string): string {
  return name.length > 4 ? `${name.slice(0, 3)}.` : name;
}

/** « Ven. 5 printemps », or « Vendredi 5 printemps » (long), « … · An 2 » after the first year. */
export function dateLabel(
  date: GameDate,
  calendar: DbCalendar,
  long = false
): string {
  const weekday = calendar.week[date.weekday] ?? "";
  const month = (calendar.months[date.month]?.name ?? "").toLowerCase();
  const day = long ? weekday : shortWeekday(weekday);
  const year = date.year > 1 ? ` · An ${date.year}` : "";
  // (« 1er », as in French dates)
  const number = date.day === 1 ? "1er" : String(date.day);
  return `${day} ${number} ${month}${year}`.trim();
}

/** Is it this special day on that date (and, if given, at that moment)? */
export function specialDayFits(
  special: DbSpecialDay,
  date: GameDate,
  moment?: DayTime
): boolean {
  if (moment && special.times.length > 0 && !special.times.includes(moment)) {
    return false;
  }
  switch (special.repeat) {
    case "year":
      return special.month === date.month && special.day === date.day;
    case "month":
      return special.day === date.day;
    case "week":
      return special.weekday === date.weekday;
  }
}

/** The special days of a date. */
export function specialDaysOn(
  date: GameDate,
  calendar: DbCalendar
): DbSpecialDay[] {
  return calendar.special.filter((sd) => specialDayFits(sd, date));
}

/** What the banner says when a moment starts. */
export const MOMENT_TITLES: Record<DayTime, string> = {
  morning: "Le jour se lève",
  afternoon: "C'est l'après-midi",
  evening: "Le soir tombe",
  night: "La nuit tombe",
};
