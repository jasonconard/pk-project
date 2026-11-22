import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import { LucideSparkles } from "@lucide/angular";
import { TargetChoice } from "../shared/battle-types";

const RESIST_LABELS = {
  weak: "Faible",
  resist: "Résiste",
  null: "Annule",
  absorb: "Absorbe",
};

/**
 * The aimed fighter's details (design/combat.pen, « Le coup qui interrompt »): its PV left, its states, its next
 * action when decided (charging: a heavy attack would cancel it), an enemy's weaknesses and resistances.
 */
@Component({
  selector: "battle-target-info",
  imports: [LucideSparkles],
  template: `
    @let t = target();
    <div class="head">
      @if (t.icon) {
        <img
          [src]="t.icon"
          alt="" />
      }
      <strong>{{ t.name }}</strong>
      <small>Niv. {{ t.level }}</small>
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
  `,
  styles: `
    :host {
      position: absolute;
      top: calc(60px + var(--safe-top));
      left: calc(16px + var(--safe-left));
      width: 220px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 9px 11px;
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
  protected readonly labels = RESIST_LABELS;
  protected readonly percent = computed(() => {
    const t = this.target();
    return t.hpMax > 0 ? Math.round((t.hp / t.hpMax) * 100) : 0;
  });
}
