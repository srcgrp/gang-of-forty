import type { CardView, CatalogItem } from "../types";
import { toPersianDigits } from "../format/price";
import { formatPrice } from "../format/price";

const LOW_STOCK = 5;

export const maxedLabel = (item: CatalogItem): string =>
  `${item.name}: حداکثر موجودی در سبد خرید است`;

function stockText(item: CatalogItem): string | undefined {
  if (item.stock <= 0) return "ناموجود";
  if (item.stock <= LOW_STOCK) return `تنها ${toPersianDigits(item.stock)} عدد باقی مانده`;
  return undefined;
}

function addLabel(item: CatalogItem, soldOut: boolean, maxed: boolean): string {
  if (soldOut) return `${item.name} ناموجود است`;
  return maxed ? maxedLabel(item) : `افزودن ${item.name} به سبد خرید`;
}

export function cardView(item: CatalogItem, currency: string, inCart: number): CardView {
  const soldOut = item.stock <= 0;
  const maxed = !soldOut && inCart >= item.stock;
  return {
    emoji: item.emoji,
    name: item.name,
    unit: item.unit,
    color: item.color,
    tag: item.tags[0],
    badge: item.percent != null ? `${toPersianDigits(item.percent)}٪` : undefined,
    stockText: stockText(item),
    price: formatPrice(item.price),
    oldPrice: item.oldPrice != null ? formatPrice(item.oldPrice) : undefined,
    currency,
    soldOut,
    disabled: soldOut || maxed,
    addLabel: addLabel(item, soldOut, maxed),
  };
}
