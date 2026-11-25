import { LucideInfo, LucidePlus, LucideX } from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import {
  DAY_TIMES,
  DayTime,
  DbNpc,
  newCalendar,
  newId,
  NpcException,
  NpcSchedule,
} from "../shared/database";
import { DbSheet } from "../shared/db-sheet";
import { newSchedule, npcPlaces } from "../../game/shared/model/npc-schedule";

/** The places' colors, in turn. */
const PLACE_COLORS = [
  "#e8895a",
  "#f4c06a",
  "#7fd18b",
  "#7db7e8",
  "#c58af0",
  "#ff6a5a",
];

/**
 * An NPC's schedule (design/database.pen, 14 · PNJ · Emploi du temps): where it is each day of the calendar's week and
 * moment of the day, and on special days. Its places are the NPC put on the maps (map editor, tab PNJ).
 */
@Component({
  selector: "db-schedule-field",
  imports: [LucideInfo, LucidePlus, LucideX],
  templateUrl: "./schedule-field.component.html",
  styleUrl: "./schedule-field.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleFieldComponent extends DbSheet {
  readonly npc = input.required<DbNpc>();

  protected readonly times = DAY_TIMES;
  protected readonly calendar = computed(
    () => this.db().calendar[0] ?? newCalendar()
  );
  /** Where it is put on the maps (read once per NPC). */
  protected readonly places = computed(() =>
    npcPlaces(this.npc().id).map((p, i) => ({
      ...p,
      color: PLACE_COLORS[i % PLACE_COLORS.length],
    }))
  );
  /** The schedule's rows, one per day of the calendar's week (missing ones: absent). */
  protected readonly rows = computed(() => {
    const schedule = this.npc().schedule;
    return this.calendar().week.map((name, d) => ({
      name,
      cells: DAY_TIMES.map((_, m) => schedule?.week[d]?.[m] ?? null),
    }));
  });

  private change(
    edit: (schedule: NpcSchedule) => NpcSchedule | undefined
  ): void {
    this.edit(this.npc().id, (row) => {
      const npc = row as DbNpc;
      const next = edit(
        npc.schedule ?? newSchedule(this.places()[0]?.key ?? null)
      );
      const copy = { ...npc };
      if (next) {
        copy.schedule = next;
      } else {
        delete copy.schedule;
      }
      return copy;
    });
  }

  protected setFollows(on: boolean): void {
    this.change((s) => (on ? s : undefined));
  }

  protected setCell(day: number, moment: number, place: string): void {
    this.change((s) => {
      const week = this.rows().map((r) => [...r.cells]);
      week[day][moment] = place || null;
      return { ...s, week };
    });
  }

  /** A whole day at the same place (the day's name touched). */
  protected fillDay(day: number): void {
    this.change((s) => {
      const week = this.rows().map((r) => [...r.cells]);
      week[day] = DAY_TIMES.map(() => week[day][0]);
      return { ...s, week };
    });
  }

  protected addException(): void {
    const special = this.calendar().special[0];
    if (special) {
      this.change((s) => ({
        ...s,
        exceptions: [
          ...s.exceptions,
          { id: newId("ex"), special: special.id, times: [], place: null },
        ],
      }));
    }
  }

  protected setException(id: string, patch: Partial<NpcException>): void {
    this.change((s) => ({
      ...s,
      exceptions: s.exceptions.map((e) =>
        e.id === id ? { ...e, ...patch } : e
      ),
    }));
  }

  protected toggleExceptionTime(e: NpcException, time: DayTime): void {
    const times = e.times.includes(time)
      ? e.times.filter((t) => t !== time)
      : DAY_TIMES.map((t) => t.id).filter(
          (t) => t === time || e.times.includes(t)
        );
    this.setException(e.id, { times });
  }

  protected removeException(id: string): void {
    this.change((s) => ({
      ...s,
      exceptions: s.exceptions.filter((e) => e.id !== id),
    }));
  }

  protected placeColor(key: string | null): string | null {
    return this.places().find((p) => p.key === key)?.color ?? null;
  }

  /** The place's short name (its name on the map, else « place n »). */
  protected placeShort(key: string | null): string {
    if (!key) {
      return "—";
    }
    const label = this.places().find((p) => p.key === key)?.label;
    return label ? (label.split(" · ").at(-1) ?? label) : "?";
  }
}
