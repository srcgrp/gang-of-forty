import Fuse from "fuse.js";
import type { Product } from "../types";

let fuseInstance: Fuse<Product> | null = null;

export function initSearch(products: Product[]): void {
  fuseInstance = new Fuse(products, {
    keys: ["name", "unit"],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
    ignoreLocation: true,
  });
}

export function searchProducts(
  products: Product[],
  query: string,
  limit = 8,
): Product[] {
  const q = query.trim();
  if (!q) return [];
  if (!fuseInstance) {
    return products
      .filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
      .slice(0, limit);
  }
  return fuseInstance
    .search(q)
    .slice(0, limit)
    .map((result) => result.item);
}

export function searchIds(products: Product[], query: string): Set<number> {
  const q = query.trim();
  if (!q) return new Set();
  if (!fuseInstance) {
    return new Set(
      products
        .filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
        .map((p) => p.id),
    );
  }
  return new Set(fuseInstance.search(q).map((r) => r.item.id));
}
