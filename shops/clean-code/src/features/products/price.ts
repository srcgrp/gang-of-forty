import { finalPrice } from "../../shared/price.ts";
import type { Offer, Prices, Product } from "../../types/product.ts";

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
): Prices {
  const available = inStock(qty);
  const oldLabel = formatPrice(product.price, faNumber);
  if (offer && available) {
    return {
      available,
      oldLabel,
      nowLabel: formatPrice(finalPrice(product.price, offer.percent), faNumber),
    };
  }
  return { available, oldLabel, nowLabel: null };
}
