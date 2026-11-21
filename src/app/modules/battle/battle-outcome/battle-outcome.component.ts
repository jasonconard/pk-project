import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from "@angular/core";
import {
  LucideCoins,
  LucideSkull,
  LucideStar,
  LucideTrophy,
} from "@lucide/angular";
import { BattleOutcome } from "../shared/battle-types";

/** Member cards: always 4 places. */
const TEAM_PLACES = 4;

/**
 * The end of a fight: a victory (the experience, the money and the items found, each member's progress: levels,
 * elements and weapons grown, skills learned) or a defeat. A touch (or Entrée) closes it.
 */
@Component({
  selector: "battle-outcome",
  imports: [LucideCoins, LucideSkull, LucideStar, LucideTrophy],
  templateUrl: "./battle-outcome.component.html",
  styleUrl: "./battle-outcome.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleOutcomeComponent {
  readonly outcome = input.required<BattleOutcome>();
  readonly closed = output<void>();

  protected readonly members = computed(() => {
    const members = this.outcome().members;
    return Array.from({ length: TEAM_PLACES }, (_, i) => members[i] ?? null);
  });
}
