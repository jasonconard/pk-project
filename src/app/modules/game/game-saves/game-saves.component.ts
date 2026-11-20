import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { LucideDownload, LucideSave, LucideTrash, LucideX } from '@lucide/angular';
import { EscapeService } from '../../../core/shared/service/escape.service';
import { GameService } from '../shared/services/game.service';
import { GameSave, loadSaves, writeSave } from '../shared/services/game-saves';
import { WEATHER_CHOICES } from '../shared/weather/Weather';
import { currentVariableValues, restoreVariableValues } from '../../variables-editor/shared/variable-values';
import { currentParty, restoreParty } from '../../database-editor/shared/party';

type SlotAction = 'load' | 'overwrite' | 'delete';

/**
 * Saved games (menu → Sauver): a few slots, each with where the player was, the time, the weather and when it was
 * saved. Sauver ici / Écraser keeps the game now; Charger goes back to it (the current progress is lost: pressed
 * twice, like Écraser and Supprimer). Closed by the ✕, the backdrop or Escape.
 */
@Component({
  selector: 'game-saves',
  imports: [LucideDownload, LucideSave, LucideTrash, LucideX],
  templateUrl: './game-saves.component.html',
  styleUrl: './game-saves.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSavesComponent {
  readonly version = input.required<string>();
  readonly closed = output<void>();
  /** A game was loaded: back to it (every menu closes). */
  readonly loaded = output<void>();

  private readonly gameService = inject(GameService);
  protected readonly slots = signal(loadSaves());
  protected readonly message = signal('');
  /** The action pressed once (pressed again within 3 s: done). */
  protected readonly armed = signal<{ slot: number, action: SlotAction } | null>(null);
  private armTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(EscapeService).whileAlive(() => this.closed.emit());
    inject(DestroyRef).onDestroy(() => clearTimeout(this.armTimer));
  }

  protected isArmed(slot: number, action: SlotAction): boolean {
    const armed = this.armed();
    return armed?.slot === slot && armed.action === action;
  }

  protected saveTo(slot: number): void {
    if (this.slots()[slot] && !this.confirm(slot, 'overwrite')) {
      return;
    }
    const spot = this.gameService.playerSpot();
    if (!spot) {
      return;
    }
    const save: GameSave = {
      savedAt: new Date().toISOString(),
      appVersion: this.version(),
      ...spot,
      hour: this.gameService.hour(),
      weather: this.gameService.weather(),
      variables: currentVariableValues(),
      party: structuredClone(currentParty()),
    };
    this.message.set(writeSave(slot, save) ? `Partie sauvée dans l'emplacement ${slot + 1}.` : 'La sauvegarde a échoué (plus de place ?).');
    this.slots.set(loadSaves());
  }

  protected load(slot: number): void {
    const save = this.slots()[slot];
    if (!save || !this.confirm(slot, 'load')) {
      return;
    }
    restoreVariableValues(save.variables ?? {});
    restoreParty(save.party);
    if (!this.gameService.restoreSpot(save.map, save.pos, save.hour, save.weather)) {
      this.message.set(`La carte « ${save.mapName} » n'existe plus : retour à la carte de départ.`);
      this.slots.set(loadSaves());
      return;
    }
    this.loaded.emit();
  }

  protected remove(slot: number): void {
    if (!this.confirm(slot, 'delete')) {
      return;
    }
    writeSave(slot, null);
    this.slots.set(loadSaves());
    this.message.set(`Emplacement ${slot + 1} vidé.`);
  }

  protected place(save: GameSave): string {
    const hours = Math.floor(save.hour);
    const minutes = Math.floor((save.hour - hours) * 60);
    const weather = WEATHER_CHOICES.find(w => w.type === save.weather)?.label;
    return [save.mapName, `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`, weather].filter(Boolean).join(' · ');
  }

  protected when(save: GameSave): string {
    const date = new Date(save.savedAt);
    const day = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    const time = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return `Sauvée le ${day} à ${time}`;
  }

  /** First press: armed for 3 s (returns false); second press: true. */
  private confirm(slot: number, action: SlotAction): boolean {
    clearTimeout(this.armTimer);
    if (this.isArmed(slot, action)) {
      this.armed.set(null);
      return true;
    }
    this.armed.set({ slot, action });
    this.message.set('');
    this.armTimer = setTimeout(() => this.armed.set(null), 3000);
    return false;
  }
}
