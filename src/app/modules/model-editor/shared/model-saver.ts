import { EditableModel } from "./EditableModel";
import { saveStoredModel } from "./model-storage";

/** Delay before the model is saved in the browser after a change (ms: a burst of changes is saved once). */
const SAVE_DELAY = 400;

/**
 * Saving the edited model in the browser (IndexedDB): a little after each change, one save after the other, under
 * its id (a rename moves it).
 */
export class ModelSaver {
  /** Id the model is saved under in the browser (null: not saved yet). */
  storedAs: string | null = null;
  private timer: ReturnType<typeof setTimeout> | null = null;
  /** Saves one after the other (IndexedDB is asynchronous). */
  private saving: Promise<void> = Promise.resolve();

  /**
   * @param current the model to save
   * @param saved called after each save (false: the browser refused it)
   */
  constructor(
    private readonly current: () => EditableModel | null,
    private readonly saved: (ok: boolean) => Promise<void>
  ) {}

  /** A change: saved a little later. */
  schedule(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => this.save(), SAVE_DELAY);
  }

  /** Saves now a change waiting to be saved; resolves when everything is written. */
  flush(): Promise<void> {
    if (this.timer) {
      this.save();
    }
    return this.saving;
  }

  save(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    const model = this.current();
    if (!model) {
      return;
    }
    const previousId = this.storedAs ?? undefined;
    this.storedAs = model.id;
    this.saving = this.saving.then(async () =>
      this.saved(await saveStoredModel(model, previousId))
    );
  }
}
