import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import {
  LucideChevronLeft,
  LucideDownload,
  LucideFlag,
  LucideHash,
  LucideMinus,
  LucidePlus,
  LucideTrash,
  LucideVariable,
} from "@lucide/angular";
import { downloadFile } from "../game/shared/util/ts-source";
import {
  clampCounter,
  GameVariable,
  newVariable,
  VariableKind,
} from "./shared/variables";
import { loadVariables, saveVariables } from "./shared/variable-storage";

const KIND_LABELS: Record<VariableKind, string> = {
  flag: "Drapeau",
  counter: "Compteur",
};

/**
 * Variables editor: the story's flags (yes / no) and counters, with their starting value. Saved in the browser at
 * every change; Exporter writes them as the game's file (src/assets/variables/variables.ts) for the repository.
 */
@Component({
  selector: "app-variables-editor",
  imports: [
    LucideChevronLeft,
    LucideDownload,
    LucideFlag,
    LucideHash,
    LucideMinus,
    LucidePlus,
    LucideTrash,
    LucideVariable,
  ],
  templateUrl: "./variables-editor.component.html",
  styleUrl: "./variables-editor.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariablesEditorComponent {
  /** Opened over the game (Jeu closes the panel instead of going to the game's page). */
  readonly embedded = input(false);
  readonly closed = output<void>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly kindLabels = KIND_LABELS;
  protected readonly kinds: VariableKind[] = ["flag", "counter"];
  protected readonly variables = signal<GameVariable[]>(loadVariables());
  protected readonly saveFailed = signal(false);
  protected readonly message = signal("");
  /** The variable whose Supprimer was pressed once (pressed again within 3 s: deleted). */
  protected readonly deleting = signal<string | null>(null);
  private deleteTimer?: ReturnType<typeof setTimeout>;

  protected readonly countLabel = computed(() => {
    const n = this.variables().length;
    return n ? `${n} variable${n > 1 ? "s" : ""}` : "Aucune variable";
  });
  /** Ids of the variables whose name another one already has (or is empty). */
  protected readonly badNames = computed(() => {
    const seen = new Map<string, number>();
    this.variables().forEach((v) =>
      seen.set(norm(v.name), (seen.get(norm(v.name)) ?? 0) + 1)
    );
    return new Set(
      this.variables()
        .filter((v) => !norm(v.name) || seen.get(norm(v.name))! > 1)
        .map((v) => v.id)
    );
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.deleteTimer));
  }

  protected backToGame(event: Event): void {
    event.preventDefault();
    if (this.embedded()) {
      this.closed.emit();
    } else {
      location.hash = "#/";
    }
  }

  protected add(kind: VariableKind): void {
    const base = kind === "flag" ? "Nouveau drapeau" : "Nouveau compteur";
    const names = new Set(this.variables().map((v) => norm(v.name)));
    let name = base;
    for (let i = 2; names.has(norm(name)); i++) {
      name = `${base} ${i}`;
    }
    const variable = newVariable(kind, name);
    this.commit([...this.variables(), variable]);
    // The new name, ready to be typed over
    setTimeout(() => {
      const field = this.host.nativeElement.querySelector<HTMLInputElement>(
        `[data-name="${variable.id}"]`
      );
      field?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      field?.focus();
      field?.select();
    });
  }

  protected rename(id: string, name: string): void {
    this.change(id, (v) => ({ ...v, name }));
  }

  protected setNote(id: string, note: string): void {
    this.change(id, (v) => {
      const next = { ...v, note: note.trim() ? note : undefined };
      if (!next.note) {
        delete next.note;
      }
      return next;
    });
  }

  /** Flag ↔ counter: the starting value goes back to non / 0. */
  protected setKind(id: string, kind: VariableKind): void {
    this.change(id, (v): GameVariable => {
      if (v.kind === kind) {
        return v;
      }
      const base = { id: v.id, name: v.name, note: v.note };
      return kind === "flag"
        ? { ...base, kind, initial: false }
        : { ...base, kind, initial: 0 };
    });
  }

  protected setFlag(id: string, initial: boolean): void {
    this.change(id, (v) => (v.kind === "flag" ? { ...v, initial } : v));
  }

  protected setCounter(id: string, initial: number): void {
    this.change(id, (v) =>
      v.kind === "counter" ? { ...v, initial: clampCounter(initial) } : v
    );
  }

  protected remove(id: string): void {
    clearTimeout(this.deleteTimer);
    if (this.deleting() !== id) {
      this.deleting.set(id);
      this.deleteTimer = setTimeout(() => this.deleting.set(null), 3000);
      return;
    }
    this.deleting.set(null);
    this.commit(this.variables().filter((v) => v.id !== id));
  }

  /** The variables as the game's file (src/assets/variables/variables.ts) for the repository. */
  protected exportVariables(): void {
    const variables = this.variables();
    const source = `import { GameVariable } from '../../app/modules/variables-editor/shared/variables';

/**
 * Variables of the game (story flags and counters). Written by the variables editor's export (editor → Éditeurs →
 * Variables → Exporter); the variables saved in the browser replace these ones.
 */
export const CODE_VARIABLES: GameVariable[] = ${JSON.stringify(variables, null, 2)};
`;
    downloadFile("variables.ts", source);
    this.message.set(
      `variables.ts téléchargé (${this.countLabel().toLowerCase()}) : à mettre dans src/assets/variables/.`
    );
  }

  private change(id: string, edit: (v: GameVariable) => GameVariable): void {
    this.commit(this.variables().map((v) => (v.id === id ? edit(v) : v)));
  }

  private commit(variables: GameVariable[]): void {
    this.variables.set(variables);
    this.saveFailed.set(!saveVariables(variables));
    this.message.set("");
  }
}

function norm(name: string): string {
  return name.trim().toLocaleLowerCase("fr-FR");
}
