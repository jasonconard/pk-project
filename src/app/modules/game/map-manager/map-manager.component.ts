import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  OnInit,
  output,
  signal,
  viewChild,
} from "@angular/core";
import { EscapeService } from "../../../core/shared/service/escape.service";
import {
  LucideCastle,
  LucideCheck,
  LucideChevronLeft,
  LucideCopy,
  LucideDoorOpen,
  LucideDownload,
  LucideDynamicIcon,
  LucideEllipsis,
  LucideGlobe,
  LucideIcon,
  LucideLayoutDashboard,
  LucidePencil,
  LucidePlus,
  LucideRotateCcw,
  LucideSkull,
  LucideTrash,
  LucideX,
} from "@lucide/angular";
import { GameService } from "../shared/services/game.service";
import { listMaps, MapSummary } from "../shared/services/map-storage";
import { MapKind, MapTime } from "../shared/model/SceneMap";

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
];

/**
 * Map manager of the editor (design/map-manager.pen): the maps (open one, rename, duplicate, export, reset or
 * delete), and a new map (name, kind, size). A sheet from the bottom on phones in portrait, a panel on the right
 * otherwise.
 */
@Component({
  selector: "game-map-manager",
  imports: [
    LucideDynamicIcon,
    LucideCheck,
    LucideChevronLeft,
    LucideCopy,
    LucideDownload,
    LucideEllipsis,
    LucidePencil,
    LucidePlus,
    LucideRotateCcw,
    LucideTrash,
    LucideX,
  ],
  templateUrl: "./map-manager.component.html",
  styleUrl: "./map-manager.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapManagerComponent implements OnInit {
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
  protected readonly hours = Array.from({ length: 24 }, (_, h) => h);
  protected readonly maps = signal<MapSummary[]>(listMaps());
  protected readonly view = signal<"list" | "new">("list");
  /** Map whose actions are shown (the current one at first). */
  protected readonly expanded = signal<string | null>(null);
  protected readonly renaming = signal<string | null>(null);
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

  ngOnInit(): void {
    this.expanded.set(this.currentId());
  }

  protected kindOf(kind: MapKind) {
    return KINDS.find((k) => k.id === kind) ?? KINDS[0];
  }

  protected sizeLabel(cols: number, rows: number): string {
    return `${cols} × ${rows} zone${cols * rows > 1 ? "s" : ""}`;
  }

  /** Escape / back: the list from the new map form, else closes. */
  protected back(): void {
    if (this.view() === "new") {
      this.view.set("list");
    } else {
      this.closed.emit();
    }
  }

  protected open(map: MapSummary): void {
    if (this.renaming()) {
      return;
    }
    if (map.id !== this.currentId()) {
      this.gameService.openMap(map.id);
    }
    this.closed.emit();
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
    this.maps.set(listMaps());
  }

  protected setFollowers(map: MapSummary, followers: boolean): void {
    this.gameService.setMapFollowers(map.id, followers);
    this.maps.set(listMaps());
  }

  protected setFrozenHour(map: MapSummary, hour: number): void {
    this.gameService.setMapTime(map.id, { mode: "frozen", hour });
    this.maps.set(listMaps());
  }

  protected toggleActions(map: MapSummary, event: Event): void {
    event.stopPropagation();
    this.expanded.update((id) => (id === map.id ? null : map.id));
    this.confirming.set(null);
  }

  protected isExpanded(map: MapSummary): boolean {
    return this.expanded() === map.id;
  }

  protected startRename(map: MapSummary): void {
    this.renaming.set(map.id);
    setTimeout(() => {
      const field =
        this.host.nativeElement.querySelector<HTMLInputElement>(
          ".rename-input"
        );
      field?.focus();
      field?.select();
    });
  }

  protected rename(map: MapSummary, value: string): void {
    const name = value.trim();
    if (this.renaming() !== map.id) {
      return;
    }
    this.renaming.set(null);
    if (name && name !== map.name) {
      this.gameService.renameMap(map.id, name);
      this.refresh();
    }
  }

  protected duplicate(map: MapSummary): void {
    const id = this.gameService.duplicateMap(map.id, `${map.name} (copie)`);
    this.refresh();
    if (id) {
      this.expanded.set(id);
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
