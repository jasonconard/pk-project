import {
  LucideInfo,
  LucidePackage,
  LucidePlus,
  LucideTrash,
} from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from "@angular/core";
import { EscapeService } from "../../../../core/shared/service/escape.service";
import {
  DbShop,
  DbShopItem,
  LINK_MAX,
  SHOP_LIMITS,
} from "../../shared/database";
import { DbSheet } from "../../shared/db-sheet";
import { StepperComponent } from "../../stepper/stepper.component";
import { EventConditionsComponent } from "../../../game/event-editor/event-conditions/event-conditions.component";
import {
  countConditions,
  EventEditorData,
} from "../../../game/event-editor/event-editor-data";
import { EventConditions } from "../../../game/shared/model/ObjectEvent";
import { basePrice } from "../../../game/shared/model/shop";

/**
 * The sheet of a shop (design/database.pen, 18 · Boutique): its shopkeeper (an NPC), how much it buys back, the link's
 * discount, the items sold. Touching an item opens its window (19 · Un objet): its own price, the stock of each day,
 * when it is on sale (the events' conditions), from which link level.
 */
@Component({
  selector: "db-shop-sheet",
  imports: [
    StepperComponent,
    EventConditionsComponent,
    LucideInfo,
    LucidePackage,
    LucidePlus,
    LucideTrash,
  ],
  templateUrl: "./shop-sheet.component.html",
  styleUrl: "./shop-sheet.component.scss",
  providers: [EventEditorData],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopSheetComponent extends DbSheet {
  readonly shop = input.required<DbShop>();

  protected readonly limits = SHOP_LIMITS;
  protected readonly linkMax = LINK_MAX;
  private readonly escape = inject(EscapeService);

  /** The item whose window is open (its index in the list). */
  protected readonly open = signal<number | null>(null);

  protected readonly keeper = computed(() =>
    this.db().npcs.find((n) => n.id === this.shop().keeper)
  );

  /** The items that can be added: all but the key items. */
  protected readonly addable = computed(() =>
    this.db().items.filter((i) => i.kind !== "key")
  );

  /** The open item's line and its database item. */
  protected readonly current = computed(() => {
    const index = this.open();
    const entry = index === null ? undefined : this.shop().items[index];
    const item = entry && this.db().items.find((i) => i.id === entry.item);
    return entry && item ? { index: index!, entry, item } : null;
  });

  constructor() {
    super();
    this.escape.track(
      () => this.open() !== null,
      () => this.open.set(null)
    );
  }

  private change(edit: (shop: DbShop) => DbShop): void {
    this.edit(this.shop().id, (row) => edit(row as DbShop));
  }

  protected setKeeper(id: string): void {
    this.change((sh) => {
      const next: DbShop = { ...sh, keeper: id };
      if (!id) {
        delete next.keeper;
      }
      return next;
    });
  }

  protected set(field: "buyback" | "discount", value: number): void {
    this.change((sh) => ({ ...sh, [field]: value }));
  }

  /** The example under the settings: the discount at level 3. */
  protected readonly example = computed(() => {
    const sh = this.shop();
    const name = this.keeper()?.name;
    if (!name || sh.discount === 0) {
      return "";
    }
    return `Au niveau 3 du lien avec ${name}, tout coûte ${Math.min(90, sh.discount * 3)} % moins cher ici.`;
  });

  // --- Items ---

  protected itemOf(entry: DbShopItem) {
    return this.db().items.find((i) => i.id === entry.item);
  }

  protected priceOf(entry: DbShopItem): number {
    const item = this.itemOf(entry);
    return item ? basePrice(entry, item) : 0;
  }

  /** « Soir, Nuit », « 2 conditions » (empty: always). */
  protected whenLabel(entry: DbShopItem): string {
    const c = entry.conditions;
    if (!c) {
      return "";
    }
    const count = countConditions(c);
    if (count === 1 && c.moments?.length) {
      return this.dayTimes
        .filter((t) => c.moments!.includes(t.id))
        .map((t) => t.label)
        .join(" · ");
    }
    return count > 0 ? `${count} condition${count > 1 ? "s" : ""}` : "";
  }

  protected addItem(id: string): void {
    const item = this.db().items.find((i) => i.id === id);
    if (!item) {
      return;
    }
    // (an item without a price gets one here: it can't be given away)
    const entry: DbShopItem =
      item.price > 0 ? { item: id } : { item: id, price: 10 };
    this.change((sh) => ({ ...sh, items: [...sh.items, entry] }));
    this.open.set(this.shop().items.length - 1);
  }

  protected setItem(index: number, patch: Partial<DbShopItem>): void {
    this.change((sh) => ({
      ...sh,
      items: sh.items.map((it, i) => {
        if (i !== index) {
          return it;
        }
        const next = { ...it, ...patch };
        for (const key of Object.keys(patch) as (keyof DbShopItem)[]) {
          if (patch[key] === undefined) {
            delete next[key];
          }
        }
        return next;
      }),
    }));
  }

  protected setOwnPrice(index: number, own: boolean, item: number): void {
    this.setItem(index, { price: own ? Math.max(1, item) : undefined });
  }

  protected setConditions(index: number, conditions: EventConditions): void {
    this.setItem(index, {
      conditions: countConditions(conditions) > 0 ? conditions : undefined,
    });
  }

  protected pickWeather(index: number): void {
    this.weatherPick.set({ id: this.shop().id, for: "shop", index });
  }

  protected removeItem(index: number): void {
    this.open.set(null);
    this.change((sh) => ({
      ...sh,
      items: sh.items.filter((_, i) => i !== index),
    }));
  }

  protected readonly emptyConditions: EventConditions = { variables: [] };
}
