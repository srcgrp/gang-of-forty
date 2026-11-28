import { findOffer } from "../shared/offer";
import { finalPrice } from "../shared/price";
import type { Offer, Product } from "../types/product";

export type ProductSort = "default" | "price";

export function sortProducts(
  products: Product[],
  sort: ProductSort,
  offers: Offer[],
  stock: Record<string, number>,
): Product[] {
  if (sort === "default") return products;

  return products.slice().sort(function (a, b) {
    const aOut = (stock[a.id] ?? 0) < 1;
    const bOut = (stock[b.id] ?? 0) < 1;
    if (aOut !== bOut) return aOut ? 1 : -1;

    const aOffer = findOffer(offers, a.id);
    const bOffer = findOffer(offers, b.id);
    const aPrice = finalPrice(a.price, aOffer ? aOffer.percent : 0);
    const bPrice = finalPrice(b.price, bOffer ? bOffer.percent : 0);
    return aPrice - bPrice;
  });
}
