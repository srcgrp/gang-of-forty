import type { Product } from "../../types/product.ts";

export function filterProducts(
  products: Product[],
  categoryId: number | null,
  query: string,
): Product[] {
  return products.filter(function (p) {
    const byCat = categoryId === null || p.categoryId === categoryId;
    return byCat && (query === "" || p.name.includes(query));
  });
}
