import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  linkedSignal,
  output,
  signal,
} from "@angular/core";
import { isGameCovered } from "../../../core/shared/app-visibility";
import { EscapeService } from "../../../core/shared/service/escape.service";
import {
  LucideArrowBigDown,
  LucideArrowBigUp,
  LucideBox,
  LucideCastle,
  LucideChartNoAxesColumnIncreasing,
  LucideCheck,
  LucideChevronDown,
  LucideCloudSun,
  LucideClapperboard,
  LucideDatabase,
  LucideDoorOpen,
  LucideDynamicIcon,
  LucideEighthNotes,
  LucideGrid2x2,
  LucideMessagesSquare,
  LucideMinus,
  LucideSearch,
  LucideSquareDashed,
  LucideSquareUser,
  LucideArrowUp,
  LucideUserRound,
  LucideRotateCw,
  LucideCopy,
  LucideEllipsisVertical,
  LucideEraser,
  LucideFlag,
  LucideGrid3x3,
  LucideIcon,
  LucideLayoutGrid,
  LucideMap,
  LucideMapPin,
  LucideMountain,
  LucideMousePointer2,
  LucidePaintBucket,
  LucidePaintbrush,
  LucidePlay,
  LucidePlus,
  LucideRedo2,
  LucideSettings,
  LucideSquareMinus,
  LucideSquarePlus,
  LucideTrash,
  LucideUndo2,
  LucideVariable,
  LucideX,
  LucideZap,
} from "@lucide/angular";
import { MapManagerComponent } from "../map-manager/map-manager.component";
import { Passage } from "../shared/model/Passage";
import { newObjectEvent, ObjectEvent } from "../shared/model/ObjectEvent";
import { ZONE_ID, ZONE_MAX_CELLS } from "../shared/model/Zone";
import {
  allNpcs,
  isNpc,
  NPC_PREFIX,
  npcModelId,
} from "../shared/model/npc-sprite";
import { walkFrame } from "../../database-editor/shared/walk-sheet";
import { DbTable, WALK_STAND } from "../../database-editor/shared/database";
import { WEATHER_CHOICES } from "../shared/weather/Weather";
import { loadVariables } from "../../variables-editor/shared/variable-storage";
import { cachedDatabase } from "../../database-editor/shared/database-storage";
import {
  DUNGEON_KINDS,
  DungeonObject,
  DungeonTrap,
  dungeonKindOf,
  dungeonModelId,
} from "../shared/model/dungeon-object";
import { EventEditorComponent } from "../event-editor/event-editor.component";
import { listMaps } from "../shared/services/map-storage";
import {
  loadModelThumb,
  MODEL_CHOICES,
  modelLabel,
} from "../shared/model/ModelChoice";
import {
  TERRAINS,
  TILESET_LINK,
  TILESET_SIZE,
  tilesetPos,
} from "../shared/model/Terrain";
import {
  EditBrush,
  EditCommand,
  EditSelection,
} from "../shared/services/map-editor.service";
import { TouchService } from "../../../core/shared/service/touch.service";
import { isTyping } from "../../../core/shared/typing";

/** Keyboard shortcut opening / closing the map editor (free key: the game uses z q s d a e r f p o). */
const EDIT_KEY = "b";

type PaletteTab =
  "objects" | "npcs" | "dungeon" | "ground" | "relief" | "chunks" | "events";

/** Prefix of a passage's target that is a dungeon of the database (`dungeon:<id>`), not a map. */
const DUNGEON_TARGET = "dungeon:";

/** Families of the palette (computer: the objects are grouped, with a search). */
const MODEL_FAMILIES: { label: string; ids: string[] }[] = [
  { label: "Nature", ids: ["tree", "flowers", "rock"] },
  { label: "Bâtiments", ids: ["house", "labo", "letter-box"] },
  { label: "Décor", ids: ["barrier", "pannel", "wood-pannel"] },
];

/** The game's editors (the launcher); the ones to come (docs/idees.md) greyed. */
type EditorId = EditorPanel["kind"];
const EDITORS: {
  id: EditorId | null;
  label: string;
  sub: string;
  icon: LucideIcon;
}[] = [
  {
    id: "models",
    label: "Modèles 3D",
    sub: "Bâtiments, plantes, décors",
    icon: LucideBox,
  },
  {
    id: "music",
    label: "Musique",
    sub: "Boucles lo-fi par lieu",
    icon: LucideEighthNotes,
  },
  {
    id: "variables",
    label: "Variables",
    sub: "Drapeaux et compteurs de l'histoire",
    icon: LucideVariable,
  },
  {
    id: "database",
    label: "Base de données",
    sub: "Éléments, armes, états",
    icon: LucideDatabase,
  },
  {
    id: null,
    label: "Dialogues",
    sub: "Répliques et choix · bientôt",
    icon: LucideMessagesSquare,
  },
  {
    id: null,
    label: "Portraits et sprites",
    sub: "Personnages et PNJ · base de données",
    icon: LucideUserRound,
  },
  {
    id: "cutscenes",
    label: "Cinématiques",
    sub: "Scènes de la carte : caméra, personnages",
    icon: LucideClapperboard,
  },
];

/** The editors opened over the game (a full screen panel): music, variables, models (one of them, or the list). */
export type EditorPanel =
  | { kind: "music" }
  | { kind: "variables" }
  | { kind: "database"; table?: DbTable; rowId?: string }
  | { kind: "models"; modelId?: string }
  /** The cutscene editor: over the game in edit mode (not a full screen panel). */
  | { kind: "cutscenes" };

/** Layouts of the editor: phone held upright (bar + bottom dock), phone on its side (side panels, height is short), computer. */
export type EditorLayout = "portrait" | "landscape" | "desktop";
const DESKTOP_QUERY = "(min-width: 1000px) and (min-height: 601px)";
const LANDSCAPE_QUERY = "(orientation: landscape) and (max-height: 600px)";

const TABS: { id: PaletteTab; label: string; icon: LucideIcon }[] = [
  { id: "objects", label: "Objets", icon: LucideBox },
  { id: "npcs", label: "PNJ", icon: LucideUserRound },
  { id: "dungeon", label: "Donjon", icon: LucideCastle },
  { id: "ground", label: "Sols", icon: LucidePaintbrush },
  { id: "relief", label: "Reliefs", icon: LucideMountain },
  { id: "chunks", label: "Zones", icon: LucideLayoutGrid },
  { id: "events", label: "Événements", icon: LucideZap },
];

interface PaletteEntry {
  id: string;
  label: string;
}

/**
 * Map editor UI (the game's Créer button or B opens it). Phone upright: one bar at the top (Jouer, the open map,
 * undo / redo, more: grid, ambiance, settings, the other editors), the hint of the current tool under it, and at the
 * bottom the tools dock (tabs, brush sizes, palette) or, when an object is selected, its sheet. Phone on its side:
 * the tools on the left (tabs in a rail, palette in 2 columns), the object's sheet on the right, the bar between.
 * Computer: a full width bar (ambiance and the editors' launcher on the right), the tools on the left (search, the
 * objects by family), the sheet on the right, the keyboard help at the bottom. Shortcuts while editing: Escape (put
 * the model back / deselect), Delete (remove the selection), Ctrl+Z / Ctrl+Y (undo / redo).
 */
@Component({
  selector: "game-editor-bar",
  imports: [
    MapManagerComponent,
    LucideDynamicIcon,
    LucideClapperboard,
    LucideArrowBigDown,
    LucideArrowBigUp,
    LucideBox,
    LucideCastle,
    LucideChartNoAxesColumnIncreasing,
    LucideCheck,
    LucideChevronDown,
    LucideCloudSun,
    LucideDoorOpen,
    LucideGrid2x2,
    LucideSearch,
    LucideRotateCw,
    LucideCopy,
    LucideEighthNotes,
    LucideEllipsisVertical,
    LucideEraser,
    LucideFlag,
    LucideGrid3x3,
    LucideMap,
    LucideMapPin,
    LucideMousePointer2,
    LucidePaintBucket,
    LucidePlay,
    LucidePlus,
    LucideRedo2,
    LucideSettings,
    LucideSquareMinus,
    LucideSquarePlus,
    LucideTrash,
    LucideUndo2,
    LucideVariable,
    LucideDatabase,
    LucideX,
    LucideZap,
    LucideMinus,
    LucideSquareDashed,
    LucideSquareUser,
    LucideUserRound,
    LucideArrowUp,
    EventEditorComponent,
  ],
  templateUrl: "./editor-bar.component.html",
  styleUrls: [
    "./editor-bar.component.scss",
    "./editor-bar.selection.scss",
    "./editor-bar.passage.scss",
    "./editor-bar.wide.scss",
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.maps-open]": "mapsOpen() || !!editingEvent()",
    "[attr.data-layout]": "layout()",
  },
})
export class EditorBarComponent {
  readonly editMode = input(false);
  readonly modelId = input<string | null>(null);
  readonly tileId = input<string | null>(null);
  readonly brush = input<EditBrush>(1);
  readonly grid = input(false);
  readonly selection = input<EditSelection | null>(null);
  readonly canUndo = input(false);
  readonly canRedo = input(false);
  /** Map open in the editor. */
  readonly mapId = input("");
  readonly mapName = input("");
  /** Choosing a passage's arrival point: the map's name. */
  readonly pickMap = input<string | null>(null);
  /** Weather and hour (the computer's bar: its Ambiance button). */
  readonly ambianceLabel = input("");
  readonly passageChange = output<Passage | null>();
  /** The selected object's events (all of them, in order). */
  readonly eventsChange = output<ObjectEvent[]>();
  /** The selected zone's size in cells. */
  readonly zoneSizeChange = output<{ x: number; z: number }>();
  /** The selected NPC's place name (its schedule picks it). */
  readonly placeLabelChange = output<string>();
  /** The selected dungeon object's settings (chest, trap, switch, locked door). */
  readonly dungeonChange = output<DungeonObject>();
  /** The event open in the event window (its place in the selected object's list). */
  protected readonly editingEvent = linkedSignal<
    EditSelection | null,
    { index: number } | null
  >({
    source: () => this.selection(),
    computation: (selection, previous) =>
      selection &&
      previous?.value &&
      previous.source?.modelId === selection.modelId
        ? previous.value
        : null,
  });
  protected readonly zoneId = ZONE_ID;
  /** The NPCs of the database (tab PNJ), read again when the tab opens. */
  protected readonly npcs = signal<PaletteEntry[]>([]);
  /** The selected object is an NPC: its sheet opens the database, no passage, never see-through. */
  protected readonly npcSelected = computed(() => {
    const selection = this.selection();
    return !!selection && isNpc(selection);
  });
  protected readonly zoneMax = ZONE_MAX_CELLS;
  protected readonly zoneAxes: { id: "x" | "z"; label: string }[] = [
    { id: "x", label: "Largeur" },
    { id: "z", label: "Profondeur" },
  ];
  readonly pickArrival = output<void>();
  readonly cancelPick = output<void>();
  /** Maps a passage can lead to (read again when the selection changes). */
  protected readonly maps = computed(() => {
    this.selection();
    return listMaps();
  });
  /** The objects of the Donjon tab (model ids `dg:<kind>`). */
  protected readonly dungeonEntries = DUNGEON_KINDS.map((k) => ({
    id: dungeonModelId(k.kind),
    label: k.label,
    roomOnly: !!k.roomOnly,
  }));
  /** The selected object is a dungeon object: its kind (its own fields in the sheet). */
  protected readonly dungeonKind = computed(() => {
    const selection = this.selection();
    return selection?.dungeon ? dungeonKindOf(selection.modelId) : undefined;
  });
  /** What a dungeon object's fields choose from (database, flags), read when the selection changes. */
  protected readonly dungeonData = computed(() => {
    this.selection();
    const db = cachedDatabase();
    return {
      // (the key items first: what a lock usually needs)
      items: [
        ...db.items.filter((i) => i.kind === "key"),
        ...db.items.filter((i) => i.kind !== "key"),
      ],
      groups: db.groups,
      flags: loadVariables().filter((v) => v.kind === "flag"),
      dungeons: db.dungeons,
    };
  });
  protected readonly dungeonTarget = DUNGEON_TARGET;
  /** Map manager shown. */
  protected readonly mapsOpen = signal(false);
  readonly toggled = output<void>();
  readonly modelSelected = output<string | null>();
  readonly tileSelected = output<string | null>();
  readonly brushChange = output<EditBrush>();
  /** More → Ambiance: the weather tools unfold (top left). */
  readonly ambiance = output<void>();
  /** An editor opened over the game, as a full screen panel. */
  readonly editorPanel = output<EditorPanel>();
  /** More → Réglages: the game menu (full screen, sound, graphics quality, what's new). */
  readonly settings = output<void>();
  /** The "more" menu of the bar is open. */
  protected readonly moreOpen = signal(false);
  /** The editors' launcher (computer) is open. */
  protected readonly editorsOpen = signal(false);
  protected readonly editors = EDITORS;
  protected readonly layout = signal<EditorLayout>("portrait");
  /** Search in the objects (computer). */
  protected readonly query = signal("");
  /** The hint was closed: it comes back with the next tool. */
  protected readonly hintClosed = linkedSignal(() => {
    this.modelId();
    this.tileId();
    return false;
  });
  protected readonly tabs = TABS;
  /** Touch screen: the hint tells the finger gestures. */
  protected readonly touch = inject(TouchService).isTouchDevice;
  /** Palette tab shown. */
  protected readonly tab = signal<PaletteTab>("objects");
  protected readonly brushes: {
    value: EditBrush;
    label: string;
    title: string;
  }[] = [
    { value: 1, label: "1", title: "Pinceau 1 case" },
    { value: 2, label: "2", title: "Pinceau 2 × 2 cases" },
    { value: 3, label: "3", title: "Pinceau 3 × 3 cases" },
    {
      value: "fill",
      label: "Pot",
      title: "Pot de peinture : remplit toute la zone du même sol",
    },
  ];
  /** Terrains of the palette, with their picture cut from the tileset (CSS background, 2× zoom). */
  protected readonly tiles = TERRAINS.map((t) => {
    const pos = tilesetPos(...t.center);
    return {
      id: t.id,
      label: t.label,
      background: `url(${TILESET_LINK}) -${pos.x * 2}px -${pos.y * 2}px / ${TILESET_SIZE.x * 2}px ${TILESET_SIZE.y * 2}px`,
    };
  });
  readonly editCommand = output<EditCommand>();

  /** Models changed (back from the model editor): the palette is read again, with new thumbnails. */
  readonly modelsVersion = input(0);
  protected readonly entries = computed<PaletteEntry[]>(() => {
    this.modelsVersion();
    return MODEL_CHOICES.map((c) => ({
      id: c.model.id,
      label: this.label(c.model.id),
    }));
  });
  /** The objects by family, the search applied (computer only: elsewhere the palette scrolls without titles). */
  protected readonly families = computed(() => {
    const query =
      this.layout() === "desktop" ? normalize(this.query().trim()) : "";
    const matches = (entry: PaletteEntry) =>
      !query || normalize(entry.label).includes(query);
    const grouped = MODEL_FAMILIES.map((f) => ({
      label: f.label,
      entries: this.entries().filter((e) => f.ids.includes(e.id) && matches(e)),
    }));
    const others = this.entries().filter(
      (e) => !MODEL_FAMILIES.some((f) => f.ids.includes(e.id)) && matches(e)
    );
    return [...grouped, { label: "Autres", entries: others }].filter(
      (f) => f.entries.length
    );
  });
  protected readonly thumbs = signal<Record<string, string>>(
    Object.fromEntries(
      DUNGEON_KINDS.map((k) => [dungeonModelId(k.kind), k.thumb])
    )
  );
  protected readonly selectionLabel = computed(() => {
    const selection = this.selection();
    return selection ? this.label(selection.modelId) : "";
  });

  constructor() {
    // Escape steps back from the last thing done: a menu, the arrival pick, the tool in hand, the selection
    const escape = inject(EscapeService);
    escape.track(
      () => this.moreOpen(),
      () => this.moreOpen.set(false)
    );
    escape.track(
      () => this.editorsOpen(),
      () => this.editorsOpen.set(false)
    );
    escape.track(
      () => this.editMode() && this.pickMap(),
      () => this.cancelPick.emit()
    );
    escape.track(
      () => this.editMode() && this.modelId(),
      () => this.modelSelected.emit(null)
    );
    escape.track(
      () => this.editMode() && this.tileId(),
      () => this.tileSelected.emit(null)
    );
    escape.track(
      () => this.editMode() && this.selection(),
      () => this.editCommand.emit("deselect")
    );
    // (an editor over the game: its keys are its own)
    const onKeyDown = (ev: KeyboardEvent) =>
      !isGameCovered() && this.onKeyDown(ev);
    window.addEventListener("keydown", onKeyDown, true);
    inject(DestroyRef).onDestroy(() =>
      window.removeEventListener("keydown", onKeyDown, true)
    );
    const desktop = matchMedia(DESKTOP_QUERY);
    const landscape = matchMedia(LANDSCAPE_QUERY);
    const onLayout = () => {
      let layout: EditorLayout = "portrait";
      if (desktop.matches) {
        layout = "desktop";
      } else if (landscape.matches) {
        layout = "landscape";
      }
      this.layout.set(layout);
      this.moreOpen.set(false);
      this.editorsOpen.set(false);
    };
    onLayout();
    desktop.addEventListener("change", onLayout);
    landscape.addEventListener("change", onLayout);
    inject(DestroyRef).onDestroy(() => {
      desktop.removeEventListener("change", onLayout);
      landscape.removeEventListener("change", onLayout);
    });
    // The NPCs (their names and thumbnails) read again each time the editor opens (changed in the database)
    effect(() => {
      if (this.editMode()) {
        this.readNpcs();
      }
    });
    effect(() => {
      this.modelsVersion();
      MODEL_CHOICES.forEach((choice) =>
        loadModelThumb(choice).then((pic) =>
          this.thumbs.update((thumbs) => ({
            ...thumbs,
            [choice.model.id]: pic,
          }))
        )
      );
    });
  }

  protected toggle(event: Event): void {
    // The button must not keep the focus (Space / Enter would click it again instead of reaching the game)
    (event.currentTarget as HTMLElement).blur();
    this.toggled.emit();
  }

  /** Clicking the selected model again puts it back. */
  protected pick(id: string | null, event: Event): void {
    (event.currentTarget as HTMLElement).blur();
    this.modelSelected.emit(id === this.modelId() ? null : id);
  }

  /** Clicking the selected tile again puts it back. */
  protected pickTile(id: string, event: Event): void {
    (event.currentTarget as HTMLElement).blur();
    this.tileSelected.emit(id === this.tileId() ? null : id);
  }

  protected setTab(tab: PaletteTab, event: Event): void {
    (event.currentTarget as HTMLElement).blur();
    this.tab.set(tab);
    if (tab === "npcs") {
      this.readNpcs();
    }
  }

  /** The NPCs of the database for the palette, with their standing picture facing down as thumbnail. */
  private readNpcs(): void {
    const npcs = allNpcs();
    this.npcs.set(npcs.map((n) => ({ id: npcModelId(n.id), label: n.name })));
    for (const npc of npcs) {
      void walkFrame(npc.walk, { col: WALK_STAND, row: 0 }).then((pic) => {
        if (pic) {
          this.thumbs.update((thumbs) => ({
            ...thumbs,
            [npcModelId(npc.id)]: pic,
          }));
        }
      });
    }
  }

  /** An NPC's sheet in the database (Fiche), or the NPC table (Nouveau). */
  protected openNpcSheet(modelId?: string): void {
    this.moreOpen.set(false);
    this.editorPanel.emit({
      kind: "database",
      table: "npcs",
      rowId: modelId?.slice(NPC_PREFIX.length),
    });
  }

  protected setBrush(brush: EditBrush, event: Event): void {
    (event.currentTarget as HTMLElement).blur();
    this.brushChange.emit(brush);
  }

  protected send(command: EditCommand, event: Event): void {
    (event.currentTarget as HTMLElement).blur();
    this.moreOpen.set(false);
    this.editCommand.emit(command);
  }

  protected toggleMore(event: Event): void {
    (event.currentTarget as HTMLElement).blur();
    this.moreOpen.update((open) => !open);
  }

  /** Typing a search: the game doesn't get the keys; Escape empties it, then leaves it. */
  protected searchKey(ev: KeyboardEvent): void {
    ev.stopPropagation();
    if (ev.key === "Escape") {
      if (this.query()) {
        this.query.set("");
      } else {
        (ev.currentTarget as HTMLElement).blur();
      }
    }
  }

  protected toggleEditors(event: Event): void {
    (event.currentTarget as HTMLElement).blur();
    this.editorsOpen.update((open) => !open);
  }

  protected openEditor(id: EditorId | null): void {
    this.editorsOpen.set(false);
    if (id === "models") {
      this.openModelEditor();
    } else if (id) {
      this.openPanel(id);
    }
  }

  protected openAmbiance(event?: Event): void {
    (event?.currentTarget as HTMLElement | undefined)?.blur();
    this.moreOpen.set(false);
    this.ambiance.emit();
  }

  protected openSettings(event?: Event): void {
    (event?.currentTarget as HTMLElement | undefined)?.blur();
    this.moreOpen.set(false);
    this.settings.emit();
  }

  /** The 3D model editor (a model of the game, or the list): a full screen panel over the game, like the music. */
  protected openModelEditor(modelId?: string): void {
    this.moreOpen.set(false);
    this.editorsOpen.set(false);
    this.editorPanel.emit({ kind: "models", modelId });
  }

  /** Music, variables or database editor: a full screen panel over the game (the game sleeps meanwhile, see GameComponent). */
  protected openPanel(
    kind: "music" | "variables" | "database" | "cutscenes"
  ): void {
    this.moreOpen.set(false);
    this.editorsOpen.set(false);
    this.editorPanel.emit({ kind });
  }

  /** A new passage: to another map (the first one), entering like a door. */
  protected addPassage(): void {
    const other =
      this.maps().find((map) => map.id !== this.mapId()) ?? this.maps()[0];
    if (other) {
      this.passageChange.emit({ map: other.id, trigger: "door" });
    }
  }

  protected changePassage(passage: Passage): void {
    this.passageChange.emit(passage);
  }

  /** Another destination: the point chosen on the old one doesn't apply. */
  protected setPassageMap(passage: Passage, map: string): void {
    this.passageChange.emit({ map, trigger: passage.trigger });
  }

  protected isDungeonTarget(map: string): boolean {
    return map.startsWith(DUNGEON_TARGET);
  }

  // --- The selected dungeon object's settings ---

  protected setDungeon(
    dungeon: DungeonObject,
    change: Partial<DungeonObject>
  ): void {
    this.dungeonChange.emit({ ...dungeon, ...change });
  }

  /** A chest's new line: the first item, once. */
  protected addChestItem(dungeon: DungeonObject): void {
    const first = this.dungeonData().items[0];
    if (first) {
      this.setDungeon(dungeon, {
        items: [...(dungeon.items ?? []), { id: first.id, count: 1 }],
      });
    }
  }

  protected setChestItem(
    dungeon: DungeonObject,
    index: number,
    change: Partial<{ id: string; count: number }>
  ): void {
    this.setDungeon(dungeon, {
      items: (dungeon.items ?? []).map((item, i) =>
        i === index ? { ...item, ...change } : item
      ),
    });
  }

  protected removeChestItem(dungeon: DungeonObject, index: number): void {
    this.setDungeon(dungeon, {
      items: (dungeon.items ?? []).filter((_, i) => i !== index),
    });
  }

  /** A trap's effect (none set: hurts 10 % of the PV). */
  protected trapOf(dungeon: DungeonObject): DungeonTrap {
    return dungeon.trap ?? { kind: "hurt", percent: 10 };
  }

  protected setTrapKind(
    dungeon: DungeonObject,
    kind: DungeonTrap["kind"]
  ): void {
    if (kind === "hurt") {
      this.setDungeon(dungeon, { trap: { kind, percent: 10 } });
      return;
    }
    const group =
      dungeon.trap?.kind === "fight"
        ? dungeon.trap.group
        : (this.dungeonData().groups[0]?.id ?? "");
    this.setDungeon(dungeon, { trap: { kind, group } });
  }

  /** A whole number from a field, kept between min and max. */
  protected numberOf(event: Event, min: number, max: number): number {
    const value = Math.round(Number((event.target as HTMLInputElement).value));
    return Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;
  }

  // --- Events of the selected object ---

  protected addEvent(events: ObjectEvent[]): void {
    this.eventsChange.emit([...events, newObjectEvent()]);
    this.editingEvent.set({ index: events.length });
  }

  /** The event window closed: its event as edited (nothing changed: no undo step). */
  protected saveEvent(
    events: ObjectEvent[],
    index: number,
    event: ObjectEvent
  ): void {
    this.editingEvent.set(null);
    if (JSON.stringify(events[index]) !== JSON.stringify(event)) {
      this.eventsChange.emit(events.map((e, i) => (i === index ? event : e)));
    }
  }

  protected removeEvent(events: ObjectEvent[], index: number): void {
    this.editingEvent.set(null);
    this.eventsChange.emit(events.filter((_, i) => i !== index));
  }

  /** One place up: played before the one above (the first that fits plays). */
  protected moveEvent(events: ObjectEvent[], index: number): void {
    const list = [...events];
    [list[index - 1], list[index]] = [list[index], list[index - 1]];
    this.eventsChange.emit(list);
  }

  protected resizeZone(
    size: { x: number; z: number },
    axis: "x" | "z",
    by: number
  ): void {
    this.zoneSizeChange.emit({ ...size, [axis]: size[axis] + by });
  }

  protected triggerLabel(event: ObjectEvent): string {
    return { action: "Parler", enter: "Entrer dessus", auto: "Automatique" }[
      event.trigger
    ];
  }

  /** « si A parlé au maire · de 8 h à 18 h · 2 actions : « Bonjour… » ». */
  protected eventSummary(event: ObjectEvent): string {
    const c = event.conditions;
    const variables = loadVariables();
    const parts: string[] = [];
    c.variables.forEach((test) => {
      const name =
        variables.find((v) => v.id === test.id)?.name ?? "(variable supprimée)";
      const ops = { is: "", eq: "=", ne: "≠", gte: "≥", lte: "≤" };
      parts.push(
        test.op === "is"
          ? `si ${name}${test.value ? "" : " est faux"}`
          : `si ${name} ${ops[test.op]} ${test.value}`
      );
    });
    if (c.hours) {
      parts.push(`de ${c.hours.from} h à ${c.hours.to} h`);
    }
    if (c.weathers?.length) {
      parts.push(
        c.weathers
          .map(
            (w) =>
              WEATHER_CHOICES.find((choice) => choice.type === w)?.label ?? w
          )
          .join(" ou ")
      );
    }
    const count = event.actions.length;
    const message = event.actions.find((a) => a.type === "message");
    const text =
      message?.type === "message" && message.text.trim()
        ? ` : « ${message.text.trim().slice(0, 30)}${message.text.trim().length > 30 ? "…" : ""} »`
        : "";
    parts.push(`${count} action${count > 1 ? "s" : ""}${text}`);
    return parts.join(" · ");
  }

  protected openMaps(event: Event): void {
    (event.currentTarget as HTMLElement).blur();
    this.mapsOpen.set(true);
  }

  private label(modelId: string): string {
    return modelLabel(modelId);
  }

  private onKeyDown(ev: KeyboardEvent): void {
    if (isTyping(ev) || ev.altKey || this.mapsOpen() || this.editingEvent()) {
      return;
    }
    const key = ev.key.toLowerCase();
    const ctrl = ev.ctrlKey || ev.metaKey;
    let handled = true;
    if (key === EDIT_KEY && !ctrl) {
      if (!ev.repeat) {
        this.moreOpen.set(false);
        this.toggled.emit();
      }
    } else if (!this.editMode()) {
      handled = false;
    } else if (ctrl && key === "z") {
      this.editCommand.emit(ev.shiftKey ? "redo" : "undo");
    } else if (ctrl && key === "y") {
      this.editCommand.emit("redo");
    } else if (key === "r" && !ctrl && this.selection()) {
      this.editCommand.emit("rotate");
    } else if (ctrl && key === "d" && this.selection()) {
      this.editCommand.emit("duplicate");
    } else if ((key === "delete" || key === "backspace") && this.selection()) {
      this.editCommand.emit("delete");
    } else {
      handled = false;
    }
    if (handled) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }
}

/** Lower case, without accents: the search finds « bâtiment » with « batiment ». */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
