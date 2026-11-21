import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import {
  LucideFootprints,
  LucideMoonStar,
  LucideSkull,
  LucideSun,
  LucideTrophy,
} from "@lucide/angular";
import { BattleService } from "../shared/battle.service";
import {
  BattleResult,
  GAUGE_ACTION,
  GAUGE_COMMAND,
} from "../shared/battle-types";
import { GameService } from "../../game/shared/services/game.service";
import { WEATHER_CHOICES } from "../../game/shared/weather/Weather";

/** Team cards at the bottom: always 4 places. */
const TEAM_PLACES = 4;

/**
 * The fight's interface (design/combat.pen): the thin action gauge at the top, the weather, the team's cards at
 * the bottom (4 places). For now the player chooses how the fight ends (the commands come next).
 */
@Component({
  selector: "battle-hud",
  imports: [
    LucideFootprints,
    LucideMoonStar,
    LucideSkull,
    LucideSun,
    LucideTrophy,
  ],
  templateUrl: "./battle-hud.component.html",
  styleUrl: "./battle-hud.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleHudComponent {
  private readonly battle = inject(BattleService);
  private readonly gameService = inject(GameService);
  protected readonly view = this.battle.view;
  protected readonly commandAt = GAUGE_COMMAND * 100;
  protected readonly actionAt = GAUGE_ACTION * 100;
  protected readonly team = computed(() => {
    const fighters =
      this.view()?.fighters.filter((f) => f.side === "team") ?? [];
    return Array.from({ length: TEAM_PLACES }, (_, i) => fighters[i] ?? null);
  });
  protected readonly night = this.gameService.night;
  protected readonly weatherLabel = computed(
    () =>
      WEATHER_CHOICES.find((w) => w.type === this.gameService.weather())
        ?.label ?? ""
  );

  protected percent(value: number, max: number): number {
    return max > 0 ? Math.round((value / max) * 100) : 0;
  }

  protected end(result: BattleResult): void {
    this.battle.end(result);
  }
}
