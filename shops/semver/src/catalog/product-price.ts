import type { ProductView } from "../types";

export type ProductSort = "default" | "price";

export function productPrice({ product, offer }: ProductView): number {
  return offer ? Math.round((product.price * (100 - offer.percent)) / 100) : product.price;
}

export function sortProducts(products: ProductView[], sort: ProductSort): ProductView[] {
  return sort === "price" ? products.toSorted((first, second) => productPrice(first) - productPrice(second)) : products;
}
