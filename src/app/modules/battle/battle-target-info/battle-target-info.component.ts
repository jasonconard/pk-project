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
  styles: `
    :host {
      pointer-events: auto;
      position: absolute;
      top: calc(60px + var(--safe-top));
      left: calc(16px + var(--safe-left));
      width: 220px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 13px 11px 9px;
      border-radius: 10px;
      border: 2px solid var(--box-border);
      background: var(--box);
      box-shadow: var(--shadow);
      font-size: 12px;
    }
    img {
      width: 16px;
      height: 16px;
      image-rendering: pixelated;
    }
    button {
      font: inherit;
      color: inherit;
      border: none;
      background: none;
      cursor: pointer;
      padding: 0;
    }
    .action {
      position: absolute;
      top: -10px;
      left: 10px;
      padding: 2px 8px;
      border-radius: 6px;
      background: var(--pick);
      color: #fff;
      font-size: 10.5px;
      font-weight: 700;
    }
    .nav {
      width: 22px;
      height: 22px;
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      background: #f0f2f6;
      font-size: 14px;
    }
    .buttons {
      display: flex;
      gap: 6px;
      margin-top: 2px;
      button {
        flex: 1;
        height: 28px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        border-radius: 7px;
        font-size: 12px;
        font-weight: 600;
      }
      .back {
        background: #f0f2f6;
        color: var(--ink-soft);
      }
      .go {
        background: var(--pick);
        color: #fff;
      }
    }
    .head {
      display: flex;
      align-items: center;
      gap: 7px;
      strong {
        flex: 1;
        min-width: 0;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      small {
        font-size: 10px;
        color: var(--ink-soft);
      }
    }
    .hp {
      display: flex;
      align-items: center;
      gap: 5px;
      b {
        font-size: 9px;
        color: var(--hp);
      }
      .track {
        flex: 1;
        height: 4px;
        border-radius: 2px;
        background: #e8ebf1;
        overflow: hidden;
        span {
          display: block;
          height: 100%;
          background: var(--hp);
        }
      }
      .value {
        font-size: 10px;
        font-variant-numeric: tabular-nums;
      }
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    .state {
      padding: 1px 6px;
      border-radius: 6px;
      background: color-mix(in srgb, var(--c) 20%, white);
      color: color-mix(in srgb, var(--c) 70%, black);
      font-size: 10px;
      font-weight: 700;
    }
    .plan {
      display: flex;
      align-items: center;
      gap: 5px;
      color: var(--ink-soft);
      font-size: 11px;
      svg {
        flex-shrink: 0;
        font-size: 11px;
      }
      small {
        margin-left: auto;
        font-size: 9.5px;
        font-weight: 700;
      }
      &.busy {
        color: #a463e0;
        font-weight: 700;
      }
    }
    .resists {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 10px;
    }
    .resist {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: 10px;
      font-weight: 700;
      &.weak {
        color: var(--foe);
      }
      &.resist,
      &.null {
        color: var(--ink-soft);
      }
      &.absorb {
        color: var(--hp);
      }
      img {
        width: 13px;
        height: 13px;
      }
    }
    @media (max-width: 760px) {
      :host {
        top: calc(84px + var(--safe-top));
        left: calc(12px + var(--safe-left));
        width: 200px;
      }
    }
  `,
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
