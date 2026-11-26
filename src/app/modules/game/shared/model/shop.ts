import {
  DbItem,
  DbShop,
  DbShopItem,
  GameDatabase,
} from "../../../database-editor/shared/database";
import { linkState } from "../../../database-editor/shared/links";
import {
  boughtToday,
  currentParty,
} from "../../../database-editor/shared/party";
import { conditionsFit, EventContext } from "./ObjectEvent";

/**
 * A shop in the game being played (docs/editeur/16-boutiques.md): the items shown now, their prices with the link's
 * discount, the stock left today, what it buys back. Read by the shop window and the database sheet.
 */

/** The most the link's discount takes off (the prices never reach 0). */
const DISCOUNT_MAX = 90;

/** The level of the link with the shopkeeper (0: no shopkeeper, not met). */
export function keeperLevel(shop: DbShop, db: GameDatabase): number {
  return shop.keeper ? linkState(shop.keeper, db).level : 0;
}

/** The discount now, in % (the link's level × the shop's discount by level). */
export function shopDiscount(shop: DbShop, db: GameDatabase): number {
  return Math.min(DISCOUNT_MAX, keeperLevel(shop, db) * shop.discount);
}

/** Its price in the shop before the discount: its own, else the item's. */
export function basePrice(entry: DbShopItem, item: DbItem): number {
  return entry.price ?? item.price;
}

/** The price paid after a discount (at least 1 for an item that costs something). */
export function discounted(price: number, discount: number): number {
  return price > 0
    ? Math.max(1, Math.round((price * (100 - discount)) / 100))
    : 0;
}

/** What the shop gives for one item sold (0: it doesn't buy it). */
export function sellPrice(shop: DbShop, item: DbItem): number {
  return item.kind === "key" || item.price <= 0
    ? 0
    : Math.floor((item.price * shop.buyback) / 100);
}

export interface ShopLine {
  item: DbItem;
  /** Its line in the shop's list. */
  index: number;
  base: number;
  price: number;
  /** How many can still be bought today (null: no limit). */
  left: number | null;
}

/** The items on sale now (their moment, conditions and link level fit), with their price and the stock left. */
export function shopLines(
  shop: DbShop,
  db: GameDatabase,
  ctx: EventContext
): ShopLine[] {
  const level = keeperLevel(shop, db);
  const discount = shopDiscount(shop, db);
  return shop.items.flatMap((entry, index) => {
    const item = db.items.find((i) => i.id === entry.item);
    if (
      !item ||
      (entry.linkLevel ?? 0) > level ||
      (entry.conditions && !conditionsFit(entry.conditions, ctx))
    ) {
      return [];
    }
    const base = basePrice(entry, item);
    return [
      {
        item,
        index,
        base,
        price: discounted(base, discount),
        left:
          entry.stock === undefined
            ? null
            : Math.max(0, entry.stock - boughtToday(shop.id, item.id, ctx.day)),
      },
    ];
  });
}

/** The bag's items the shop buys back, with their price and how many are carried. */
export function sellLines(
  shop: DbShop,
  db: GameDatabase
): { item: DbItem; price: number; count: number }[] {
  if (shop.buyback <= 0) {
    return [];
  }
  const items = currentParty().items;
  return db.items
    .filter((i) => (items[i.id] ?? 0) > 0 && sellPrice(shop, i) > 0)
    .map((item) => ({
      item,
      price: sellPrice(shop, item),
      count: items[item.id],
    }));
}
