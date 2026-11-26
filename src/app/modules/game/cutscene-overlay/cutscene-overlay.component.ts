import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from "@angular/core";
import {
  LucideDroplet,
  LucideEllipsis,
  LucideFastForward,
  LucideHeart,
  LucideLightbulb,
  LucideMusic,
  LucideSkipForward,
  LucideZap,
} from "@lucide/angular";
import { CutsceneService } from "../shared/services/cutscene.service";
import { SequenceService } from "../shared/services/sequence.service";

/** How long « Passer » is held to skip (ms). */
const HOLD_MS = 2000;
/** Let go too early: the fill drains this many times faster. */
const DRAIN_SPEED = 2;

/**
 * A cutscene played in the game (design/main-view.pen, Cinématiques · Jeu · Lecture): the black bars, the fade, the
 * title, the characters' emote bubbles, and the buttons: « Passer » held 2 s (it fills from left to right, empties
 * when let go too early), ⏩ to play it faster.
 */
@Component({
  selector: "game-cutscene-overlay",
  imports: [
    LucideSkipForward,
    LucideFastForward,
    LucideHeart,
    LucideMusic,
    LucideEllipsis,
    LucideZap,
    LucideDroplet,
    LucideLightbulb,
  ],
  templateUrl: "./cutscene-overlay.component.html",
  styleUrl: "./cutscene-overlay.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "(window:keydown)": "onKey($event, true)",
    "(window:keyup)": "onKey($event, false)",
  },
})
export class CutsceneOverlayComponent {
  protected readonly cutscene = inject(CutsceneService);
  protected readonly view = this.cutscene.view;
  /** A message is open (its box at the bottom): the buttons go above it. */
  private readonly sequence = inject(SequenceService);
  protected readonly messageOpen = computed(() => !!this.sequence.message());
  /** 0..1: how full « Passer » is. */
  protected readonly hold = signal(0);
  protected readonly holding = signal(false);
  protected readonly barHeight = computed(
    () => `${(this.view()?.bars ?? 0) * 13}vh`
  );

  private frame = 0;
  private last = 0;

  constructor() {
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.frame));
  }

  protected press(ev: Event): void {
    ev.preventDefault();
    if (!this.view()?.skippable) {
      return;
    }
    this.holding.set(true);
    this.tick();
  }

  protected release(): void {
    this.holding.set(false);
  }

  /** Enter held does the same as the button (a keyboard). */
  protected onKey(ev: KeyboardEvent, down: boolean): void {
    if (ev.key !== "Enter" || !this.view()?.skippable) {
      return;
    }
    if (down && !ev.repeat) {
      this.press(ev);
    } else if (!down) {
      this.release();
    }
  }

  protected toggleFast(): void {
    this.cutscene.toggleFast();
  }

  /** The fill grows while held, drains when let go; full: skipped. */
  private tick(): void {
    cancelAnimationFrame(this.frame);
    this.last = performance.now();
    const step = (now: number) => {
      const dt = now - this.last;
      this.last = now;
      const held = this.holding() && !!this.view()?.skippable;
      const next = held
        ? this.hold() + dt / HOLD_MS
        : this.hold() - (dt / HOLD_MS) * DRAIN_SPEED;
      this.hold.set(Math.min(1, Math.max(0, next)));
      if (this.hold() >= 1) {
        this.holding.set(false);
        this.hold.set(0);
        this.cutscene.skip();
        return;
      }
      if (held || this.hold() > 0) {
        this.frame = requestAnimationFrame(step);
      }
    };
    this.frame = requestAnimationFrame(step);
  }
}
