import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from "@angular/core";
import {
  LucideArchive,
  LucideBookmarkPlus,
  LucideCalendarClock,
  LucideChevronRight,
  LucideClapperboard,
  LucideFlag,
  LucideFlaskConical,
  LucideHeartHandshake,
  LucidePlay,
  LucideSave,
  LucideUsers,
  LucideX,
} from "@lucide/angular";
import { readText, writeText } from "../../../../core/shared/local-store";
import { EscapeService } from "../../../../core/shared/service/escape.service";
import {
  TestModeService,
  TestRequest,
} from "../../shared/services/test-mode.service";
import { testSummary } from "../test-summary";

/** The test chosen last (this device): chosen again the next time. */
const LAST_KEY = "pk-test-last";

/**
 * The sheet « Tester ici » (design/main-view.pen, Mode test): a test asked from the map editor (the point touched), an
 * event or a cutscene. The named tests as chips (« Comme ma partie »: the game as it is), what the chosen one sets, Garder
 * (a new named test from the game now) and Lancer le test.
 */
@Component({
  selector: "game-test-sheet",
  imports: [
    LucideArchive,
    LucideBookmarkPlus,
    LucideCalendarClock,
    LucideChevronRight,
    LucideClapperboard,
    LucideFlag,
    LucideFlaskConical,
    LucideHeartHandshake,
    LucidePlay,
    LucideSave,
    LucideUsers,
    LucideX,
  ],
  templateUrl: "./test-sheet.component.html",
  styleUrl: "./test-sheet.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestSheetComponent {
  readonly request = input.required<TestRequest>();

  protected readonly testMode = inject(TestModeService);
  protected readonly tests = this.testMode.tests;
  /** The test chosen (null: « Comme ma partie »). */
  protected readonly chosen = signal<string | null>(readText(LAST_KEY));
  protected readonly chosenTest = computed(
    () => this.tests().find((t) => t.id === this.chosen()) ?? null
  );
  protected readonly summary = computed(() =>
    testSummary(
      this.chosenTest() ?? this.testMode.gameAsTest(this.request().spot)
    )
  );
  protected readonly title = computed(() => {
    switch (this.request().target.kind) {
      case "event":
        return "Tester cet événement";
      case "cutscene":
        return "Tester la cinématique";
      default:
        return "Tester ici";
    }
  });

  constructor() {
    inject(EscapeService).whileAlive(() => this.close());
  }

  protected choose(id: string | null): void {
    this.chosen.set(id);
  }

  protected close(): void {
    this.testMode.request.set(null);
  }

  /** A setting touched: its test's window (« Comme ma partie »: kept as a new test first). */
  protected settings(): void {
    const id = this.chosenTest()?.id ?? this.keep();
    if (id) {
      this.testMode.editing.set(id);
    }
  }

  /** Garder: a new test, the game now, starting here. */
  protected keep(): string | null {
    const test = this.testMode.addTest(this.request().spot);
    if (!test) {
      return null;
    }
    this.chosen.set(test.id);
    return test.id;
  }

  protected launch(): void {
    const id = this.chosenTest()?.id ?? null;
    writeText(LAST_KEY, id ?? "");
    this.testMode.start(id, this.request());
  }
}
