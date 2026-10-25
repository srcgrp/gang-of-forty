import type { Offer, Product } from "../types/product.ts";
import { productLine } from "./product-line.ts";

export function finalPrice(price: number, percent: number): number {
  return (price * (100 - percent)) / 100;
}

export function formatPrice(
  price: number,
  faNumber: Intl.NumberFormat,
): string {
  return faNumber.format(price) + " تومان";
}

export function inStock(qty: number): boolean {
  return qty !== 0;
}

export function cardPrices(
  product: Product,
  offer: Offer | null,
  qty: number,
  faNumber: Intl.NumberFormat,
): {
  available: boolean;
  oldLabel: string;
  nowLabel: string | null;
  line: string;
} {
  const available = inStock(qty);
  const oldLabel = formatPrice(product.price, faNumber);
  const line = productLine(product, qty, offer, faNumber);
  if (offer && available) {
    return {
      available,
      oldLabel,
      nowLabel: formatPrice(finalPrice(product.price, offer.percent), faNumber),
      line,
    };
  }
  return { available, oldLabel, nowLabel: null, line };
}
