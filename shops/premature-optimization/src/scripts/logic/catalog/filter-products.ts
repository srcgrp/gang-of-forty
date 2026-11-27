import type { Product } from "../../types";

export function normalizeText(value: string): string {
  return value
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[‌‏‎]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function filterProducts(products: Product[], query: string): Product[] {
  const words = normalizeText(query).split(" ").filter(Boolean);
  if (words.length === 0) return products;

  return products.filter((product) => {
    const name = normalizeText(product.name);
    return words.every((word) => name.includes(word));
  });
}
