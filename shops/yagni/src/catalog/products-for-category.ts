import type { Product } from "../types";

export function productsForCategory(products: Product[], categoryId: number): Product[] {
  return products.filter((product) => product.categoryId === categoryId);
}
