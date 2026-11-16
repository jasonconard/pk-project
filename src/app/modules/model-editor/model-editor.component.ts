import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ElementRef, HostListener, inject, OnDestroy, signal, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CODE_MODELS } from '../game/shared/model/browser-models';
import { ObjSide } from '../game/shared/model/SceneMap';
import { Vec3 } from '../game/shared/model/SceneUtils';
import { BoxFace } from '../game/shared/model/model-uv';
import { downloadFile } from '../game/shared/util/ts-source';
import { EditableModel, EditablePart, LayerName, layerGrid } from './shared/EditableModel';
import { importModel, loadImagePixels, loadModelMaps } from './shared/model-import';
import { atlasToPng, exportModel } from './shared/model-export';
import { ModelEditorScene, PREVIEW_MARGIN, PREVIEW_SIZE } from './shared/model-editor-scene';
import { addPart, copyFace, duplicatePart, flipTexture, linkFace, newModel, removePart, resizePart, unlinkFace } from './shared/model-ops';
import { ModelHistory } from './shared/model-history';
import {
  forgetStoredModel, loadImportedPalette, loadRecentColors, loadStoredModel, saveImportedPalette, saveRecentColors, saveStoredModel,
  StoredPalette, storedModelIds,
} from './shared/model-storage';
import { modelColors } from './shared/palette';
import { nearestColor, PALETTE_FILE_TYPES, readPaletteFile } from './shared/palette-import';
import { hexToRgba, PaintStroke, Px, rgbaToHex, Tool } from './shared/pixel-tools';
import { PixelCanvasComponent } from './pixel-canvas/pixel-canvas.component';

const FACE_LABELS: Record<BoxFace, string> = {
  front: 'Avant', back: 'Arrière', left: 'Gauche', right: 'Droite', top: 'Dessus', bottom: 'Dessous',
};

/** Selected part, and one of its faces (null: the whole part). */
interface Selection {
  partIndex: number;
  face: BoxFace | null;
}

type Axis = 'x' | 'y' | 'z';

/** Pointer moves below this (px) between press and release: a click (select), not a camera drag. */
const CLICK_TOLERANCE = 4;
const NEW_MODEL_ID = 'nouveau-modele';

/** Selection: click a face, move the part with the arrows. Painting: the tool draws on the faces in 3D too. */
type Mode = 'select' | 'paint';

const TOOLS: { id: Tool, icon: string, label: string, key: string }[] = [
  { id: 'pencil', icon: '✏️', label: 'Crayon', key: 'p' },
  { id: 'eraser', icon: '🧽', label: 'Gomme (transparent)', key: 'e' },
  { id: 'picker', icon: '💧', label: 'Pipette', key: 'i' },
  { id: 'fill', icon: '🪣', label: 'Pot de peinture', key: 'f' },
  { id: 'line', icon: '📏', label: 'Ligne', key: 'l' },
  { id: 'rect', icon: '▭', label: 'Rectangle', key: 'r' },
];

const LAYERS: { id: LayerName, label: string, hint: string }[] = [
  { id: 'color', label: 'Couleur', hint: '' },
  { id: 'specular', label: 'Brillance', hint: 'Blanc : reflets du soleil · Noir : mat' },
  { id: 'night', label: 'Nuit', hint: 'Ce qui s\'allume la nuit (lumière chaude) · Noir : éteint' },
  { id: 'bump', label: 'Relief', hint: 'Blanc : en relief · Noir : en creux (seules les différences comptent)' },
];

/** Shades of the grayscale layers' palette. */
const GRAYS = [0, 32, 64, 96, 128, 160, 192, 224, 255];

/** Sections of the panel that can be folded. */
type PanelSection = 'model' | 'parts' | 'drawing' | 'face';
const SECTIONS_KEY = 'pk-model-editor-sections';
const BIG_VIEW_KEY = 'pk-model-editor-big-view';

function loadJson<T>(key: string, fallback: T): T {
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(key) ?? 'null') };
  } catch {
    return fallback;
  }
}

function saveJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Only a convenience
  }
}

/** Delay before the model is saved in the browser after a change (ms). */
const SAVE_DELAY = 400;
const RECENT_COLORS = 12;
/** Time to confirm going back to the game's version (ms). */
const CONFIRM_TIME = 3000;

/** Waiting for a click on the target face: link it to the selected face, or copy the selected face's pixels on it. */
interface PendingFaceAction {
  kind: 'link' | 'copy';
  texId: string;
}

/** A stroke in progress, on one face texture. */
interface ActiveStroke {
  texId: string;
  stroke: PaintStroke;
  /** Started on the 3D view (the pointer is followed there). */
  in3d: boolean;
}

/**
 * 3D model editor (/modeles): opens a model of the game or a new one, adds / removes / duplicates / moves its
 * boxes and planes (their pixel grids follow their size), selects a face, and exports the model back to the
 * game's format (md-<id>.ts + atlas PNG).
 */
@Component({
  selector: 'app-model-editor',
  templateUrl: './model-editor.component.html',
  styleUrl: './model-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PixelCanvasComponent],
})
export class ModelEditorComponent implements AfterViewInit, OnDestroy {
  private readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');
  /** `/modeles?id=house`: the model to open (from the map editor). */
  private readonly requestedId = inject(ActivatedRoute).snapshot.queryParamMap.get('id');
  private scene: ModelEditorScene | null = null;
  private pressAt: { x: number, y: number } | null = null;
  private active: ActiveStroke | null = null;
  /** Fingers on the 3D view (pointer id → last position), to tell a pinch from a stroke or a tap. */
  private readonly touches = new Map<number, { x: number, y: number }>();
  /** A second finger touched the 3D view: the press is a pinch (zoom / pan), not a tap nor a stroke. */
  private multiTouch = false;
  private readonly history = new ModelHistory();
  private saveTimer: ReturnType<typeof setTimeout> | null = null;
  /** Saves one after the other (IndexedDB is asynchronous). */
  private saving: Promise<void> = Promise.resolve();
  private confirmTimer: ReturnType<typeof setTimeout> | null = null;
  /** Id the model is saved under in the browser (changes with a rename). */
  private storedAs: string | null = null;

  protected readonly modelIds = CODE_MODELS.map(m => m.id);
  /** Models saved in the browser (edited models of the game, and new ones). */
  protected readonly storedIds = signal<string[]>([]);
  protected readonly newIds = computed(() => this.storedIds().filter(id => !this.modelIds.includes(id)));
  /** The open model is the browser's version of a model of the game. */
  protected readonly isEditedGameModel = computed(() => {
    const id = this.model()?.id;
    return !!id && this.modelIds.includes(id) && this.storedIds().includes(id);
  });
  protected readonly confirmRevert = signal(false);
  protected readonly canUndo = signal(false);
  protected readonly canRedo = signal(false);
  protected readonly pending = signal<PendingFaceAction | null>(null);
  protected readonly mirrorH = signal(false);
  protected readonly mirrorV = signal(false);
  protected readonly recentColors = signal(loadRecentColors());
  protected readonly paletteFileTypes = PALETTE_FILE_TYPES;
  /** Palette imported from a file (Aseprite, Lospec…); `locked`: drawing only with its colors. */
  protected readonly importedPalette = signal<StoredPalette | null>(loadImportedPalette());
  /** Changes at the end of each stroke (the model's colors are counted again). */
  private readonly paletteVersion = signal(0);
  protected readonly palette = computed(() => {
    this.paletteVersion();
    const model = this.model();
    return model ? modelColors(model) : [];
  });
  protected readonly axes: Axis[] = ['x', 'y', 'z'];
  protected readonly sides = [
    { value: ObjSide.FRONT, label: 'Devant seulement' },
    { value: ObjSide.BACK, label: 'Derrière seulement' },
    { value: ObjSide.BOTH, label: 'Les deux côtés' },
  ];
  protected readonly model = signal<EditableModel | null>(null);
  protected readonly selection = signal<Selection | null>(null);
  protected readonly status = signal('');
  protected readonly atlasPreview = signal<string | null>(null);
  protected readonly tools = TOOLS;
  protected readonly mode = signal<Mode>('select');
  protected readonly tool = signal<Tool>('pencil');
  protected readonly color = signal('#e04040');
  protected readonly rectFilled = signal(false);
  protected readonly layers = LAYERS;
  protected readonly grays = GRAYS;
  /** Layer painted (and shown in 3D when it is a grayscale one). */
  protected readonly layer = signal<LayerName>('color');
  protected readonly layerHint = computed(() => LAYERS.find(l => l.id === this.layer())!.hint);
  /** Value painted on the grayscale layers. */
  protected readonly gray = signal(255);
  /** 3D view by night (the night layer lights up). */
  protected readonly night = signal(false);
  /** Preview inset (shown with a grayscale layer) by night: on with the night layer, by day with the others. */
  protected readonly previewNight = signal(false);
  protected readonly previewSize = PREVIEW_SIZE;
  /** Folded / unfolded sections of the panel (remembered). */
  protected readonly sections = signal(loadJson<Record<PanelSection, boolean>>(SECTIONS_KEY, { model: true, parts: true, drawing: true, face: true }));
  /** Big 2D view of the selected face, over the left of the 3D view (remembered). */
  protected readonly bigView = signal(loadJson(BIG_VIEW_KEY, { on: false }).on);
  protected readonly previewMargin = PREVIEW_MARGIN;
  /** Changes when face pixels changed (2D view redraw). */
  protected readonly paintVersion = signal(0);

  /** Texture of the selected face. */
  protected readonly faceTexture = computed(() => {
    const sel = this.selection();
    const texId = sel?.face ? this.selectedPart()?.faces[sel.face] : undefined;
    const tex = texId ? this.model()?.textures[texId] : undefined;
    return texId && tex ? { texId, tex } : null;
  });

  protected readonly parts = computed(() => {
    const counts = { box: 0, plane: 0 };
    return (this.model()?.parts ?? []).map(part => `${part.kind === 'box' ? 'Box' : 'Plane'} ${++counts[part.kind]}`);
  });

  protected readonly selectedPart = computed<EditablePart | null>(() => {
    const sel = this.selection();
    return sel ? this.model()?.parts[sel.partIndex] ?? null : null;
  });

  protected readonly faceInfo = computed(() => {
    const model = this.model();
    const sel = this.selection();
    const part = this.selectedPart();
    if (!model || !sel?.face || !part) {
      return null;
    }
    const texId = part.faces[sel.face]!;
    const tex = model.textures[texId];
    const linked = model.parts.reduce((n, p) => n + Object.values(p.faces).filter(id => id === texId).length, 0) - 1;
    return { face: part.kind === 'box' ? FACE_LABELS[sel.face] : 'Face', size: `${tex.w} × ${tex.h} px`, linked };
  });

  async ngAfterViewInit() {
    this.scene = new ModelEditorScene(this.viewport().nativeElement);
    this.scene.onPartMoved = (partIndex, pos) => this.edit(model => model.parts[partIndex].pos = pos);
    // Capture phase: decides before the camera controls whether a press paints the model or turns the camera
    const viewport = this.viewport().nativeElement;
    viewport.addEventListener('pointerdown', e => this.paint3dDown(e), { capture: true });
    viewport.addEventListener('pointermove', e => this.paint3dMove(e));
    viewport.addEventListener('pointermove', e => this.trackTouch(e), { capture: true });
    viewport.addEventListener('pointerup', e => this.untrackTouch(e), { capture: true });
    viewport.addEventListener('pointercancel', e => this.untrackTouch(e), { capture: true });
    await this.refreshStoredIds();
    const id = this.requestedId;
    this.open(id && (this.modelIds.includes(id) || this.storedIds().includes(id)) ? id : this.modelIds[0]);
  }

  ngOnDestroy() {
    this.flushSave();
    if (this.confirmTimer) {
      clearTimeout(this.confirmTimer);
    }
    this.scene?.dispose();
  }

  // --- Model ---

  /** Opens the browser's version of a model if there is one, else the game's. */
  protected async open(id: string, fromGame = false) {
    await this.flushSave();
    const stored = fromGame ? null : await loadStoredModel(id);
    if (stored) {
      this.show(stored, id);
      this.status.set(this.modelIds.includes(id) ? 'Version modifiée, enregistrée dans le navigateur : c\'est elle que le jeu utilise.' : '');
      return;
    }
    const source = CODE_MODELS.find(m => m.id === id);
    if (!source) {
      return;
    }
    this.status.set('Chargement…');
    try {
      const [atlas, maps] = await Promise.all([loadImagePixels(source.tex.link), loadModelMaps(source)]);
      this.show(importModel(source, atlas, maps), null);
      this.status.set('');
    } catch (e) {
      this.status.set((e as Error).message);
    }
  }

  protected create() {
    this.show(newModel(this.freeId(NEW_MODEL_ID)), null);
    this.save();
    this.select({ partIndex: 0, face: null });
  }

  protected rename(value: string) {
    const wanted = value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || NEW_MODEL_ID;
    const id = wanted === this.model()?.id ? wanted : this.freeId(wanted);
    this.edit(model => model.id = id, false);
  }

  /** Forgets the browser's version: back to the model of the game (click twice). */
  protected async revert() {
    const id = this.model()?.id;
    if (!id) {
      return;
    }
    if (!this.confirmRevert()) {
      this.confirmRevert.set(true);
      this.confirmTimer = setTimeout(() => this.confirmRevert.set(false), CONFIRM_TIME);
      return;
    }
    this.confirmRevert.set(false);
    await this.flushSave();
    await forgetStoredModel(id);
    await this.refreshStoredIds();
    this.open(id, true);
  }

  protected undo() {
    const model = this.model();
    const previous = model && this.history.undo(model);
    if (previous) {
      this.restore(previous);
    }
  }

  protected redo() {
    const model = this.model();
    const next = model && this.history.redo(model);
    if (next) {
      this.restore(next);
    }
  }

  protected setSway(value: number) {
    this.edit(model => model.sway = value > 0 ? Math.min(1, value) : undefined, false);
  }

  protected async export() {
    const model = this.model();
    if (!model) {
      return;
    }
    const result = exportModel(model);
    const png = await atlasToPng(result.atlas);
    downloadFile(`md-${model.id}.ts`, result.source);
    downloadFile(`${model.id}.png`, png);
    const maps = Object.entries(result.maps);
    for (const [layer, map] of maps) {
      downloadFile(`${model.id}-${layer}.png`, await atlasToPng(map));
    }
    const previous = this.atlasPreview();
    if (previous) {
      URL.revokeObjectURL(previous);
    }
    this.atlasPreview.set(URL.createObjectURL(png));
    const isNew = !this.modelIds.includes(model.id);
    const pngs = [model.id, ...maps.map(([layer]) => `${model.id}-${layer}`)].map(name => `${name}.png`).join(', ');
    this.status.set(`Exporté : md-${model.id}.ts (→ src/assets/models/) et ${pngs} (→ src/assets/tex/), atlas ${result.atlas.width} × ${result.atlas.height}.`
      + (isNew ? ` Nouveau modèle : ajoute ${result.constName} dans src/assets/models/models.ts, { model: ${result.constName} } dans`
        + ` MODEL_CHOICES (ModelChoice.ts) pour la palette de la carte, et son nom dans MODEL_LABELS (editor-bar.component.ts).` : ''));
  }

  // --- Parts ---

  protected add(kind: EditablePart['kind']) {
    let index = 0;
    this.edit(model => index = addPart(model, kind));
    this.select({ partIndex: index, face: null });
  }

  protected duplicate() {
    const sel = this.selection();
    if (!sel) {
      return;
    }
    let index = 0;
    this.edit(model => index = duplicatePart(model, sel.partIndex));
    this.select({ partIndex: index, face: null });
  }

  protected remove() {
    const sel = this.selection();
    if (!sel) {
      return;
    }
    this.select(null);
    this.edit(model => removePart(model, sel.partIndex));
  }

  protected selectPart(partIndex: number) {
    this.select({ partIndex, face: null });
  }

  /** Size in whole units (at least 1); a plane has no depth. */
  protected setSize(axis: Axis, value: number) {
    const sel = this.selection();
    const part = this.selectedPart();
    if (!sel || !part || !Number.isFinite(value)) {
      return;
    }
    const size: Vec3 = { ...part.size, [axis]: Math.max(1, Math.round(value)) };
    this.edit(model => resizePart(model, sel.partIndex, size));
  }

  protected setPos(axis: Axis, value: number) {
    this.editPart(part => part.pos = { ...part.pos, [axis]: value }, Number.isFinite(value));
  }

  /** Rotation typed in degrees, kept in radians. */
  protected setRot(axis: Axis, degrees: number) {
    this.editPart(part => part.rot = { ...part.rot, [axis]: degrees * Math.PI / 180 }, Number.isFinite(degrees));
  }

  protected degrees(radians: number): number {
    return Math.round(radians * 180 / Math.PI * 100) / 100;
  }

  protected setSide(value: string) {
    this.editPart(part => part.side = Number(value) as ObjSide);
  }

  protected setFlag(flag: 'depthWrite' | 'depthTest', value: boolean) {
    this.editPart(part => part[flag] = value);
  }

  // --- Layers ---

  protected setLayer(layer: LayerName) {
    this.layer.set(layer);
    this.setPreviewNight(layer === 'night');
    this.scene?.setView({ layer, night: this.night() });
    this.paintVersion.update(v => v + 1);
  }

  protected setNight(night: boolean) {
    this.night.set(night);
    this.scene?.setView({ layer: this.layer(), night });
  }

  protected setPreviewNight(night: boolean) {
    this.previewNight.set(night);
    this.scene?.setPreviewNight(night);
  }

  protected setBumpScale(value: number) {
    if (Number.isFinite(value) && value > 0) {
      this.edit(model => model.bumpScale = value);
    }
  }

  // --- Painting ---

  protected setMode(mode: Mode) {
    this.mode.set(mode);
    if (this.scene) {
      this.scene.gizmoEnabled = mode === 'select';
    }
  }

  protected pickTool(tool: Tool) {
    this.tool.set(tool);
    this.setMode('paint');
  }

  /** Press on the 2D view of the selected face (it is a drawing surface: the painting mode is on). */
  protected strokeStart(px: Px) {
    const face = this.faceTexture();
    if (face) {
      this.setMode('paint');
      this.startStroke(face.texId, px, false);
    }
  }

  protected strokeMove(px: Px) {
    if (this.active && !this.active.in3d) {
      this.applyStroke(px);
    }
  }

  protected strokeEnd() {
    this.endStroke();
  }

  private startStroke(texId: string, px: Px, in3d: boolean) {
    const model = this.model()!;
    if (this.tool() !== 'picker') {
      this.record(model);
    }
    const layer = this.layer();
    const grid = layerGrid(model.textures[texId], layer);
    const value = layer === 'color' ? hexToRgba(this.snap(this.color())) : [this.gray()];
    const stroke = new PaintStroke(grid, this.tool(), value, this.rectFilled(), picked => {
      // Like most pixel art tools: pick a color, then draw with it
      if (layer !== 'color') {
        this.gray.set(picked[0]);
        this.tool.set('pencil');
      } else if (picked[3] > 0) {
        this.setColor(rgbaToHex(picked));
        this.tool.set('pencil');
      }
    });
    this.active = { texId, stroke, in3d };
    this.applyStroke(px);
  }

  private applyStroke(px: Px) {
    if (this.active?.stroke.apply(px)) {
      this.scene?.updateTexture(this.active.texId);
      this.paintVersion.update(v => v + 1);
    }
  }

  private endStroke() {
    const tool = this.tool();
    if (this.active && tool !== 'picker') {
      if (tool !== 'eraser' && this.layer() === 'color') {
        this.useColor(this.color());
      }
      this.paletteVersion.update(v => v + 1);
      this.scheduleSave();
    }
    this.active = null;
    if (this.scene) {
      this.scene.orbitEnabled = true;
    }
  }

  /** Painting mode: a press on the model paints it (the camera does not turn), elsewhere the camera turns. */
  private paint3dDown(event: PointerEvent) {
    if (!event.isTrusted) { // the finger handed to the camera controls (cancelStroke3d)
      return;
    }
    if (event.pointerType === 'touch') {
      this.touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (this.touches.size > 1) {
        this.multiTouch = true;
        this.pressAt = null;
        if (this.active?.in3d) {
          this.cancelStroke3d(event.pointerId);
        }
        return;
      }
    }
    if (this.fromPreview(event) || this.mode() !== 'paint' || event.button !== 0 || !this.scene || this.pending()) {
      return;
    }
    const pick = this.scene.pick(event.clientX, event.clientY, true);
    const texId = pick && this.model()?.parts[pick.partIndex].faces[pick.face];
    if (!pick || !texId) {
      return;
    }
    this.scene.orbitEnabled = false;
    this.pressAt = null;
    this.viewport().nativeElement.setPointerCapture(event.pointerId);
    this.select({ partIndex: pick.partIndex, face: pick.face });
    this.startStroke(texId, pick.px, true);
  }

  /**
   * A second finger came while the first one was painting the model: it is a pinch. The stroke is undone and
   * the first finger is handed to the camera controls (they were off when it touched), so both fingers zoom.
   */
  private cancelStroke3d(secondId: number) {
    const tool = this.tool();
    this.active = null;
    const before = tool !== 'picker' ? this.history.drop() : null;
    if (before) {
      this.restore(before);
    }
    if (!this.scene) {
      return;
    }
    this.scene.orbitEnabled = true;
    const canvas = this.viewport().nativeElement.querySelector('canvas');
    this.touches.forEach((pos, pointerId) => {
      if (pointerId !== secondId) {
        canvas?.dispatchEvent(new PointerEvent('pointerdown', {
          pointerId, pointerType: 'touch', isPrimary: true, button: 0, buttons: 1,
          clientX: pos.x, clientY: pos.y, bubbles: true,
        }));
      }
    });
  }

  private trackTouch(event: PointerEvent) {
    if (this.touches.has(event.pointerId)) {
      this.touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }
  }

  private untrackTouch(event: PointerEvent) {
    this.touches.delete(event.pointerId);
    if (!this.touches.size) {
      this.multiTouch = false;
    }
  }

  /** Drag while painting on the model: follows the pointer on the faces showing the same texture. */
  private paint3dMove(event: PointerEvent) {
    if (!this.active?.in3d || !this.scene) {
      return;
    }
    const pick = this.scene.pick(event.clientX, event.clientY, true);
    if (pick && this.model()?.parts[pick.partIndex].faces[pick.face] === this.active.texId) {
      this.applyStroke(pick.px);
    }
  }

  protected async importPalette(input: HTMLInputElement) {
    const file = input.files?.[0];
    input.value = ''; // the same file can be chosen again
    if (!file) {
      return;
    }
    try {
      const { name, colors } = await readPaletteFile(file);
      this.updatePalette({ name, colors, locked: this.importedPalette()?.locked ?? false });
      this.status.set(`Palette « ${name} » : ${colors.length} couleurs.`);
    } catch (e) {
      this.status.set((e as Error).message);
    }
  }

  protected removePalette() {
    this.updatePalette(null);
  }

  protected setPaletteLocked(locked: boolean) {
    const palette = this.importedPalette();
    if (palette) {
      this.updatePalette({ ...palette, locked });
    }
  }

  private updatePalette(palette: StoredPalette | null) {
    this.importedPalette.set(palette);
    saveImportedPalette(palette);
    this.color.set(this.snap(this.color()));
  }

  /** With a locked palette: its color closest to `color`. */
  private snap(color: string): string {
    const palette = this.importedPalette();
    return palette?.locked ? nearestColor(color, palette.colors) : color;
  }

  // --- Panel ---

  protected toggleSection(section: PanelSection, open: boolean) {
    if (this.sections()[section] !== open) {
      this.sections.update(s => ({ ...s, [section]: open }));
      saveJson(SECTIONS_KEY, this.sections());
    }
  }

  protected setBigView(on: boolean) {
    this.bigView.set(on);
    saveJson(BIG_VIEW_KEY, { on });
  }

  // --- Pointer / keyboard ---

  /** Pointer on the preview inset (not on the model of the big view). */
  private fromPreview(event: PointerEvent): boolean {
    return !!(event.target as HTMLElement).closest('.preview');
  }

  protected onPointerDown(event: PointerEvent) {
    if (!event.isTrusted || this.multiTouch) {
      return;
    }
    this.pressAt = this.fromPreview(event) ? null : this.scene?.onGizmo || this.active ? null : { x: event.clientX, y: event.clientY };
  }

  protected onPointerUp(event: PointerEvent) {
    if (this.active?.in3d) {
      this.endStroke();
      return;
    }
    const press = this.pressAt;
    this.pressAt = null;
    if (!press || Math.hypot(event.clientX - press.x, event.clientY - press.y) > CLICK_TOLERANCE) {
      return;
    }
    const pick = this.scene?.pick(event.clientX, event.clientY, !!this.pending());
    if (this.pending()) {
      if (pick) {
        this.applyFaceAction(pick.partIndex, pick.face);
      }
      return;
    }
    this.select(pick ? { partIndex: pick.partIndex, face: pick.face } : null);
  }

  // --- Faces ---

  protected unlink() {
    const sel = this.selection();
    if (sel?.face) {
      this.edit(model => unlinkFace(model, sel.partIndex, sel.face!));
    }
  }

  /** Mirrors the selected face's pixels (and the faces linked to it). */
  protected flip(horizontal: boolean) {
    const face = this.faceTexture();
    if (face) {
      this.edit(model => flipTexture(model.textures[face.texId], horizontal, !horizontal));
      this.paintVersion.update(v => v + 1);
    }
  }

  /** Next click on a face: link it to the selected face, or copy the selected face on it. */
  protected startFaceAction(kind: PendingFaceAction['kind']) {
    const face = this.faceTexture();
    if (!face) {
      return;
    }
    this.setMode('select');
    this.pending.set({ kind, texId: face.texId });
    this.status.set(kind === 'link' ? 'Clique sur la face à lier (même taille). Échap : annuler.' : 'Clique sur la face où copier. Échap : annuler.');
  }

  private applyFaceAction(partIndex: number, face: BoxFace) {
    const action = this.pending()!;
    this.pending.set(null);
    let linked = true;
    if (action.kind === 'link') {
      this.edit(model => linked = linkFace(model, action.texId, partIndex, face));
    } else {
      this.edit(model => copyFace(model, action.texId, partIndex, face, this.mirrorH(), this.mirrorV()));
    }
    this.status.set(linked ? '' : 'Pas lié : les deux faces doivent avoir la même taille.');
    this.select({ partIndex, face });
    this.paintVersion.update(v => v + 1);
  }

  // --- Colors ---

  /** Current color; with a locked palette, its closest color. */
  protected setColor(color: string) {
    this.color.set(this.snap(color));
  }

  /** Color used by the tools (stored in the recent ones). */
  protected useColor(color: string) {
    color = this.snap(color);
    this.color.set(color);
    const recent = [color, ...this.recentColors().filter(c => c !== color)].slice(0, RECENT_COLORS);
    this.recentColors.set(recent);
    saveRecentColors(recent);
  }

  @HostListener('document:keydown', ['$event'])
  protected onKey(event: KeyboardEvent) {
    if ((event.target as HTMLElement).closest('input, select, textarea')) {
      return;
    }
    const ctrl = event.ctrlKey || event.metaKey;
    if (ctrl && (event.key === 'z' || event.key === 'Z')) {
      event.preventDefault();
      event.shiftKey ? this.redo() : this.undo();
    } else if (ctrl && event.key === 'y') {
      event.preventDefault();
      this.redo();
    } else if ((event.key === 'Delete' || event.key === 'Backspace') && this.mode() === 'select') {
      this.remove();
    } else if (event.key === 'Escape') {
      if (this.pending()) {
        this.pending.set(null);
        this.status.set('');
      } else {
        this.select(null);
      }
    } else if (event.key === 'd' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      this.duplicate();
    } else if (!event.ctrlKey && !event.metaKey && !event.altKey) {
      const tool = TOOLS.find(t => t.key === event.key);
      if (tool) {
        this.pickTool(tool.id);
      } else if (event.key === 'v') {
        this.setMode('select');
      } else if (event.key === 'g') {
        this.setBigView(!this.bigView());
      }
    }
  }

  // --- Helpers ---

  private show(model: EditableModel, storedAs: string | null) {
    this.flushSave();
    this.storedAs = storedAs;
    this.history.clear();
    this.updateHistory();
    this.pending.set(null);
    this.model.set(model);
    this.atlasPreview.set(null);
    this.scene?.setModel(model);
    this.select(null);
    this.paletteVersion.update(v => v + 1);
  }

  /** Back to a copy of the model from the history. */
  private restore(model: EditableModel) {
    this.updateHistory();
    this.model.set(model);
    this.scene?.refresh(model);
    const sel = this.selection();
    this.select(sel && model.parts[sel.partIndex] ? sel : null);
    this.paintVersion.update(v => v + 1);
    this.paletteVersion.update(v => v + 1);
    this.scheduleSave();
  }

  private record(model: EditableModel) {
    this.history.record(model);
    this.updateHistory();
  }

  private updateHistory() {
    this.canUndo.set(this.history.canUndo);
    this.canRedo.set(this.history.canRedo);
  }

  private scheduleSave() {
    if (this.saveTimer) {
      clearTimeout(this.saveTimer);
    }
    this.saveTimer = setTimeout(() => this.save(), SAVE_DELAY);
  }

  /** Saves now a change waiting to be saved; resolves when everything is written. */
  private flushSave(): Promise<void> {
    if (this.saveTimer) {
      this.save();
    }
    return this.saving;
  }

  private save() {
    if (this.saveTimer) {
      clearTimeout(this.saveTimer);
      this.saveTimer = null;
    }
    const model = this.model();
    if (!model) {
      return;
    }
    const previousId = this.storedAs ?? undefined;
    this.storedAs = model.id;
    this.saving = this.saving.then(async () => {
      if (!await saveStoredModel(model, previousId)) {
        this.status.set('Enregistrement impossible dans le navigateur : pense à exporter.');
      }
      await this.refreshStoredIds();
    });
  }

  private async refreshStoredIds() {
    this.storedIds.set(await storedModelIds());
  }

  /** Back to the game, which then uses the models saved here (a full page load: see openModelEditor in the map editor). */
  protected async backToGame(event: Event) {
    event.preventDefault();
    await this.flushSave();
    const url = new URL(location.href);
    url.hash = '#/';
    location.assign(url);
    location.reload();
  }

  /** `id`, or `id-2`, `id-3`… if a model already has it. */
  private freeId(id: string): string {
    const taken = new Set([...this.modelIds, ...this.storedIds()]);
    let free = id;
    for (let i = 2; taken.has(free); i++) {
      free = `${id}-${i}`;
    }
    return free;
  }

  /** Changes the model, then shows it again (keeping the selection). */
  private edit(change: (model: EditableModel) => void, rebuild = true) {
    const model = this.model();
    if (!model) {
      return;
    }
    this.record(model);
    change(model);
    this.model.set({ ...model });
    this.scheduleSave();
    if (rebuild) {
      this.scene?.refresh(this.model()!);
      const sel = this.selection();
      this.scene?.highlight(sel?.partIndex ?? null, sel?.face ?? null);
    }
  }

  private editPart(change: (part: EditablePart) => void, valid = true) {
    const sel = this.selection();
    if (sel && valid) {
      this.edit(model => change(model.parts[sel.partIndex]));
    }
  }

  private select(selection: Selection | null) {
    this.selection.set(selection);
    this.scene?.highlight(selection?.partIndex ?? null, selection?.face ?? null);
  }
}
