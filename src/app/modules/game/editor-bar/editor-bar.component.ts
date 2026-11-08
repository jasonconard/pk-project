import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, output, signal } from '@angular/core';
import { loadModelThumb, MODEL_CHOICES } from '../shared/model/ModelChoice';
import { TERRAINS, TILESET_LINK, TILESET_SIZE, tilesetPos } from '../shared/model/Terrain';
import { EditCommand, EditSelection } from '../shared/services/map-editor.service';

/** Keyboard shortcut opening / closing the map editor (free key: the game uses z q s d a e r f p o). */
const EDIT_KEY = 'b';
/** Time to confirm the reset (ms). */
const RESET_CONFIRM_TIME = 3000;

/** French names of the models in the palette. */
const MODEL_LABELS: Record<string, string> = {
  labo: 'Labo', house: 'Maison', tree: 'Arbre', flowers: 'Fleurs', barrier: 'Barrière',
  pannel: 'Panneau', 'wood-pannel': 'Pancarte', 'letter-box': 'Boîte aux lettres', rock: 'Rocher',
};

interface PaletteEntry {
  id: string;
  label: string;
}

/**
 * Map editor UI: a switch button (top left, B shortcut), undo / redo, the selected object's panel, the hint of
 * the controls, and the models palette (bottom). Shortcuts while editing: Escape (put the model back / deselect),
 * Delete (remove the selection), Ctrl+Z / Ctrl+Y (undo / redo).
 */
@Component({
  selector: 'game-editor-bar',
  templateUrl: './editor-bar.component.html',
  styleUrl: './editor-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorBarComponent {
  readonly editMode = input(false);
  readonly modelId = input<string | null>(null);
  readonly tileId = input<string | null>(null);
  readonly selection = input<EditSelection | null>(null);
  readonly canUndo = input(false);
  readonly canRedo = input(false);
  readonly toggled = output<void>();
  readonly modelSelected = output<string | null>();
  readonly tileSelected = output<string | null>();
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
  protected readonly thumbs = signal<Record<string, string>>({});
  /** Reset asks to click a second time (within RESET_CONFIRM_TIME) before forgetting the edits. */
  protected readonly confirmReset = signal(false);
  private resetTimer?: ReturnType<typeof setTimeout>;
  protected readonly selectionLabel = computed(() => {
    const selection = this.selection();
    return selection ? this.label(selection.modelId) : '';
  });

  constructor() {
    const onKeyDown = (ev: KeyboardEvent) => this.onKeyDown(ev);
    window.addEventListener('keydown', onKeyDown, true);
    inject(DestroyRef).onDestroy(() => window.removeEventListener('keydown', onKeyDown, true));
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

  protected send(command: EditCommand, event: Event): void {
    (event.currentTarget as HTMLElement).blur();
    this.command.emit(command);
  }

  protected reset(event: Event): void {
    if (!this.confirmReset()) {
      this.confirmReset.set(true);
      this.resetTimer = setTimeout(() => this.confirmReset.set(false), RESET_CONFIRM_TIME);
      return;
    }
    clearTimeout(this.resetTimer);
    this.confirmReset.set(false);
    this.send('reset', event);
  }

  private label(modelId: string): string {
    return MODEL_LABELS[modelId] ?? modelId;
  }

  private onKeyDown(ev: KeyboardEvent): void {
    const typing = ev.target instanceof HTMLInputElement || ev.target instanceof HTMLTextAreaElement;
    if (typing || ev.altKey) {
      return;
    }
    const key = ev.key.toLowerCase();
    const ctrl = ev.ctrlKey || ev.metaKey;
    let handled = true;
    if (key === EDIT_KEY && !ctrl) {
      if (!ev.repeat) {
        this.toggled.emit();
      }
    } else if (!this.editMode()) {
      handled = false;
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
