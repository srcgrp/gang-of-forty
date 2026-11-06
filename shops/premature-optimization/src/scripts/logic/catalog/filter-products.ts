import type { Product } from "../../types";
export function filterProducts(
  products: Product[],
  query: string,
  categories: Map<number, string>,
): Product[] {
  const words = normalizeText(query).split(" ").filter(Boolean);
  if (!words.length) return products;
  return products.filter((p) =>
    words.every((word) =>
      normalizeText(`${p.name} ${categories.get(p.categoryId) ?? ""}`).includes(
        word,
      ),
    ),
  );
}
export function normalizeText(value: string): string {
  return value
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\u200c\u200f\u200e]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}
