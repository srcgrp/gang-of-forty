import type { Offer, Product, ProductCardData } from "../types";
import { discountedPrice } from "./product-pricing";

export function productCardData(products: Product[], offers: Offer[]): ProductCardData[] {
  return products.map((product) => {
    const offer = offers.find((item) => item.productId === product.id);
    return {
      product,
      price: discountedPrice(product, offer),
      ...(offer ? { originalPrice: product.price, discountPercent: offer.percent } : {}),
    };
  });
}

export function suggestionCardData(
  products: Product[],
  offers: Offer[],
  stock: Record<string, number>,
): ProductCardData[] {
  return products
    .filter((product) => offers.some((offer) => offer.productId === product.id))
    .map((product) => {
      const offer = offers.find((item) => item.productId === product.id);
      return {
        product,
        price: discountedPrice(product, offer),
        originalPrice: product.price,
        discountPercent: offer?.percent,
        outOfStock: (stock[String(product.id)] ?? 0) <= 0,
      };
    });
}
