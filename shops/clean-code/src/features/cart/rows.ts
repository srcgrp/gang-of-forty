import { findOffer } from "../../shared/offer.ts";
import { finalPrice } from "../../shared/price.ts";
import type {
  CartItem,
  CartLine,
  Offer,
  Product,
} from "../../types/product.ts";

export function cartRows(lines: CartLine[], products: Product[]): CartItem[] {
  const rows: CartItem[] = [];
  for (const line of lines) {
    const product = products.find(function (item) {
      return item.id === line.productId;
    });
    if (product) {
      rows.push({
        id: product.id,
        categoryId: product.categoryId,
        name: product.name,
        emoji: product.emoji,
        unit: product.unit,
        price: product.price,
        tags: product.tags,
        qty: line.qty,
      });
    }
  }
  return rows;
}

export function cartTotal(rows: CartItem[], offers: Offer[]): number {
  return rows.reduce(function (sum, row) {
    const offer = findOffer(offers, row.id);
    const percent = offer ? offer.percent : 0;
    return sum + finalPrice(row.price, percent) * row.qty;
  }, 0);
}
