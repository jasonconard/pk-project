import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from "@angular/core";
import {
  isGameCovered,
  setGameCovered,
} from "../../core/shared/app-visibility";
import { Passage } from "./shared/model/Passage";
import { ObjectEvent } from "./shared/model/ObjectEvent";
import { DecimalPipe } from "@angular/common";
import { isFirstStartOfNewVersion } from "./release-notes/whats-new";
import { GameMode } from "./shared/model/Game";
import { GameService } from "./shared/services/game.service";
import { StickComponent } from "../../core/stick/stick.component";
import { TouchPadComponent } from "../../core/touch-pad/touch-pad.component";
import { MessageComponent } from "../../core/message/message.component";
import { TeleportComponent } from "./teleport/teleport.component";
import { FightUiComponent } from "../fight/fight-ui/fight-ui.component";
import { BattleHudComponent } from "../battle/battle-hud/battle-hud.component";
import { BattleService } from "../battle/shared/battle.service";
import {
  EditorBarComponent,
  EditorPanel,
} from "./editor-bar/editor-bar.component";
import { MusicEditorComponent } from "../music-editor/music-editor.component";
import { VariablesEditorComponent } from "../variables-editor/variables-editor.component";
import { DatabaseEditorComponent } from "../database-editor/database-editor.component";
import { ModelEditorComponent } from "../model-editor/model-editor.component";
import { ReleaseNotesComponent } from "./release-notes/release-notes.component";
import { temperatureColor } from "./shared/util/temperature-color";
import { version } from "../../../../package.json";
import { EditBrush, EditCommand } from "./shared/services/map-editor.service";
import {
  SoundSetting,
  WeatherPanelComponent,
  WindSetting,
} from "./weather-panel/weather-panel.component";
import {
  FireflyColor,
  formatHour,
  LeafMode,
  WEATHER_CHOICES,
  WeatherType,
} from "./shared/weather/Weather";
import { GameMenuComponent } from "./game-menu/game-menu.component";
import { GameSavesComponent } from "./game-saves/game-saves.component";
import { VariablesTestComponent } from "./variables-test/variables-test.component";
import { BattleSimComponent } from "../battle/battle-sim/battle-sim.component";
import { MapControlsComponent } from "./map-controls/map-controls.component";
import { EscapeService } from "../../core/shared/service/escape.service";
import { CoreService } from "../../core/shared/service/core.service";
import { SequenceService } from "./shared/services/sequence.service";
import { LucideMenu, LucidePencilRuler } from "@lucide/angular";
import { isTyping } from "../../core/shared/typing";

@Component({
  selector: "game-main",
  imports: [
    StickComponent,
    TouchPadComponent,
    MessageComponent,
    TeleportComponent,
    FightUiComponent,
    BattleHudComponent,
    WeatherPanelComponent,
    EditorBarComponent,
    ReleaseNotesComponent,
    GameMenuComponent,
    GameSavesComponent,
    VariablesTestComponent,
    BattleSimComponent,
    MapControlsComponent,
    MusicEditorComponent,
    ModelEditorComponent,
    VariablesEditorComponent,
    DatabaseEditorComponent,
    DecimalPipe,
    LucideMenu,
    LucidePencilRuler,
  ],
  templateUrl: "./game.component.html",
  styleUrl: "./game.component.scss",
})
export class GameComponent {
  private readonly gameService = inject(GameService);
  private readonly coreService = inject(CoreService);
  private readonly sequenceService = inject(SequenceService);
  private readonly canvasRef =
    viewChild.required<ElementRef<HTMLElement>>("canvas");
  private readonly weatherPanel =
    viewChild.required<WeatherPanelComponent>("weatherPanel");
  private readonly musicEditor = viewChild(MusicEditorComponent);
  private readonly modelEditor = viewChild(ModelEditorComponent);
  private readonly databaseEditor = viewChild(DatabaseEditorComponent);

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
  private readonly battle = inject(BattleService);
  /** Goes up when the models change (back from the model editor). */
  protected readonly modelsVersion = this.gameService.modelsVersion;
  /** Playing on the map (not editing, not fighting, loaded): the game mode's own interface (clock, Créer, Menu). */
  protected readonly playing = computed(() => {
    const hud = this.hud();
    return (
      !!hud &&
      hud.mode === GameMode.MAP &&
      !hud.editMode &&
      !hud.loading &&
      !this.battle.view()
    );
  });
  /** An editor opened over the game (a full screen panel), null: none. */
  protected readonly editorPanel = signal<EditorPanel | null>(null);
  /** Game menu (button top right, or Escape; the editor's Réglages). */
  protected readonly menuOpen = signal(false);
  /** Version of the game (package.json): tells if the installed app (PWA) is up to date. */
  protected readonly appVersion = version;
  /** "What's new" dialog, opened from the version number, and by itself the first time a new version starts. */
  protected readonly releaseNotes = signal(false);
  /** The saved games dialog (menu → Sauver). */
  protected readonly savesOpen = signal(false);
  /** The variables test panel (menu → Test des variables). */
  protected readonly variablesTestOpen = signal(false);
  protected readonly battleSimOpen = signal(false);
  /** This start is the first one of a new version (update): the dialog opens once the game is loaded. */
  protected readonly justUpdated = signal(isFirstStartOfNewVersion(version));
  /** Weather and hour, for the editor's Ambiance button (computer). */
  protected readonly ambianceLabel = computed(
    () =>
      `${WEATHER_CHOICES.find((c) => c.type === this.weather())?.label ?? ""} · ${formatHour(this.hour())}`
  );
  /** Air temperature (°C, rounded) and its color, from icy blue to red. */
  protected readonly temperatureLabel = computed(() =>
    Math.round(this.hud()?.temperature ?? 20)
  );
  protected readonly temperatureColor = computed(() =>
    temperatureColor(this.hud()?.temperature ?? 20)
  );

  constructor() {
    afterNextRender(() =>
      this.gameService.init(this.canvasRef().nativeElement)
    );
    // An editor over the game: the game sleeps (no frames, moves, time, sounds, music, keys) until it is closed
    effect(() => setGameCovered(!!this.editorPanel()));
    // The back button closes the editor like its Jeu (saved first); the Escape key stays the editor's own
    inject(EscapeService).track(
      () => this.editorPanel(),
      () => {
        const editor =
          this.musicEditor() ?? this.modelEditor() ?? this.databaseEditor();
        if (editor) {
          void editor.requestClose();
        } else {
          this.editorPanel.set(null); // still loading, or saved at every change (variables)
        }
      }
    );
    inject(DestroyRef).onDestroy(() => setGameCovered(false));
    // On the map, the floating full screen button gives way to the menu (the game's Menu, the editor's Réglages)
    effect(() => {
      const hud = this.hud();
      this.coreService.fullScreenButtonHidden.set(
        !!hud && hud.mode === GameMode.MAP && !hud.loading
      );
    });
    inject(DestroyRef).onDestroy(() =>
      this.coreService.fullScreenButtonHidden.set(false)
    );
    // Escape opens the game menu, when the game doesn't need it (a message, a fight, a dialog open). The game marks the
    // key as handled (its "cancel" key): defaultPrevented can't tell; the dialogs stop it before it gets here
    const onKeyDown = (ev: KeyboardEvent) => {
      if (
        ev.key === "Escape" &&
        !ev.repeat &&
        !isGameCovered() &&
        this.playing() &&
        !this.menuOpen() &&
        !this.releaseNotes() &&
        !this.savesOpen() &&
        !this.variablesTestOpen() &&
        !this.battleSimOpen() &&
        !this.sequenceService.message() &&
        !isTyping(ev)
      ) {
        this.menuOpen.set(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    inject(DestroyRef).onDestroy(() =>
      window.removeEventListener("keydown", onKeyDown)
    );
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

  protected openVariablesTest(): void {
    this.menuOpen.set(false);
    this.variablesTestOpen.set(true);
  }

  protected openBattleSim(): void {
    this.menuOpen.set(false);
    this.battleSimOpen.set(true);
  }

  protected openSaves(): void {
    this.menuOpen.set(false);
    this.savesOpen.set(true);
  }

  protected openReleaseNotes(event?: Event): void {
    (event?.currentTarget as HTMLElement | undefined)?.blur();
    this.menuOpen.set(false);
    this.releaseNotes.set(true);
  }

  /** The editor's Jeu: back to the game, which takes the editor's changes (the songs, the models). */
  protected closeEditorPanel(): void {
    const kind = this.editorPanel()?.kind;
    switch (kind) {
      case "music": {
        this.gameService.reloadMusic();

        break;
      }
      case "models": {
        void this.gameService.reloadModels();

        break;
      }
      case "database": {
        // (an NPC's walking sheet or name may have changed)
        this.gameService.refreshNpcs();

        break;
      }
      // No default
    }
    this.editorPanel.set(null);
  }

  protected openMenu(event: Event): void {
    // The button must not keep the focus (Space / Enter would click it again instead of reaching the game)
    (event.currentTarget as HTMLElement).blur();
    this.menuOpen.set(true);
  }

  /** From the game menu or the editor's more menu: the ambiance tools unfold (top left). */
  protected openAmbiance(): void {
    this.menuOpen.set(false);
    this.weatherPanel().openAmbiance();
  }

  protected create(event: Event): void {
    (event.currentTarget as HTMLElement).blur();
    this.toggleEditMode();
  }

  protected setPassage(passage: Passage | null): void {
    this.gameService.setPassage(passage);
  }

  protected setObjectEvents(events: ObjectEvent[]): void {
    this.gameService.setObjectEvents(events);
  }

  protected setZoneSize(size: { x: number; z: number }): void {
    this.gameService.setZoneSize(size);
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
