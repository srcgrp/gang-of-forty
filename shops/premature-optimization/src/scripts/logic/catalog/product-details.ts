import type { CatalogData, Offer, Product } from "../../types";
import { calculatePrice } from "./calculate-price.ts";

export type ProductDetails = {
  offer?: Offer;
  finalPrice: number;
  stock: number;
  categoryName?: string;
};

export function productDetails(
  product: Product,
  {
    offers,
    stock,
    categories,
  }: Pick<CatalogData, "offers" | "stock" | "categories">,
): ProductDetails {
  const offer = offers.find((o) => o.productId === product.id);
  return {
    offer,
    finalPrice: calculatePrice(product.price, offer),
    stock: stock.items[String(product.id)] ?? 0,
    categoryName: categories.find((c) => c.id === product.categoryId)?.name,
  };
}
