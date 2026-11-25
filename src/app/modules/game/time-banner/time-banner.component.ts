import {
  LucideMoon,
  LucideSun,
  LucideSunrise,
  LucideSunset,
} from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
  untracked,
} from "@angular/core";
import { DAY_TIMES, DayTime } from "../../database-editor/shared/database";
import { GameService } from "../shared/services/game.service";
import {
  dateLabel,
  gameCalendar,
  MOMENT_TITLES,
} from "../shared/model/game-calendar";

/** How long the banner stays (ms). */
const SHOWN_MS = 3200;

/**
 * The banner when a moment of the day starts (« Le soir tombe », design/main-view.pen, Temps · Jeu · Le soir tombe):
 * the moment, the date and the four moments of the day. Only while playing, not when the game starts.
 */
@Component({
  selector: "game-time-banner",
  imports: [LucideSunrise, LucideSun, LucideSunset, LucideMoon],
  template: `
    @if (shown(); as s) {
      <div
        class="banner"
        role="status"
        animate.enter="banner-in"
        animate.leave="banner-out">
        <p class="title">
          @switch (s.moment) {
            @case ("morning") {
              <svg lucideSunrise></svg>
            }
            @case ("afternoon") {
              <svg lucideSun></svg>
            }
            @case ("evening") {
              <svg lucideSunset></svg>
            }
            @default {
              <svg lucideMoon></svg>
            }
          }
          {{ s.title }}
        </p>
        <p class="date">{{ s.date }}</p>
        <p class="moments">
          @for (t of times; track t.id) {
            <span [class.on]="t.id === s.moment">{{ t.label }}</span>
          }
        </p>
      </div>
    }
  `,
  styles: `
    :host {
      position: absolute;
      left: 0;
      right: 0;
      top: 22%;
      z-index: 700;
      pointer-events: none;
    }
    .banner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 14px 0 16px;
      background: linear-gradient(
        90deg,
        #1a1d3000,
        #1a1d30d9 18%,
        #1a1d30d9 82%,
        #1a1d3000
      );
      color: #fff;
      text-align: center;
    }
    p {
      margin: 0;
    }
    .title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 0.02em;
      svg {
        width: 22px;
        height: 22px;
        color: #ffb04a;
      }
    }
    .date {
      font-size: 13px;
      opacity: 0.75;
    }
    .moments {
      display: flex;
      gap: 4px;
      padding-top: 6px;
      span {
        padding: 3px 8px;
        border-radius: 10px;
        background: #ffffff1f;
        font-size: 11px;
        opacity: 0.75;
      }
      .on {
        background: #ffb04a;
        color: #1b1408;
        font-weight: 700;
        opacity: 1;
      }
    }
    .banner-in {
      animation: in 0.5s ease-out;
    }
    .banner-out {
      animation: in 0.6s ease-in reverse;
    }
    @keyframes in {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeBannerComponent {
  /** Playing on the map (not the editor, a fight, a loading). */
  readonly playing = input(false);

  private readonly gameService = inject(GameService);
  protected readonly times = DAY_TIMES;
  protected readonly shown = signal<{
    moment: DayTime;
    title: string;
    date: string;
  } | null>(null);
  private last: DayTime | null = null;
  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => {
      const moment = this.gameService.moment();
      const playing = this.playing();
      untracked(() => this.changed(moment, playing));
    });
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  private changed(moment: DayTime, playing: boolean): void {
    const before = this.last;
    this.last = moment;
    if (!playing || before === null || before === moment) {
      return;
    }
    const calendar = gameCalendar();
    this.shown.set({
      moment,
      title: MOMENT_TITLES[moment],
      date: dateLabel(this.gameService.date(), calendar, true),
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.shown.set(null), SHOWN_MS);
  }
}
