import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ElementRef, OnDestroy, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MODELS } from '../../../assets/models/models';
import { BoxFace } from '../game/shared/model/model-uv';
import { downloadFile } from '../game/shared/util/ts-source';
import { EditableModel } from './shared/EditableModel';
import { importModel, loadImagePixels } from './shared/model-import';
import { atlasToPng, exportModel } from './shared/model-export';
import { ModelEditorScene } from './shared/model-editor-scene';

const FACE_LABELS: Record<BoxFace, string> = {
  front: 'Avant', back: 'Arrière', left: 'Gauche', right: 'Droite', top: 'Dessus', bottom: 'Dessous',
};

interface Selection {
  partIndex: number;
  face: BoxFace;
}

/** Pointer moves below this (px) between press and release: a click (select), not a camera drag. */
const CLICK_TOLERANCE = 4;

/**
 * 3D model editor (/modeles). Step 1: opens a model of the game, shows it in 3D, selects a face (its pixel
 * grid size), and exports it back to the game's format (md-<id>.ts + atlas PNG).
 */
@Component({
  selector: 'app-model-editor',
  templateUrl: './model-editor.component.html',
  styleUrl: './model-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class ModelEditorComponent implements AfterViewInit, OnDestroy {
  private readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');
  private scene: ModelEditorScene | null = null;
  private pressAt: { x: number, y: number } | null = null;

  protected readonly modelIds = MODELS.map(m => m.id);
  protected readonly model = signal<EditableModel | null>(null);
  protected readonly selection = signal<Selection | null>(null);
  protected readonly status = signal('');
  protected readonly atlasPreview = signal<string | null>(null);

  protected readonly stats = computed(() => {
    const model = this.model();
    if (!model) {
      return null;
    }
    return {
      boxes: model.parts.filter(p => p.kind === 'box').length,
      planes: model.parts.filter(p => p.kind === 'plane').length,
      textures: Object.keys(model.textures).length,
    };
  });

  protected readonly selectionInfo = computed(() => {
    const model = this.model();
    const sel = this.selection();
    if (!model || !sel) {
      return null;
    }
    const part = model.parts[sel.partIndex];
    const texId = part.faces[sel.face]!;
    const tex = model.textures[texId];
    const sameKind = model.parts.slice(0, sel.partIndex + 1).filter(p => p.kind === part.kind).length;
    const linked = model.parts.reduce((n, p) => n + Object.values(p.faces).filter(id => id === texId).length, 0) - 1;
    return {
      part: `${part.kind === 'box' ? 'Box' : 'Plane'} ${sameKind}`,
      face: part.kind === 'box' ? FACE_LABELS[sel.face] : 'Face',
      size: `${tex.w} × ${tex.h} px`,
      linked,
    };
  });

  ngAfterViewInit() {
    this.scene = new ModelEditorScene(this.viewport().nativeElement);
    this.open(this.modelIds[0]);
  }

  ngOnDestroy() {
    this.scene?.dispose();
  }

  protected async open(id: string) {
    const source = MODELS.find(m => m.id === id);
    if (!source) {
      return;
    }
    this.status.set('Chargement…');
    try {
      const atlas = await loadImagePixels(source.tex.link);
      const model = importModel(source, atlas);
      this.model.set(model);
      this.select(null);
      this.atlasPreview.set(null);
      this.scene?.setModel(model);
      this.status.set('');
    } catch (e) {
      this.status.set((e as Error).message);
    }
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
    this.status.set(`Exporté : md-${model.id}.ts (→ src/assets/models/) et ${model.id}.png (→ src/assets/tex/), atlas ${result.atlas.width} × ${result.atlas.height}`);
  }

  protected onPointerDown(event: PointerEvent) {
    this.pressAt = { x: event.clientX, y: event.clientY };
  }

  protected onPointerUp(event: PointerEvent) {
    const press = this.pressAt;
    this.pressAt = null;
    if (!press || Math.hypot(event.clientX - press.x, event.clientY - press.y) > CLICK_TOLERANCE) {
      return;
    }
    const pick = this.scene?.pick(event.clientX, event.clientY);
    this.select(pick ? { partIndex: pick.partIndex, face: pick.face } : null);
  }

  private select(selection: Selection | null) {
    this.selection.set(selection);
    this.scene?.highlight(selection?.partIndex ?? null, selection?.face ?? null);
  }
}
