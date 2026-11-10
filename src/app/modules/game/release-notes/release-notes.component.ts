import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, output } from '@angular/core';
import { RELEASE_NOTES } from '../../../../assets/release-notes';

/** Month names for the dates of the versions (short, French). */
const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

/**
 * "What's new" dialog: every version of the game (latest first) with its changes in simple words, the installed
 * one marked. Opened from the version number (menu of the temperature / fps tile); closed by the ✕, the backdrop
 * or Escape. The notes are bundled with the game (src/assets/release-notes.ts): shown offline too.
 */
@Component({
  selector: 'game-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrl: './release-notes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReleaseNotesComponent {
  /** Installed version (package.json). */
  readonly current = input.required<string>();
  readonly closed = output<void>();

  protected readonly releases = RELEASE_NOTES.map(r => ({ ...r, dateLabel: this.dateLabel(r.date) }));

  constructor() {
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        // (before the editor / the game, which also use Escape)
        ev.preventDefault();
        ev.stopPropagation();
        this.closed.emit();
      }
    };
    window.addEventListener('keydown', onKeyDown, true);
    inject(DestroyRef).onDestroy(() => window.removeEventListener('keydown', onKeyDown, true));
  }

  /** 2026-11-10 → 10 nov. 2026 */
  private dateLabel(date: string): string {
    const [year, month, day] = date.split('-').map(Number);
    return `${day} ${MONTHS[month - 1] ?? ''} ${year}`;
  }
}
