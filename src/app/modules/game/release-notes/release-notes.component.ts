import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { EscapeService } from '../../../core/shared/service/escape.service';
import { LucideX } from '@lucide/angular';
import { RELEASE_NOTES } from '../../../../assets/release-notes';

/** After an update: only the latest versions (a small dialog), the others behind "Voir toutes les nouveautés". */
const LATEST_COUNT = 3;

/** Month names for the dates of the versions (short, French). */
const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

/**
 * "What's new" dialog: every version of the game (latest first) with its changes in simple words, the installed
 * one marked. Opened from the version number (menu of the temperature / fps tile), and by itself the first time a
 * new version starts (whats-new.ts); closed by the ✕, the backdrop or Escape. The notes are bundled with the game (src/assets/release-notes.ts): shown offline too.
 */
@Component({
  selector: 'game-release-notes',
  imports: [LucideX],
  templateUrl: './release-notes.component.html',
  styleUrl: './release-notes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReleaseNotesComponent {
  /** Installed version (package.json). */
  readonly current = input.required<string>();
  /** Opened by itself after an update: says so above the list. */
  readonly justUpdated = input(false);
  readonly closed = output<void>();

  protected readonly releases = RELEASE_NOTES.map(r => ({ ...r, dateLabel: this.dateLabel(r.date) }));
  /** After an update, the short list was expanded. */
  protected readonly showAll = signal(false);
  /** Small dialog: opened by itself after an update, not expanded. */
  protected readonly compact = computed(() => this.justUpdated() && !this.showAll());
  protected readonly visible = computed(() => this.compact() ? this.releases.slice(0, LATEST_COUNT) : this.releases);

  constructor() {
    // Escape closes it (it was opened last)
    inject(EscapeService).whileAlive(() => this.closed.emit());
  }

  /** 2026-11-10 → 10 nov. 2026 */
  private dateLabel(date: string): string {
    const [year, month, day] = date.split('-').map(Number);
    return `${day} ${MONTHS[month - 1] ?? ''} ${year}`;
  }
}
