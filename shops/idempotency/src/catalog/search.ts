import Fuse from "fuse.js";
import type { SearchableProduct } from "../types/search";

export function createProductSearch(
  products: SearchableProduct[],
): (query: string) => SearchableProduct[] {
  const index = new Fuse(products, {
    keys: ["name"],
    threshold: 0.35,
    ignoreLocation: true,
  });

  return (query: string) =>
    index.search(query, { limit: 4 }).map(({ item }) => item);
}