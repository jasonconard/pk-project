import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
  untracked,
} from "@angular/core";
import { LucideArrowLeft, LucideMoonStar, LucideSun } from "@lucide/angular";
import { BattleService } from "../shared/battle.service";
import { BattleTargetInfoComponent } from "../battle-target-info/battle-target-info.component";
import { BattleOutcomeComponent } from "../battle-outcome/battle-outcome.component";
import {
  CommandKind,
  GAUGE_COMMAND,
  GAUGE_DECIDE,
} from "../shared/battle-types";
import { GameService } from "../../game/shared/services/game.service";
import { WEATHER_CHOICES } from "../../game/shared/weather/Weather";

/** Team cards at the bottom: always 4 places. */
const TEAM_PLACES = 4;
/** The commands' column: its width, and the gap from the fighter (css px). */
const MENU_WIDTH = 200;
const MENU_GAP = 34;
/** A touch this close to a fighter on the screen (css px) aims at it. */
const PICK_RADIUS = 70;

/**
 * The commands' ring (css px): the chosen one's size against the others', how far beside it its neighbours are and
 * how much higher, where the unseen ones wait, how see-through the neighbours are, how far under the fighter.
 */
const RING = {
  front: 1.5,
  beside: 104,
  rise: 6,
  away: 170,
  dim: 0.55,
  below: 122,
  edge: 170,
  foot: 150,
};
/**
 * The ring on a phone: icons at their drawn size (32 px, the chosen one twice that), closer together. Whole
 * numbers only, the pixels stay sharp.
 */
const RING_SMALL: typeof RING = {
  front: 2,
  beside: 62,
  rise: 4,
  away: 104,
  dim: 0.55,
  below: 84,
  edge: 100,
  foot: 104,
};
/** A phone's screen, upright or lying. */
const SMALL_SCREEN = "(max-width: 760px), (max-height: 520px)";

interface CommandItem {
  kind: CommandKind | "magic" | "items";
  label: string;
  icon: string;
  /** Greyed out (nothing to use, can't flee). */
  soon?: boolean;
  /** A word under the label (« interrompt »). */
  hint?: string;
}

/**
 * The fight's interface (design/combat.pen): the thin action gauge at the top, the weather, the team's cards at
 * the bottom (4 places); on a team member's turn, the commands beside it, then the target; the damage numbers.
 * Keyboard: ↑ ↓ to move, Entrée to choose, Échap to go back.
 */
@Component({
  selector: "battle-hud",
  imports: [
    BattleTargetInfoComponent,
    BattleOutcomeComponent,
    LucideArrowLeft,
    LucideMoonStar,
    LucideSun,
  ],
  templateUrl: "./battle-hud.component.html",
  styleUrls: [
    "./battle-hud.component.scss",
    "./battle-hud.ring.scss",
    "./battle-hud.team.scss",
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleHudComponent {
  private readonly battle = inject(BattleService);
  private readonly gameService = inject(GameService);
  protected readonly view = this.battle.view;
  protected readonly decideAt = GAUGE_DECIDE * 100;
  protected readonly commandAt = GAUGE_COMMAND * 100;
  /** The aimed one's details (target phase). */
  protected readonly aimed = computed(() => {
    const v = this.view();
    return v?.targets.find((x) => x.id === v.aim) ?? null;
  });
  /** The command under the cursor (keyboard, mouse). */
  protected readonly selected = signal(0);
  /** The list shown on a turn: the commands, the skills (Magie), the items (Objets). */
  protected readonly menu = signal<"main" | "skills" | "items">("main");
  protected readonly commands = computed<CommandItem[]>(() => [
    { kind: "attack", label: "Attaque", icon: "attack" },
    {
      kind: "heavy",
      label: "Attaque forte",
      icon: "heavy",
      hint: "interrompt",
    },
    {
      kind: "magic",
      label: "Magie",
      icon: "magic",
      soon: !this.view()?.skills.length,
    },
    {
      kind: "items",
      label: "Objets",
      icon: "items",
      soon: !this.view()?.items.length,
    },
    { kind: "defend", label: "Défendre", icon: "defend" },
    {
      kind: "flee",
      label: "Fuir",
      icon: "flee",
      soon: !this.view()?.canFlee,
    },
  ]);
  /** A phone's screen: the ring is drawn smaller. */
  protected readonly small = signal(matchMedia(SMALL_SCREEN).matches);
  private readonly ringSize = computed(() =>
    this.small() ? RING_SMALL : RING
  );
  /**
   * The commands on their ring around the fighter (design/combat.pen, « menu rotatif »): the chosen one in front,
   * big; its two neighbours beside it, smaller and half see-through; the others unseen, further on the ring. Turning
   * moves them all one place, each fading in or out on its way.
   */
  protected readonly ring = computed(() => {
    const r = this.ringSize();
    const list = this.commands();
    const count = list.length;
    const chosen = this.selected() % count;
    return list.map((command, index) => {
      // (how many places from the front, the short way round: -3 … 2 for six commands)
      const half = Math.floor(count / 2);
      const offset = ((index - chosen + count + half) % count) - half;
      const far = Math.abs(offset);
      const side = Math.sign(offset);
      let x = 0;
      let y = 0;
      let scale = r.front;
      if (far === 1) {
        x = side * r.beside;
        y = -r.rise;
        scale = 1;
      } else if (far > 1) {
        x = side * r.away || r.away;
        y = -r.rise * 4;
        scale = 0.7;
      }
      return {
        command,
        index,
        offset,
        seen: far <= 1,
        opacity: [1, r.dim, 0][Math.min(2, far)],
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
      };
    });
  });
  /** The command in front, for its title. */
  protected readonly front = computed(
    () => this.commands()[this.selected() % this.commands().length]
  );
  /** Where the ring's front command is on the screen: under the fighter, kept inside the screen. */
  protected readonly ringPos = computed(() => {
    const r = this.ringSize();
    const at = this.view()?.actorScreen;
    if (!at) {
      return null;
    }
    return {
      x: Math.min(window.innerWidth - r.edge, Math.max(r.edge, at.x)),
      y: Math.min(window.innerHeight - r.foot, at.y + r.below),
    };
  });

  /** A command of the ring touched: the one in front is chosen, another one comes to the front. */
  protected turnTo(index: number): void {
    if (index === this.selected()) {
      this.pick(this.commands()[index]);
    } else {
      this.selected.set(index);
    }
  }

  protected readonly team = computed(() => {
    const fighters =
      this.view()?.fighters.filter((f) => f.side === "team") ?? [];
    return Array.from({ length: TEAM_PLACES }, (_, i) => fighters[i] ?? null);
  });
  /** The skills or the items listed (menu « skills » / « items »). */
  protected readonly choices = computed(() => {
    const v = this.view();
    if (!v) {
      return [];
    }
    return this.menu() === "skills" ? v.skills : v.items;
  });
  /** The spells being gathered whose caster is not the one choosing (its label would sit under the menu). */
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
    const screen = matchMedia(SMALL_SCREEN);
    const onScreen = () => this.small.set(screen.matches);
    screen.addEventListener("change", onScreen);
    inject(DestroyRef).onDestroy(() =>
      screen.removeEventListener("change", onScreen)
    );
    // A new turn (or none): back to the commands
    effect(() => {
      if (this.view()?.phase !== "command") {
        untracked(() => this.menu.set("main"));
      }
    });
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
    if (item.soon) {
      return;
    }
    if (item.kind === "magic" || item.kind === "items") {
      this.menu.set(item.kind === "magic" ? "skills" : "items");
      this.selected.set(0);
      return;
    }
    if (item.kind === "skill" || item.kind === "item") {
      return;
    }
    this.battle.choose(item.kind);
  }

  /** A skill or an item from its list. */
  protected use(id: string, usable: boolean): void {
    if (!usable) {
      return;
    }
    if (this.menu() === "skills") {
      this.battle.chooseSkill(id);
    } else {
      this.battle.chooseItem(id);
    }
    this.selected.set(0);
  }

  protected leaveList(): void {
    this.menu.set("main");
    this.selected.set(0);
  }

  /** The end window read: the fight closes. */
  protected closeOutcome(): void {
    this.battle.closeOutcome();
  }

  /** A state's look (its name, color) for the small dots. */
  protected stateLook(id: string): { name: string; color: string } {
    return this.view()?.stateLooks[id] ?? { name: id, color: "#999" };
  }

  protected aim(id: string): void {
    this.battle.aimAt(id);
  }

  protected moveAim(step: number): void {
    this.battle.moveAim(step);
  }

  /** A touch on the field: the target nearest to it is aimed at (it was already: the action goes). */
  protected pickOnField(ev: PointerEvent): void {
    const v = this.view();
    if (!v) {
      return;
    }
    let best: string | null = null;
    let bestDist = PICK_RADIUS;
    for (const t of v.targets) {
      const d = Math.hypot(t.screen.x - ev.clientX, t.screen.y - ev.clientY);
      if (d < bestDist) {
        best = t.id;
        bestDist = d;
      }
    }
    if (!best) {
      return;
    }
    if (best === v.aim) {
      this.confirm(best);
    } else {
      this.aim(best);
    }
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
    if (phase === "result") {
      if (ev.key === "Enter" || ev.key === " " || ev.key === "Escape") {
        ev.preventDefault();
        this.closeOutcome();
      }
      return;
    }
    if (phase !== "command" && phase !== "target") {
      return;
    }
    const step =
      { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[ev.key] ?? 0;
    if (phase === "command" && this.menu() !== "main") {
      const list = this.choices();
      if (step && list.length > 0) {
        this.selected.update((i) => (i + step + list.length) % list.length);
      } else if (ev.key === "Enter" || ev.key === " ") {
        const c = list[this.selected()];
        if (c) {
          this.use(c.id, c.usable);
        }
      } else if (ev.key === "Escape" || ev.key === "Backspace") {
        this.leaveList();
      } else {
        return;
      }
    } else if (phase === "command") {
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
