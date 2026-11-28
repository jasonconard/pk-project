import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from "@angular/core";
import {
  LucideArrowLeft,
  LucideChevronLeft,
  LucideChevronRight,
  LucideCrosshair,
  LucideSparkles,
} from "@lucide/angular";
import { TargetChoice } from "../shared/battle-types";

const RESIST_LABELS = {
  weak: "Faible",
  resist: "Résiste",
  null: "Annule",
  absorb: "Absorbe",
};

/**
 * Choosing a target (design/combat.pen, « Le coup qui interrompt »): the aimed fighter's details (its PV left, its
 * states, its next action when decided (charging: a heavy attack would cancel it), an enemy's weaknesses and
 * resistances), ◀ ▶ to aim at another one, Viser, Retour. Keyboard: ← → / ↑ ↓, Entrée, Échap (battle-hud).
 */
@Component({
  selector: "battle-target-info",
  imports: [
    LucideArrowLeft,
    LucideChevronLeft,
    LucideChevronRight,
    LucideCrosshair,
    LucideSparkles,
  ],
  template: `
    @let t = target();
    <span class="action">{{ label() }}</span>
    <div class="head">
      @if (many()) {
        <button
          type="button"
          class="nav"
          aria-label="Cible précédente"
          (click)="step.emit(-1)">
          <svg lucideChevronLeft></svg>
        </button>
      }
      @if (t.icon) {
        <img
          [src]="t.icon"
          alt="" />
      }
      <strong>{{ t.name }}</strong>
      <small>Niv. {{ t.level }}</small>
      @if (many()) {
        <button
          type="button"
          class="nav"
          aria-label="Cible suivante"
          (click)="step.emit(1)">
          <svg lucideChevronRight></svg>
        </button>
      }
    </div>
    <div class="hp">
      <b>PV</b>
      <span class="track"><span [style.width.%]="percent()"></span></span>
      <span class="value">{{ t.hp }} / {{ t.hpMax }}</span>
    </div>
    @if (t.states.length) {
      <div class="chips">
        @for (s of t.states; track s) {
          <span
            class="state"
            [style.--c]="looks()[s]?.color ?? '#999'"
            >{{ looks()[s]?.name ?? s }}</span
          >
        }
      </div>
    }
    @if (t.plan) {
      <div
        class="plan"
        [class.busy]="t.busy">
        <svg lucideSparkles></svg>
        <span>Prochaine action : {{ t.plan }}</span>
        @if (t.busy) {
          <small>interruptible</small>
        }
      </div>
    }
    @if (t.resists.length) {
      <div class="resists">
        @for (r of t.resists; track r.name) {
          <span [class]="'resist ' + r.level">
            {{ labels[r.level] }}
            @if (r.icon) {
              <img
                [src]="r.icon"
                [alt]="r.name"
                [title]="r.name" />
            } @else {
              {{ r.name }}
            }
          </span>
        }
      </div>
    }
    <div class="buttons">
      <button
        type="button"
        class="back"
        (click)="back.emit()">
        <svg lucideArrowLeft></svg> Retour
      </button>
      <button
        type="button"
        class="go"
        (click)="confirmed.emit()">
        <svg lucideCrosshair></svg> Viser
      </button>
    </div>
  `,
  styleUrl: "./battle-target-info.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleTargetInfoComponent {
  readonly target = input.required<TargetChoice>();
  /** State id → its name and color. */
  readonly looks = input<Record<string, { name: string; color: string }>>({});
  /** What is being aimed (« Attaque », « Boule de feu »). */
  readonly label = input("");
  /** More than one possible target: the ◀ ▶ buttons. */
  readonly many = input(false);
  readonly step = output<number>();
  readonly confirmed = output<void>();
  readonly back = output<void>();
  protected readonly labels = RESIST_LABELS;
  protected readonly percent = computed(() => {
    const t = this.target();
    return t.hpMax > 0 ? Math.round((t.hp / t.hpMax) * 100) : 0;
  });
}
