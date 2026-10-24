import type { Offer } from "../types/product.ts";

export function findOffer(offers: Offer[], productId: number): Offer | null {
  const found = offers.find(function (item) {
    return item.productId === productId;
  });
  if (found) {
    return found;
  }
  return null;
}
