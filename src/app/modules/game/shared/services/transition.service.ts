import { Service, signal } from "@angular/core";
import { cachedDatabase } from "../../../database-editor/shared/database-storage";
import {
  TransitionCase,
  transitionInfo,
  TransitionKind,
} from "../model/transition";

/** The picture stays covered this long while what changes behind settles (ms). */
const HOLD = 90;

export interface TransitionView {
  kind: TransitionKind;
  /** 0 nothing covered, 1 everything. */
  covered: number;
  revealing: boolean;
}

/**
 * Plays the screen transitions (transition.ts): covers the picture, runs what must change behind, uncovers it.
 * The picture is drawn by `game-transition` from `view`.
 */
@Service()
export class TransitionService {
  private readonly viewState = signal<TransitionView | null>(null);
  /** The transition being played (null: none). */
  readonly view = this.viewState.asReadonly();

  /** The transition chosen in the database for a case. */
  kindFor(when: TransitionCase): TransitionKind {
    return cachedDatabase().settings[0]?.transitions?.[when] ?? "none";
  }

  /**
   * Covers the picture, runs `change` behind it, then uncovers it; `done` once everything is seen again. Without a
   * transition (or while another one is played), `change` and `done` run at once.
   */
  through(kind: TransitionKind, change: () => void, done?: () => void): void {
    const info = transitionInfo(kind);
    if (info.id === "none" || this.viewState()) {
      change();
      done?.();
      return;
    }
    this.run(info.id, info.cover, false, () => {
      try {
        change();
      } finally {
        setTimeout(
          () =>
            this.run(info.id, info.reveal, true, () => {
              this.viewState.set(null);
              done?.();
            }),
          HOLD
        );
      }
    });
  }

  /** One half of a transition, picture after picture. */
  private run(
    kind: TransitionKind,
    duration: number,
    revealing: boolean,
    then: () => void
  ): void {
    const start = performance.now();
    const step = () => {
      const t = Math.min(1, (performance.now() - start) / duration);
      this.viewState.set({ kind, covered: revealing ? 1 - t : t, revealing });
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        then();
      }
    };
    step();
  }
}
