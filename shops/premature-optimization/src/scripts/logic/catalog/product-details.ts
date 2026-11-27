import type { CatalogData, Offer, Product } from "../../types";
import { calculatePrice } from "./calculate-price.ts";

const DEFAULT_CATEGORY_NAME = "محصول";

export type ProductDetailsSource = Pick<
  CatalogData,
  "offers" | "stock" | "categories"
>;

export type ProductDetails = {
  offer: Offer | undefined;
  finalPrice: number;
  stock: number;
  categoryName: string;
};

export function productDetails(
  product: Product,
  { offers, stock, categories }: ProductDetailsSource,
): ProductDetails {
  const offer = offers.find((o) => o.productId === product.id);
  const category = categories.find((c) => c.id === product.categoryId);

  return {
    offer,
    finalPrice: calculatePrice(product.price, offer),
    stock: stock.items[String(product.id)] ?? 0,
    categoryName: category?.name ?? DEFAULT_CATEGORY_NAME,
  };
}
