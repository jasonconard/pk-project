import { LucideInfo, LucidePlus, LucideX } from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import {
  DbItem,
  EquipSlot,
  ItemKind,
  ResistLevel,
  STATS,
  SkillTarget,
  SkillUse,
  withItemKind,
} from "../../shared/database";
import { DbSheet } from "../../shared/db-sheet";
import { StepperComponent } from "../../stepper/stepper.component";
import { EffectsEditorComponent } from "../../effects-editor/effects-editor.component";
import { LearnSelectComponent } from "../../learn-select/learn-select.component";

/** The sheet of a row of the « item » table. */
@Component({
  selector: "db-item-sheet",
  imports: [
    StepperComponent,
    EffectsEditorComponent,
    LearnSelectComponent,
    LucideInfo,
    LucidePlus,
    LucideX,
  ],
  templateUrl: "./item-sheet.component.html",
  styleUrl: "./item-sheet.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemSheetComponent extends DbSheet {
  readonly item = input.required<DbItem>();

  protected readonly teamCharacters = computed(() => this.db().characters);

  protected setItemKind(item: DbItem, kind: ItemKind): void {
    this.edit(item.id, (i) => withItemKind(i as DbItem, kind));
  }

  protected setItem(item: DbItem, change: Partial<DbItem>): void {
    this.edit(item.id, (i) => {
      const next = { ...i, ...change } as DbItem;
      for (const key of ["weapon", "attackElement"] as const) {
        if (!next[key]) {
          delete next[key];
        }
      }
      return next;
    });
  }

  protected setSlot(item: DbItem, slot: EquipSlot): void {
    this.edit(item.id, (i) => {
      const next = { ...i, slot } as DbItem;
      if (slot !== "weapon") {
        delete next.weapon;
        delete next.attackElement;
      }
      return next;
    });
  }

  protected setItemUse(item: DbItem, use: string): void {
    this.setItem(item, { use: use as SkillUse });
  }

  protected setItemTarget(item: DbItem, target: string): void {
    this.setItem(item, { target: target as SkillTarget });
  }

  /** Equipment lists: stat bonuses, resistances, faster growth. */
  protected addTo(item: DbItem, list: "bonuses" | "resists" | "growth"): void {
    const db = this.db();
    const used = new Set(
      (item[list] ?? []).map((e) => {
        if ("stat" in e) {
          return e.stat;
        }
        return "element" in e ? e.element : e.id;
      })
    );
    const values = {
      bonuses: () => ({
        stat: STATS.find((st) => !used.has(st.id))?.id ?? "str",
        amount: 5,
      }),
      resists: () => ({
        element: db.elements.find((e) => !used.has(e.id))?.id ?? "",
        level: "resist" as ResistLevel,
      }),
      growth: () => ({
        id: this.learnChoices().find((c) => !used.has(c.id))?.id ?? "",
        percent: 50,
      }),
    };
    const value = values[list]();
    this.edit(item.id, (i) => ({
      ...i,
      [list]: [...((i as DbItem)[list] ?? []), value],
    }));
  }

  protected setIn(
    item: DbItem,
    list: "bonuses" | "resists" | "growth",
    index: number,
    change: Record<string, unknown>
  ): void {
    this.edit(item.id, (i) => ({
      ...i,
      [list]: ((i as DbItem)[list] ?? []).map((e, k) =>
        k === index ? { ...e, ...change } : e
      ),
    }));
  }

  protected removeFrom(
    item: DbItem,
    list: "bonuses" | "resists" | "growth",
    index: number
  ): void {
    this.edit(item.id, (i) => ({
      ...i,
      [list]: ((i as DbItem)[list] ?? []).filter((_, k) => k !== index),
    }));
  }

  protected toggleWearer(item: DbItem, chId: string): void {
    this.edit(item.id, (i) => {
      const wearers = (i as DbItem).wearers ?? [];
      const next = {
        ...i,
        wearers: wearers.includes(chId)
          ? wearers.filter((w) => w !== chId)
          : [...wearers, chId],
      } as DbItem;
      if (next.wearers!.length === 0) {
        delete next.wearers;
      }
      return next;
    });
  }
}
