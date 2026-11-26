import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import {
  LucideFlaskConical,
  LucideLogOut,
  LucidePencilRuler,
  LucideRotateCcw,
  LucideSave,
} from "@lucide/angular";
import { EscapeService } from "../../../../core/shared/service/escape.service";
import { TestModeService } from "../../shared/services/test-mode.service";

/**
 * While a test is played (design/main-view.pen, Mode test): a green border around the game and the banner « Test ·
 * its name » with Recommencer and Quitter; Quitter asks first (the game comes back as it was before the test).
 */
@Component({
  selector: "game-test-banner",
  imports: [
    LucideFlaskConical,
    LucideLogOut,
    LucidePencilRuler,
    LucideRotateCcw,
    LucideSave,
  ],
  templateUrl: "./test-banner.component.html",
  styleUrl: "./test-banner.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestBannerComponent {
  protected readonly testMode = inject(TestModeService);
  protected readonly running = this.testMode.running;
  /** « Quitter le test ? » open. */
  protected readonly asking = signal(false);

  constructor() {
    inject(EscapeService).track(
      () => this.asking(),
      () => this.asking.set(false)
    );
  }

  protected restart(): void {
    this.asking.set(false);
    this.testMode.restart();
  }

  protected quit(): void {
    this.asking.set(false);
    this.testMode.quit();
  }
}
