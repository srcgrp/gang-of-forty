import type { Product } from "../../types";

export function findProduct(
  products: Product[],
  productId: string,
): Product | null {
  const id = Number(productId);
  return products.find((product) => product.id === id) ?? null;
}
