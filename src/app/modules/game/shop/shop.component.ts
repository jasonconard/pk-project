import {
  LucideCoins,
  LucideHandCoins,
  LucideHeart,
  LucideMinus,
  LucidePackage,
  LucidePlus,
  LucideShoppingBag,
  LucideX,
} from "@lucide/angular";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import { EscapeService } from "../../../core/shared/service/escape.service";
import { loadDatabase } from "../../database-editor/shared/database-storage";
import {
  currentParty,
  ITEM_COUNT_MAX,
  trade,
} from "../../database-editor/shared/party";
import { EventContext } from "../shared/model/ObjectEvent";
import {
  keeperLevel,
  sellLines,
  shopDiscount,
  shopLines,
} from "../shared/model/shop";
import { playSound } from "../shared/services/sfx";

const SOLD_OUT = "Épuisé, revient demain matin";

/** Under an item to buy: sold out, the stock when low, else what it is and how many are carried. */
function buySub(left: number | null, note: string | undefined, have: number) {
  if (left === 0) {
    return SOLD_OUT;
  }
  if (left !== null && left <= 3) {
    return `Plus que ${left} aujourd'hui`;
  }
  return [note?.replace(/\.$/, ""), `vous en avez ${have}`]
    .filter(Boolean)
    .join(" · ");
}

/** One line of the list, buying or selling. */
interface Line {
  id: string;
  name: string;
  icon?: string;
  /** Under the name: what it does, how many are carried, the stock left. */
  sub: string;
  /** The stock is low (shown in orange). */
  warn: boolean;
  price: number;
  /** The price before the link's discount (none: no discount). */
  was?: number;
  /** How many can be bought or sold now. */
  max: number;
}

/**
 * A shop of the database opened by an event (design/main-view.pen, Boutiques): the shopkeeper, the money, Acheter /
 * Vendre. Touching an item shows how many and the button; the prices take the link with the shopkeeper into account,
 * the stock of the day comes back each morning. Closed by the ✕, the backdrop or Escape (the event goes on).
 */
@Component({
  selector: "game-shop",
  imports: [
    LucideCoins,
    LucideHandCoins,
    LucideHeart,
    LucideMinus,
    LucidePackage,
    LucidePlus,
    LucideShoppingBag,
    LucideX,
  ],
  templateUrl: "./shop.component.html",
  styleUrl: "./shop.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {
  /** The shop (database id). */
  readonly shopId = input.required<string>();
  /** The hour, day, weather and variables now (the items' conditions). */
  readonly context = input.required<EventContext>();
  readonly closed = output<void>();

  private readonly db = loadDatabase();
  protected readonly tab = signal<"buy" | "sell">("buy");
  /** The item touched (its id) and how many. */
  protected readonly selected = signal<string | null>(null);
  protected readonly count = signal(1);
  /** Changes after each trade (the bag and the money are read again). */
  private readonly version = signal(0);
  protected readonly notice = signal("");

  protected readonly shop = computed(() =>
    this.db.shops.find((sh) => sh.id === this.shopId())
  );
  protected readonly keeper = computed(() =>
    this.db.npcs.find((n) => n.id === this.shop()?.keeper)
  );
  protected readonly money = computed(() => {
    this.version();
    return currentParty().money;
  });
  protected readonly discount = computed(() => {
    const shop = this.shop();
    return shop ? shopDiscount(shop, this.db) : 0;
  });
  protected readonly level = computed(() => {
    const shop = this.shop();
    return shop ? keeperLevel(shop, this.db) : 0;
  });

  protected readonly lines = computed((): Line[] => {
    this.version();
    const shop = this.shop();
    if (!shop) {
      return [];
    }
    const items = currentParty().items;
    if (this.tab() === "sell") {
      return sellLines(shop, this.db).map(({ item, price, count }) => ({
        id: item.id,
        name: item.name,
        icon: item.icon,
        sub: `Vous en avez ${count}`,
        warn: false,
        price,
        max: count,
      }));
    }
    return shopLines(shop, this.db, this.context()).map((l) => {
      const have = items[l.item.id] ?? 0;
      const left = l.left ?? Infinity;
      const sub = buySub(l.left, l.item.note, have);
      return {
        id: l.item.id,
        name: l.item.name,
        icon: l.item.icon,
        sub,
        warn: left !== Infinity && left <= 3,
        price: l.price,
        ...(l.price === l.base ? {} : { was: l.base }),
        max: Math.min(
          left,
          ITEM_COUNT_MAX - have,
          l.price > 0 ? Math.floor(this.money() / l.price) : ITEM_COUNT_MAX
        ),
      };
    });
  });

  protected readonly current = computed(() =>
    this.lines().find((l) => l.id === this.selected())
  );

  constructor() {
    inject(EscapeService).whileAlive(() => this.closed.emit());
  }

  protected setTab(tab: "buy" | "sell"): void {
    this.tab.set(tab);
    this.selected.set(null);
    this.notice.set("");
  }

  protected select(line: Line): void {
    if (this.selected() === line.id) {
      this.selected.set(null);
      return;
    }
    this.selected.set(line.id);
    this.count.set(1);
    this.notice.set("");
  }

  protected step(delta: number, max: number): void {
    this.count.update((n) =>
      Math.min(Math.max(1, max), Math.max(1, n + delta))
    );
  }

  /** Why the button is off (empty: it is on). */
  protected blocked(line: Line): string {
    if (this.tab() === "sell" || line.max >= 1) {
      return "";
    }
    if (line.sub === SOLD_OUT) {
      return "Épuisé";
    }
    return line.price > this.money()
      ? "Pas assez d'argent"
      : "Le sac est plein";
  }

  protected confirm(line: Line): void {
    const shop = this.shop();
    const count = Math.min(this.count(), line.max);
    if (!shop || count < 1 || this.blocked(line)) {
      playSound("error");
      return;
    }
    const buying = this.tab() === "buy";
    const ok = trade(
      shop.id,
      line.id,
      buying ? count : -count,
      buying ? -line.price * count : line.price * count,
      this.context().day
    );
    if (!ok) {
      playSound("error");
      return;
    }
    playSound("coin");
    this.notice.set(`${buying ? "Acheté" : "Vendu"} : ${line.name} ×${count}`);
    this.version.update((v) => v + 1);
    this.count.set(1);
    if (!this.current() || this.current()!.max < 1) {
      this.selected.set(null);
    }
  }
}
