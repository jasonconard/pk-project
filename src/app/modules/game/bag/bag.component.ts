import {
  LucideArrowLeft,
  LucideBackpack,
  LucideCoins,
  LucideFlaskConical,
  LucideGift,
  LucideHandHeart,
  LucideKeyRound,
  LucideMinus,
  LucidePackage,
  LucidePlus,
  LucideShield,
  LucideTrash,
  LucideX,
} from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
  signal,
} from "@angular/core";
import { EscapeService } from "../../../core/shared/service/escape.service";
import { DbItem, ItemKind } from "../../database-editor/shared/database";
import { loadDatabase } from "../../database-editor/shared/database-storage";
import {
  currentParty,
  memberProgress,
} from "../../database-editor/shared/party";
import {
  bagCount,
  bagLines,
  canDrop,
  dropItem,
  fieldUsable,
  onWholeTeam,
  previewUse,
  teamMembers,
  useItem,
} from "../shared/model/bag";
import { playSound } from "../shared/services/sfx";

/** Why an item has no « Utiliser » button, said under its buttons. */
function useHint(item: DbItem): string {
  if (item.kind === "equipment") {
    return "S'équipe depuis le menu Équipe.";
  }
  if (item.kind === "gift") {
    return "S'offre à un habitant avec l'action Offrir.";
  }
  if (item.kind === "key") {
    return "Objet clé : il ne se jette pas.";
  }
  return item.use === "fight"
    ? "Ne s'utilise qu'en combat."
    : "S'utilise sur la carte, pas depuis le sac.";
}

/**
 * Menu → Sac (design/main-view.pen, Sac): the items carried, in four tabs by kind. Touching an item opens it: Utiliser
 * (a consumable that heals or makes one grow, outside a fight: the member is chosen, its bars show what it would
 * gain) and Jeter (how many; never a key item). Closed by the ✕, the backdrop or Escape.
 */
@Component({
  selector: "game-bag",
  imports: [
    LucideArrowLeft,
    LucideBackpack,
    LucideCoins,
    LucideFlaskConical,
    LucideGift,
    LucideHandHeart,
    LucideKeyRound,
    LucideMinus,
    LucidePackage,
    LucidePlus,
    LucideShield,
    LucideTrash,
    LucideX,
  ],
  templateUrl: "./bag.component.html",
  styleUrl: "./bag.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BagComponent {
  readonly closed = output<void>();

  private readonly db = loadDatabase();
  protected readonly tabs: { id: ItemKind; label: string }[] = [
    { id: "consumable", label: "Objets" },
    { id: "equipment", label: "Équip." },
    { id: "key", label: "Clés" },
    { id: "gift", label: "Cadeaux" },
  ];
  protected readonly tab = signal<ItemKind>("consumable");
  /** The item touched (its id). */
  protected readonly selected = signal<string | null>(null);
  /** Throwing the touched item away: how many. */
  protected readonly dropping = signal(false);
  protected readonly count = signal(1);
  /** Using this item: the member choice is shown instead of the list. */
  protected readonly using = signal<DbItem | null>(null);
  /** The member chosen for it (its id). */
  protected readonly target = signal<string | null>(null);
  /** Changes after each use or throw (the bag and the team are read again). */
  private readonly version = signal(0);
  protected readonly notice = signal("");

  protected readonly money = computed(() => {
    this.version();
    return currentParty().money;
  });
  protected readonly total = computed(() => {
    this.version();
    return bagCount();
  });
  protected readonly lines = computed(() => {
    this.version();
    return bagLines(this.db, this.tab()).map(({ item, count }) => ({
      item,
      count,
      usable: fieldUsable(item),
      droppable: canDrop(item),
      hint: fieldUsable(item) ? "" : useHint(item),
    }));
  });
  /** How many of the item being used are left. */
  protected readonly left = computed(() => {
    this.version();
    return currentParty().items[this.using()?.id ?? ""] ?? 0;
  });
  /** The team for the item being used: each member's bars before and after, and whether it needs it. */
  protected readonly members = computed(() => {
    this.version();
    const item = this.using();
    if (!item) {
      return [];
    }
    return teamMembers(this.db).map((c) => ({
      c,
      level: memberProgress(c).level,
      preview: previewUse(item, c, this.db),
    }));
  });
  protected readonly whole = computed(() => {
    const item = this.using();
    return !!item && onWholeTeam(item);
  });
  /** The members the item would be used on now (the chosen one, or the whole team), those it is useful to. */
  protected readonly aimed = computed(() =>
    this.members().filter(
      (m) => m.preview.useful && (this.whole() || m.c.id === this.target())
    )
  );

  constructor() {
    inject(EscapeService).whileAlive(() => this.closed.emit());
    // (Escape while choosing a member closes the bag too: the ← button goes back to the list)
  }

  protected setTab(tab: ItemKind): void {
    this.tab.set(tab);
    this.selected.set(null);
    this.dropping.set(false);
    this.notice.set("");
  }

  protected select(id: string): void {
    this.selected.set(this.selected() === id ? null : id);
    this.dropping.set(false);
    this.count.set(1);
    this.notice.set("");
  }

  protected step(delta: number, max: number): void {
    this.count.update((n) => Math.min(max, Math.max(1, n + delta)));
  }

  protected drop(item: DbItem, max: number): void {
    const count = Math.min(this.count(), max);
    dropItem(item, count);
    playSound("bip");
    this.notice.set(`Jeté : ${item.name} ×${count}`);
    this.dropping.set(false);
    this.count.set(1);
    this.version.update((v) => v + 1);
    if (!this.lines().some((l) => l.item.id === item.id)) {
      this.selected.set(null);
    }
  }

  /** Opens the member choice for an item, the first member who needs it chosen. */
  protected startUse(item: DbItem): void {
    this.using.set(item);
    this.notice.set("");
    this.target.set(this.members().find((m) => m.preview.useful)?.c.id ?? null);
  }

  protected leaveUse(): void {
    this.using.set(null);
  }

  protected use(): void {
    const item = this.using();
    const targets = this.aimed().map((m) => m.c);
    const told = item ? useItem(item, targets, this.db) : "";
    if (!item || !told) {
      playSound("error");
      return;
    }
    playSound("heal");
    this.notice.set(told);
    this.version.update((v) => v + 1);
    if (this.left() < 1) {
      this.using.set(null);
      this.selected.set(null);
      return;
    }
    if (this.aimed().length === 0) {
      this.target.set(
        this.members().find((m) => m.preview.useful)?.c.id ?? null
      );
    }
  }

  /** The bar's filled part, in %. */
  protected percent(value: number, max: number): number {
    return max > 0 ? Math.min(100, (100 * value) / max) : 0;
  }
}
