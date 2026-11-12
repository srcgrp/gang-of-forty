import type { Offer } from "../types/product.ts";

export function findOffer(offers: Offer[], productId: number): Offer | null {
  return (
    offers.find(function (item) {
      return item.productId === productId;
    }) ?? null
  );
}
