import {
  LucideArrowLeft,
  LucideCheck,
  LucideChevronRight,
  LucideCircleOff,
  LucidePackage,
  LucidePlus,
  LucideUsers,
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
import { EquipSlot } from "../../database-editor/shared/database";
import { loadDatabase } from "../../database-editor/shared/database-storage";
import { equip } from "../../database-editor/shared/party";
import { teamMembers } from "../shared/model/bag";
import {
  EquipChoice,
  equipChoices,
  itemBrings,
  memberCard,
  memberSheet,
} from "../shared/model/team";
import { playSound } from "../shared/services/sfx";

/**
 * Menu → Équipe (design/main-view.pen, Menu Équipe): the team's members (level, PV / PM, experience, what they
 * wear); a member's sheet (stats, equipment, levels in elements and weapon types, skills known); a slot touched
 * lists what the bag holds for it, with what each item changes. Closed by the ✕, the backdrop or Escape.
 */
@Component({
  selector: "game-team",
  imports: [
    LucideArrowLeft,
    LucideCheck,
    LucideChevronRight,
    LucideCircleOff,
    LucidePackage,
    LucidePlus,
    LucideUsers,
    LucideX,
  ],
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss", "./team.sheet.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent {
  readonly closed = output<void>();

  private readonly db = loadDatabase();
  /** The member whose sheet is shown (its id; none: the team). */
  protected readonly member = signal<string | null>(null);
  /** The slot being changed on that member. */
  protected readonly slot = signal<EquipSlot | null>(null);
  /** The item touched in the slot's list (its id, "" for « take off »). */
  protected readonly picked = signal<string | null>(null);
  /** Changes after each change of equipment (the bag and the team are read again). */
  private readonly version = signal(0);
  protected readonly notice = signal("");

  protected readonly cards = computed(() => {
    this.version();
    return teamMembers(this.db).map((c) => memberCard(c, this.db));
  });
  protected readonly card = computed(() =>
    this.cards().find((m) => m.c.id === this.member())
  );
  protected readonly sheet = computed(() => {
    this.version();
    const card = this.card();
    return card ? memberSheet(card.c, this.db) : null;
  });
  /** The slot being changed, as the member wears it. */
  protected readonly worn = computed(() =>
    this.card()?.slots.find((s) => s.slot === this.slot())
  );
  protected readonly choices = computed(() => {
    this.version();
    const card = this.card();
    const slot = this.slot();
    return card && slot ? equipChoices(card.c, slot, this.db) : [];
  });

  constructor() {
    inject(EscapeService).whileAlive(() => this.closed.emit());
  }

  protected open(id: string): void {
    this.member.set(id);
    this.slot.set(null);
    this.notice.set("");
  }

  protected openSlot(slot: EquipSlot): void {
    this.slot.set(slot);
    this.picked.set(null);
    this.notice.set("");
  }

  /** One step back: the slot's list → the sheet → the team. */
  protected back(): void {
    if (this.slot()) {
      this.slot.set(null);
    } else {
      this.member.set(null);
    }
  }

  protected pick(choice: EquipChoice): void {
    const id = choice.item?.id ?? "";
    this.picked.set(this.picked() === id ? null : id);
  }

  protected brings(choice: EquipChoice): string {
    return choice.item ? itemBrings(choice.item, this.db) : "";
  }

  /** Wears the item (none: takes off what is worn), then back to the sheet. */
  protected wear(choice: EquipChoice): void {
    const card = this.card();
    const slot = this.slot();
    if (!card || !slot || !equip(card.c, slot, choice.item?.id ?? null)) {
      playSound("error");
      this.notice.set(
        "Le sac est plein de cet objet : impossible de l'y ranger."
      );
      return;
    }
    playSound("item");
    this.version.update((v) => v + 1);
    this.notice.set(
      choice.item
        ? `${card.c.name} porte ${choice.item.name}`
        : `${this.worn()?.label ?? "Objet"} retiré`
    );
    this.slot.set(null);
  }

  protected signed(n: number): string {
    return n < 0 ? `−${-n}` : `+${n}`;
  }
}
