import { GameCutsceneEditorComponent } from "./cutscene-editor/cutscene-editor.component";
import { CutsceneHost } from "./cutscene-editor/cutscene-host";
import { CutsceneOverlayComponent } from "./cutscene-overlay/cutscene-overlay.component";
import { CutsceneService } from "./shared/services/cutscene.service";
import { DungeonChipComponent } from "./dungeon-chip/dungeon-chip.component";
import { DungeonService } from "./shared/services/dungeon.service";
import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  signal,
  untracked,
  viewChild,
} from "@angular/core";
import {
  isGameCovered,
  setGameCovered,
} from "../../core/shared/app-visibility";
import { Passage } from "./shared/model/Passage";
import { EventContext, ObjectEvent } from "./shared/model/ObjectEvent";
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
import { AgendaComponent } from "./agenda/agenda.component";
import { LinksComponent } from "./links/links.component";
import { LinkToastComponent } from "./link-toast/link-toast.component";
import { GiftPickerComponent } from "./gift-picker/gift-picker.component";
import { ShopComponent } from "./shop/shop.component";
import { SeedPickerComponent } from "./farm/seed-picker.component";
import { FarmToastComponent } from "./farm/farm-toast.component";
import { FarmService } from "./shared/services/farm.service";
import { LightSpec } from "./shared/model/light";
import { currentVariableValues } from "../variables-editor/shared/variable-values";
import { LinkGain } from "../database-editor/shared/links";
import { VariablesTestComponent } from "./variables-test/variables-test.component";
import { BattleSimComponent } from "../battle/battle-sim/battle-sim.component";
import { MapControlsComponent } from "./map-controls/map-controls.component";
import { EscapeService } from "../../core/shared/service/escape.service";
import { CoreService } from "../../core/shared/service/core.service";
import { SequenceService } from "./shared/services/sequence.service";
import { LucideMenu, LucidePencilRuler } from "@lucide/angular";
import { isTyping } from "../../core/shared/typing";

import { TimeBannerComponent } from "./time-banner/time-banner.component";
import { momentLabel } from "./shared/model/game-calendar";
import { DungeonObject } from "./shared/model/dungeon-object";
import { TestModeService } from "./shared/services/test-mode.service";
import { TestSheetComponent } from "./test-mode/test-sheet/test-sheet.component";
import { TestListComponent } from "./test-mode/test-list/test-list.component";
import { TestSettingsComponent } from "./test-mode/test-settings/test-settings.component";
import { TestBannerComponent } from "./test-mode/test-banner/test-banner.component";
import { ActionZone } from "./shared/model/action-zone";
@Component({
  selector: "game-main",
  imports: [
    StickComponent,
    TouchPadComponent,
    MessageComponent,
    AgendaComponent,
    LinksComponent,
    LinkToastComponent,
    GiftPickerComponent,
    ShopComponent,
    SeedPickerComponent,
    FarmToastComponent,
    TimeBannerComponent,
    DungeonChipComponent,
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
    CutsceneOverlayComponent,
    TestSheetComponent,
    TestListComponent,
    TestSettingsComponent,
    TestBannerComponent,
    GameCutsceneEditorComponent,
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
  protected readonly shownHour = this.gameService.shownHour;
  protected readonly dateText = this.gameService.dateText;
  protected readonly momentText = computed(() =>
    momentLabel(this.gameService.moment())
  );
  protected readonly timeFade = this.gameService.timeFade;
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
  private readonly cutscene = inject(CutsceneService);
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
      !this.battle.view() &&
      !this.cutscene.view()
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
  protected readonly agendaOpen = signal(false);
  protected readonly linksOpen = signal(false);
  /** The Offrir action of an event: the NPC to give a gift to (null: none asked). */
  protected readonly giftFor = signal<string | null>(null);
  /** The crops: the seeds window, the harvest's message. */
  protected readonly farm = inject(FarmService);
  protected readonly gameDay = this.gameService.day;
  /** The « Ouvrir la boutique » action of an event: the shop open and what its items' conditions read then. */
  protected readonly shopOpen = signal<{
    id: string;
    context: EventContext;
  } | null>(null);
  /** The variables test panel (menu → Test des variables). */
  protected readonly variablesTestOpen = signal(false);
  protected readonly battleSimOpen = signal(false);
  /** Menu → Mode test: the named tests. */
  protected readonly testListOpen = signal(false);
  protected readonly testMode = inject(TestModeService);
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
    // The Offrir action of an event: the bag's gifts for that NPC (the event waits)
    const gifts = this.sequenceService.gift$.subscribe((npc) =>
      this.giftFor.set(npc || null)
    );
    inject(DestroyRef).onDestroy(() => gifts.unsubscribe());
    // The Ouvrir la boutique action of an event: the shop (the event waits until it is closed)
    const shops = this.sequenceService.shop$.subscribe((id) =>
      this.shopOpen.set({
        id,
        context: {
          hour: this.hour(),
          day: this.gameService.day(),
          weather: this.weather(),
          values: currentVariableValues(),
        },
      })
    );
    inject(DestroyRef).onDestroy(() => shops.unsubscribe());
    // A dungeon's save point: the saved games
    const saves = inject(DungeonService).saveAsked$.subscribe(() =>
      this.savesOpen.set(true)
    );
    inject(DestroyRef).onDestroy(() => saves.unsubscribe());
    afterNextRender(() =>
      this.gameService.init(this.canvasRef().nativeElement)
    );
    // An editor over the game: the game sleeps (no frames, moves, time, sounds, music, keys) until it is closed
    effect(() => setGameCovered(!!this.editorPanel()));
    // The map editor closed (B) or another map: the cutscene editor closes too (not while one of its cutscenes plays)
    effect(() => {
      const host = this.cutsceneHost();
      const hud = this.hud();
      if (
        host &&
        hud &&
        !this.cutsceneWatching() &&
        (!hud.editMode || hud.mapId !== host.mapId)
      ) {
        untracked(() => this.closeCutscenes());
      }
    });
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
        !this.agendaOpen() &&
        !this.linksOpen() &&
        !this.variablesTestOpen() &&
        !this.battleSimOpen() &&
        !this.testListOpen() &&
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
    // A test was being played when the app closed: the game set aside comes back, once the map is loaded
    let recovered = false;
    effect(() => {
      const hud = this.hud();
      if (!recovered && hud && !hud.loading) {
        recovered = true;
        untracked(() => this.testMode.recover());
      }
    });
    // Leaving the editor: no more waiting for Tester's tap
    effect(() => {
      if (!this.hud()?.editMode && untracked(() => this.testMode.picking())) {
        untracked(() => this.testMode.cancelPick());
      }
    });
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

  protected editZone(on: boolean): void {
    this.gameService.editZone(on);
  }

  protected setZone(zone: ActionZone | null): void {
    this.gameService.setZone(zone);
  }

  protected openTestList(): void {
    this.menuOpen.set(false);
    this.testListOpen.set(true);
  }

  protected backToMenu(): void {
    this.testListOpen.set(false);
    this.menuOpen.set(true);
  }

  /** The editor's Tester: waiting for the tap on the map (pressed again: no more). */
  protected toggleTestPick(): void {
    if (this.testMode.picking()) {
      this.testMode.cancelPick();
    } else {
      this.testMode.pickHere();
    }
  }

  protected openBattleSim(): void {
    this.menuOpen.set(false);
    this.battleSimOpen.set(true);
  }

  protected openLinks(): void {
    this.menuOpen.set(false);
    this.linksOpen.set(true);
  }

  protected shopDone(): void {
    this.shopOpen.set(null);
    this.sequenceService.nextSequence();
  }

  protected giftDone(gain: LinkGain | null): void {
    this.giftFor.set(null);
    this.sequenceService.giftDone(gain);
  }

  protected openAgenda(): void {
    this.menuOpen.set(false);
    this.agendaOpen.set(true);
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

  /** An editor of the Éditeurs menu: a full screen panel over the game, or the cutscene editor (over the map). */
  protected openEditorPanel(panel: EditorPanel): void {
    if (panel.kind === "cutscenes") {
      this.openCutscenes();
    } else {
      this.editorPanel.set(panel);
    }
  }

  /** The cutscene editor's link to the map (open over the map editor), null: closed. */
  protected readonly cutsceneHost = signal<CutsceneHost | null>(null);
  /** A cutscene played from its editor (« Voir »): the editor hidden meanwhile. */
  protected readonly cutsceneWatching = signal(false);

  private openCutscenes(): void {
    const host = this.gameService.cutsceneHost(() =>
      this.cutsceneWatching.set(false)
    );
    if (!host) {
      return;
    }
    this.cutsceneHost.set({
      ...host,
      play: (cut, from) => {
        this.cutsceneWatching.set(true);
        host.play(cut, from);
      },
      test: (cut) => this.testMode.askCutscene(cut),
    });
  }

  protected closeCutscenes(): void {
    const host = this.cutsceneHost();
    host?.preview(null, 0);
    host?.pickGround(null);
    this.cutsceneHost.set(null);
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

  protected setPlaceLabel(label: string): void {
    this.gameService.setPlaceLabel(label);
  }

  protected setDungeonObject(settings: DungeonObject): void {
    this.gameService.setDungeonObject(settings);
  }

  protected setLight(light: LightSpec): void {
    this.gameService.setLight(light);
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
