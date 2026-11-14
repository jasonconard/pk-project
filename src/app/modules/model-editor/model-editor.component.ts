import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ElementRef, HostListener, OnDestroy, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MODELS } from '../../../assets/models/models';
import { ObjSide } from '../game/shared/model/SceneMap';
import { Vec3 } from '../game/shared/model/SceneUtils';
import { BoxFace } from '../game/shared/model/model-uv';
import { downloadFile } from '../game/shared/util/ts-source';
import { EditableModel, EditablePart } from './shared/EditableModel';
import { importModel, loadImagePixels } from './shared/model-import';
import { atlasToPng, exportModel } from './shared/model-export';
import { ModelEditorScene } from './shared/model-editor-scene';
import { addPart, duplicatePart, newModel, removePart, resizePart } from './shared/model-ops';
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
  imports: [RouterLink, PixelCanvasComponent],
})
export class ModelEditorComponent implements AfterViewInit, OnDestroy {
  private readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');
  private scene: ModelEditorScene | null = null;
  private pressAt: { x: number, y: number } | null = null;
  private active: ActiveStroke | null = null;

  protected readonly modelIds = MODELS.map(m => m.id);
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

  ngAfterViewInit() {
    this.scene = new ModelEditorScene(this.viewport().nativeElement);
    this.scene.onPartMoved = (partIndex, pos) => this.edit(model => model.parts[partIndex].pos = pos);
    // Capture phase: decides before the camera controls whether a press paints the model or turns the camera
    const viewport = this.viewport().nativeElement;
    viewport.addEventListener('pointerdown', e => this.paint3dDown(e), { capture: true });
    viewport.addEventListener('pointermove', e => this.paint3dMove(e));
    this.open(this.modelIds[0]);
  }

  ngOnDestroy() {
    this.scene?.dispose();
  }

  // --- Model ---

  protected async open(id: string) {
    const source = MODELS.find(m => m.id === id);
    if (!source) {
      return;
    }
    this.status.set('Chargement…');
    try {
      this.show(importModel(source, await loadImagePixels(source.tex.link)));
      this.status.set('');
    } catch (e) {
      this.status.set((e as Error).message);
    }
  }

  protected create() {
    this.show(newModel(NEW_MODEL_ID));
    this.select({ partIndex: 0, face: null });
  }

  protected rename(value: string) {
    const id = value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || NEW_MODEL_ID;
    this.edit(model => model.id = id, false);
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
    const previous = this.atlasPreview();
    if (previous) {
      URL.revokeObjectURL(previous);
    }
    this.atlasPreview.set(URL.createObjectURL(png));
    const isNew = !this.modelIds.includes(model.id);
    this.status.set(`Exporté : md-${model.id}.ts (→ src/assets/models/) et ${model.id}.png (→ src/assets/tex/), atlas ${result.atlas.width} × ${result.atlas.height}.`
      + (isNew ? ` Nouveau modèle : ajoute ${result.constName} dans src/assets/models/models.ts.` : ''));
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

  protected setShininess(value: number) {
    this.editPart(part => part.shininess = value > 0 ? Math.min(1, value) : undefined, Number.isFinite(value));
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

  /** Press on the 2D view of the selected face. */
  protected strokeStart(px: Px) {
    const face = this.faceTexture();
    if (face) {
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
    const tex = this.model()!.textures[texId];
    const stroke = new PaintStroke(tex, this.tool(), hexToRgba(this.color()), this.rectFilled(), rgba => {
      if (rgba[3] > 0) {
        this.color.set(rgbaToHex(rgba));
        this.tool.set('pencil'); // like most pixel art tools: pick a color, then draw with it
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
    this.active = null;
    if (this.scene) {
      this.scene.orbitEnabled = true;
    }
  }

  /** Painting mode: a press on the model paints it (the camera does not turn), elsewhere the camera turns. */
  private paint3dDown(event: PointerEvent) {
    if (this.mode() !== 'paint' || event.button !== 0 || !this.scene) {
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

  // --- Pointer / keyboard ---

  protected onPointerDown(event: PointerEvent) {
    this.pressAt = this.scene?.onGizmo || this.active ? null : { x: event.clientX, y: event.clientY };
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
    const pick = this.scene?.pick(event.clientX, event.clientY);
    this.select(pick ? { partIndex: pick.partIndex, face: pick.face } : null);
  }

  @HostListener('document:keydown', ['$event'])
  protected onKey(event: KeyboardEvent) {
    if ((event.target as HTMLElement).closest('input, select, textarea')) {
      return;
    }
    if ((event.key === 'Delete' || event.key === 'Backspace') && this.mode() === 'select') {
      this.remove();
    } else if (event.key === 'Escape') {
      this.select(null);
    } else if (event.key === 'd' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      this.duplicate();
    } else if (!event.ctrlKey && !event.metaKey && !event.altKey) {
      const tool = TOOLS.find(t => t.key === event.key);
      if (tool) {
        this.pickTool(tool.id);
      } else if (event.key === 'v') {
        this.setMode('select');
      }
    }
  }

  // --- Helpers ---

  private show(model: EditableModel) {
    this.model.set(model);
    this.atlasPreview.set(null);
    this.scene?.setModel(model);
    this.select(null);
  }

  /** Changes the model, then shows it again (keeping the selection). */
  private edit(change: (model: EditableModel) => void, rebuild = true) {
    const model = this.model();
    if (!model) {
      return;
    }
    change(model);
    this.model.set({ ...model });
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
