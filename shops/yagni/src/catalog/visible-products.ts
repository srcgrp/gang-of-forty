import type { Product } from "../types";

export function visibleProducts(products: Product[], query = ""): Product[] {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return products.slice();
  return products.filter((product) =>
    product.name.toLocaleLowerCase().includes(normalized) ||
    product.tags.some((tag) => tag.toLocaleLowerCase().includes(normalized)),
  );
}
