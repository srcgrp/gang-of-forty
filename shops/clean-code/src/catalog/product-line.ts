import type { Offer, Product } from "../types/product.ts";

export function productLine(
  product: Product,
  qty: number,
  offer: Offer | null,
  faNumber: Intl.NumberFormat,
): string {
  let line = product.unit;

  if (qty === 0) {
    line += " — ناموجود";
  } else {
    line += " — مانده: " + faNumber.format(qty);
  }

  if (offer) {
    line += " — " + offer.label;
  }

  if (product.tags.length > 0) {
    line += " — " + product.tags.join("، ");
  }

  return line;
}
