import { LucidePlay } from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from "@angular/core";
import {
  TRANSITION_CASES,
  TransitionCase,
  TransitionKind,
  TRANSITIONS,
} from "../../../game/shared/model/transition";
import { TransitionService } from "../../../game/shared/services/transition.service";
import { DbSettings } from "../../shared/database";
import { DbSheet } from "../../shared/db-sheet";

/**
 * The sheet of the game's settings: the screen transition of each case (a change of map, into a fight, out of a
 * fight), with « Voir » playing it over the editor.
 */
@Component({
  selector: "db-settings-sheet",
  imports: [LucidePlay],
  templateUrl: "./settings-sheet.component.html",
  styleUrl: "./settings-sheet.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsSheetComponent extends DbSheet {
  readonly settings = input.required<DbSettings>();

  private readonly transitionService = inject(TransitionService);
  protected readonly cases = TRANSITION_CASES;
  protected readonly kinds = TRANSITIONS;

  protected kindOf(when: TransitionCase): TransitionKind {
    return this.settings().transitions?.[when] ?? "none";
  }

  protected setKind(when: TransitionCase, kind: string): void {
    this.edit(this.settings().id, (row) => {
      const settings = row as DbSettings;
      return {
        ...settings,
        transitions: { ...settings.transitions, [when]: kind },
      };
    });
  }

  /** « Voir »: the transition played over the editor (nothing changes behind). */
  protected play(when: TransitionCase): void {
    this.transitionService.through(this.kindOf(when), () => undefined);
  }
}
