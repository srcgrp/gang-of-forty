import type { Product } from "../../types";

const NUMERIC_ID = /^\d+$/;

export function findProduct(
  products: readonly Product[],
  productId: string,
): Product | null {
  if (!NUMERIC_ID.test(productId)) return null;

  const id = Number(productId);
  return products.find((product) => product.id === id) ?? null;
}
