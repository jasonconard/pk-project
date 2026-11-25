import {
  LucideArrowDown,
  LucideArrowUp,
  LucideCloudRain,
  LucideFlower,
  LucideInfo,
  LucideLeaf,
  LucideMoon,
  LucidePlus,
  LucideSnowflake,
  LucideSprout,
  LucideStar,
  LucideSun,
  LucideX,
} from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from "@angular/core";
import {
  CALENDAR_LIMITS,
  CALENDAR_SHAPES,
  CalendarShape,
  calendarShape,
  clampInt,
  DAY_TIMES,
  DayTime,
  DbCalendar,
  DbMonth,
  DbSpecialDay,
  MONTH_ICONS,
  newSpecialDay,
  SPECIAL_REPEATS,
  SpecialRepeat,
} from "../../shared/database";
import { DbSheet } from "../../shared/db-sheet";
import { StepperComponent } from "../../stepper/stepper.component";

/** Colors offered to a new month or special day (in turn). */
const COLORS = [
  "#7fd18b",
  "#f4c06a",
  "#e8895a",
  "#7db7e8",
  "#ffb04a",
  "#ff6a5a",
];

/**
 * The sheet of the game's calendar (design/database.pen, 13 · Calendrier): its shape (week, months or seasons, a
 * ready-made one), the start of a game, the day's length, the moments of the day, the special days.
 */
@Component({
  selector: "db-calendar-sheet",
  imports: [
    StepperComponent,
    LucideArrowDown,
    LucideArrowUp,
    LucideCloudRain,
    LucideFlower,
    LucideInfo,
    LucideLeaf,
    LucideMoon,
    LucidePlus,
    LucideSnowflake,
    LucideSprout,
    LucideStar,
    LucideSun,
    LucideX,
  ],
  templateUrl: "./calendar-sheet.component.html",
  styleUrl: "./calendar-sheet.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarSheetComponent extends DbSheet {
  readonly calendar = input.required<DbCalendar>();

  protected readonly limits = CALENDAR_LIMITS;
  protected readonly shapes = Object.entries(CALENDAR_SHAPES) as [
    CalendarShape,
    (typeof CALENDAR_SHAPES)[CalendarShape],
  ][];
  protected readonly monthIcons = MONTH_ICONS;
  protected readonly repeats = SPECIAL_REPEATS;
  protected readonly times = DAY_TIMES;

  protected readonly shape = computed(() => calendarShape(this.calendar()));
  protected readonly yearDays = computed(() =>
    this.calendar().months.reduce((sum, m) => sum + m.days, 0)
  );

  /** The 24 hours split in moments (from the moments' start hours), for the bar. */
  protected readonly dayBar = computed(() => {
    const moments = this.calendar().moments;
    const starts = DAY_TIMES.map((t) => ({ id: t.id, hour: moments[t.id] }));
    // (the moment started last before this hour; before the first start: the last moment, from the day before)
    const momentAt = (hour: number): DayTime => {
      let found = starts[0];
      let best = -Infinity;
      for (const s of starts) {
        const since = (hour - s.hour + 24) % 24;
        if (-since > best) {
          best = -since;
          found = s;
        }
      }
      return found.id;
    };
    return Array.from({ length: 24 }, (_, hour) => momentAt(hour));
  });

  /** The ready-made shape touched once (a second touch within 3 s replaces the week and the months). */
  protected readonly replacing = signal<CalendarShape | null>(null);
  private replaceTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    super();
    inject(DestroyRef).onDestroy(() => clearTimeout(this.replaceTimer));
  }

  private change(edit: (calendar: DbCalendar) => DbCalendar): void {
    this.edit(this.calendar().id, (row) => edit(row as DbCalendar));
  }

  /** The start of a game and the special days kept within the new shape. */
  private fitted(calendar: DbCalendar): DbCalendar {
    const months = calendar.months.length;
    const weekDays = calendar.week.length;
    const fitDate = (month: number, day: number) => {
      const m = clampInt(month, 0, months - 1);
      return { month: m, day: clampInt(day, 1, calendar.months[m].days) };
    };
    return {
      ...calendar,
      start: {
        ...calendar.start,
        ...fitDate(calendar.start.month, calendar.start.day),
      },
      firstWeekday: clampInt(calendar.firstWeekday, 0, weekDays - 1),
      special: calendar.special.map((sd) => ({
        ...sd,
        // (« each month »: up to the longest month)
        ...(sd.repeat === "month"
          ? { day: clampInt(sd.day, 1, this.longestMonth(calendar)) }
          : fitDate(sd.month, sd.day)),
        weekday: clampInt(sd.weekday, 0, weekDays - 1),
      })),
    };
  }

  protected useShape(shape: CalendarShape): void {
    clearTimeout(this.replaceTimer);
    if (this.shape() === shape) {
      return;
    }
    if (this.replacing() !== shape) {
      this.replacing.set(shape);
      this.replaceTimer = setTimeout(() => this.replacing.set(null), 3000);
      return;
    }
    this.replacing.set(null);
    this.change((c) =>
      this.fitted({
        ...c,
        week: [...CALENDAR_SHAPES[shape].week],
        months: structuredClone(CALENDAR_SHAPES[shape].months),
      })
    );
  }

  // --- The week ---

  protected setWeekDays(count: number): void {
    this.change((c) => {
      const week = c.week.slice(0, count);
      while (week.length < count) {
        week.push(`Jour ${week.length + 1}`);
      }
      return this.fitted({ ...c, week });
    });
  }

  protected renameDay(index: number, name: string): void {
    this.change((c) => ({
      ...c,
      week: c.week.map((d, i) => (i === index ? name : d)),
    }));
  }

  // --- The months ---

  protected setMonth(index: number, patch: Partial<DbMonth>): void {
    this.change((c) =>
      this.fitted({
        ...c,
        months: c.months.map((m, i) => (i === index ? { ...m, ...patch } : m)),
      })
    );
  }

  protected addMonth(): void {
    this.change((c) => ({
      ...c,
      months: [
        ...c.months,
        {
          name: `Mois ${c.months.length + 1}`,
          days: c.months.at(-1)?.days ?? 30,
          color: COLORS[c.months.length % COLORS.length],
          icon: "star",
        },
      ],
    }));
  }

  protected removeMonth(index: number): void {
    this.change((c) =>
      this.fitted({ ...c, months: c.months.filter((_, i) => i !== index) })
    );
  }

  /** A month one place up (-1) or down (+1); the dates pointing to the months follow them. */
  protected moveMonth(index: number, by: -1 | 1): void {
    const to = index + by;
    this.change((c) => {
      if (to < 0 || to >= c.months.length) {
        return c;
      }
      const months = [...c.months];
      [months[index], months[to]] = [months[to], months[index]];
      const swap = (m: number) => {
        if (m === index) {
          return to;
        }
        return m === to ? index : m;
      };
      return {
        ...c,
        months,
        start: { ...c.start, month: swap(c.start.month) },
        special: c.special.map((sd) => ({ ...sd, month: swap(sd.month) })),
      };
    });
  }

  // --- The start, the day ---

  protected setStart(patch: Partial<DbCalendar["start"]>): void {
    this.change((c) => this.fitted({ ...c, start: { ...c.start, ...patch } }));
  }

  protected setFirstWeekday(weekday: number): void {
    this.change((c) => ({ ...c, firstWeekday: weekday }));
  }

  protected setDayMinutes(minutes: number): void {
    this.change((c) => ({ ...c, dayMinutes: minutes }));
  }

  protected setMoment(time: DayTime, hour: number): void {
    this.change((c) => ({ ...c, moments: { ...c.moments, [time]: hour } }));
  }

  // --- The special days ---

  protected setSpecial(id: string, patch: Partial<DbSpecialDay>): void {
    this.change((c) =>
      this.fitted({
        ...c,
        special: c.special.map((sd) =>
          sd.id === id ? { ...sd, ...patch } : sd
        ),
      })
    );
  }

  protected setRepeat(id: string, repeat: string): void {
    this.setSpecial(id, { repeat: repeat as SpecialRepeat });
  }

  /** A moment more or less (none: the whole day). */
  protected toggleTime(sd: DbSpecialDay, time: DayTime): void {
    const times = sd.times.includes(time)
      ? sd.times.filter((t) => t !== time)
      : DAY_TIMES.map((t) => t.id).filter(
          (t) => t === time || sd.times.includes(t)
        );
    this.setSpecial(sd.id, { times });
  }

  protected addSpecial(): void {
    this.change((c) => ({
      ...c,
      special: [
        ...c.special,
        newSpecialDay(
          "Nouveau jour spécial",
          COLORS[c.special.length % COLORS.length]
        ),
      ],
    }));
  }

  protected removeSpecial(id: string): void {
    this.change((c) => ({
      ...c,
      special: c.special.filter((sd) => sd.id !== id),
    }));
  }

  private longestMonth(calendar: DbCalendar): number {
    return Math.max(...calendar.months.map((m) => m.days));
  }

  /** 1 … the month's days (the selects of a date; -1: the longest month). */
  protected daysOf(month: number): number[] {
    const calendar = this.calendar();
    const days =
      month < 0
        ? this.longestMonth(calendar)
        : (calendar.months[month]?.days ?? 1);
    return Array.from({ length: days }, (_, i) => i + 1);
  }

  protected momentColor(time: DayTime): string {
    return {
      morning: "#f4c06a",
      afternoon: "#7db7e8",
      evening: "#e8895a",
      night: "#2b3157",
    }[time];
  }
}
