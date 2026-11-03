import { Service, signal } from '@angular/core';
import { fromEvent } from 'rxjs';

@Service()
export class CoreService {
  private readonly logsState = signal('');
  readonly logs = this.logsState.asReadonly();

  private readonly resumedState = signal(!document.hidden);
  /** `false` when the tab is hidden or the window lost focus. */
  readonly resumed = this.resumedState.asReadonly();

  private readonly fullScreenedState = signal(!!document.fullscreenElement);
  readonly fullScreened = this.fullScreenedState.asReadonly();

  constructor() {
    fromEvent(document, 'fullscreenchange').subscribe(() => {
      this.fullScreenedState.set(!!document.fullscreenElement);
    });
    fromEvent(document, 'visibilitychange').subscribe(() => this.resumedState.set(!document.hidden));
    fromEvent(window, 'blur').subscribe(() => this.resumedState.set(false));
    fromEvent(window, 'focus').subscribe(() => this.resumedState.set(true));
  }

  toggleFullScreen(): void {
    if (this.fullScreened()) {
      void document.exitFullscreen();
    } else {
      void document.documentElement.requestFullscreen();
    }
  }

  setLogs(logs: string): void {
    this.logsState.set(logs);
  }
}
