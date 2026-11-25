import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from "@angular/core";
import {
  LucideBackpack,
  LucideClock,
  LucideCloudSun,
  LucideCoins,
  LucidePlus,
  LucideUsers,
  LucideVariable,
  LucideX,
  LucideCalendar,
  LucideCalendarDays,
  LucideHeart,
  LucideStar,
  LucideSunMoon,
} from "@lucide/angular";
import {
  ITEM_COUNT_MAX,
  MONEY_MAX,
} from "../../../database-editor/shared/party";
import { CalendarDay, EventConditions } from "../../shared/model/ObjectEvent";
import { VariableTest } from "../../shared/model/SceneEvent";
import {
  countConditions,
  counterValue,
  defaultTest,
  EventEditorData,
  fieldValue,
  weatherLabel,
  wholeNumber,
} from "../event-editor-data";

const COUNTER_TESTS: { op: VariableTest["op"]; label: string }[] = [
  { op: "eq", label: "=" },
  { op: "ne", label: "≠" },
  { op: "gte", label: "≥" },
  { op: "lte", label: "≤" },
];

import {
  DAY_TIMES,
  DayTime,
  LINK_MAX,
} from "../../../database-editor/shared/database";
import { shortWeekday } from "../../shared/model/game-calendar";
/**
 * Conditions that must all be true (the event's, or a condition action's): variables, hours, weathers, items carried,
 * money, team members. Gives back a changed copy; the weather window is opened by the event window (over it).
 */
@Component({
  selector: "game-event-conditions",
  imports: [
    LucideBackpack,
    LucideCalendar,
    LucideCalendarDays,
    LucideHeart,
    LucideStar,
    LucideSunMoon,
    LucideClock,
    LucideCloudSun,
    LucideCoins,
    LucidePlus,
    LucideUsers,
    LucideVariable,
    LucideX,
  ],
  templateUrl: "./event-conditions.component.html",
  styleUrl: "./event-conditions.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventConditionsComponent {
  readonly conditions = input.required<EventConditions>();
  /** Said when there is no condition. */
  readonly empty = input("");
  readonly changed = output<EventConditions>();
  /** The weather window, without these weathers (already chosen). */
  readonly pickWeather = output<string[]>();

  protected readonly data = inject(EventEditorData);
  protected readonly counterTests = COUNTER_TESTS;
  protected readonly hourList = Array.from({ length: 24 }, (_, h) => h);
  protected readonly countMax = ITEM_COUNT_MAX;
  protected readonly moneyMax = MONEY_MAX;
  protected readonly value = fieldValue;
  protected readonly counterValue = counterValue;
  protected readonly wholeNumber = wholeNumber;
  protected readonly weatherLabel = weatherLabel;
  protected readonly countConditions = countConditions;

  /** Gives back a changed copy. */
  private change(fn: (c: EventConditions) => void): void {
    const copy = structuredClone(this.conditions());
    fn(copy);
    this.changed.emit(copy);
  }

  // Variables

  protected addVariableTest(): void {
    const first = this.data.variables[0];
    if (first) {
      this.change((c) => c.variables.push(defaultTest(first)));
    }
  }

  /** Another variable: its kind decides the test. */
  protected setTestVariable(index: number, id: string): void {
    const variable = this.data.variable(id);
    if (variable) {
      this.change((c) => (c.variables[index] = defaultTest(variable)));
    }
  }

  protected setTest(index: number, test: Partial<VariableTest>): void {
    this.change(
      (c) => (c.variables[index] = { ...c.variables[index], ...test })
    );
  }

  protected removeTest(index: number): void {
    this.change((c) => c.variables.splice(index, 1));
  }

  // Hours, weathers

  protected setHours(hours: { from: number; to: number } | undefined): void {
    this.change((c) => {
      if (hours) {
        c.hours = hours;
      } else {
        delete c.hours;
      }
    });
  }

  protected removeWeather(type: string): void {
    this.change((c) => {
      c.weathers = (c.weathers ?? []).filter((w) => w !== type);
      if (c.weathers.length === 0) {
        delete c.weathers;
      }
    });
  }

  // The calendar: days of the week, dates, moments, special days

  protected readonly dayTimes = DAY_TIMES;
  protected readonly shortDay = shortWeekday;

  protected clear(key: "weekdays" | "dates" | "moments" | "specials"): void {
    this.change((c) => delete c[key]);
  }

  /** Adds or removes a value of a list condition (an empty list: the condition goes). */
  private toggleIn<K extends "weekdays" | "moments" | "specials">(
    key: K,
    value: NonNullable<EventConditions[K]>[number]
  ): void {
    this.change((c) => {
      const list = (c[key] ?? []) as (typeof value)[];
      const next = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];
      if (next.length > 0) {
        (c as Record<K, unknown>)[key] = next;
      } else {
        delete c[key];
      }
    });
  }

  protected toggleWeekday(index: number): void {
    this.toggleIn("weekdays", index);
  }

  protected toggleMoment(time: DayTime): void {
    this.toggleIn("moments", time);
  }

  protected toggleSpecial(id: string): void {
    this.toggleIn("specials", id);
  }

  protected addWeekdays(): void {
    const week = this.data.calendar.week.length;
    // (the weekend of a 7 days week, else the last day)
    this.change(
      (c) => (c.weekdays = week === 7 ? [5, 6] : [Math.max(0, week - 1)])
    );
  }

  protected addDates(): void {
    this.change(
      (c) =>
        (c.dates = { from: { month: 0, day: 1 }, to: { month: 0, day: 7 } })
    );
  }

  protected addMoments(): void {
    this.change((c) => (c.moments = ["evening"]));
  }

  protected addSpecials(): void {
    const first = this.data.calendar.special[0];
    if (first) {
      this.change((c) => (c.specials = [first.id]));
    }
  }

  protected setDate(end: "from" | "to", patch: Partial<CalendarDay>): void {
    this.change((c) => {
      if (c.dates) {
        const next = { ...c.dates[end], ...patch };
        const days = this.data.calendar.months[next.month]?.days ?? 1;
        next.day = Math.min(next.day, days);
        c.dates = { ...c.dates, [end]: next };
      }
    });
  }

  protected daysOf(month: number): number[] {
    const days = this.data.calendar.months[month]?.days ?? 1;
    return Array.from({ length: days }, (_, i) => i + 1);
  }

  // Social links

  protected readonly linkLevels = Array.from(
    { length: LINK_MAX },
    (_, i) => i + 1
  );

  protected addLink(): void {
    const first = this.data.linkTargets[0];
    if (first) {
      this.change(
        (c) => (c.links = [...(c.links ?? []), { id: first.id, level: 1 }])
      );
    }
  }

  protected setLink(
    index: number,
    patch: { id?: string; level?: number }
  ): void {
    this.change((c) => {
      if (c.links?.[index]) {
        c.links[index] = { ...c.links[index], ...patch };
      }
    });
  }

  protected removeLink(index: number): void {
    this.change((c) => {
      c.links?.splice(index, 1);
      if (!c.links?.length) {
        delete c.links;
      }
    });
  }

  // The team: items carried, money, members

  protected addItemTest(): void {
    const first = this.data.db.items[0];
    if (first) {
      this.change(
        (c) => (c.items = [...(c.items ?? []), { id: first.id, count: 1 }])
      );
    }
  }

  protected setItemTest(
    index: number,
    change: Partial<{ id: string; count: number }>
  ): void {
    this.change((c) => (c.items![index] = { ...c.items![index], ...change }));
  }

  protected removeItemTest(index: number): void {
    this.change((c) => {
      c.items!.splice(index, 1);
      if (c.items!.length === 0) {
        delete c.items;
      }
    });
  }

  protected setMoneyTest(money: number | undefined): void {
    this.change((c) => {
      if (money) {
        c.money = money;
      } else {
        delete c.money;
      }
    });
  }

  protected addMemberTest(): void {
    const first = this.data.teamCharacters[0];
    if (first) {
      this.change((c) => (c.members = [...(c.members ?? []), first.id]));
    }
  }

  protected setMemberTest(index: number, id: string): void {
    this.change((c) => (c.members![index] = id));
  }

  protected removeMemberTest(index: number): void {
    this.change((c) => {
      c.members!.splice(index, 1);
      if (c.members!.length === 0) {
        delete c.members;
      }
    });
  }
}
