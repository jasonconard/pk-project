import { LucideHeart, LucideInfo, LucideX } from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import {
  CharacterLink,
  DbCharacter,
  DbNpc,
  GIFT_POINTS,
  LINK_PACES,
  LinkBonus,
  LinkBonusKind,
  LinkPace,
  linkStep,
  newCharacterLink,
  newNpcLink,
  NpcLink,
} from "../shared/database";
import { DbSheet } from "../shared/db-sheet";

/**
 * A social link's sheet part (design/database.pen, 15 · Personnage · Lien, 16 · PNJ · Lien): its pace, and for each
 * level the combat bonuses (a team member: stats in %, a skill, element or weapon experience) or the advantage (an
 * NPC), and the gifts an NPC likes or not.
 */
@Component({
  selector: "db-link-field",
  imports: [LucideHeart, LucideInfo, LucideX],
  templateUrl: "./link-field.component.html",
  styleUrl: "./link-field.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkFieldComponent extends DbSheet {
  readonly target = input.required<DbCharacter | DbNpc>();

  protected readonly paces = LINK_PACES;
  protected readonly giftPoints = GIFT_POINTS;
  /** A team member (bonuses), else an NPC (advantages, gifts). */
  protected readonly member = computed(() => "levelStart" in this.target());
  protected readonly characterLink = computed(
    () => (this.target() as DbCharacter).link ?? newCharacterLink()
  );
  protected readonly npcLink = computed(
    () => (this.target() as DbNpc).link ?? newNpcLink()
  );
  protected readonly pace = computed(
    () => this.target().link?.pace ?? "normal"
  );
  protected readonly steps = computed(() =>
    Array.from({ length: 10 }, (_, l) => linkStep(l, this.pace())).join(", ")
  );
  /** What experience can be given: the simple elements and the weapon types. */
  protected readonly growths = computed(() => [
    ...this.db()
      .elements.filter((e) => !e.physical && !e.parts)
      .map((e) => ({ id: e.id, name: e.name })),
    ...this.db().weapons.map((w) => ({ id: w.id, name: w.name })),
  ]);
  /** The items offered as gifts (the « Cadeau » ones first). */
  protected readonly giftItems = computed(() =>
    [...this.db().items].sort(
      (a, b) => Number(b.kind === "gift") - Number(a.kind === "gift")
    )
  );

  private setLink(link: CharacterLink | NpcLink): void {
    this.edit(this.target().id, (row) => ({ ...row, link }) as typeof row);
  }

  protected setPace(pace: LinkPace): void {
    this.setLink(
      this.member()
        ? { ...this.characterLink(), pace }
        : { ...this.npcLink(), pace }
    );
  }

  // --- A team member's bonuses ---

  private setBonuses(level: number, bonuses: LinkBonus[]): void {
    const link = structuredClone(this.characterLink());
    link.levels[level] = bonuses;
    this.setLink(link);
  }

  protected addBonus(level: number, kind: string): void {
    const db = this.db();
    let bonus: LinkBonus | null = null;
    if (kind === "stat") {
      bonus = { kind, stat: "str", percent: 2 };
    } else if (kind === "skill" && db.skills[0]) {
      bonus = { kind, skill: db.skills[0].id };
    } else if (kind === "growth" && this.growths()[0]) {
      bonus = { kind, id: this.growths()[0].id, points: 20 };
    }
    if (bonus) {
      this.setBonuses(level, [...this.characterLink().levels[level], bonus]);
    }
  }

  protected setBonus(
    level: number,
    index: number,
    patch: Partial<Record<string, string | number>>
  ): void {
    const bonuses = this.characterLink().levels[level].map((b, i) =>
      i === index ? ({ ...b, ...patch } as LinkBonus) : b
    );
    this.setBonuses(level, bonuses);
  }

  protected removeBonus(level: number, index: number): void {
    this.setBonuses(
      level,
      this.characterLink().levels[level].filter((_, i) => i !== index)
    );
  }

  protected bonusKind(bonus: LinkBonus): LinkBonusKind {
    return bonus.kind;
  }

  protected number(raw: string, min: number, max: number): number {
    const n = Math.round(Number(raw));
    return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min;
  }

  // --- An NPC's advantages and gifts ---

  protected setAdvantage(level: number, text: string): void {
    const link = structuredClone(this.npcLink());
    link.levels[level] = text.trim();
    this.setLink(link);
  }

  protected addGift(list: "liked" | "disliked", item: string): void {
    if (!item) {
      return;
    }
    const link = structuredClone(this.npcLink());
    const other = list === "liked" ? "disliked" : "liked";
    link[other] = link[other].filter((i) => i !== item);
    if (!link[list].includes(item)) {
      link[list].push(item);
    }
    this.setLink(link);
  }

  protected removeGift(list: "liked" | "disliked", item: string): void {
    const link = structuredClone(this.npcLink());
    link[list] = link[list].filter((i) => i !== item);
    this.setLink(link);
  }

  protected itemName(id: string): string {
    return this.db().items.find((i) => i.id === id)?.name ?? "?";
  }
}
