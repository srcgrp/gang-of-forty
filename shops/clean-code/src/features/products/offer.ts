import { findOffer } from "../../shared/offer.ts";
import type { Offer, Product } from "../../types/product.ts";

export { findOffer };

export function offerProducts(products: Product[], offers: Offer[]): Product[] {
  return products.filter(function (product) {
    return findOffer(offers, product.id);
  });
}
