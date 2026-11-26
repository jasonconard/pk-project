import { ChangeDetectionStrategy, Component, input } from "@angular/core";

/** « +2 Lunelle » at the top of the screen after a harvest (design/main-view.pen, Cultures · Récolter). */
@Component({
  selector: "game-farm-toast",
  template: `
    <div
      class="toast"
      role="status"
      animate.enter="toast-in">
      @if (pic()) {
        <img
          [src]="pic()"
          alt="" />
      }
      <span>
        <b>{{ text() }}</b>
        <small>Dans le sac</small>
      </span>
    </div>
  `,
  styles: `
    .toast {
      position: fixed;
      top: calc(76px + var(--safe-top, 0px));
      left: 50%;
      translate: -50% 0;
      z-index: 950;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px 10px 10px;
      border-radius: 16px;
      background: rgba(34, 35, 42, 0.95);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
      color: white;
      pointer-events: none;
    }

    img {
      width: 40px;
      height: 40px;
      padding: 4px;
      box-sizing: border-box;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.07);
      image-rendering: pixelated;
    }

    span {
      display: flex;
      flex-direction: column;
    }

    b {
      font-size: 16px;
      color: #7fd16b;
    }

    small {
      font-size: 11px;
      color: #b8bbc8;
    }

    .toast-in {
      animation: toast-in 220ms ease-out;
    }

    @keyframes toast-in {
      from {
        opacity: 0;
        translate: -50% -12px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FarmToastComponent {
  readonly text = input.required<string>();
  readonly pic = input<string>();
}
