import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  linkedSignal,
  output,
  signal,
  untracked,
} from "@angular/core";
import {
  LucideBackpack,
  LucideCalendarClock,
  LucideClapperboard,
  LucideCopy,
  LucideFlag,
  LucideFlaskConical,
  LucideHeartHandshake,
  LucideMinus,
  LucidePlay,
  LucidePlus,
  LucideTrash,
  LucideUsers,
  LucideX,
} from "@lucide/angular";
import { EscapeService } from "../../../../core/shared/service/escape.service";
import {
  DAY_TIMES,
  DayTime,
  LINK_MAX,
} from "../../../database-editor/shared/database";
import { loadDatabase } from "../../../database-editor/shared/database-storage";
import { linkTargets } from "../../../database-editor/shared/links";
import {
  ITEM_COUNT_MAX,
  MONEY_MAX,
} from "../../../database-editor/shared/party";
import { loadVariables } from "../../../variables-editor/shared/variable-storage";
import {
  clampCounter,
  GameVariable,
} from "../../../variables-editor/shared/variables";
import { VariableValue } from "../../../variables-editor/shared/variable-values";
import { cutsceneKey } from "../../shared/model/cutscene-seen";
import {
  dateLabel,
  dateOf,
  gameCalendar,
} from "../../shared/model/game-calendar";
import { TestPreset } from "../../shared/model/test-preset";
import { listMaps, loadMap } from "../../shared/services/map-storage";
import { TestModeService } from "../../shared/services/test-mode.service";
import { WEATHER_CHOICES, WeatherType } from "../../shared/weather/Weather";

/** Variables shown before « Voir les N variables ». */
const FEW_VARIABLES = 6;

type ArmedAction = "remove" | "reset";

/**
 * A named test's settings (design/main-view.pen, Mode test): the day, moment and weather, the variables, the team,
 * the bag and money, the links and the cutscenes seen it starts with. Every change is kept at once. Full screen on
 * a phone; on a wide screen the saved tests are listed on the left. Closed by the ✕, the backdrop or Escape.
 */
@Component({
  selector: "game-test-settings",
  imports: [
    LucideBackpack,
    LucideCalendarClock,
    LucideClapperboard,
    LucideCopy,
    LucideFlag,
    LucideFlaskConical,
    LucideHeartHandshake,
    LucideMinus,
    LucidePlay,
    LucidePlus,
    LucideTrash,
    LucideUsers,
    LucideX,
  ],
  templateUrl: "./test-settings.component.html",
  styleUrl: "./test-settings.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestSettingsComponent {
  readonly testId = input.required<string>();
  readonly closed = output<void>();

  protected readonly testMode = inject(TestModeService);

  /** The test edited (the wide screen's list changes it). */
  protected readonly selected = linkedSignal(() => this.testId());
  protected readonly test = computed(() =>
    this.testMode.tests().find((t) => t.id === this.selected())
  );

  private readonly db = loadDatabase();
  protected readonly characters = this.db.characters;
  protected readonly items = this.db.items;
  protected readonly links = linkTargets(this.db);
  protected readonly variables = loadVariables();
  protected readonly dayTimes = DAY_TIMES;
  protected readonly weathers = WEATHER_CHOICES;
  protected readonly linkMax = LINK_MAX;
  protected readonly moneyMax = MONEY_MAX;

  private readonly maps = listMaps();
  /** Every cutscene of every map (« Une seule fois » ones: the others always play). */
  protected readonly cutscenes = this.maps.flatMap((m) =>
    (loadMap(m.id)?.cutscenes ?? [])
      .filter((c) => c.once)
      .map((c) => ({
        key: cutsceneKey(m.id, c.id),
        name: c.name,
        map: m.name,
      }))
  );

  protected readonly mapName = computed(() => {
    const map = this.test()?.map;
    return this.maps.find((m) => m.id === map)?.name ?? map ?? "";
  });

  protected readonly dateText = computed(() => {
    const calendar = gameCalendar();
    return dateLabel(dateOf(this.test()?.day ?? 0, calendar), calendar);
  });

  protected readonly changedCount = computed(
    () => this.variables.filter((v) => this.isChanged(v)).length
  );
  protected readonly allVariables = signal(false);
  /** The changed variables first (the order taken when the test is opened, so rows don't jump). */
  private readonly variableOrder = computed(() => {
    this.selected();
    return untracked(() => [
      ...this.variables.filter((v) => this.isChanged(v)),
      ...this.variables.filter((v) => !this.isChanged(v)),
    ]);
  });
  protected readonly shownVariables = computed(() => {
    const order = this.variableOrder();
    return this.allVariables() || order.length <= FEW_VARIABLES
      ? order
      : order.slice(0, Math.max(FEW_VARIABLES, this.changedCount()));
  });

  protected readonly bag = computed(() => {
    const items = this.test()?.items ?? {};
    return this.items
      .filter((i) => (items[i.id] ?? 0) > 0)
      .map((i) => ({ id: i.id, name: i.name, count: items[i.id] }));
  });
  protected readonly addable = computed(() => {
    const items = this.test()?.items ?? {};
    return this.items.filter((i) => !items[i.id]);
  });
  /** The « + Objet » select is shown. */
  protected readonly adding = signal(false);

  protected readonly armed = signal<ArmedAction | null>(null);
  private armTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(EscapeService).whileAlive(() => this.closed.emit());
    inject(DestroyRef).onDestroy(() => clearTimeout(this.armTimer));
  }

  protected change(change: Partial<TestPreset>): void {
    const test = this.test();
    if (test) {
      this.testMode.updateTest({ ...test, ...change });
    }
  }

  protected rename(value: string, input: HTMLInputElement): void {
    const name = value.trim();
    if (name) {
      this.change({ name });
    } else {
      input.value = this.test()?.name ?? "";
    }
  }

  protected select(id: string): void {
    this.selected.set(id);
    this.allVariables.set(false);
    this.adding.set(false);
    this.armed.set(null);
  }

  protected newTest(): void {
    const test = this.testMode.addTest();
    if (test) {
      this.select(test.id);
    }
  }

  // --- Day, moment, weather ---

  protected shiftDay(by: number): void {
    this.change({ day: Math.max(0, (this.test()?.day ?? 0) + by) });
  }

  protected setMoment(moment: DayTime): void {
    this.change({ moment });
  }

  protected setWeather(weather: string): void {
    this.change({ weather: weather as WeatherType });
  }

  // --- Variables ---

  protected valueOf(v: GameVariable): VariableValue {
    return this.test()?.variables[v.id] ?? v.initial;
  }

  private isChanged(v: GameVariable): boolean {
    return this.valueOf(v) !== v.initial;
  }

  protected setVariable(v: GameVariable, value: VariableValue): void {
    const test = this.test();
    if (!test) {
      return;
    }
    this.change({
      variables: {
        ...test.variables,
        [v.id]: typeof value === "number" ? clampCounter(value) : value,
      },
    });
  }

  protected counter(v: GameVariable): number {
    return Number(this.valueOf(v));
  }

  // --- Team ---

  protected inTeam(id: string): boolean {
    return this.test()?.team.includes(id) ?? false;
  }

  protected toggleTeam(id: string): void {
    const team = this.test()?.team ?? [];
    this.change({
      team: team.includes(id) ? team.filter((t) => t !== id) : [...team, id],
    });
  }

  protected levelOf(id: string): number {
    const c = this.characters.find((ch) => ch.id === id);
    return this.test()?.levels[id] ?? c?.levelStart ?? 1;
  }

  protected shiftLevel(id: string, by: number): void {
    const test = this.test();
    const c = this.characters.find((ch) => ch.id === id);
    if (!test || !c) {
      return;
    }
    const level = Math.min(c.levelMax, Math.max(1, this.levelOf(id) + by));
    this.change({ levels: { ...test.levels, [id]: level } });
  }

  // --- Bag and money ---

  protected shiftMoney(by: number): void {
    const money = (this.test()?.money ?? 0) + by;
    this.setMoney(money);
  }

  protected setMoney(money: number): void {
    const value = Number.isFinite(money) ? Math.round(money) : 0;
    this.change({ money: Math.min(MONEY_MAX, Math.max(0, value)) });
  }

  protected setItem(id: string, count: number): void {
    const test = this.test();
    if (!test) {
      return;
    }
    const items = { ...test.items };
    const value = Math.min(ITEM_COUNT_MAX, Math.round(count));
    if (value > 0) {
      items[id] = value;
    } else {
      delete items[id];
    }
    this.change({ items });
  }

  protected addItem(id: string): void {
    if (id) {
      this.setItem(id, 1);
    }
    this.adding.set(false);
  }

  // --- Links ---

  protected linkOf(id: string): number {
    return this.test()?.links[id] ?? 0;
  }

  protected shiftLink(id: string, by: number): void {
    const test = this.test();
    if (!test) {
      return;
    }
    const level = Math.min(LINK_MAX, Math.max(0, this.linkOf(id) + by));
    const links = { ...test.links };
    if (level > 0) {
      links[id] = level;
    } else {
      delete links[id];
    }
    this.change({ links });
  }

  // --- Cutscenes seen ---

  protected seen(key: string): boolean {
    return this.test()?.cutscenesSeen.includes(key) ?? false;
  }

  protected toggleSeen(key: string): void {
    const seen = this.test()?.cutscenesSeen ?? [];
    this.change({
      cutscenesSeen: seen.includes(key)
        ? seen.filter((k) => k !== key)
        : [...seen, key],
    });
  }

  // --- Footer ---

  protected remove(): void {
    const test = this.test();
    if (test && this.confirm("remove")) {
      this.testMode.removeTest(test.id);
      this.closed.emit();
    }
  }

  protected resetToGame(): void {
    const test = this.test();
    if (test && this.confirm("reset")) {
      this.testMode.resetToGame(test.id);
    }
  }

  protected launch(): void {
    const test = this.test();
    if (test) {
      this.testMode.start(test.id);
      this.closed.emit();
    }
  }

  /** First press: armed for 3 s (returns false); second press: true. */
  private confirm(action: ArmedAction): boolean {
    clearTimeout(this.armTimer);
    if (this.armed() === action) {
      this.armed.set(null);
      return true;
    }
    this.armed.set(action);
    this.armTimer = setTimeout(() => this.armed.set(null), 3000);
    return false;
  }
}
