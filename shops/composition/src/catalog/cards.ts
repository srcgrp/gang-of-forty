import type { Product, Stock, Offer, CardView } from "../types";
import { formatNumber, formatPrice } from "./format";
export function offersById(offers: Offer[]): Map<number, Offer> {
  const result = new Map<number, Offer>();
  for (const offer of offers) {
    if (!result.has(offer.productId)) result.set(offer.productId, offer);
  }
  return result;
}
export function finalPrice(product: Product, offer?: Offer): number {
  if (!offer) return product.price;
  return Math.round(product.price * (100 - offer.percent) / 100);
}
export function toCard(product: Product, stock: Stock, offers: Map<number, Offer>): CardView {
  const offer = offers.get(product.id);
  const price = finalPrice(product, offer);
  return {
    id: product.id, name: product.name, emoji: product.emoji, unit: product.unit,
    price: formatPrice(price), oldPrice: offer ? formatPrice(product.price) : "",
    badge: offer ? offer.label + "؛ " + formatNumber(offer.percent) + "٪ تخفیف" : "",
    available: stock.items[product.id] !== 0,
    item: { id: product.id, name: product.name, price, quantity: 1 },
  };
}
export function toCards(products: Product[], stock: Stock, offers: Map<number, Offer>): CardView[] {
  return products.map(product => toCard(product, stock, offers));
}
