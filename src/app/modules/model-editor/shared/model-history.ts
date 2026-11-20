import { EditableModel } from "./EditableModel";

/** Steps kept for undo. */
const MAX_STEPS = 60;

/** Undo / redo: a copy of the model is kept before each change (a paint stroke, a move, a new size…). */
export class ModelHistory {
  private past: EditableModel[] = [];
  private future: EditableModel[] = [];

  get canUndo(): boolean {
    return this.past.length > 0;
  }

  get canRedo(): boolean {
    return this.future.length > 0;
  }

  /** To call before changing the model. */
  record(model: EditableModel) {
    this.past.push(structuredClone(model));
    if (this.past.length > MAX_STEPS) {
      this.past.shift();
    }
    this.future = [];
  }

  /** The model before the last change (null: nothing to undo). */
  undo(current: EditableModel): EditableModel | null {
    const previous = this.past.pop();
    if (!previous) {
      return null;
    }
    this.future.push(structuredClone(current));
    return previous;
  }

  redo(current: EditableModel): EditableModel | null {
    const next = this.future.pop();
    if (!next) {
      return null;
    }
    this.past.push(structuredClone(current));
    return next;
  }

  /** Forgets the last change and gives the model before it (a stroke cancelled), without a redo step. */
  drop(): EditableModel | null {
    return this.past.pop() ?? null;
  }

  clear() {
    this.past = [];
    this.future = [];
  }
}
