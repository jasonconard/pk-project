import { computed, effect, inject, Service, signal } from '@angular/core';
import { MapHelper } from "../model/MapHelper";
import * as THREE from 'three';
import { GameMode, Game } from "../model/Game";
import { auditTime, fromEvent } from "rxjs";
import { QUALITY_CHOICES, QualityMode } from '../model/Quality';
import { EditBrush, EditCommand, EditSelection, MapEditorService } from './map-editor.service';
import { GameMapService } from "./game-map.service";
import { KeyService } from "../../../../core/shared/service/key.service";
import { KeyCode } from "../../../../core/shared/model/PressedKey";
import { FightService } from "../../../fight/shared/services/fight.service";
import { DAY_ONLY_HOUR, NIGHT_ONLY_HOUR, MORNING_MIST_HOUR, mistAt, FIREFLY_COLORS, FireflyColor, fireflyColorHex, isNightHour, isWeatherAvailable, LeafMode, WeatherType, WindDirection, windToX } from "../weather/Weather";

/** Snapshot of the game state displayed by the Angular UI (HUD, overlays). */
export interface GameHud {
  loading: boolean;
  paused: boolean;
  framePerSec: number;
  /** Air temperature (°C, rounded to 0.1). */
  temperature: number;
  mode: GameMode;
  /** Map editor: model being placed (null = none). */
  editModelId: string | null;
  /** Map editor: ground tile being painted. */
  editTileId: string | null;
  /** Map editor: ground brush. */
  editBrush: EditBrush;
  /** Map editor open (free camera, player frozen). */
  editMode: boolean;
  /** Map editor: selected object, changes to undo / redo. */
  editSelection: EditSelection | null;
  editCanUndo: boolean;
  editCanRedo: boolean;
  /** Render pixel ratio and shadow texture size in use (graphics quality). */
  pixelRatio: number;
  shadowMapSize: number;
  mapHelper: MapHelper | null;
}

const sameHud = (a: GameHud | null, b: GameHud | null): boolean =>
  a === b || (!!a && !!b && (Object.keys(a) as (keyof GameHud)[]).every(key => a[key] === b[key]));

/** Weather and ambience settings kept between sessions (browser storage). */
interface SavedSettings {
  weather: WeatherType;
  hour: number;
  timeFlow: boolean;
  windStrength: number;
  windDirection: WindDirection;
  gusts: boolean;
  cloudDensity: number;
  soundVolume: number;
  soundMuted: boolean;
  fireflyColor: FireflyColor;
  leafMode: LeafMode;
  quality: QualityMode;
}

const SETTINGS_KEY = 'pk-weather-settings';

/** Input / moves step (ms: 120 per second), most steps run at once, most time caught up at once (ms). */
const INPUT_STEP = 1000 / 120;
const MAX_INPUT_STEPS = 12;
const MAX_INPUT_CATCH_UP = 250;

/** Last saved settings; anything missing or invalid (old version, removed weather...) is left out. */
function loadSettings(): Partial<SavedSettings> {
  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? '{}') ?? {};
  } catch {
    return {};
  }
  const out: Partial<SavedSettings> = {};
  const unit = (v: unknown) => typeof v === 'number' && v >= 0 && v <= 1 ? v : undefined;
  const bool = (v: unknown) => typeof v === 'boolean' ? v : undefined;
  if (Object.values(WeatherType).includes(raw['weather'] as WeatherType)) {
    out.weather = raw['weather'] as WeatherType;
  }
  if (typeof raw['hour'] === 'number' && raw['hour'] >= 0 && raw['hour'] < 24) {
    out.hour = raw['hour'];
  }
  if (raw['windDirection'] === 'east' || raw['windDirection'] === 'west') {
    out.windDirection = raw['windDirection'];
  }
  if (FIREFLY_COLORS.some(c => c.color === raw['fireflyColor'])) {
    out.fireflyColor = raw['fireflyColor'] as FireflyColor;
  }
  if (QUALITY_CHOICES.some(q => q.mode === raw['quality'])) {
    out.quality = raw['quality'] as QualityMode;
  }
  if (raw['leafMode'] === 'autumn' || raw['leafMode'] === 'cherry') {
    out.leafMode = raw['leafMode'];
  }
  out.windStrength = unit(raw['windStrength']);
  out.cloudDensity = unit(raw['cloudDensity']);
  out.soundVolume = unit(raw['soundVolume']);
  out.timeFlow = bool(raw['timeFlow']);
  out.gusts = bool(raw['gusts']);
  out.soundMuted = bool(raw['soundMuted']);
  return out;
}

/** What this tab saved last: only the settings that changed since are written. */
let lastSaved: Partial<SavedSettings> = {};

/**
 * Saves the settings that changed, merged into the stored ones: with the game open in several tabs, one tab's
 * clock going by doesn't overwrite the weather chosen in another one.
 */
function saveSettings(settings: SavedSettings) {
  const changed = (Object.keys(settings) as (keyof SavedSettings)[]).filter(k => settings[k] !== lastSaved[k]);
  if (!changed.length) {
    return;
  }
  try {
    const stored = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? '{}') ?? {};
    changed.forEach(k => stored[k] = settings[k]);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(stored));
    lastSaved = { ...settings };
  } catch {
    // Storage unavailable (private mode...): settings just won't be kept
  }
}

/** Real duration of a whole day (s) when the time goes by itself, and the time step (ms). */
const DAY_DURATION = 12 * 60;
const TIME_STEP = 250;

@Service()
export class GameService {
  private readonly keyService = inject(KeyService);
  private readonly fightService = inject(FightService);
  private readonly gameMapService = inject(GameMapService);
  private readonly mapEditorService = inject(MapEditorService);

  private game: Game | null = null;

  private readonly hudState = signal<GameHud | null>(null, { equal: sameHud });
  /** Reactive view of the (mutable) game object, synced on every rendered frame. */
  readonly hud = this.hudState.asReadonly();

  /** Settings of the last session (weather, time, wind, clouds, sound...), see saveSettings. */
  private readonly saved = (lastSaved = loadSettings());

  private readonly weatherState = signal(this.saved.weather ?? WeatherType.NEUTRAL);
  readonly weather = this.weatherState.asReadonly();
  /** Time of day, 0..24 h (dawn 6-8 h, dusk 18-20 h). */
  private readonly hourState = signal(this.saved.hour ?? 12);
  readonly hour = this.hourState.asReadonly();
  readonly night = computed(() => isNightHour(this.hourState()));
  /** The time of day goes on by itself (a whole day in DAY_DURATION). */
  private readonly timeFlowState = signal(this.saved.timeFlow ?? true);
  readonly timeFlow = this.timeFlowState.asReadonly();
  /** Wind strength 0..1 and where it blows towards. */
  private readonly windStrengthState = signal(this.saved.windStrength ?? 0.3);
  readonly windStrength = this.windStrengthState.asReadonly();
  private readonly windDirectionState = signal<WindDirection>(this.saved.windDirection ?? 'east');
  readonly windDirection = this.windDirectionState.asReadonly();
  /** Sound volume 0..1 and mute. */
  private readonly soundVolumeState = signal(this.saved.soundVolume ?? 0.7);
  readonly soundVolume = this.soundVolumeState.asReadonly();
  private readonly soundMutedState = signal(this.saved.soundMuted ?? false);
  readonly soundMuted = this.soundMutedState.asReadonly();
  /** Cloud density 0..1 (scattered .. overcast). */
  private readonly cloudDensityState = signal(this.saved.cloudDensity ?? 0.5);
  readonly cloudDensity = this.cloudDensityState.asReadonly();
  /** Random wind gusts on top of the wind setting. */
  private readonly gustsState = signal(this.saved.gusts ?? true);
  readonly gusts = this.gustsState.asReadonly();
  private readonly fireflyColorState = signal<FireflyColor>(this.saved.fireflyColor ?? 'green');
  readonly fireflyColor = this.fireflyColorState.asReadonly();
  private readonly leafModeState = signal<LeafMode>(this.saved.leafMode ?? 'autumn');
  readonly leafMode = this.leafModeState.asReadonly();
  /** Graphics quality (hidden menu on the temperature / fps tile). */
  private readonly qualityState = signal<QualityMode>(this.saved.quality ?? 'auto');
  readonly quality = this.qualityState.asReadonly();

  constructor() {
    this.initCheckResize();
    // Saved on every change (the hour changes a few times per second while the time goes by: tiny writes)
    effect(() => saveSettings({
      weather: this.weatherState(),
      hour: this.hourState(),
      timeFlow: this.timeFlowState(),
      windStrength: this.windStrengthState(),
      windDirection: this.windDirectionState(),
      gusts: this.gustsState(),
      cloudDensity: this.cloudDensityState(),
      soundVolume: this.soundVolumeState(),
      soundMuted: this.soundMutedState(),
      fireflyColor: this.fireflyColorState(),
      leafMode: this.leafModeState(),
      quality: this.qualityState(),
    }));
  }

  init(canvas: HTMLElement, gameMode: GameMode = GameMode.MAP): Game {
    this.keyService.initTouch(canvas);

    const rect = canvas.getBoundingClientRect();
    // High performance GPU (phones with two modes, laptops with two GPUs)
    const renderer = new THREE.WebGLRenderer({ powerPreference: 'high-performance' });

    renderer.setSize( rect.width, rect.height );
    canvas.appendChild( renderer.domElement );

    const scene = new THREE.Scene();
    const raycaster = new THREE.Raycaster();

    const game = new Game({
      scene, raycaster, renderer, canvas,
      mode: gameMode,
    });
    this.game = game;
    this.mapEditorService.attach(game);
    // Start with the settings shown in the UI
    game.weather.setWeather(this.weatherState());
    game.weather.setHour(this.hourState());
    game.weather.setWind(windToX(this.windStrengthState(), this.windDirectionState()));
    game.weather.setFireflyColor(fireflyColorHex(this.fireflyColorState()));
    game.weather.setLeafMode(this.leafModeState());
    game.weather.setGusts(this.gustsState());
    game.weather.setCloudDensity(this.cloudDensityState());
    game.weather.setSoundVolume(this.soundVolumeState(), this.soundMutedState());
    // Restored settings: start directly in them (no fade from the default weather)
    game.weather.snapToTarget();

    this.switchGameMode(gameMode, true);

    game.setQuality(this.qualityState());
    setInterval(() => {
      game.framePerSec = game.frame;
      game.frame = 0;
      game.adaptQuality(game.framePerSec);
    }, 1000);

    // Moves and inputs at a fixed 120 steps per second of real time: when the device is slow, the timer is called
    // less often, so each call runs as many steps as the time elapsed (the walking speed doesn't depend on the fps)
    let lastInput = performance.now();
    let pending = 0;
    setInterval(() => {
      const now = performance.now();
      pending += Math.min(now - lastInput, MAX_INPUT_CATCH_UP);
      lastInput = now;
      let steps = 0;
      while (pending >= INPUT_STEP && steps < MAX_INPUT_STEPS) {
        this.inputLoop(game);
        pending -= INPUT_STEP;
        steps++;
      }
      if (steps === MAX_INPUT_STEPS) {
        pending = 0; // far behind (tab in background...): don't try to catch up
      }
    }, INPUT_STEP);

    // Time going by: small steps (the light and the sun move smoothly in between, see WeatherHelper)
    setInterval(() => {
      if (this.timeFlowState() && !game.paused && !game.loading) {
        this.advanceHour(TIME_STEP / 1000 * 24 / DAY_DURATION);
      }
    }, TIME_STEP);

    this.animate(game);

    return game;
  }

  switchGameMode(gameMode: GameMode, firstInit?: boolean) {
    const game = this.game;
    if(!game || game.loading) {
      return;
    }

    game.loading = true;
    game.mode = gameMode;

    setTimeout( () => {
      switch (gameMode) {
        case GameMode.FIGHT:
          this.gameMapService.clear(game);
          this.fightService.init(game);
          break;
        case GameMode.MAP:
          this.fightService.clear(game);
          this.gameMapService.init(game);
          break;
      }
      game.refreshRenderer();

      setTimeout(() => game.loading = false, 300);
    }, firstInit ? 0 : 300);
  }

  private lastFrameTime = performance.now();

  private renderLoop(game: Game) {
    game.frame++;
    const now = performance.now();
    // Capped so effects don't jump after a pause or a background tab
    const dt = Math.min((now - this.lastFrameTime) / 1000, 0.1);
    this.lastFrameTime = now;

    this.keyService.updateGamePadKeys();

    if(!game.paused) {
      game.updateLights(dt);
      game.renderFrame();
    }

    const pressedCodes = this.keyService.pressedCodes;
    if(pressedCodes.includes(KeyCode.pause)) {
      this.togglePaused();
    } else if(pressedCodes.includes(KeyCode.cancel)) {
      game.paused = false;
    }

    this.keyService.clearPressedKey();
    this.syncHud();
  }

  private syncHud(): void {
    const game = this.game;
    this.hudState.set(game ? {
      loading: game.loading,
      paused: game.paused,
      framePerSec: game.framePerSec,
      temperature: Math.round(game.weather.temperature * 10) / 10,
      mode: game.mode,
      editModelId: game.editModelId,
      editTileId: game.editTileId,
      editBrush: game.editBrush,
      editSelection: game.editSelection,
      editCanUndo: game.editCanUndo,
      editCanRedo: game.editCanRedo,
      pixelRatio: game.pixelRatio,
      shadowMapSize: game.shadowMapSize,
      editMode: game.editMode,
      mapHelper: game.mapHelper ?? null,
    } : null);
  }

  private inputLoop(game: Game) {
    switch (game.mode) {
      case GameMode.MAP: this.gameMapService.inputLoop(game); break;
      case GameMode.FIGHT: this.fightService.inputLoop(game); break;
    }
  }

  private animate(game: Game): void {
    requestAnimationFrame(() => this.animate(game));
    this.renderLoop(game);
  }

  private initCheckResize() {
    fromEvent(window, 'resize').pipe(auditTime(200)).subscribe(
      () => this.game?.refreshRenderer())
  }


  togglePaused() {
    if (this.game) {
      this.game.paused = !this.game.paused;
      this.syncHud();
    }
  }

  setWeather(type: WeatherType) {
    if (!isWeatherAvailable(type, this.night())) {
      // e.g. sunny at night, aurora by day: go to the right time of day
      this.setHour(isWeatherAvailable(type, true) ? NIGHT_ONLY_HOUR : DAY_ONLY_HOUR);
    } else if (type === WeatherType.MORNING_MIST && mistAt(this.hourState()) < 0.5) {
      // The morning mist only exists in the early morning
      this.setHour(MORNING_MIST_HOUR);
    }
    this.game?.weather.setWeather(type);
    this.weatherState.set(type);
  }

  setWind(strength: number, direction: WindDirection) {
    this.windStrengthState.set(strength);
    this.windDirectionState.set(direction);
    this.game?.weather.setWind(windToX(strength, direction));
  }

  setFireflyColor(color: FireflyColor) {
    this.fireflyColorState.set(color);
    this.game?.weather.setFireflyColor(fireflyColorHex(color));
  }

  setSound(volume: number, muted: boolean) {
    this.soundVolumeState.set(volume);
    this.soundMutedState.set(muted);
    this.game?.weather.setSoundVolume(volume, muted);
  }

  setCloudDensity(density: number) {
    this.cloudDensityState.set(density);
    this.game?.weather.setCloudDensity(density);
  }

  setGusts(enabled: boolean) {
    this.gustsState.set(enabled);
    this.game?.weather.setGusts(enabled);
  }

  setLeafMode(mode: LeafMode) {
    this.leafModeState.set(mode);
    this.game?.weather.setLeafMode(mode);
  }

  setTimeFlow(flowing: boolean) {
    this.timeFlowState.set(flowing);
  }

  /**
   * The time goes on: unlike a manual change, the weather is kept even when it only exists at the other
   * time of day (a sunny day simply turns into a clear night, see WeatherHelper day / night mix).
   */
  private advanceHour(hours: number) {
    const hour = (this.hourState() + hours) % 24;
    this.game?.weather.setHour(hour);
    this.hourState.set(hour);
  }

  setHour(hour: number) {
    this.game?.weather.setHour(hour);
    this.hourState.set(hour);
    if (!isWeatherAvailable(this.weatherState(), this.night())) {
      this.setWeather(WeatherType.NEUTRAL); // e.g. sunny day -> clear night, aurora -> clear day
    }
  }

  /** Opens / closes the map editor (on the map only, not during a fight or a loading). */
  toggleEditMode() {
    const game = this.game;
    if (!game || game.loading || game.mode !== GameMode.MAP) {
      return;
    }
    if (game.editMode) {
      this.mapEditorService.exit(game);
    } else {
      this.mapEditorService.enter(game);
    }
    this.syncHud();
  }

  setQuality(mode: QualityMode) {
    this.qualityState.set(mode);
    this.game?.setQuality(mode);
    this.syncHud();
  }

  /** Map editor: undo, redo, delete, options of the selected object... */
  editCommand(command: EditCommand) {
    if (this.game) {
      this.mapEditorService.command(this.game, command);
      this.syncHud();
    }
  }

  /** Map editor: ground brush size / bucket. */
  setEditBrush(brush: EditBrush) {
    if (this.game) {
      this.mapEditorService.setBrush(this.game, brush);
      this.syncHud();
    }
  }

  /** Map editor: ground tile to paint ('erase', null = none). */
  selectEditTile(tileId: string | null) {
    if (this.game) {
      this.mapEditorService.selectTile(this.game, tileId);
      this.syncHud();
    }
  }

  /** Map editor: model to place with the mouse (null = none). */
  selectEditModel(modelId: string | null) {
    if (this.game) {
      this.mapEditorService.selectModel(this.game, modelId);
      this.syncHud();
    }
  }

}
