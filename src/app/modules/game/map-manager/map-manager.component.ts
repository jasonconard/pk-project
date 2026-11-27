import { ARENA_HERE } from "../shared/model/arena";
import {
  transitionInfo,
  TransitionKind,
  TRANSITIONS,
} from "../shared/model/transition";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  computed,
  signal,
  viewChild,
} from "@angular/core";
import { EscapeService } from "../../../core/shared/service/escape.service";
import {
  LucideCastle,
  LucideCheck,
  LucideChevronDown,
  LucideChevronLeft,
  LucideChevronRight,
  LucideCopy,
  LucideDoorOpen,
  LucideDownload,
  LucideDynamicIcon,
  LucideFolder,
  LucideFolderPlus,
  LucideGlobe,
  LucideIcon,
  LucideLayoutDashboard,
  LucideMinus,
  LucideMoon,
  LucidePencil,
  LucidePlus,
  LucideRotateCcw,
  LucideSearch,
  LucideSkull,
  LucideSlidersHorizontal,
  LucideSparkles,
  LucideSwords,
  LucideTrash,
  LucideUsers,
  LucideX,
} from "@lucide/angular";
import { readJson, writeJson } from "../../../core/shared/local-store";
import { searchKey } from "../../../core/shared/text";
import { cachedDatabase } from "../../database-editor/shared/database-storage";
import { GameService } from "../shared/services/game.service";
import { listMaps, MapSummary } from "../shared/services/map-storage";
import { MapKind, MapTime, WallStyle } from "../shared/model/SceneMap";
import { WALL_STYLES } from "../shared/model/GroundMesh";

/** Time to confirm a reset / delete (ms). */
const CONFIRM_TIME = 3000;
/** Size grid of a new map (chunks). */
const GRID_COLS = 6;
const GRID_ROWS = 4;

const KINDS: { id: MapKind; label: string; icon: LucideIcon }[] = [
  { id: "world", label: "Monde", icon: LucideGlobe },
  { id: "town", label: "Ville", icon: LucideCastle },
  { id: "interior", label: "Intérieur", icon: LucideDoorOpen },
  { id: "dungeon", label: "Donjon", icon: LucideSkull },
  { id: "room", label: "Salle", icon: LucideLayoutDashboard },
  { id: "arena", label: "Arène", icon: LucideSwords },
];

/** The sections the maps are put in by their kind (a map with its own section is in that one instead). */
const KIND_SECTIONS: {
  id: string;
  label: string;
  icon: LucideIcon;
  kinds: MapKind[];
}[] = [
  {
    id: "world",
    label: "Monde et villes",
    icon: LucideGlobe,
    kinds: ["world", "town"],
  },
  {
    id: "interior",
    label: "Intérieurs",
    icon: LucideDoorOpen,
    kinds: ["interior"],
  },
  {
    id: "dungeon",
    label: "Donjons",
    icon: LucideSkull,
    kinds: ["dungeon", "room"],
  },
  { id: "arena", label: "Arènes", icon: LucideSwords, kinds: ["arena"] },
];
/** The sections made by hand (their names; a map names its own) and the sections folded, kept in the browser. */
const SECTIONS_KEY = "pk-map-sections";
const FOLDED_KEY = "pk-map-sections-folded";

/** A section of the list: the maps of a kind, or a section made by hand (`own`). */
interface MapSection {
  id: string;
  label: string;
  icon: LucideIcon;
  own: boolean;
  maps: MapSummary[];
}

/** A choice of a list opened from a setting (in place of a drop-down list). */
interface PickOption {
  id: string;
  label: string;
  note?: string;
}

/** The list opened from a setting: its title, its choices, the current one, what choosing does. */
interface Picker {
  title: string;
  options: PickOption[];
  value: string;
  pick: (id: string) => void;
}

/**
 * Map manager of the editor (design/map-manager.pen): the maps in sections (by kind, or made by hand), a map's
 * settings (name, kind, section, time, team, walls, transition, arena; duplicate, export, reset or delete), and a
 * new map (name, kind, size). A sheet from the bottom on phones in portrait, a panel on the right otherwise.
 */
@Component({
  selector: "game-map-manager",
  imports: [
    LucideDynamicIcon,
    LucideCheck,
    LucideChevronDown,
    LucideChevronLeft,
    LucideChevronRight,
    LucideCopy,
    LucideDownload,
    LucideFolder,
    LucideFolderPlus,
    LucideMinus,
    LucideMoon,
    LucidePencil,
    LucidePlus,
    LucideRotateCcw,
    LucideSearch,
    LucideSlidersHorizontal,
    LucideSparkles,
    LucideSwords,
    LucideTrash,
    LucideUsers,
    LucideX,
  ],
  templateUrl: "./map-manager.component.html",
  styleUrls: ["./map-manager.component.scss", "./map-manager.settings.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapManagerComponent {
  private readonly gameService = inject(GameService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Map the game is on. */
  readonly currentId = input.required<string>();
  readonly closed = output<void>();

  protected readonly kinds = KINDS;
  protected readonly timeModes: {
    id: "pass" | "stop" | "frozen";
    label: string;
    help: string;
  }[] = [
    {
      id: "pass",
      label: "Passe",
      help: "Comme dehors : l'heure et la lumière avancent",
    },
    {
      id: "stop",
      label: "S'arrête",
      help: "L'horloge reste à l'heure d'entrée (conseillé pour un donjon)",
    },
    {
      id: "frozen",
      label: "Figé",
      help: "Toujours la même heure, quelle que soit l'heure dehors",
    },
  ];
  protected readonly maps = signal<MapSummary[]>(listMaps());
  protected readonly view = signal<"list" | "new" | "settings">("list");
  /** Map waiting for a second tap on reset / delete. */
  protected readonly confirming = signal<string | null>(null);
  private confirmTimer?: ReturnType<typeof setTimeout>;

  // New map
  protected readonly newName = signal("Nouvelle carte");
  protected readonly newKind = signal<MapKind>("town");
  protected readonly newCols = signal(2);
  protected readonly newRows = signal(2);
  protected readonly gridRows = Array.from({ length: GRID_ROWS }, (_, r) => r);
  protected readonly gridCols = Array.from({ length: GRID_COLS }, (_, c) => c);
  private readonly grid = viewChild<ElementRef<HTMLElement>>("grid");

  constructor() {
    // Escape: back to the list from the new map form, else closes (not while typing a name)
    inject(EscapeService).whileAlive(() => this.back());
    inject(DestroyRef).onDestroy(() => clearTimeout(this.confirmTimer));
  }

  protected kindOf(kind: MapKind) {
    return KINDS.find((k) => k.id === kind) ?? KINDS[0];
  }

  protected sizeLabel(cols: number, rows: number): string {
    return `${cols} × ${rows} zone${cols * rows > 1 ? "s" : ""}`;
  }

  /** Escape / back: the list from the new map form, else closes. */
  protected back(): void {
    if (this.picker()) {
      this.picker.set(null);
    } else if (this.view() === "list") {
      this.closed.emit();
    } else {
      this.view.set("list");
    }
  }

  protected open(map: MapSummary): void {
    if (map.id !== this.currentId()) {
      this.gameService.openMap(map.id);
    }
    this.closed.emit();
  }

  // --- The list, in sections ---

  protected readonly search = signal("");
  /** The sections made by hand that may be empty (a map names its own). */
  private readonly ownNames = signal<string[]>(
    readJson<string[]>(SECTIONS_KEY) ?? []
  );
  protected readonly folded = signal<string[]>(
    readJson<string[]>(FOLDED_KEY) ?? []
  );
  /** The section being renamed (its id), the new section being named. */
  protected readonly renamingSection = signal<string | null>(null);
  protected readonly addingSection = signal(false);

  /** The names of the sections made by hand, in order: those kept, then those only maps name. */
  protected readonly sectionNames = computed(() => {
    const names = [...this.ownNames()];
    for (const map of this.maps()) {
      if (map.section && !names.includes(map.section)) {
        names.push(map.section);
      }
    }
    return names;
  });

  /** The sections shown: by kind (those with maps), then the ones made by hand; the search keeps the maps found. */
  protected readonly sections = computed<MapSection[]>(() => {
    const query = searchKey(this.search().trim());
    const found = this.maps().filter(
      (m) => !query || searchKey(m.name).includes(query)
    );
    const byKind = KIND_SECTIONS.map((s) => ({
      id: s.id,
      label: s.label,
      icon: s.icon,
      own: false,
      maps: found.filter((m) => !m.section && s.kinds.includes(m.kind)),
    })).filter((s) => s.maps.length > 0);
    const own = this.sectionNames()
      .map((name) => ({
        id: "own:" + name,
        label: name,
        icon: LucideFolder,
        own: true,
        maps: found.filter((m) => m.section === name),
      }))
      .filter((s) => !query || s.maps.length > 0);
    return [...byKind, ...own];
  });

  protected isFolded(section: MapSection): boolean {
    // (searching: everything found is shown)
    return !this.search().trim() && this.folded().includes(section.id);
  }

  protected toggleSection(section: MapSection): void {
    this.folded.update((ids) =>
      ids.includes(section.id)
        ? ids.filter((id) => id !== section.id)
        : [...ids, section.id]
    );
    writeJson(FOLDED_KEY, this.folded());
  }

  /** A new section made by hand (empty until a map is put in it), or null when the name is taken or empty. */
  protected addSection(value: string): string | null {
    const name = value.trim().slice(0, 30);
    this.addingSection.set(false);
    if (!name || this.sectionNames().includes(name)) {
      return null;
    }
    this.ownNames.update((names) => [...names, name]);
    writeJson(SECTIONS_KEY, this.ownNames());
    return name;
  }

  /** A section renamed: its maps follow. An empty name takes it away (its maps go back to their kind's section). */
  protected renameSection(section: MapSection, value: string): void {
    if (this.renamingSection() !== section.id) {
      return;
    }
    this.renamingSection.set(null);
    const name = value.trim().slice(0, 30);
    if (name === section.label || this.sectionNames().includes(name)) {
      return;
    }
    for (const map of this.maps().filter((m) => m.section === section.label)) {
      this.gameService.setMapSection(map.id, name || undefined);
    }
    this.ownNames.update((names) =>
      names.map((n) => (n === section.label ? name : n)).filter((n) => !!n)
    );
    writeJson(SECTIONS_KEY, this.ownNames());
    this.refresh();
  }

  /** Focuses the field that just appeared (a name being typed). */
  protected focusField(selector: string): void {
    setTimeout(() => {
      const field =
        this.host.nativeElement.querySelector<HTMLInputElement>(selector);
      field?.focus();
      field?.select();
    });
  }

  // --- A map's settings ---

  private readonly settingsId = signal<string | null>(null);
  /** The map whose settings are shown. */
  protected readonly edited = computed(
    () => this.maps().find((m) => m.id === this.settingsId()) ?? null
  );
  /** The list opened from a setting (null: none). */
  protected readonly picker = signal<Picker | null>(null);
  protected readonly wallStyles = (Object.keys(WALL_STYLES) as WallStyle[]).map(
    (id) => ({ id, label: WALL_STYLES[id].label })
  );

  protected openSettings(map: MapSummary, event: Event): void {
    event.stopPropagation();
    this.settingsId.set(map.id);
    this.confirming.set(null);
    this.view.set("settings");
  }

  protected rename(map: MapSummary, value: string): void {
    const name = value.trim();
    if (name && name !== map.name) {
      this.gameService.renameMap(map.id, name);
      this.refresh();
    }
  }

  protected setKind(map: MapSummary, kind: MapKind): void {
    this.gameService.setMapKind(map.id, kind);
    this.refresh();
  }

  /** The section of a map's kind (where it is without a section of its own). */
  protected kindSection(map: MapSummary) {
    return (
      KIND_SECTIONS.find((s) => s.kinds.includes(map.kind)) ?? KIND_SECTIONS[0]
    );
  }

  protected setSection(map: MapSummary, section: string | undefined): void {
    this.gameService.setMapSection(map.id, section);
    this.refresh();
  }

  /** A new section named from a map's settings: the map goes in it. */
  protected addSectionFor(map: MapSummary, value: string): void {
    const name = this.addSection(value);
    if (name) {
      this.setSection(map, name);
    }
  }

  protected timeMode(map: MapSummary): "pass" | "stop" | "frozen" {
    return map.time?.mode ?? "pass";
  }

  /** The time on a map: it passes, stops, or is frozen (at midnight first). */
  protected setTime(map: MapSummary, mode: "pass" | "stop" | "frozen"): void {
    let time: MapTime | null = null;
    if (mode === "stop") {
      time = { mode };
    } else if (mode === "frozen") {
      time = { mode, hour: map.time?.mode === "frozen" ? map.time.hour : 0 };
    }
    this.gameService.setMapTime(map.id, time);
    this.refresh();
  }

  protected frozenHour(map: MapSummary): number {
    return map.time?.mode === "frozen" ? map.time.hour : 0;
  }

  /** The frozen hour, one hour later or earlier (round the clock). */
  protected stepHour(map: MapSummary, step: number): void {
    const hour = (this.frozenHour(map) + step + 24) % 24;
    this.gameService.setMapTime(map.id, { mode: "frozen", hour });
    this.refresh();
  }

  protected setWalls(map: MapSummary, walls: WallStyle): void {
    this.gameService.setMapWalls(map.id, walls);
    this.refresh();
  }

  protected setFollowers(map: MapSummary, followers: boolean): void {
    this.gameService.setMapFollowers(map.id, followers);
    this.refresh();
  }

  /** « Celle des réglages » with what it is now. */
  private settingsTransition(): PickOption {
    const kind = cachedDatabase().settings[0]?.transitions?.map;
    return {
      id: "",
      label: "Celle des réglages",
      note: transitionInfo(kind).label,
    };
  }

  /** What a map's transition setting shows: its own, or the settings' one. */
  protected transitionShown(map: MapSummary): PickOption {
    return map.transition
      ? { id: map.transition, label: transitionInfo(map.transition).label }
      : this.settingsTransition();
  }

  protected pickTransition(map: MapSummary): void {
    this.picker.set({
      title: "Transition à l'arrivée",
      options: [
        this.settingsTransition(),
        ...TRANSITIONS.map((t) => ({ id: t.id, label: t.label, note: t.note })),
      ],
      value: map.transition ?? "",
      pick: (id) => {
        this.gameService.setMapTransition(
          map.id,
          (id || undefined) as TransitionKind | undefined
        );
        this.refresh();
      },
    });
  }

  /** The arena maps (read again each time: one may have been made here). */
  private arenas(): PickOption[] {
    return this.maps()
      .filter((m) => m.kind === "arena")
      .map((m) => ({ id: m.id, label: m.name, note: "Arène" }));
  }

  private arenaChoices(): PickOption[] {
    return [
      {
        id: "",
        label: "Celle du donjon ou des réglages",
        note: "Le choix fait ailleurs",
      },
      {
        id: ARENA_HERE,
        label: "Sur place, sans arène",
        note: "Le combat se joue où est l'équipe",
      },
      ...this.arenas(),
    ];
  }

  /** What a map's arena setting shows. */
  protected arenaShown(map: MapSummary): PickOption {
    const choices = this.arenaChoices();
    return choices.find((c) => c.id === (map.arena ?? "")) ?? choices[0];
  }

  protected pickArena(map: MapSummary): void {
    this.picker.set({
      title: "Arène de combat",
      options: this.arenaChoices(),
      value: map.arena ?? "",
      pick: (id) => {
        this.gameService.setMapArena(map.id, id || undefined);
        this.refresh();
      },
    });
  }

  protected choose(option: PickOption): void {
    this.picker()?.pick(option.id);
    this.picker.set(null);
  }

  protected duplicate(map: MapSummary): void {
    const id = this.gameService.duplicateMap(map.id, `${map.name} (copie)`);
    this.refresh();
    if (id) {
      this.settingsId.set(id);
    }
  }

  protected exportMap(map: MapSummary): void {
    this.gameService.exportMap(map.id);
  }

  /** Reset (code map) / delete (browser map): a second tap within CONFIRM_TIME. */
  protected reset(map: MapSummary): void {
    if (this.confirming() !== map.id) {
      this.confirming.set(map.id);
      clearTimeout(this.confirmTimer);
      this.confirmTimer = setTimeout(
        () => this.confirming.set(null),
        CONFIRM_TIME
      );
      return;
    }
    clearTimeout(this.confirmTimer);
    this.confirming.set(null);
    this.gameService.resetMap(map.id);
    this.refresh();
    if (!this.edited()) {
      // (a browser map deleted)
      this.view.set("list");
    }
  }

  // --- New map ---

  protected startNew(): void {
    this.newName.set("Nouvelle carte");
    this.view.set("new");
  }

  /** Size grid: the cell under the finger / mouse gives the columns and rows (pressed then dragged). */
  protected sizeAt(event: PointerEvent): void {
    const grid = this.grid()?.nativeElement;
    if (!grid || (event.type === "pointermove" && !event.buttons)) {
      return;
    }
    if (event.type === "pointerdown") {
      grid.setPointerCapture?.(event.pointerId);
    }
    const rect = grid.getBoundingClientRect();
    const col = Math.floor(
      ((event.clientX - rect.left) / rect.width) * GRID_COLS
    );
    const row = Math.floor(
      ((event.clientY - rect.top) / rect.height) * GRID_ROWS
    );
    this.newCols.set(Math.min(GRID_COLS, Math.max(1, col + 1)));
    this.newRows.set(Math.min(GRID_ROWS, Math.max(1, row + 1)));
  }

  protected create(): void {
    const name = this.newName().trim() || "Nouvelle carte";
    this.gameService.createMap(
      name,
      this.newKind(),
      this.newCols(),
      this.newRows()
    );
    this.closed.emit();
  }

  private refresh(): void {
    this.maps.set(listMaps());
  }
}
