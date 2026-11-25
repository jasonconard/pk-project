import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideCloudRain,
  LucideFlower,
  LucideLeaf,
  LucideMoon,
  LucideSnowflake,
  LucideSprout,
  LucideStar,
  LucideSun,
  LucideSunrise,
  LucideSunset,
  LucideX,
} from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
  signal,
} from "@angular/core";
import { EscapeService } from "../../../core/shared/service/escape.service";
import { GameService } from "../shared/services/game.service";
import {
  dateLabel,
  dateOf,
  dayNumberOf,
  gameCalendar,
  momentAt,
  momentHours,
  shortWeekday,
  specialDayFits,
  specialDaysOn,
} from "../shared/model/game-calendar";
import { DAY_TIMES, DbSpecialDay } from "../../database-editor/shared/database";

/** How many days ahead « À venir » looks. */
const AHEAD_DAYS = 60;
const AHEAD_MAX = 4;

/**
 * The Agenda (game menu, design/main-view.pen, Temps · Jeu · Agenda): a month of the game's calendar (today, the
 * special days marked), today's moments of the day, and the special days to come. Closed by the ✕, the backdrop or
 * Escape.
 */
@Component({
  selector: "game-agenda",
  imports: [
    LucideChevronLeft,
    LucideChevronRight,
    LucideCloudRain,
    LucideFlower,
    LucideLeaf,
    LucideMoon,
    LucideSnowflake,
    LucideSprout,
    LucideStar,
    LucideSun,
    LucideSunrise,
    LucideSunset,
    LucideX,
  ],
  templateUrl: "./agenda.component.html",
  styleUrl: "./agenda.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaComponent {
  readonly closed = output<void>();

  private readonly gameService = inject(GameService);
  protected readonly calendar = gameCalendar();
  protected readonly today = this.gameService.date;
  protected readonly todayText = computed(() =>
    dateLabel(this.today(), this.calendar, true)
  );
  protected readonly hourText = computed(() => {
    const hour = this.gameService.shownHour();
    const minutes = Math.floor((hour % 1) * 60);
    return `${Math.floor(hour)}:${String(minutes).padStart(2, "0")}`;
  });
  protected readonly weekNames = this.calendar.week.map(shortWeekday);

  /** The month shown (year, month index): today's first. */
  protected readonly shown = signal({
    year: this.today().year,
    month: this.today().month,
  });

  protected readonly monthTitle = computed(() => {
    const { year, month } = this.shown();
    return `${this.calendar.months[month]?.name ?? ""} · An ${year}`;
  });
  protected readonly monthIcon = computed(
    () => this.calendar.months[this.shown().month]?.icon ?? "star"
  );
  protected readonly monthColor = computed(
    () => this.calendar.months[this.shown().month]?.color ?? "#ffb04a"
  );

  /** The month's grid: weeks of the calendar's week, empty cells before the 1st and after the last day. */
  protected readonly weeks = computed(() => {
    const { year, month } = this.shown();
    const calendar = this.calendar;
    const first = dayNumberOf(year, month, 1, calendar);
    const days = calendar.months[month]?.days ?? 0;
    const width = Math.max(1, calendar.week.length);
    const offset = dateOf(first, calendar).weekday;
    const today = this.today();
    const cells: ({
      day: number;
      today: boolean;
      past: boolean;
      colors: string[];
    } | null)[] = Array.from({ length: offset }, () => null);
    for (let d = 1; d <= days; d++) {
      const date = dateOf(first + d - 1, calendar);
      const isToday =
        year === today.year && month === today.month && d === today.day;
      const past =
        year < today.year ||
        (year === today.year &&
          (month < today.month || (month === today.month && d < today.day)));
      cells.push({
        day: d,
        today: isToday,
        past,
        colors: specialDaysOn(date, calendar).map((sd) => sd.color),
      });
    }
    while (cells.length % width) {
      cells.push(null);
    }
    const rows = [];
    for (let i = 0; i < cells.length; i += width) {
      rows.push(cells.slice(i, i + width));
    }
    return rows;
  });

  /** Today's moments: their hours, the special days during them, the one now. */
  protected readonly moments = computed(() => {
    const calendar = this.calendar;
    const now = momentAt(this.gameService.shownHour(), calendar);
    const nowIndex = DAY_TIMES.findIndex((t) => t.id === now);
    const date = this.today();
    return DAY_TIMES.map((t, i) => {
      const hours = momentHours(t.id, calendar);
      return {
        id: t.id,
        label: t.label,
        hours: `${hours.from} h – ${hours.to} h`,
        now: t.id === now,
        past: i < nowIndex,
        specials: calendar.special
          .filter((sd) => sd.times.length > 0 && specialDayFits(sd, date, t.id))
          .map((sd) => sd.name)
          .join(", "),
      };
    });
  });

  /** Today's whole-day special days. */
  protected readonly todaySpecials = computed(() =>
    specialDaysOn(this.today(), this.calendar).filter(
      (sd) => sd.times.length === 0
    )
  );

  /** The next special days (after today). */
  protected readonly coming = computed(() => {
    const calendar = this.calendar;
    const start = this.gameService.day();
    const found: { when: string; special: DbSpecialDay }[] = [];
    for (let n = 1; n <= AHEAD_DAYS && found.length < AHEAD_MAX; n++) {
      const date = dateOf(start + n, calendar);
      for (const sd of specialDaysOn(date, calendar)) {
        if (
          found.length < AHEAD_MAX &&
          !found.some((f) => f.special.id === sd.id)
        ) {
          found.push({ when: dateLabel(date, calendar), special: sd });
        }
      }
    }
    return found;
  });

  constructor() {
    inject(EscapeService).whileAlive(() => this.closed.emit());
  }

  /** The month before (-1) or after (+1). */
  protected moveMonth(by: -1 | 1): void {
    const months = this.calendar.months.length;
    this.shown.update(({ year, month }) => {
      let m = month + by;
      let y = year;
      if (m < 0) {
        m = months - 1;
        y--;
      } else if (m >= months) {
        m = 0;
        y++;
      }
      return y < 1 ? { year, month } : { year: y, month: m };
    });
  }

  protected momentTimes(sd: DbSpecialDay): string {
    return sd.times
      .map((t) => DAY_TIMES.find((d) => d.id === t)?.label.toLowerCase())
      .join(", ");
  }
}
