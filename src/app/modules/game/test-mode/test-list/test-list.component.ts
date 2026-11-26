import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from "@angular/core";
import {
  LucideArchive,
  LucideChevronLeft,
  LucideFlaskConical,
  LucidePlay,
  LucidePlus,
  LucideSlidersHorizontal,
  LucideX,
} from "@lucide/angular";
import { EscapeService } from "../../../../core/shared/service/escape.service";
import { DayTime } from "../../../database-editor/shared/database";
import {
  dateLabel,
  dateOf,
  gameCalendar,
  momentLabel,
} from "../../shared/model/game-calendar";
import { TestPreset } from "../../shared/model/test-preset";
import { loadMap } from "../../shared/services/map-storage";
import { TestModeService } from "../../shared/services/test-mode.service";

/**
 * Menu → Mode test (design/main-view.pen, Mode test): the named tests, each with Régler (its window) and Lancer (at its
 * own spot), and Nouveau test (the game now, where the player is).
 */
@Component({
  selector: "game-test-list",
  imports: [
    LucideArchive,
    LucideChevronLeft,
    LucideFlaskConical,
    LucidePlay,
    LucidePlus,
    LucideSlidersHorizontal,
    LucideX,
  ],
  templateUrl: "./test-list.component.html",
  styleUrl: "./test-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestListComponent {
  readonly closed = output<void>();
  /** « Menu »: back to the game menu. */
  readonly back = output<void>();

  protected readonly testMode = inject(TestModeService);
  protected readonly tests = this.testMode.tests;

  constructor() {
    inject(EscapeService).whileAlive(() => this.closed.emit());
  }

  /** « Ville · Lun. 12 avril · Soir ». */
  protected place(test: TestPreset): string {
    const calendar = gameCalendar();
    return [
      loadMap(test.map)?.name ?? "Carte supprimée",
      dateLabel(dateOf(test.day, calendar), calendar),
      momentLabel(test.moment as DayTime),
    ].join(" · ");
  }

  protected add(): void {
    const test = this.testMode.addTest();
    if (test) {
      this.testMode.editing.set(test.id);
    }
  }

  protected launch(id: string): void {
    this.closed.emit();
    this.testMode.start(id);
  }
}
