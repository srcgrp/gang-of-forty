import Fuse from "fuse.js";
import type { Product } from "../types";
export function normalizeSearch(text: string): string {
  return text.replaceAll("ي", "ی").replaceAll("ك", "ک")
    .replace(/‌/g, " ").replace(/[ًٌٍَُِّْ]/g, "").replace(/\s+/g, " ").trim();
}
export function createSearch(products: Product[]): (query: string) => Product[] {
  const entries = products.map(product => ({ product,
    name: normalizeSearch(product.name), tags: product.tags.map(normalizeSearch) }));
  const fuse = new Fuse(entries, {
    keys: [{ name: "name", weight: 2 }, "tags"], threshold: 0.3, ignoreLocation: true,
  });
  return query => fuse.search(normalizeSearch(query)).map(match => match.item.product);
}
