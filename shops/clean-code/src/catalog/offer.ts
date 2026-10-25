import type { Offer, Product } from "../types/product.ts";

export function findOffer(offers: Offer[], productId: number): Offer | null {
  const found = offers.find(function (item) {
    return item.productId === productId;
  });
  if (found) {
    return found;
  }
  return null;
}

export function offerProducts(products: Product[], offers: Offer[]): Product[] {
  return products.filter(function (product) {
    return findOffer(offers, product.id);
  });
}
