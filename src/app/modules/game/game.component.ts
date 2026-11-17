import { afterNextRender, Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Passage } from './shared/model/Passage';
import { DecimalPipe } from '@angular/common';
import { isFirstStartOfNewVersion } from './release-notes/whats-new';
import { GameMode } from './shared/model/Game';
import { GameService } from './shared/services/game.service';
import { StickComponent } from '../../core/stick/stick.component';
import { TouchPadComponent } from '../../core/touch-pad/touch-pad.component';
import { MessageComponent } from '../../core/message/message.component';
import { TeleportComponent } from './teleport/teleport.component';
import { FightUiComponent } from '../fight/fight-ui/fight-ui.component';
import { EditorBarComponent } from './editor-bar/editor-bar.component';
import { ReleaseNotesComponent } from './release-notes/release-notes.component';
import { temperatureColor } from './shared/util/temperature-color';
import { QUALITY_CHOICES, QualityMode } from './shared/model/Quality';
import { version } from '../../../../package.json';
import { EditBrush, EditCommand } from './shared/services/map-editor.service';
import { SoundSetting, WeatherPanelComponent, WindSetting } from './weather-panel/weather-panel.component';
import { FireflyColor, LeafMode, WeatherType } from './shared/weather/Weather';
import { hapticsEnabled, hapticsSupported, setHapticsEnabled } from '../../core/shared/haptics';

@Component({
  selector: 'game-main',
  imports: [StickComponent, TouchPadComponent, MessageComponent, TeleportComponent, FightUiComponent, WeatherPanelComponent, EditorBarComponent, ReleaseNotesComponent, DecimalPipe],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  private readonly gameService = inject(GameService);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLElement>>('canvas');

  protected readonly hud = this.gameService.hud;
  protected readonly weather = this.gameService.weather;
  protected readonly night = this.gameService.night;
  protected readonly hour = this.gameService.hour;
  protected readonly timeFlow = this.gameService.timeFlow;
  protected readonly windStrength = this.gameService.windStrength;
  protected readonly windDirection = this.gameService.windDirection;
  protected readonly fireflyColor = this.gameService.fireflyColor;
  protected readonly leafMode = this.gameService.leafMode;
  protected readonly gusts = this.gameService.gusts;
  protected readonly cloudDensity = this.gameService.cloudDensity;
  protected readonly soundVolume = this.gameService.soundVolume;
  protected readonly soundMuted = this.gameService.soundMuted;
  protected readonly musicVolume = this.gameService.musicVolume;
  protected readonly GameMode = GameMode;
  /** Hidden menu on the temperature / fps tile: graphics quality. */
  protected readonly qualityMenu = signal(false);
  protected readonly qualityChoices = QUALITY_CHOICES;
  /** Version of the game (package.json): tells if the installed app (PWA) is up to date. */
  protected readonly appVersion = version;
  /** "What's new" dialog, opened from the version number, and by itself the first time a new version starts. */
  protected readonly releaseNotes = signal(false);
  /** This start is the first one of a new version (update): the dialog opens once the game is loaded. */
  protected readonly justUpdated = signal(isFirstStartOfNewVersion(version));
  protected readonly quality = this.gameService.quality;
  /** Air temperature (°C, rounded) and its color, from icy blue to red. */
  protected readonly temperatureLabel = computed(() => Math.round(this.hud()?.temperature ?? 20));
  protected readonly temperatureColor = computed(() => temperatureColor(this.hud()?.temperature ?? 20));

  constructor() {
    afterNextRender(() => this.gameService.init(this.canvasRef().nativeElement));
    // After an update: what's new, once the loading screen is gone
    effect(() => {
      const hud = this.hud();
      if (this.justUpdated() && hud && !hud.loading && !this.releaseNotes()) {
        this.releaseNotes.set(true);
      }
    });
  }

  protected closeReleaseNotes(): void {
    this.releaseNotes.set(false);
    this.justUpdated.set(false);
  }

  protected togglePaused(): void {
    this.gameService.togglePaused();
  }

  protected editCommand(command: EditCommand): void {
    this.gameService.editCommand(command);
  }

  protected setEditBrush(brush: EditBrush): void {
    this.gameService.setEditBrush(brush);
  }

  protected selectEditTile(tileId: string | null): void {
    this.gameService.selectEditTile(tileId);
  }

  protected selectEditModel(modelId: string | null): void {
    this.gameService.selectEditModel(modelId);
  }

  protected setWeather(type: WeatherType): void {
    this.gameService.setWeather(type);
  }

  protected setWind(wind: WindSetting): void {
    this.gameService.setWind(wind.strength, wind.direction);
  }

  protected setFireflyColor(color: FireflyColor): void {
    this.gameService.setFireflyColor(color);
  }

  protected setMusicVolume(volume: number): void {
    this.gameService.setMusicVolume(volume);
  }

  protected setSound(sound: SoundSetting): void {
    this.gameService.setSound(sound.volume, sound.muted);
  }

  protected setCloudDensity(density: number): void {
    this.gameService.setCloudDensity(density);
  }

  protected setGusts(enabled: boolean): void {
    this.gameService.setGusts(enabled);
  }

  protected setLeafMode(mode: LeafMode): void {
    this.gameService.setLeafMode(mode);
  }

  protected setHour(hour: number): void {
    this.gameService.setHour(hour);
  }

  protected setTimeFlow(flowing: boolean): void {
    this.gameService.setTimeFlow(flowing);
  }

  protected toggleQualityMenu(event: Event): void {
    (event.currentTarget as HTMLElement).blur();
    this.qualityMenu.update(open => !open);
  }

  protected openReleaseNotes(event: Event): void {
    (event.currentTarget as HTMLElement).blur();
    this.qualityMenu.set(false);
    this.releaseNotes.set(true);
  }

  protected readonly hapticsSupported = hapticsSupported;
  protected readonly hapticsEnabled = hapticsEnabled;

  protected setHaptics(event: Event): void {
    setHapticsEnabled((event.target as HTMLInputElement).checked);
  }

  protected setDiagnostics(event: Event): void {
    this.gameService.setDiagnostics((event.target as HTMLInputElement).checked);
  }

  protected setQuality(mode: QualityMode): void {
    this.gameService.setQuality(mode);
  }

  protected setPassage(passage: Passage | null): void {
    this.gameService.setPassage(passage);
  }

  protected pickArrival(): void {
    this.gameService.pickArrival();
  }

  protected cancelPick(): void {
    this.gameService.endArrivalPick(null);
  }

  protected toggleEditMode(): void {
    this.gameService.toggleEditMode();
  }
}
