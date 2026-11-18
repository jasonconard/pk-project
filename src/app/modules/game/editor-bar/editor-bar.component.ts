import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, linkedSignal, output, signal } from '@angular/core';
import {
  LucideArrowBigDown, LucideArrowBigUp, LucideBox, LucideChartNoAxesColumnIncreasing, LucideCheck, LucideChevronDown, LucideCloudSun,
  LucideClapperboard, LucideDatabase, LucideDoorOpen, LucideDynamicIcon, LucideEighthNotes, LucideGrid2x2, LucideMessagesSquare, LucideSearch,
  LucideUserRound, LucideEllipsisVertical, LucideEraser, LucideFlag, LucideGrid3x3, LucideIcon,
  LucideLayoutGrid, LucideMap, LucideMapPin, LucideMountain, LucideMousePointer2, LucidePaintBucket, LucidePaintbrush, LucidePlay,
  LucidePlus, LucideRedo2, LucideSettings, LucideSquareMinus, LucideSquarePlus, LucideTrash, LucideUndo2, LucideX, LucideZap,
} from '@lucide/angular';
import { MapManagerComponent } from '../map-manager/map-manager.component';
import { Passage } from '../shared/model/Passage';
import { listMaps } from '../shared/services/map-storage';
import { loadModelThumb, MODEL_CHOICES } from '../shared/model/ModelChoice';
import { TERRAINS, TILESET_LINK, TILESET_SIZE, tilesetPos } from '../shared/model/Terrain';
import { EditBrush, EditCommand, EditSelection } from '../shared/services/map-editor.service';
import { TouchService } from '../../../core/shared/service/touch.service';

/** Keyboard shortcut opening / closing the map editor (free key: the game uses z q s d a e r f p o). */
const EDIT_KEY = 'b';

/** French names of the models in the palette. */
const MODEL_LABELS: Record<string, string> = {
  labo: 'Labo', house: 'Maison', tree: 'Arbre', flowers: 'Fleurs', barrier: 'Barrière',
  pannel: 'Panneau', 'wood-pannel': 'Pancarte', 'letter-box': 'Boîte aux lettres', rock: 'Rocher',
};

type PaletteTab = 'objects' | 'ground' | 'relief' | 'chunks';

/** Families of the palette (computer: the objects are grouped, with a search). */
const MODEL_FAMILIES: { label: string, ids: string[] }[] = [
  { label: 'Nature', ids: ['tree', 'flowers', 'rock'] },
  { label: 'Bâtiments', ids: ['house', 'labo', 'letter-box'] },
  { label: 'Décor', ids: ['barrier', 'pannel', 'wood-pannel'] },
];

/** The game's editors (the launcher); the ones to come (docs/idees.md) greyed. */
const EDITORS: { id: 'models' | 'music' | null, label: string, sub: string, icon: LucideIcon }[] = [
  { id: 'models', label: 'Modèles 3D', sub: 'Bâtiments, plantes, décors', icon: LucideBox },
  { id: 'music', label: 'Musique', sub: 'Boucles lo-fi par lieu', icon: LucideEighthNotes },
  { id: null, label: 'Dialogues', sub: 'Répliques et choix · bientôt', icon: LucideMessagesSquare },
  { id: null, label: 'Base de données', sub: 'Objets, compétences, ennemis · bientôt', icon: LucideDatabase },
  { id: null, label: 'Portraits et sprites', sub: 'Pixel art · bientôt', icon: LucideUserRound },
  { id: null, label: 'Cinématiques', sub: 'Caméra, scènes · bientôt', icon: LucideClapperboard },
];

/** Layouts of the editor: phone held upright (bar + bottom dock), phone on its side (side panels, height is short), computer. */
export type EditorLayout = 'portrait' | 'landscape' | 'desktop';
const DESKTOP_QUERY = '(min-width: 1000px) and (min-height: 601px)';
const LANDSCAPE_QUERY = '(orientation: landscape) and (max-height: 600px)';

const TABS: { id: PaletteTab, label: string, icon: LucideIcon }[] = [
  { id: 'objects', label: 'Objets', icon: LucideBox },
  { id: 'ground', label: 'Sols', icon: LucidePaintbrush },
  { id: 'relief', label: 'Reliefs', icon: LucideMountain },
  { id: 'chunks', label: 'Zones', icon: LucideLayoutGrid },
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
  selector: 'game-editor-bar',
  imports: [MapManagerComponent, LucideDynamicIcon, LucideArrowBigDown, LucideArrowBigUp, LucideBox, LucideChartNoAxesColumnIncreasing,
    LucideCheck, LucideChevronDown, LucideCloudSun, LucideDoorOpen, LucideGrid2x2, LucideSearch, LucideEighthNotes, LucideEllipsisVertical, LucideEraser, LucideFlag,
    LucideGrid3x3, LucideMap, LucideMapPin, LucideMousePointer2, LucidePaintBucket, LucidePlay, LucidePlus, LucideRedo2, LucideSettings,
    LucideSquareMinus, LucideSquarePlus, LucideTrash, LucideUndo2, LucideX, LucideZap],
  templateUrl: './editor-bar.component.html',
  styleUrls: ['./editor-bar.component.scss', './editor-bar.passage.scss', './editor-bar.wide.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.maps-open]': 'mapsOpen()', '[attr.data-layout]': 'layout()' },
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
  readonly mapId = input('');
  readonly mapName = input('');
  /** Choosing a passage's arrival point: the map's name. */
  readonly pickMap = input<string | null>(null);
  /** Weather and hour (the computer's bar: its Ambiance button). */
  readonly ambianceLabel = input('');
  readonly passageChange = output<Passage | null>();
  readonly pickArrival = output<void>();
  readonly cancelPick = output<void>();
  /** Maps a passage can lead to (read again when the selection changes). */
  protected readonly maps = computed(() => {
    this.selection();
    return listMaps();
  });
  /** Map manager shown. */
  protected readonly mapsOpen = signal(false);
  readonly toggled = output<void>();
  readonly modelSelected = output<string | null>();
  readonly tileSelected = output<string | null>();
  readonly brushChange = output<EditBrush>();
  /** More → Ambiance: the weather tools unfold (top left). */
  readonly ambiance = output<void>();
  /** More → Réglages: the game menu (full screen, sound, graphics quality, what's new). */
  readonly settings = output<void>();
  /** The "more" menu of the bar is open. */
  protected readonly moreOpen = signal(false);
  /** The editors' launcher (computer) is open. */
  protected readonly editorsOpen = signal(false);
  protected readonly editors = EDITORS;
  protected readonly layout = signal<EditorLayout>('portrait');
  /** Search in the objects (computer). */
  protected readonly query = signal('');
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
  protected readonly tab = signal<PaletteTab>('objects');
  protected readonly brushes: { value: EditBrush, label: string, title: string }[] = [
    { value: 1, label: '1', title: 'Pinceau 1 case' },
    { value: 2, label: '2', title: 'Pinceau 2 × 2 cases' },
    { value: 3, label: '3', title: 'Pinceau 3 × 3 cases' },
    { value: 'fill', label: 'Pot', title: 'Pot de peinture : remplit toute la zone du même sol' },
  ];
  /** Terrains of the palette, with their picture cut from the tileset (CSS background, 2× zoom). */
  protected readonly tiles = TERRAINS.map(t => {
    const pos = tilesetPos(...t.center);
    return {
      id: t.id, label: t.label,
      background: `url(${TILESET_LINK}) -${pos.x * 2}px -${pos.y * 2}px / ${TILESET_SIZE.x * 2}px ${TILESET_SIZE.y * 2}px`,
    };
  });
  readonly command = output<EditCommand>();

  protected readonly entries: PaletteEntry[] = MODEL_CHOICES.map(c => ({ id: c.model.id, label: this.label(c.model.id) }));
  /** The objects by family, the search applied (computer only: elsewhere the palette scrolls without titles). */
  protected readonly families = computed(() => {
    const query = this.layout() === 'desktop' ? normalize(this.query().trim()) : '';
    const matches = (entry: PaletteEntry) => !query || normalize(entry.label).includes(query);
    const grouped = MODEL_FAMILIES.map(f => ({ label: f.label, entries: this.entries.filter(e => f.ids.includes(e.id) && matches(e)) }));
    const others = this.entries.filter(e => !MODEL_FAMILIES.some(f => f.ids.includes(e.id)) && matches(e));
    return [...grouped, { label: 'Autres', entries: others }].filter(f => f.entries.length);
  });
  protected readonly thumbs = signal<Record<string, string>>({});
  protected readonly selectionLabel = computed(() => {
    const selection = this.selection();
    return selection ? this.label(selection.modelId) : '';
  });

  constructor() {
    const onKeyDown = (ev: KeyboardEvent) => this.onKeyDown(ev);
    window.addEventListener('keydown', onKeyDown, true);
    inject(DestroyRef).onDestroy(() => window.removeEventListener('keydown', onKeyDown, true));
    const desktop = matchMedia(DESKTOP_QUERY);
    const landscape = matchMedia(LANDSCAPE_QUERY);
    const onLayout = () => {
      this.layout.set(desktop.matches ? 'desktop' : landscape.matches ? 'landscape' : 'portrait');
      this.moreOpen.set(false);
      this.editorsOpen.set(false);
    };
    onLayout();
    desktop.addEventListener('change', onLayout);
    landscape.addEventListener('change', onLayout);
    inject(DestroyRef).onDestroy(() => {
      desktop.removeEventListener('change', onLayout);
      landscape.removeEventListener('change', onLayout);
    });
    MODEL_CHOICES.forEach(choice => loadModelThumb(choice).then(pic =>
      this.thumbs.update(thumbs => ({ ...thumbs, [choice.model.id]: pic }))));
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
  }

  protected setBrush(brush: EditBrush, event: Event): void {
    (event.currentTarget as HTMLElement).blur();
    this.brushChange.emit(brush);
  }

  protected send(command: EditCommand, event: Event): void {
    (event.currentTarget as HTMLElement).blur();
    this.moreOpen.set(false);
    this.command.emit(command);
  }

  protected toggleMore(event: Event): void {
    (event.currentTarget as HTMLElement).blur();
    this.moreOpen.update(open => !open);
  }

  /** Typing a search: the game doesn't get the keys; Escape empties it, then leaves it. */
  protected searchKey(ev: KeyboardEvent): void {
    ev.stopPropagation();
    if (ev.key === 'Escape') {
      if (this.query()) {
        this.query.set('');
      } else {
        (ev.currentTarget as HTMLElement).blur();
      }
    }
  }

  protected toggleEditors(event: Event): void {
    (event.currentTarget as HTMLElement).blur();
    this.editorsOpen.update(open => !open);
  }

  protected openEditor(id: 'models' | 'music' | null): void {
    this.editorsOpen.set(false);
    if (id === 'models') {
      this.openModelEditor();
    } else if (id === 'music') {
      this.openMusicEditor();
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

  /**
   * Opens the 3D model editor (a model of the game, or the list). A full page load: the game keeps running in
   * the background otherwise (it is not torn down when its page is left).
   */
  protected openModelEditor(modelId?: string): void {
    const url = new URL(location.href);
    url.hash = '#/modeles' + (modelId ? `?id=${encodeURIComponent(modelId)}` : '');
    location.assign(url);
    location.reload();
  }

  /** Music editor: a page of its own (the game stops meanwhile). */
  protected openMusicEditor(): void {
    const url = new URL(location.href);
    url.hash = '#/musique';
    location.assign(url);
    location.reload();
  }

  /** A new passage: to another map (the first one), entering like a door. */
  protected addPassage(): void {
    const other = this.maps().find(map => map.id !== this.mapId()) ?? this.maps()[0];
    if (other) {
      this.passageChange.emit({ map: other.id, trigger: 'door' });
    }
  }

  protected changePassage(passage: Passage): void {
    this.passageChange.emit(passage);
  }

  /** Another destination: the point chosen on the old one doesn't apply. */
  protected setPassageMap(passage: Passage, map: string): void {
    this.passageChange.emit({ map, trigger: passage.trigger });
  }

  protected openMaps(event: Event): void {
    (event.currentTarget as HTMLElement).blur();
    this.mapsOpen.set(true);
  }

  private label(modelId: string): string {
    return MODEL_LABELS[modelId] ?? modelId;
  }

  private onKeyDown(ev: KeyboardEvent): void {
    const typing = ev.target instanceof HTMLInputElement || ev.target instanceof HTMLTextAreaElement;
    if (typing || ev.altKey || this.mapsOpen()) {
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
    } else if (key === 'escape' && (this.moreOpen() || this.editorsOpen())) {
      this.moreOpen.set(false);
      this.editorsOpen.set(false);
    } else if (key === 'escape' && this.pickMap()) {
      this.cancelPick.emit();
    } else if (ctrl && key === 'z') {
      this.command.emit(ev.shiftKey ? 'redo' : 'undo');
    } else if (ctrl && key === 'y') {
      this.command.emit('redo');
    } else if ((key === 'delete' || key === 'backspace') && this.selection()) {
      this.command.emit('delete');
    } else if (key === 'escape' && this.modelId()) {
      this.modelSelected.emit(null);
    } else if (key === 'escape' && this.tileId()) {
      this.tileSelected.emit(null);
    } else if (key === 'escape' && this.selection()) {
      this.command.emit('deselect');
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
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
