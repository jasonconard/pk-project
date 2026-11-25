import { LucideArrowRight, LucideHeart, LucideSparkles } from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from "@angular/core";
import { SequenceService } from "../shared/services/sequence.service";
import { LinkGain } from "../../database-editor/shared/links";

const SHOWN_MS = 3800;

/**
 * « Lien avec Bernard · Niv. 3 → 4 » (design/main-view.pen, Liens · Jeu · Le lien monte): shown a moment when an
 * event gives points to a social link, with what the new level brings.
 */
@Component({
  selector: "game-link-toast",
  imports: [LucideArrowRight, LucideHeart, LucideSparkles],
  template: `
    @if (gain(); as g) {
      <div
        class="card"
        role="status"
        animate.enter="toast-in"
        animate.leave="toast-out">
        <div class="head">
          @if (g.portrait) {
            <img
              [src]="g.portrait"
              alt="" />
          }
          <div class="texts">
            <b>Lien avec {{ g.name }}</b>
            <span class="levels">
              <svg lucideHeart></svg>
              @if (g.after !== g.before) {
                Niv. {{ g.before }} <svg lucideArrowRight></svg>
                <strong>Niv. {{ g.after }}</strong>
              } @else {
                Niv. {{ g.after }}
              }
            </span>
          </div>
        </div>
        <div class="bar">
          <i [style.width.%]="g.next ? (100 * g.into) / g.next : 100"></i>
        </div>
        <small
          >{{ g.points > 0 ? "+" : "" }}{{ g.points }} points
          @if (g.next) {
            · {{ g.into }} / {{ g.next }} vers le niveau {{ g.after + 1 }}
          } @else {
            · niveau maximum
          }
        </small>
        @if (g.gained) {
          <p class="gained">
            <svg lucideSparkles></svg> Nouveau : {{ g.gained }}
          </p>
        }
      </div>
    }
  `,
  styles: `
    :host {
      position: absolute;
      left: 50%;
      bottom: 22%;
      z-index: 720;
      width: min(340px, calc(100vw - 40px));
      transform: translateX(-50%);
      pointer-events: none;
    }
    .card {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 14px 16px;
      border-radius: 18px;
      border: 1.5px solid #ff6a8a;
      background: #1b1c22f2;
      color: #fff;
    }
    .head {
      display: flex;
      align-items: center;
      gap: 12px;
      img {
        width: 52px;
        height: 52px;
        border-radius: 12px;
        image-rendering: pixelated;
        background: #2a2b33;
      }
    }
    .texts {
      display: flex;
      flex-direction: column;
      gap: 2px;
      b {
        font-size: 16px;
      }
    }
    .levels {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 13px;
      color: #ffffffb3;
      svg {
        width: 13px;
        height: 13px;
      }
      svg:first-child {
        color: #ff6a8a;
      }
      strong {
        color: #ff9ab0;
        font-size: 15px;
      }
    }
    .bar {
      height: 8px;
      border-radius: 4px;
      overflow: hidden;
      background: #ffffff1a;
      i {
        display: block;
        height: 100%;
        background: #ff6a8a;
        transition: width 0.8s ease-out;
      }
    }
    small {
      font-size: 12px;
      color: #ffffffb3;
    }
    .gained {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      padding: 8px 10px;
      border-radius: 10px;
      background: #ffb04a26;
      color: #ffb04a;
      font-size: 13px;
      font-weight: 600;
      svg {
        width: 14px;
        height: 14px;
        flex-shrink: 0;
      }
    }
    .toast-in {
      animation: toast 0.35s ease-out;
    }
    .toast-out {
      animation: toast 0.4s ease-in reverse;
    }
    @keyframes toast {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkToastComponent {
  protected readonly gain = signal<LinkGain | null>(null);
  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    const sub = inject(SequenceService).link$.subscribe((gain) => {
      this.gain.set(gain);
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.gain.set(null), SHOWN_MS);
    });
    inject(DestroyRef).onDestroy(() => {
      sub.unsubscribe();
      clearTimeout(this.timer);
    });
  }
}
