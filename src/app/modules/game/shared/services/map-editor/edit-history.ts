/** A change of the map, undone / redone as a whole. */
export interface EditAction {
  undo(): void;
  redo(): void;
}

/** Max undo steps kept. */
const HISTORY_SIZE = 100;

/** The map editor's undo / redo steps. */
export class EditHistory {
  private readonly undoStack: EditAction[] = [];
  private readonly redoStack: EditAction[] = [];

  get canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  get canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  /** Nothing edited yet (just opened the editor, or the map changed). */
  get empty(): boolean {
    return !this.canUndo && !this.canRedo;
  }

  /** Keeps a change that was just done (a new change forgets the undone ones). */
  record(action: EditAction): void {
    this.undoStack.push(action);
    if (this.undoStack.length > HISTORY_SIZE) {
      this.undoStack.shift();
    }
    this.redoStack.length = 0;
  }

  /** @returns false when there was nothing to undo */
  undo(): boolean {
    const action = this.undoStack.pop();
    if (!action) {
      return false;
    }
    action.undo();
    this.redoStack.push(action);
    return true;
  }

  /** @returns false when there was nothing to redo */
  redo(): boolean {
    const action = this.redoStack.pop();
    if (!action) {
      return false;
    }
    action.redo();
    this.undoStack.push(action);
    return true;
  }

  clear(): void {
    this.undoStack.length = 0;
    this.redoStack.length = 0;
  }
}
