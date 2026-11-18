import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, output, signal } from '@angular/core';
import {
  LucideBackpack, LucideCalendarDays, LucideCamera, LucideChevronDown, LucideChevronRight, LucideCloudSun, LucideDynamicIcon,
  LucideGauge, LucideHeartHandshake, LucideIcon, LucideMap, LucideMaximize, LucideMinimize, LucideSave, LucideSparkles,
  LucideUsers, LucideVolume2, LucideVolumeX, LucideX,
} from '@lucide/angular';
import { GameService } from '../shared/services/game.service';
import { CoreService } from '../../../core/shared/service/core.service';
import { KeyService } from '../../../core/shared/service/key.service';
import { QUALITY_CHOICES, QualityMode } from '../shared/model/Quality';
import { hapticsEnabled, hapticsSupported, setHapticsEnabled } from '../../../core/shared/haptics';

/** An entry of the game's own menus: none exists yet, each one comes with its tool (docs/idees.md). */
interface MenuEntry {
  icon: LucideIcon;
  label: string;
  /** What the tool will bring, shown in the tooltip. */
  soon: string;
}

const ENTRIES: MenuEntry[] = [
  { icon: LucideUsers, label: 'Équipe', soon: 'L\'équipe et ses compétences' },
  { icon: LucideBackpack, label: 'Sac', soon: 'Les objets trouvés et achetés' },
  { icon: LucideHeartHandshake, label: 'Liens', soon: 'Les liens avec les habitants et l\'équipe' },
  { icon: LucideCalendarDays, label: 'Agenda', soon: 'Les jours, les activités, les donjons ouverts' },
  { icon: LucideMap, label: 'Carte', soon: 'La carte du monde' },
  { icon: LucideSave, label: 'Sauver', soon: 'La sauvegarde de partie sur plusieurs emplacements' },
];

/**
 * Game menu (button top right, or Escape): the game's menus to come (greyed), the quick switches (full screen,
 * sound), and the settings: ambiance (unfolds the tools under the clock), graphics quality, what's new.
 * A sheet from the bottom on phones in portrait, a panel on the right otherwise.
 */
@Component({
  selector: 'game-menu',
  imports: [LucideDynamicIcon, LucideX, LucideMaximize, LucideMinimize, LucideVolume2, LucideVolumeX, LucideCamera,
    LucideCloudSun, LucideGauge, LucideSparkles, LucideChevronRight, LucideChevronDown],
  templateUrl: './game-menu.component.html',
  styleUrl: './game-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameMenuComponent {
  private readonly gameService = inject(GameService);
  private readonly coreService = inject(CoreService);

  /** Installed version (package.json). */
  readonly version = input.required<string>();
  readonly closed = output<void>();
  /** Ambiance: the menu closes, the tools unfold under the clock. */
  readonly ambiance = output<void>();
  readonly releaseNotes = output<void>();

  protected readonly entries = ENTRIES;
  protected readonly hud = this.gameService.hud;
  protected readonly fullScreened = this.coreService.fullScreened;
  protected readonly fullScreenSupported = this.coreService.fullScreenSupported;
  protected readonly soundVolume = this.gameService.soundVolume;
  protected readonly soundMuted = this.gameService.soundMuted;
  protected readonly soundPercent = computed(() => Math.round(this.soundVolume() * 100));
  protected readonly quality = this.gameService.quality;
  protected readonly qualityChoices = QUALITY_CHOICES;
  protected readonly qualityLabel = computed(() => QUALITY_CHOICES.find(q => q.mode === this.quality())?.label ?? '');
  /** The graphics settings are unfolded. */
  protected readonly qualityOpen = signal(false);
  protected readonly hapticsSupported = hapticsSupported;
  protected readonly hapticsEnabled = hapticsEnabled;

  constructor() {
    // Held keys would stay pressed (their keyup won't reach the game while the menu is open)
    inject(KeyService).clearKeys();
    // Capture phase: before the game, which also uses Escape; the game's keys don't reach it while the menu is open
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        ev.preventDefault();
        ev.stopPropagation();
        this.closed.emit();
      } else if (!(ev.target instanceof HTMLButtonElement || ev.target instanceof HTMLInputElement)) {
        ev.stopPropagation();
      }
    };
    const onKeyUp = (ev: KeyboardEvent) => ev.stopPropagation();
    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('keyup', onKeyUp, true);
    inject(DestroyRef).onDestroy(() => {
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('keyup', onKeyUp, true);
    });
  }

  protected toggleFullScreen(): void {
    this.coreService.toggleFullScreen();
  }

  protected toggleMute(): void {
    this.gameService.setSound(this.soundVolume(), !this.soundMuted());
  }

  protected setQuality(mode: QualityMode): void {
    this.gameService.setQuality(mode);
  }

  protected setHaptics(event: Event): void {
    setHapticsEnabled((event.target as HTMLInputElement).checked);
  }

  protected setDiagnostics(event: Event): void {
    this.gameService.setDiagnostics((event.target as HTMLInputElement).checked);
  }
}
