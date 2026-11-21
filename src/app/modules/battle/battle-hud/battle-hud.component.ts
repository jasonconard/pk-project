import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from "@angular/core";
import {
  LucideArrowLeft,
  LucideBackpack,
  LucideFootprints,
  LucideMoonStar,
  LucideShield,
  LucideSparkles,
  LucideSun,
  LucideSword,
  LucideSwords,
} from "@lucide/angular";
import { BattleService } from "../shared/battle.service";
import {
  CommandKind,
  GAUGE_ACTION,
  GAUGE_COMMAND,
} from "../shared/battle-types";
import { GameService } from "../../game/shared/services/game.service";
import { WEATHER_CHOICES } from "../../game/shared/weather/Weather";

/** Team cards at the bottom: always 4 places. */
const TEAM_PLACES = 4;
/** The commands' column: its width, and the gap from the fighter (css px). */
const MENU_WIDTH = 160;
const MENU_GAP = 34;

interface CommandItem {
  kind: CommandKind | "magic" | "items";
  label: string;
  icon: string;
  /** Not there yet (magic, items: the next steps). */
  soon?: boolean;
}

/**
 * The fight's interface (design/combat.pen): the thin action gauge at the top, the weather, the team's cards at
 * the bottom (4 places); on a team member's turn, the commands beside it, then the target; the damage numbers.
 * Keyboard: ↑ ↓ to move, Entrée to choose, Échap to go back.
 */
@Component({
  selector: "battle-hud",
  imports: [
    LucideArrowLeft,
    LucideBackpack,
    LucideFootprints,
    LucideMoonStar,
    LucideShield,
    LucideSparkles,
    LucideSun,
    LucideSword,
    LucideSwords,
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
  /** The command under the cursor (keyboard, mouse). */
  protected readonly selected = signal(0);
  protected readonly commands = computed<CommandItem[]>(() => [
    { kind: "attack", label: "Attaque", icon: "sword" },
    { kind: "heavy", label: "Attaque forte", icon: "swords" },
    { kind: "magic", label: "Magie", icon: "sparkles", soon: true },
    { kind: "items", label: "Objets", icon: "backpack", soon: true },
    { kind: "defend", label: "Défendre", icon: "shield" },
    {
      kind: "flee",
      label: "Fuir",
      icon: "footprints",
      soon: !this.view()?.canFlee,
    },
  ]);
  protected readonly team = computed(() => {
    const fighters =
      this.view()?.fighters.filter((f) => f.side === "team") ?? [];
    return Array.from({ length: TEAM_PLACES }, (_, i) => fighters[i] ?? null);
  });
  protected readonly foes = computed(
    () =>
      this.view()?.fighters.filter((f) => f.side === "foe" && f.hp > 0) ?? []
  );
  /** The commands' place: beside the fighter (on its left, on its right when there is no room), on the screen. */
  protected readonly menuPos = computed(() => {
    const at = this.view()?.actorScreen;
    if (!at) {
      return null;
    }
    let left = at.x - MENU_GAP - MENU_WIDTH;
    if (left < 12) {
      left = at.x + MENU_GAP;
    }
    left = Math.min(left, window.innerWidth - MENU_WIDTH - 12);
    const top = Math.max(60, Math.min(at.y - 110, window.innerHeight - 290));
    return { left, top };
  });
  protected readonly night = this.gameService.night;
  protected readonly weatherLabel = computed(
    () =>
      WEATHER_CHOICES.find((w) => w.type === this.gameService.weather())
        ?.label ?? ""
  );

  constructor() {
    const onKey = (ev: KeyboardEvent) => this.key(ev);
    window.addEventListener("keydown", onKey);
    inject(DestroyRef).onDestroy(() =>
      window.removeEventListener("keydown", onKey)
    );
  }

  protected percent(value: number, max: number): number {
    return max > 0 ? Math.round((value / max) * 100) : 0;
  }

  protected pick(item: CommandItem): void {
    if (item.soon || item.kind === "magic" || item.kind === "items") {
      return;
    }
    this.battle.choose(item.kind);
  }

  protected aim(id: string): void {
    this.battle.aimAt(id);
  }

  protected confirm(id: string): void {
    this.battle.confirmTarget(id);
    this.selected.set(0);
  }

  protected back(): void {
    this.battle.back();
  }

  private key(ev: KeyboardEvent): void {
    const phase = this.view()?.phase;
    if (phase !== "command" && phase !== "target") {
      return;
    }
    const step =
      { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[ev.key] ?? 0;
    if (phase === "command") {
      const list = this.commands();
      if (step) {
        this.selected.update((i) => (i + step + list.length) % list.length);
      } else if (ev.key === "Enter" || ev.key === " ") {
        this.pick(list[this.selected()]);
      } else {
        return;
      }
    } else if (step) {
      this.battle.moveAim(step);
    } else if (ev.key === "Enter" || ev.key === " ") {
      this.battle.confirmTarget();
      this.selected.set(0);
    } else if (ev.key === "Escape" || ev.key === "Backspace") {
      this.battle.back();
    } else {
      return;
    }
    ev.preventDefault();
  }
}
