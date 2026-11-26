import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from "@angular/core";
import {
  LucideCheck,
  LucideChevronRight,
  LucideClapperboard,
  LucideCopy,
  LucideFastForward,
  LucideMapPin,
  LucidePlus,
  LucideTrash,
  LucideX,
} from "@lucide/angular";
import { Cutscene, cutsceneLength } from "../../shared/model/cutscene";
import { CutsceneEditorStore } from "../cutscene-editor.store";
import { shortSeconds } from "../cutscene-labels";

/**
 * « Cinématiques de la carte »: the map's cutscenes (one opened), a new one, and the open one's name, copy,
 * removal, options and the events that play it.
 */
@Component({
  selector: "cutscene-list-sheet",
  imports: [
    LucideCheck,
    LucideChevronRight,
    LucideClapperboard,
    LucideCopy,
    LucideFastForward,
    LucideMapPin,
    LucidePlus,
    LucideTrash,
    LucideX,
  ],
  templateUrl: "./cutscene-list-sheet.component.html",
  styleUrl: "./cutscene-list-sheet.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CutsceneListSheetComponent {
  protected readonly store = inject(CutsceneEditorStore);
  protected readonly cut = this.store.cut;
  /** « Supprimer » touched once: asks again. */
  protected readonly confirming = signal(false);

  protected readonly uses = computed(() => {
    const id = this.cut()?.id;
    return this.store.uses().filter((u) => u.cutscene === id);
  });

  protected readonly count = computed(() => {
    const n = this.store.cutscenes().length;
    if (n === 0) {
      return "aucune cinématique";
    }
    return n === 1 ? "1 cinématique" : `${n} cinématiques`;
  });

  protected details(cut: Cutscene): string {
    const length = shortSeconds(cutsceneLength(cut));
    return cut.once ? `${length} · une seule fois` : length;
  }

  protected open(id: string): void {
    this.confirming.set(false);
    if (id === this.store.currentId()) {
      this.store.sheet.set(null);
      return;
    }
    this.store.open(id);
  }

  protected rename(ev: Event): void {
    const name = (ev.target as HTMLInputElement).value.trim();
    if (name && name !== this.cut()?.name) {
      this.store.setOptions({ name });
    }
  }

  protected remove(): void {
    const cut = this.cut();
    if (!cut) {
      return;
    }
    if (!this.confirming()) {
      this.confirming.set(true);
      return;
    }
    this.confirming.set(false);
    this.store.remove(cut.id);
  }
}
