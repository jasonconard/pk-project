import { DungeonService } from "./dungeon.service";
import { animationKey, currentAnimations } from "../model/model-animations";
import {
  computed,
  effect,
  inject,
  Service,
  signal,
  untracked,
} from "@angular/core";
import { MODELS } from "../../../../../assets/models/models";
import { reloadBrowserModels } from "../model/browser-models";
import { GameAction } from "../model/GameAction";
import { MapHelper } from "../model/MapHelper";
import * as THREE from "three";
import { BattleService } from "../../../battle/shared/battle.service";
import { GameMode, Game } from "../model/Game";
import { auditTime, fromEvent } from "rxjs";
import { QUALITY_CHOICES, QualityMode } from "../model/Quality";
import { DiagnosticsReport } from "../model/Diagnostics";
import { drawCallBreakdown } from "../model/DrawCallBreakdown";
import {
  EditBrush,
  EditCommand,
  EditSelection,
  MapEditorService,
} from "./map-editor.service";
import { GameMapService } from "./game-map.service";
import {
  createMap,
  downloadMapFile,
  duplicateMap,
  listMaps,
  loadMap,
  resetMap,
  saveMap,
} from "./map-storage";
import { MapKind } from "../model/SceneMap";
import { Passage } from "../model/Passage";
import { ObjectEvent } from "../model/ObjectEvent";
import { SequenceService } from "./sequence.service";
import { setSfxVolume } from "./sfx";
import { Vec3 } from "../model/SceneUtils";
import { DEFAULT_MAP_ID } from "../../../../../assets/map/maps";
import { KeyService } from "../../../../core/shared/service/key.service";
import { KeyCode } from "../../../../core/shared/model/PressedKey";
import { FightService } from "../../../fight/shared/services/fight.service";
import {
  isGameAsleep,
  onGameAsleep,
} from "../../../../core/shared/app-visibility";
import { GameMusic } from "./game-music";
import { WEATHER_INFO } from "../weather/weather-catalog";
import {
  DAY_ONLY_HOUR,
  NIGHT_ONLY_HOUR,
  MORNING_MIST_HOUR,
  mistAt,
  FIREFLY_COLORS,
  FireflyColor,
  fireflyColorHex,
  isNightHour,
  isWeatherAvailable,
  LeafMode,
  WeatherType,
  WindDirection,
  windToX,
} from "../weather/Weather";
import { MusicSlot } from "../../../music-editor/shared/song";
import { readJson, writeJson } from "../../../../core/shared/local-store";
import {
  dateLabel,
  dateOf,
  gameCalendar,
  momentAt,
  startDayNumber,
} from "../model/game-calendar";
import { MapTime } from "../model/SceneMap";
import { InstructionTime } from "../model/SceneEventInstruction";
import { TIME_FADE_MS } from "./sequence.service";
import { DungeonObject } from "../model/dungeon-object";

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
  /** Map editor: cells grid shown. */
  editGrid: boolean;
  /** Map editor open (free camera, player frozen). */
  editMode: boolean;
  /** Map editor: selected object, changes to undo / redo. */
  editSelection: EditSelection | null;
  editCanUndo: boolean;
  editCanRedo: boolean;
  /** What the action key would do in front of the player (null: nothing). */
  action: GameAction | null;
  /** Map the player is on. */
  mapId: string;
  mapName: string;
  /** Map editor: choosing a passage's arrival point (the map's name), null otherwise. */
  editPick: string | null;
  /** Render pixel ratio and shadow texture size in use (graphics quality). */
  pixelRatio: number;
  shadowMapSize: number;
  /** Diagnostic console: open, and the last second's measures. */
  diagnostics: DiagnosticsReport | null;
  diagnosticsOpen: boolean;
  mapHelper: MapHelper | null;
}

const sameHud = (a: GameHud | null, b: GameHud | null): boolean =>
  a === b ||
  (!!a &&
    !!b &&
    (Object.keys(a) as (keyof GameHud)[]).every((key) => a[key] === b[key]));

/** Weather and ambience settings kept between sessions (browser storage). */
interface SavedSettings {
  weather: WeatherType;
  hour: number;
  /** The game's date: a day number (see game-calendar.ts). */
  day: number;
  timeFlow: boolean;
  windStrength: number;
  windDirection: WindDirection;
  gusts: boolean;
  cloudDensity: number;
  soundVolume: number;
  soundMuted: boolean;
  /** Music volume 0..1 (the songs of the music editor; same mute as the sounds). */
  musicVolume: number;
  fireflyColor: FireflyColor;
  leafMode: LeafMode;
  quality: QualityMode;
  /** Retro rendering: big pixels like a handheld console (see pixel-scale.ts). */
  retro: boolean;
  /** The camera follows the player with a lag (else locked on it). */
  smoothCamera: boolean;
}

const SETTINGS_KEY = "pk-weather-settings";

/** Input / moves step (ms: 120 per second), most steps run at once, most time caught up at once (ms). */
const INPUT_STEP = 1000 / 120;
const MAX_INPUT_STEPS = 12;
const MAX_INPUT_CATCH_UP = 250;

/** Last saved settings; anything missing or invalid (old version, removed weather...) is left out. */
function loadSettings(): Partial<SavedSettings> {
  const raw = readJson<Record<string, unknown>>(SETTINGS_KEY) ?? {};
  const out: Partial<SavedSettings> = {};
  const unit = (v: unknown) =>
    typeof v === "number" && v >= 0 && v <= 1 ? v : undefined;
  const bool = (v: unknown) => (typeof v === "boolean" ? v : undefined);
  if (Object.values(WeatherType).includes(raw["weather"] as WeatherType)) {
    out.weather = raw["weather"] as WeatherType;
  }
  if (typeof raw["hour"] === "number" && raw["hour"] >= 0 && raw["hour"] < 24) {
    out.hour = raw["hour"];
  }
  if (typeof raw["day"] === "number" && raw["day"] >= 0) {
    out.day = Math.floor(raw["day"]);
  }
  if (raw["windDirection"] === "east" || raw["windDirection"] === "west") {
    out.windDirection = raw["windDirection"];
  }
  if (FIREFLY_COLORS.some((c) => c.color === raw["fireflyColor"])) {
    out.fireflyColor = raw["fireflyColor"] as FireflyColor;
  }
  if (QUALITY_CHOICES.some((q) => q.mode === raw["quality"])) {
    out.quality = raw["quality"] as QualityMode;
  }
  if (raw["leafMode"] === "autumn" || raw["leafMode"] === "cherry") {
    out.leafMode = raw["leafMode"];
  }
  out.windStrength = unit(raw["windStrength"]);
  out.cloudDensity = unit(raw["cloudDensity"]);
  out.soundVolume = unit(raw["soundVolume"]);
  out.musicVolume = unit(raw["musicVolume"]);
  out.timeFlow = bool(raw["timeFlow"]);
  out.gusts = bool(raw["gusts"]);
  out.soundMuted = bool(raw["soundMuted"]);
  out.retro = bool(raw["retro"]);
  out.smoothCamera = bool(raw["smoothCamera"]);
  return out;
}

/** What this tab saved last: only the settings that changed since are written. */
let lastSaved: Partial<SavedSettings> = {};

/**
 * Saves the settings that changed, merged into the stored ones: with the game open in several tabs, one tab's
 * clock going by doesn't overwrite the weather chosen in another one.
 */
function saveSettings(settings: SavedSettings) {
  const changed = (Object.keys(settings) as (keyof SavedSettings)[]).filter(
    (k) => settings[k] !== lastSaved[k]
  );
  if (changed.length === 0) {
    return;
  }
  const stored = readJson<Record<string, unknown>>(SETTINGS_KEY) ?? {};
  changed.forEach((k) => (stored[k] = settings[k]));
  // (storage unavailable, private mode…: the settings just won't be kept)
  if (writeJson(SETTINGS_KEY, stored)) {
    lastSaved = { ...settings };
  }
}

/** The time step (ms) when the time goes by itself (a whole day lasts the calendar's minutes). */
const TIME_STEP = 250;

@Service()
export class GameService {
  private readonly keyService = inject(KeyService);
  private readonly fightService = inject(FightService);
  private readonly gameMapService = inject(GameMapService);
  private readonly mapEditorService = inject(MapEditorService);
  private readonly battleService = inject(BattleService);
  private readonly dungeonService = inject(DungeonService);
  /** A fight of the battle system is shown (its music plays; the view changes every frame, this only twice). */
  private readonly inBattle = computed(
    () => this.battleService.view() !== null
  );
  private readonly sequenceService = inject(SequenceService);

  private game: Game | null = null;

  private readonly hudState = signal<GameHud | null>(null, { equal: sameHud });
  /** Reactive view of the (mutable) game object, synced on every rendered frame. */
  readonly hud = this.hudState.asReadonly();

  /** Settings of the last session (weather, time, wind, clouds, sound...), see saveSettings. */
  private readonly saved = (lastSaved = loadSettings());

  private readonly weatherState = signal(
    this.saved.weather ?? WeatherType.NEUTRAL
  );
  readonly weather = this.weatherState.asReadonly();
  /** Time of day, 0..24 h (dawn 6-8 h, dusk 18-20 h); a new game: the calendar's start. */
  private readonly hourState = signal(
    this.saved.hour ?? gameCalendar().start.hour
  );
  readonly hour = this.hourState.asReadonly();
  /** The game's date: a day number (see game-calendar.ts); goes on at midnight. */
  private readonly dayState = signal(
    this.saved.day ?? startDayNumber(gameCalendar())
  );
  readonly day = this.dayState.asReadonly();
  /** Changes when the calendar may have changed (the database closed): the date's words are read again. */
  private readonly calendarVersion = signal(0);
  /** The time on the map being played (stopped, frozen at an hour; null: it passes). */
  private readonly mapTimeState = signal<MapTime | null>(null, {
    equal: (a, b) => JSON.stringify(a) === JSON.stringify(b),
  });
  readonly mapTime = this.mapTimeState.asReadonly();
  /** An event stopped the time (until one makes it go on, or another map). */
  private readonly timeStoppedState = signal(false);
  /** The hour shown (frozen on a map that says so, else the time of day). */
  readonly shownHour = computed(() => {
    const mapTime = this.mapTimeState();
    return mapTime?.mode === "frozen" ? mapTime.hour : this.hourState();
  });
  readonly date = computed(() => {
    this.calendarVersion();
    return dateOf(this.dayState(), gameCalendar());
  });
  readonly moment = computed(() => {
    this.calendarVersion();
    return momentAt(this.shownHour(), gameCalendar());
  });
  /** « Ven. 5 printemps » (the clock). */
  readonly dateText = computed(() => dateLabel(this.date(), gameCalendar()));
  /** A « time passes » action of an event: the screen fades to black and back. */
  private readonly timeFadeState = signal(false);
  readonly timeFade = this.timeFadeState.asReadonly();
  readonly night = computed(() => isNightHour(this.hourState()));
  /** The time of day goes on by itself (a whole day in the calendar's minutes). */
  private readonly timeFlowState = signal(this.saved.timeFlow ?? true);
  readonly timeFlow = this.timeFlowState.asReadonly();
  /** Wind strength 0..1 and where it blows towards. */
  private readonly windStrengthState = signal(this.saved.windStrength ?? 0.3);
  readonly windStrength = this.windStrengthState.asReadonly();
  private readonly windDirectionState = signal<WindDirection>(
    this.saved.windDirection ?? "east"
  );
  readonly windDirection = this.windDirectionState.asReadonly();
  /** Sound volume 0..1 and mute. */
  private readonly soundVolumeState = signal(this.saved.soundVolume ?? 0.7);
  readonly soundVolume = this.soundVolumeState.asReadonly();
  private readonly soundMutedState = signal(this.saved.soundMuted ?? false);
  readonly soundMuted = this.soundMutedState.asReadonly();
  private readonly modelsVersionState = signal(0);
  /** Goes up when the models change (back from the model editor): the palette reads them again. */
  readonly modelsVersion = this.modelsVersionState.asReadonly();
  private readonly musicVolumeState = signal(this.saved.musicVolume ?? 0.6);
  readonly musicVolume = this.musicVolumeState.asReadonly();
  /** The songs of the music editor, chosen by the map and the moment: fight, rain, night, day. */
  private readonly music = new GameMusic();
  /** Cloud density 0..1 (scattered .. overcast). */
  private readonly cloudDensityState = signal(this.saved.cloudDensity ?? 0.5);
  readonly cloudDensity = this.cloudDensityState.asReadonly();
  /** Random wind gusts on top of the wind setting. */
  private readonly gustsState = signal(this.saved.gusts ?? true);
  readonly gusts = this.gustsState.asReadonly();
  private readonly fireflyColorState = signal<FireflyColor>(
    this.saved.fireflyColor ?? "green"
  );
  readonly fireflyColor = this.fireflyColorState.asReadonly();
  private readonly leafModeState = signal<LeafMode>(
    this.saved.leafMode ?? "autumn"
  );
  readonly leafMode = this.leafModeState.asReadonly();
  /** Graphics quality (hidden menu on the temperature / fps tile). */
  private readonly qualityState = signal<QualityMode>(
    this.saved.quality ?? "auto"
  );
  readonly quality = this.qualityState.asReadonly();
  private readonly retroState = signal(this.saved.retro ?? false);
  readonly retro = this.retroState.asReadonly();
  private readonly smoothCameraState = signal(this.saved.smoothCamera ?? true);
  readonly smoothCamera = this.smoothCameraState.asReadonly();

  constructor() {
    this.initCheckResize();
    // The sound effects of the events follow the sound settings; an event may change the weather
    effect(() => setSfxVolume(this.soundVolumeState(), this.soundMutedState()));
    this.sequenceService.time$.subscribe((request) => {
      if (request.pass) {
        this.passTime(request.pass);
      } else {
        this.timeStoppedState.set(!!request.stop);
      }
    });
    // (the date's day kept by the game: the events' conditions read it)
    effect(() => {
      const day = this.dayState();
      if (this.game) {
        this.game.day = day;
      }
    });
    // A new moment or day: the NPCs with a schedule move to where they are now
    effect(() => {
      this.moment();
      this.dayState();
      untracked(() => this.game?.mapHelper?.refreshNpcs());
    });
    this.sequenceService.weather$.subscribe((type) => {
      if (Object.values(WeatherType).includes(type as WeatherType)) {
        this.setWeather(type as WeatherType);
      }
    });
    // Music: its volume (muted with the sounds), and the song of the moment
    effect(() =>
      this.music.setVolume(this.soundMutedState() ? 0 : this.musicVolumeState())
    );
    effect(() => {
      const fight = this.hudState()?.mode === GameMode.FIGHT;
      const rain = WEATHER_INFO[this.weatherState()]?.category === "rain";
      const night = this.night();
      let slot: MusicSlot = night ? "night" : "day";
      const dungeon = this.dungeonService.chip();
      if (fight || this.inBattle()) {
        slot = "fight";
      } else if (dungeon) {
        slot = "dungeon";
      } else if (rain) {
        slot = "rain";
      }
      this.music.setDungeonSong(dungeon?.music ?? null);
      this.music.setSlot(slot, night);
    });
    // The map's own songs (an empty id while loading: no change)
    effect(() => {
      const mapId = this.hudState()?.mapId;
      if (mapId) {
        this.music.setMap(mapId);
      }
    });
    // Saved on every change (the hour changes a few times per second while the time goes by: tiny writes)
    effect(() =>
      saveSettings({
        weather: this.weatherState(),
        hour: this.hourState(),
        day: this.dayState(),
        timeFlow: this.timeFlowState(),
        windStrength: this.windStrengthState(),
        windDirection: this.windDirectionState(),
        gusts: this.gustsState(),
        cloudDensity: this.cloudDensityState(),
        soundVolume: this.soundVolumeState(),
        soundMuted: this.soundMutedState(),
        musicVolume: this.musicVolumeState(),
        fireflyColor: this.fireflyColorState(),
        leafMode: this.leafModeState(),
        quality: this.qualityState(),
        retro: this.retroState(),
        smoothCamera: this.smoothCameraState(),
      })
    );
  }

  init(canvas: HTMLElement, gameMode: GameMode = GameMode.MAP): Game {
    this.keyService.initTouch(canvas);

    const rect = canvas.getBoundingClientRect();
    // High performance GPU (phones with two modes, laptops with two GPUs)
    const renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
    });

    renderer.setSize(rect.width, rect.height);
    canvas.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const raycaster = new THREE.Raycaster();

    const game = new Game({
      scene,
      raycaster,
      renderer,
      canvas,
      mode: gameMode,
    });
    this.game = game;
    this.mapEditorService.attach(game);
    // Start with the settings shown in the UI
    game.weather.setWeather(this.weatherState());
    game.weather.setHour(this.hourState());
    game.weather.setWind(
      windToX(this.windStrengthState(), this.windDirectionState())
    );
    game.weather.setFireflyColor(fireflyColorHex(this.fireflyColorState()));
    game.weather.setLeafMode(this.leafModeState());
    game.weather.setGusts(this.gustsState());
    game.weather.setCloudDensity(this.cloudDensityState());
    game.weather.setSoundVolume(
      this.soundVolumeState(),
      this.soundMutedState()
    );
    // Restored settings: start directly in them (no fade from the default weather)
    game.weather.snapToTarget();

    this.switchGameMode(gameMode, true);

    game.setQuality(this.qualityState());
    game.setRetro(this.retroState());
    game.smoothCamera = this.smoothCameraState();
    // In the background (home screen, other app, screen locked): the game stops (see isGameAsleep in the loops);
    // keys held when leaving would stay pressed (their keyup is lost), and the time spent away is not caught up
    onGameAsleep((hidden) => {
      this.keyService.clearKeys();
      if (!hidden) {
        this.lastFrameTime = performance.now();
        game.frame = 0;
      }
    });
    setInterval(() => {
      if (isGameAsleep()) {
        return; // no frames meanwhile: the quality must not drop because of it
      }
      game.framePerSec = game.frame;
      game.frame = 0;
      game.adaptQuality(game.framePerSec);
      game.diagnostics.flush(
        game.renderer,
        {
          pixelRatio: game.pixelRatio,
          shadowMapSize: game.shadowMapSize,
          detail: game.detail,
        },
        () => drawCallBreakdown(game.scene, game.camera, game.mapHelper)
      );
    }, 1000);

    // Moves and inputs at a fixed 120 steps per second of real time: when the device is slow, the timer is called
    // less often, so each call runs as many steps as the time elapsed (the walking speed doesn't depend on the fps)
    let lastInput = performance.now();
    let pending = 0;
    setInterval(() => {
      const now = performance.now();
      if (isGameAsleep()) {
        lastInput = now;
        pending = 0;
        return;
      }
      pending += Math.min(now - lastInput, MAX_INPUT_CATCH_UP);
      lastInput = now;
      let steps = 0;
      while (pending >= INPUT_STEP && steps < MAX_INPUT_STEPS) {
        // (the time this step ends at: its moves are shown at their own time, see CameraFollow)
        game.steps.length = INPUT_STEP;
        game.steps.time = now - pending + INPUT_STEP;
        this.inputLoop(game);
        pending -= INPUT_STEP;
        steps++;
        if (steps === 1) {
          // The keys just pressed are seen by one input step, then forgotten. Here, not in the render loop: on a
          // 120 Hz screen the frames would often come first and a press (E: the action) would never be seen
          this.consumePressedKeys(game);
        }
      }
      if (steps === MAX_INPUT_STEPS) {
        pending = 0; // far behind (tab in background...): don't try to catch up
      }
    }, INPUT_STEP);

    // Time going by: small steps (the light and the sun move smoothly in between, see WeatherHelper)
    game.day = this.dayState();
    setInterval(() => {
      this.followMapTime(game);
      if (
        this.timeFlowState() &&
        !game.paused &&
        !game.loading &&
        !isGameAsleep() &&
        !this.timeHeld(game)
      ) {
        const dayMinutes = Math.max(1, gameCalendar().dayMinutes);
        this.advanceHour(((TIME_STEP / 1000) * 24) / (dayMinutes * 60));
      }
    }, TIME_STEP);

    this.battleService.attach(game);
    this.animate(game);

    return game;
  }

  switchGameMode(gameMode: GameMode, firstInit?: boolean) {
    const game = this.game;
    if (!game || game.loading) {
      return;
    }

    game.loading = true;
    game.mode = gameMode;

    setTimeout(
      () => {
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

        setTimeout(() => {
          // (a little later: the textures loaded meanwhile are sent too)
          game.warmUp();
          game.loading = false;
        }, 300);
      },
      firstInit ? 0 : 300
    );
  }

  private lastFrameTime = performance.now();

  private renderLoop(game: Game) {
    game.frame++;
    const now = performance.now();
    // Capped so effects don't jump after a pause or a background tab
    const dt = Math.min((now - this.lastFrameTime) / 1000, 0.1);
    this.lastFrameTime = now;

    this.keyService.updateGamePadKeys();

    if (!game.paused) {
      const diag = game.diagnostics;
      diag.frameStart(game.renderer);
      diag.measure("weather", () => game.updateLights(dt));
      this.battleService.update(dt);
      // The models' moving parts (a windmill's sails, a door opening when the player comes near)
      game.mapHelper?.updateMotions(
        dt,
        isNightHour(game.weather.hourOfDay),
        (b) =>
          game.mapHelper
            ? (currentAnimations()[
                animationKey(game.mapHelper.sceneMap.id, b.id)
              ] ?? "rest")
            : "rest"
      );
      diag.measure("render", () => game.renderFrame());
      diag.frameEnd(game.renderer);
    }

    this.syncHud();
  }

  /** After an input step: pause / resume, then the pressed keys are forgotten (the held ones stay). */
  private consumePressedKeys(game: Game): void {
    const pressedCodes = this.keyService.pressedCodes;
    if (pressedCodes.includes(KeyCode.pause)) {
      this.togglePaused();
    } else if (pressedCodes.includes(KeyCode.cancel)) {
      game.paused = false;
    }
    if (pressedCodes.length > 0) {
      this.keyService.clearPressedKey();
    }
  }

  private syncHud(): void {
    const game = this.game;
    this.hudState.set(
      game
        ? {
            loading: game.loading,
            paused: game.paused,
            framePerSec: game.framePerSec,
            temperature: Math.round(game.weather.temperature * 10) / 10,
            mode: game.mode,
            editModelId: game.editModelId,
            editTileId: game.editTileId,
            editBrush: game.editBrush,
            editGrid: game.editGrid,
            editSelection: game.editSelection,
            editCanUndo: game.editCanUndo,
            editCanRedo: game.editCanRedo,
            action: game.mode === GameMode.MAP ? game.action : null,
            mapId: game.mapHelper?.sceneMap.id ?? "",
            mapName: game.mapHelper?.sceneMap.name ?? "",
            editPick: this.arrivalPick
              ? (game.mapHelper?.sceneMap.name ?? "")
              : null,
            pixelRatio: game.pixelRatio,
            shadowMapSize: game.shadowMapSize,
            diagnostics: game.diagnostics.report,
            diagnosticsOpen: game.diagnostics.enabled,
            editMode: game.editMode,
            mapHelper: game.mapHelper ?? null,
          }
        : null
    );
  }

  private inputLoop(game: Game) {
    game.diagnostics.measure("input", () => {
      switch (game.mode) {
        case GameMode.MAP:
          this.gameMapService.inputLoop(game);
          break;
        case GameMode.FIGHT:
          this.fightService.inputLoop();
          break;
      }
    });
  }

  private animate(game: Game): void {
    requestAnimationFrame(() => this.animate(game));
    if (!isGameAsleep()) {
      this.renderLoop(game);
    }
  }

  private initCheckResize() {
    fromEvent(window, "resize")
      .pipe(auditTime(200))
      .subscribe(() => this.game?.refreshRenderer());
  }

  /** Back from the database: the NPCs placed on the map drawn again (their walking sheet or name may have changed). */
  refreshNpcs(): void {
    this.calendarChanged();
    this.game?.mapHelper?.refreshNpcs();
  }

  /**
   * Back from the model editor: the models saved there replace the game's, the map draws them again, and the map
   * editor's palette shows them (modelsVersion). The selection and the model in hand are taken again.
   */
  async reloadModels(): Promise<void> {
    const ids = await reloadBrowserModels();
    const game = this.game;
    if (!game?.mapHelper || ids.length === 0) {
      return;
    }
    const inHand = game.editModelId;
    if (game.editMode) {
      this.mapEditorService.command(game, "deselect");
      if (inHand && ids.includes(inHand)) {
        this.mapEditorService.selectModel(game, null);
      }
    }
    game.mapHelper.refreshModels(ids);
    if (
      game.editMode &&
      inHand &&
      ids.includes(inHand) &&
      MODELS.some((m) => m.id === inHand)
    ) {
      this.mapEditorService.selectModel(game, inHand);
    }
    this.modelsVersionState.update((v) => v + 1);
    this.syncHud();
  }

  /** Back from the music editor: the game plays the songs as they are now. */
  reloadMusic() {
    this.music.reload();
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
      this.setHour(
        isWeatherAvailable(type, true) ? NIGHT_ONLY_HOUR : DAY_ONLY_HOUR
      );
    } else if (
      type === WeatherType.MORNING_MIST &&
      mistAt(this.hourState()) < 0.5
    ) {
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

  setMusicVolume(volume: number) {
    this.musicVolumeState.set(Math.min(Math.max(volume, 0), 1));
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
    const total = this.hourState() + hours;
    const hour = total % 24;
    if (total >= 24) {
      this.dayState.update((day) => day + Math.floor(total / 24));
    }
    if (this.mapTimeState()?.mode !== "frozen") {
      this.game?.weather.setHour(hour);
    }
    this.hourState.set(hour);
  }

  /**
   * The time doesn't pass: in a dialogue or an event, in a fight, on a map where it stops or is frozen, after an
   * event stopped it.
   */
  private timeHeld(game: Game): boolean {
    return (
      game.mode !== GameMode.MAP ||
      game.editMode ||
      this.sequenceService.isRunning ||
      this.battleService.running ||
      !!this.mapTimeState() ||
      this.timeStoppedState()
    );
  }

  private lastMapId = "";

  /** The time of the map being played (each time step): a frozen hour shown, the real one back outside. */
  private followMapTime(game: Game) {
    const map = game.mapHelper?.sceneMap;
    if (!map) {
      return;
    }
    if (map.id !== this.lastMapId) {
      this.lastMapId = map.id;
      this.timeStoppedState.set(false); // (« until it goes on, or another map »)
    }
    const before = this.mapTimeState();
    const now = map.time ?? null;
    this.mapTimeState.set(now);
    const frozenBefore = before?.mode === "frozen" ? before.hour : null;
    const frozenNow = now?.mode === "frozen" ? now.hour : null;
    if (frozenNow !== frozenBefore) {
      game.weather.setHour(frozenNow ?? this.hourState());
    }
  }

  /** An event makes the time pass: a fade to black, the clock moved meanwhile. */
  private passTime(request: InstructionTime) {
    const calendar = gameCalendar();
    const hour = this.hourState();
    let target = hour;
    let days = 0;
    switch (request.mode) {
      case "hours":
        target = hour + Math.max(0, request.hours ?? 1);
        days = Math.floor(target / 24);
        target %= 24;
        break;
      case "until": {
        const start = calendar.moments[request.moment ?? "morning"];
        target = start;
        days = start > hour ? 0 : 1;
        break;
      }
      case "nextDay":
        target = calendar.moments.morning;
        days = 1;
        break;
    }
    this.timeFadeState.set(true);
    setTimeout(() => {
      this.dayState.update((day) => day + days);
      this.setHour(target);
    }, TIME_FADE_MS / 2);
    setTimeout(() => this.timeFadeState.set(false), TIME_FADE_MS);
  }

  /** A saved game's date. */
  setDay(day: number) {
    this.dayState.set(Math.max(0, Math.floor(day)));
  }

  /** Back from the database: the calendar may have changed. */
  calendarChanged() {
    this.calendarVersion.update((v) => v + 1);
  }

  /** The time on a map (null: it passes as outside). */
  setMapTime(id: string, time: MapTime | null) {
    const current = this.game?.mapHelper?.sceneMap;
    const map = current?.id === id ? current : loadMap(id);
    if (map) {
      if (time) {
        map.time = time;
      } else {
        delete map.time;
      }
      saveMap(map);
    }
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
      if (this.arrivalPick) {
        this.endArrivalPick(null); // (back to the passage's object first)
      }
      this.mapEditorService.exit(game);
    } else {
      this.sequenceService.stop();
      this.mapEditorService.enter(game);
    }
    // (the editor shows the NPCs at every place, the game only where their schedule puts them)
    game.mapHelper?.refreshNpcs();
    this.syncHud();
  }

  /** Diagnostic console (hidden menu of the temperature / fps tile). */
  setDiagnostics(open: boolean) {
    if (this.game) {
      this.game.diagnostics.enabled = open;
      this.syncHud();
    }
  }

  setQuality(mode: QualityMode) {
    this.qualityState.set(mode);
    this.game?.setQuality(mode);
    this.syncHud();
  }

  setSmoothCamera(smooth: boolean) {
    this.smoothCameraState.set(smooth);
    if (this.game) {
      this.game.smoothCamera = smooth;
    }
  }

  setRetro(retro: boolean) {
    this.retroState.set(retro);
    this.game?.setRetro(retro);
    this.syncHud();
  }

  /** Map editor: undo, redo, delete, options of the selected object... */
  editCommand(command: EditCommand) {
    if (command === "reset") {
      this.resetMap(this.game?.mapHelper?.sceneMap.id ?? "");
    } else if (this.game) {
      this.mapEditorService.command(this.game, command);
      this.syncHud();
    }
  }

  // --- Maps (map manager) ---

  /** Goes to a map (the editor stays open on it). */
  openMap(id: string) {
    const game = this.game;
    if (game) {
      this.gameMapService.travel(game, { map: id });
      this.syncHud();
    }
  }

  /** A new map, opened right away. */
  createMap(name: string, kind: MapKind, cols: number, rows: number) {
    this.openMap(createMap(name, kind, cols, rows));
  }

  renameMap(id: string, name: string) {
    const current = this.game?.mapHelper?.sceneMap;
    const map = current?.id === id ? current : loadMap(id);
    if (map) {
      map.name = name;
      saveMap(map);
      this.syncHud();
    }
  }

  /** Returns the copy's id. */
  duplicateMap(id: string, name: string): string | null {
    this.saveCurrentMap();
    return duplicateMap(id, name);
  }

  exportMap(id: string) {
    this.saveCurrentMap();
    const current = this.game?.mapHelper?.sceneMap;
    const map = current?.id === id ? current : loadMap(id);
    if (map) {
      downloadMapFile(map);
    }
  }

  /**
   * Forgets the browser's changes to a map: a code map comes back to the code version, a browser map is deleted.
   * The current map is built again (deleted: the game goes to the default map).
   */
  resetMap(id: string) {
    const game = this.game;
    const current = game?.mapHelper?.sceneMap.id === id;
    if (current) {
      this.mapEditorService.dropPendingSave();
    }
    resetMap(id);
    if (game && current) {
      const exists = listMaps().some((map) => map.id === id);
      this.gameMapService.travel(
        game,
        { map: exists ? id : DEFAULT_MAP_ID },
        true
      );
    }
    this.syncHud();
  }

  // --- Saved games ---

  /** Where the player is (a saved game), null: no map yet. */
  playerSpot(): { map: string; mapName: string; pos: Vec3 } | null {
    const mapHelper = this.game?.mapHelper;
    const sprite = mapHelper?.scenePlayer.mesh;
    if (!mapHelper || !sprite) {
      return null;
    }
    const pos = {
      x: sprite.position.x,
      y: sprite.position.y,
      z: sprite.position.z,
    };
    return {
      map: mapHelper.sceneMap.id,
      mapName: mapHelper.sceneMap.name,
      pos,
    };
  }

  /**
   * Back to a saved place, at that time and weather. A map that no longer exists: the default map's arrival point
   * (returns false).
   */
  restoreSpot(
    map: string,
    pos: Vec3,
    hour: number,
    weather: WeatherType,
    day?: number
  ): boolean {
    const game = this.game;
    const exists = listMaps().some((m) => m.id === map);
    if (day !== undefined) {
      this.setDay(day);
    }
    this.setHour(hour);
    this.setWeather(weather);
    if (game) {
      this.gameMapService.travel(
        game,
        exists ? { map, pos } : { map: DEFAULT_MAP_ID }
      );
      this.syncHud();
    }
    return exists;
  }

  // --- Passages ---

  /** Choosing the arrival point of the selected object's passage: where to come back to. */
  private arrivalPick: {
    origin: string;
    chunkId: string;
    buildingId: string;
    back: Vec3;
  } | null = null;

  /** The selected object's passage (null: removed). */
  setPassage(passage: Passage | null) {
    const game = this.game;
    if (game) {
      this.mapEditorService.setPassage(game, passage);
      this.syncHud();
    }
  }

  /** The selected object's events made in the event window (all of them, in order). */
  setObjectEvents(events: ObjectEvent[]) {
    const game = this.game;
    if (game) {
      this.mapEditorService.setObjectEvents(game, events);
      this.syncHud();
    }
  }

  /** The selected NPC's place name. */
  setPlaceLabel(label: string) {
    const game = this.game;
    if (game) {
      this.mapEditorService.setPlaceLabel(game, label);
      this.syncHud();
    }
  }

  /** The selected dungeon object's settings (chest, trap, switch, locked door). */
  setDungeonObject(settings: DungeonObject) {
    const game = this.game;
    if (game) {
      this.mapEditorService.setDungeonObject(game, settings);
      this.syncHud();
    }
  }

  /** The selected invisible zone's size in cells. */
  setZoneSize(size: { x: number; z: number }) {
    const game = this.game;
    if (game) {
      this.mapEditorService.setZoneSize(game, size);
      this.syncHud();
    }
  }

  /**
   * Choosing the arrival point of the selected object's passage: the editor goes to the map it leads to, the next
   * tap on the ground gives the point, then it comes back to the object.
   */
  pickArrival() {
    const game = this.game;
    const ref = this.mapEditorService.selectedRef();
    const mapHelper = game?.mapHelper;
    const sprite = mapHelper?.scenePlayer.mesh;
    if (!game || !ref?.passage || !mapHelper || !sprite) {
      return;
    }
    const origin = mapHelper.sceneMap.id;
    this.arrivalPick = {
      origin,
      ...ref,
      back: { x: sprite.position.x, y: 0, z: sprite.position.z },
    };
    if (ref.passage.map !== origin) {
      this.gameMapService.travel(game, {
        map: ref.passage.map,
        pos: ref.passage.pos,
      });
    }
    this.mapEditorService.pickGround((point) => this.endArrivalPick(point));
    this.syncHud();
  }

  /** The arrival point chosen (null: cancelled): saved in the passage, back to its object. */
  endArrivalPick(point: Vec3 | null) {
    const game = this.game;
    const pick = this.arrivalPick;
    this.arrivalPick = null;
    this.mapEditorService.pickGround(null);
    if (!game || !pick) {
      this.syncHud();
      return;
    }
    const sameMap = game.mapHelper?.sceneMap.id === pick.origin;
    if (!sameMap) {
      this.gameMapService.travel(game, { map: pick.origin, pos: pick.back });
    }
    this.mapEditorService.selectById(game, pick.chunkId, pick.buildingId);
    const passage = this.mapEditorService.selectedRef()?.passage;
    if (point && passage) {
      this.mapEditorService.setPassage(game, { ...passage, pos: point });
    }
    this.syncHud();
  }

  private saveCurrentMap() {
    if (this.game) {
      this.mapEditorService.saveNow(this.game);
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
