import type { Offer, Product } from "../../../shared/types";
import { finalPrice, offersById } from "./cards";

export function sortProducts(products: Product[], offers: Offer[], sort: "default" | "price"): Product[] {
  if (sort === "default") return products;
  const byId = offersById(offers);
  return [...products].sort((a, b) =>
    finalPrice(a, byId.get(a.id)) - finalPrice(b, byId.get(b.id)) || a.id - b.id);
}
