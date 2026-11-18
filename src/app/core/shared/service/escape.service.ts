import { DestroyRef, effect, inject, Injector, Service } from '@angular/core';
import { isGameCovered } from '../app-visibility';

/** Something Escape closes (or steps back in): a menu, a popover, a selection, a tool in hand… */
export interface EscapeLayer {
  close: () => void;
}

/** Text fields keep Escape (their own: empty the search…). */
const typing = (target: EventTarget | null): boolean =>
  target instanceof HTMLTextAreaElement || (target instanceof HTMLElement && target.isContentEditable)
  || (target instanceof HTMLInputElement && ['text', 'search', 'email', 'number', 'password', 'url'].includes(target.type));

/**
 * Escape undoes the last thing done first: what is open (menus, popovers, dialogs, the selected object, the tool
 * in hand…) is kept in the order it was opened or last changed, and Escape closes the latest one, only that one.
 * Nothing open: Escape goes on to the game (its cancel key, the game menu).
 * One listener on the window, capture phase, added before any other (the app starts with it): it runs first.
 *
 * The back button (Android, the browser's) does the same: while something is open, an extra history entry is kept;
 * going back pops it, and the latest thing open is closed (the entry comes back if others are still open). Closed
 * otherwise (Escape, a click), the entry is taken back silently. Nothing open: back does what it always did (leaves
 * the app on Android).
 */
@Service()
export class EscapeService {
  private readonly layers: EscapeLayer[] = [];
  /** The extra history entry is there (something is open). */
  private armed = false;
  /** History moves made here: their popstate is not a back press. */
  private ownPops = 0;
  private syncTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    window.addEventListener('popstate', () => {
      if (this.ownPops) {
        this.ownPops--;
        return;
      }
      if (!this.armed) {
        return;
      }
      // Back pressed: like Escape (also over an editor: it closes, saved)
      this.armed = false;
      this.layers[this.layers.length - 1]?.close();
      this.syncHistory();
    });
    window.addEventListener('keydown', ev => {
      // (an editor over the game: Escape is its own)
      if (ev.key !== 'Escape' || typing(ev.target) || !this.layers.length || isGameCovered()) {
        return;
      }
      ev.preventDefault();
      // (the other Escape listeners, on the window too, must not act as well)
      ev.stopImmediatePropagation();
      this.layers[this.layers.length - 1].close();
    }, true);
  }

  /** Puts a layer on top (opened, or changed: the latest action). */
  open(layer: EscapeLayer): void {
    this.close(layer);
    this.layers.push(layer);
    this.syncHistory();
  }

  /** Takes a layer out (closed). */
  close(layer: EscapeLayer): void {
    const index = this.layers.indexOf(layer);
    if (index >= 0) {
      this.layers.splice(index, 1);
      this.syncHistory();
    }
  }

  /**
   * The extra history entry follows what is open: added when something opens, taken back when all is closed. A bit
   * later: a closing layer leaves the stack once its state has changed (see track).
   */
  private syncHistory(): void {
    clearTimeout(this.syncTimer);
    this.syncTimer = setTimeout(() => {
      if (this.layers.length && !this.armed) {
        history.pushState(history.state, '');
        this.armed = true;
      } else if (!this.layers.length && this.armed) {
        this.armed = false;
        this.ownPops++;
        history.back();
      }
    }, 50);
  }

  /**
   * A layer following a state: open while `state` gives something truthy, put on top again each time it changes
   * (another object selected…), taken out when it gives nothing or the component goes. In an injection context.
   */
  track(state: () => unknown, close: () => void, injector?: Injector): void {
    const layer: EscapeLayer = { close };
    effect(() => {
      if (state()) {
        this.open(layer);
      } else {
        this.close(layer);
      }
    }, { injector });
    (injector?.get(DestroyRef) ?? inject(DestroyRef)).onDestroy(() => this.close(layer));
  }

  /** A layer for as long as the component lives (a dialog shown only while open). In an injection context. */
  whileAlive(close: () => void): void {
    const layer: EscapeLayer = { close };
    this.open(layer);
    inject(DestroyRef).onDestroy(() => this.close(layer));
  }
}
