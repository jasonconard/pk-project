import { Component, computed, DestroyRef, effect, ElementRef, inject, input, linkedSignal, output, signal, viewChild } from '@angular/core';
import { WeatherCatalogComponent } from '../weather-catalog/weather-catalog.component';
import { KeyService } from '../../../core/shared/service/key.service';
import { weatherScreenshot } from '../shared/weather/weather-catalog';
import { applySilentMode, ignoreSilentMode, SILENT_MODE_BYPASS_SUPPORTED } from '../shared/weather/silent-mode';
import { LucideCheck, LucideCloud, LucideDynamicIcon, LucideEighthNotes, LucideIcon, LucideMoon, LucideSun, LucideSunrise, LucideSunset, LucideTimer, LucideVolume2, LucideVolumeX, LucideWind, LucideWindArrowDown } from '@lucide/angular';
import { formatHour, isWeatherAvailable, TIME_OF_DAY_LABELS, TimeOfDay, timeOfDayAt, FireflyColor, LeafMode, WEATHER_CHOICES, WeatherType, WIND_DIRECTIONS, WindDirection } from '../shared/weather/Weather';

export interface SoundSetting {
  volume: number;
  muted: boolean;
}

export interface WindSetting {
  strength: number;
  direction: WindDirection;
}

/** The settings that open in a small popover under their toolbar button. */
export type SettingPanel = 'hour' | 'wind' | 'clouds' | 'sound';

/** Keyboard shortcuts (free keys: the game uses z q s d a e r f p o, the map editor b). M (weather catalog) is in the catalog. */
const SHORTCUTS: Record<string, SettingPanel> = { h: 'hour', w: 'wind', n: 'clouds', v: 'sound' };
/** Arrow steps: hour (h), gauges (share). */
const HOUR_STEP = 0.25;
const GAUGE_STEP = 0.05;

/**
 * Ambiance tools (top left, folded): weather (opens the catalog), time of day, wind, clouds, sound.
 * Each setting opens a small popover; keyboard: M / H / W / N / V, then ← → to adjust, Escape to close.
 */
/** Icon of the time of day (hour button and popover). */
const TIME_ICONS: Record<TimeOfDay, LucideIcon> = { night: LucideMoon, dawn: LucideSunrise, day: LucideSun, dusk: LucideSunset };

@Component({
  selector: 'game-weather-panel',
  imports: [WeatherCatalogComponent, LucideDynamicIcon, LucideTimer, LucideWind, LucideWindArrowDown, LucideCloud, LucideVolume2, LucideVolumeX, LucideCheck, LucideEighthNotes],
  templateUrl: './weather-panel.component.html',
  styleUrls: ['./weather-panel.component.scss', './weather-panel.portrait.scss', './weather-panel.game.scss'],
  host: {
    '[class.game-mode]': 'gameMode()',
  },
})
export class WeatherPanelComponent {
  private readonly keyService = inject(KeyService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly weather = input.required<WeatherType>();
  readonly night = input(false);
  /** Time of day, 0..24 h. */
  readonly hour = input(12);
  /** The time goes on by itself. */
  readonly timeFlow = input(true);
  readonly windStrength = input(0);
  readonly windDirection = input<WindDirection>('east');
  readonly fireflyColor = input<FireflyColor>('green');
  readonly leafMode = input<LeafMode>('autumn');
  readonly gusts = input(true);
  readonly cloudDensity = input(0.5);
  readonly soundVolume = input(0.7);
  readonly soundMuted = input(false);
  /** Music volume 0..1 (the songs of the music editor). */
  readonly musicVolume = input(0.6);
  /**
   * Game mode: the clock (time of day, weather, temperature) shows, top left; touching it unfolds the ambiance tools
   * under it. In the map editor, its more menu unfolds them (openAmbiance).
   */
  readonly gameMode = input(false);
  /** Air temperature (°C, rounded) and its color, shown on the clock. */
  readonly temperature = input(20);
  readonly temperatureColor = input('inherit');
  readonly weatherSelected = output<WeatherType>();
  readonly hourChange = output<number>();
  readonly timeFlowChange = output<boolean>();
  readonly windChange = output<WindSetting>();
  readonly fireflyColorChange = output<FireflyColor>();
  readonly leafModeChange = output<LeafMode>();
  readonly gustsChange = output<boolean>();
  readonly cloudDensityChange = output<number>();
  readonly soundChange = output<SoundSetting>();
  readonly musicVolumeChange = output<number>();

  private readonly catalog = viewChild.required<WeatherCatalogComponent>('catalog');
  /**
   * Latest values, updated as soon as they are emitted: keys pressed quickly in a row must build on the
   * previous change, even before the inputs come back from the parent.
   */
  private readonly hourNow = linkedSignal(() => this.hour());
  private readonly windNow = linkedSignal(() => ({ strength: this.windStrength(), direction: this.windDirection() }));
  private readonly gustsNow = linkedSignal(() => this.gusts());
  private readonly cloudsNow = linkedSignal(() => this.cloudDensity());
  private readonly soundNow = linkedSignal(() => ({ volume: this.soundVolume(), muted: this.soundMuted() }));
  /** Popover currently open (null = none). */
  protected readonly panel = signal<SettingPanel | null>(null);
  /** The ambiance tools are unfolded (top left, in a column). */
  protected readonly ambianceOpen = signal(false);
  protected readonly windDirections = WIND_DIRECTIONS;
  protected readonly windPercent = computed(() => Math.round(this.windStrength() * 100));
  /** Rough wind description shown next to the gauge. */
  protected readonly windLabel = computed(() => {
    const s = this.windStrength();
    return s < 0.05 ? 'Calme' : s < 0.35 ? 'Brise' : s < 0.7 ? 'Vent fort' : 'Tempête';
  });
  protected readonly soundPercent = computed(() => Math.round(this.soundVolume() * 100));
  protected readonly musicPercent = computed(() => Math.round(this.musicVolume() * 100));
  /** iPhone / iPad: sound even in silent mode (only where the browser allows it). */
  protected readonly silentBypassSupported = SILENT_MODE_BYPASS_SUPPORTED;
  protected readonly ignoreSilentMode = ignoreSilentMode;

  protected toggleSilentMode(event: Event): void {
    event.stopPropagation();
    applySilentMode(!this.ignoreSilentMode());
  }
  protected readonly cloudPercent = computed(() => Math.round(this.cloudDensity() * 100));
  protected readonly cloudLabel = computed(() => {
    const d = this.cloudDensity();
    return d < 0.25 ? 'Clairsemés' : d < 0.5 ? 'Épars' : d < 0.75 ? 'Nombreux' : 'Couvert';
  });
  protected readonly timeOfDay = computed(() => TIME_OF_DAY_LABELS[timeOfDayAt(this.hour())]);
  protected readonly timeIcon = computed(() => TIME_ICONS[timeOfDayAt(this.hour())]);
  protected readonly hourLabel = computed(() => formatHour(this.hour()));
  /**
   * Time of day of the current weather's screenshot: the current one, unless the weather only exists at the other
   * one (only one picture then: e.g. sunny-day, while the time going by brought the night).
   */
  private readonly thumbNight = computed(() => {
    const type = this.weather();
    const atNight = isWeatherAvailable(type, true);
    const byDay = isWeatherAvailable(type, false);
    return this.night() ? atNight || !byDay : !byDay && atNight;
  });
  /** The picture failed: the other time of day's one is tried, then the emoji. */
  private readonly thumbOtherTime = signal(false);
  protected readonly currentThumb = computed(() => weatherScreenshot(this.weather(), this.thumbNight() !== this.thumbOtherTime()));
  protected readonly thumbMissing = signal(false);
  protected readonly current = computed(() => WEATHER_CHOICES.find(c => c.type === this.weather()) ?? WEATHER_CHOICES[0]);

  protected thumbError(event: Event): void {
    // A late error of a picture no longer shown (at launch, the time of day arrives just after the weather): ignored,
    // or the right picture would give way to the emoji until the next weather change
    const src = (event.target as HTMLImageElement).getAttribute('src');
    if (src !== this.currentThumb()) {
      return;
    }
    if (this.thumbOtherTime()) {
      this.thumbMissing.set(true);
    } else {
      this.thumbOtherTime.set(true);
    }
  }

  constructor() {
    // A new picture to try when the weather / time of day changes
    effect(() => {
      this.weather();
      this.thumbNight();
      this.thumbOtherTime.set(false);
      this.thumbMissing.set(false);
    });
    // Capture phase: before the game (document listener)
    const onKeyDown = (ev: KeyboardEvent) => this.onKeyDown(ev);
    const onKeyUp = (ev: KeyboardEvent) => this.panel() && ev.stopPropagation();
    const onPointerDown = (ev: PointerEvent) => {
      const target = ev.target as Node;
      // Click outside the toolbar closes the popover
      if (this.panel() && !this.host.nativeElement.querySelector('.toolbar')?.contains(target)) {
        this.panel.set(null);
      }
      // Click outside the panel (the catalog is inside it) folds the ambiance tools back
      if (this.ambianceOpen() && !this.host.nativeElement.contains(target)) {
        this.ambianceOpen.set(false);
      }
    };
    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('keyup', onKeyUp, true);
    window.addEventListener('pointerdown', onPointerDown, true);
    inject(DestroyRef).onDestroy(() => {
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('keyup', onKeyUp, true);
      window.removeEventListener('pointerdown', onPointerDown, true);
    });
  }

  /** Unfolds the ambiance tools (the game menu, the editor's more menu). */
  openAmbiance(): void {
    this.ambianceOpen.set(true);
  }

  protected toggleAmbiance(event: Event): void {
    this.dropFocus(event);
    this.panel.set(null);
    this.ambianceOpen.update(open => !open);
  }

  protected openCatalog(event?: Event): void {
    if (event) {
      this.dropFocus(event);
    }
    this.panel.set(null);
    this.catalog().show();
  }

  protected toggle(panel: SettingPanel, event?: Event): void {
    if (event) {
      this.dropFocus(event);
    }
    this.panel.update(open => open === panel ? null : panel);
    // Held keys would stay pressed (their keyup won't reach the game while a popover is open)
    this.keyService.clearKeys();
  }

  protected setWindStrength(event: Event): void {
    this.emitWind((event.target as HTMLInputElement).valueAsNumber / 100, this.windNow().direction);
  }

  protected setWindDirection(direction: WindDirection, event: Event): void {
    this.dropFocus(event);
    this.emitWind(this.windNow().strength, direction);
  }

  /** The slider keeps the focus while dragging; release it at the end so the keys go to the game again. */
  protected releaseSlider(event: Event): void {
    this.dropFocus(event);
  }

  protected setSoundVolume(event: Event): void {
    // Moving the slider unmutes
    this.emitSound((event.target as HTMLInputElement).valueAsNumber / 100, false);
  }

  protected setMusicVolume(event: Event): void {
    this.musicVolumeChange.emit((event.target as HTMLInputElement).valueAsNumber / 100);
    // Moving the slider unmutes, like the sound one
    if (this.soundNow().muted) {
      this.emitSound(this.soundNow().volume, false);
    }
  }

  protected toggleMute(event?: Event): void {
    if (event) {
      this.dropFocus(event);
    }
    this.emitSound(this.soundNow().volume, !this.soundNow().muted);
  }

  protected setCloudDensity(event: Event): void {
    this.emitClouds((event.target as HTMLInputElement).valueAsNumber / 100);
  }

  protected toggleGusts(event?: Event): void {
    if (event) {
      this.dropFocus(event);
    }
    this.gustsNow.set(!this.gustsNow());
    this.gustsChange.emit(this.gustsNow());
  }

  protected toggleTimeFlow(event?: Event): void {
    if (event) {
      this.dropFocus(event);
    }
    this.timeFlowChange.emit(!this.timeFlow());
  }

  protected setHour(event: Event): void {
    this.emitHour((event.target as HTMLInputElement).valueAsNumber);
  }

  private emitHour(hour: number) {
    this.hourNow.set(((hour % 24) + 24) % 24);
    this.hourChange.emit(this.hourNow());
  }

  private emitWind(strength: number, direction: WindDirection) {
    this.windNow.set({ strength: Math.min(Math.max(strength, 0), 1), direction });
    this.windChange.emit(this.windNow());
  }

  private emitClouds(density: number) {
    this.cloudsNow.set(Math.min(Math.max(density, 0), 1));
    this.cloudDensityChange.emit(this.cloudsNow());
  }

  private emitSound(volume: number, muted: boolean) {
    this.soundNow.set({ volume: Math.min(Math.max(volume, 0), 1), muted });
    this.soundChange.emit(this.soundNow());
  }

  private onKeyDown(ev: KeyboardEvent): void {
    if (this.catalog().isOpen() || ev.target instanceof HTMLInputElement && ev.target.type === 'text') {
      return;
    }
    const key = ev.key.toLowerCase();
    const shortcut = SHORTCUTS[key];
    if (shortcut && !ev.ctrlKey && !ev.metaKey && !ev.altKey) {
      ev.stopPropagation();
      if (!ev.repeat) {
        // The tools unfold so the popover has its button
        this.ambianceOpen.set(true);
        this.toggle(shortcut);
      }
      return;
    }
    const panel = this.panel();
    if (!panel) {
      // Escape folds the ambiance tools back (before the game menu opens with it)
      if (ev.key === 'Escape' && this.ambianceOpen()) {
        ev.stopPropagation();
        this.ambianceOpen.set(false);
      }
      return;
    }
    // A popover is open: arrows / Enter / Escape act on it, not on the game
    const sign = ev.key === 'ArrowLeft' ? -1 : ev.key === 'ArrowRight' ? 1 : 0;
    let handled = true;
    if (ev.key === 'Escape') {
      this.panel.set(null);
    } else if (sign) {
      switch (panel) {
        case 'hour': this.emitHour(this.hourNow() + sign * HOUR_STEP); break;
        case 'wind': this.emitWind(this.windNow().strength + sign * GAUGE_STEP, this.windNow().direction); break;
        case 'clouds': this.emitClouds(this.cloudsNow() + sign * GAUGE_STEP); break;
        case 'sound': this.emitSound(this.soundNow().volume + sign * GAUGE_STEP, false); break;
      }
    } else if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') {
      if (panel === 'wind') {
        this.emitWind(this.windNow().strength, this.windNow().direction === 'east' ? 'west' : 'east');
      }
    } else if (ev.key === 'Enter' || ev.key === ' ') {
      if (panel === 'hour') {
        this.toggleTimeFlow();
      } else if (panel === 'wind') {
        this.toggleGusts();
      } else if (panel === 'sound') {
        this.toggleMute();
      }
    } else {
      handled = false;
    }
    if (handled) {
      ev.stopPropagation();
      ev.preventDefault();
    }
  }

  /** Drop the focus so game keys (space, enter...) don't click the button again. */
  private dropFocus(event: Event): void {
    (event.currentTarget as HTMLElement | null)?.blur?.();
  }
}
