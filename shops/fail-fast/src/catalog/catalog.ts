/**
 * Pure catalog business logic.
 * No DOM access, no fetch, no localStorage, no notifications.
 */

import type { Product, Offer, Stock, OfferProduct, CategoryId } from "../types.js";
import { CATEGORY_IDS } from "../types.js";

export function filterProductsByCategory(
  products: Product[],
  categoryId: CategoryId
): Product[] {
  return products.filter((product) => product.categoryId === categoryId);
}

export function calculateDiscountedPrice(price: number, percent: number): number {
  return Math.round(price * (1 - percent / 100));
}

export function findOfferForProduct(offers: Offer[], productId: number): Offer | undefined {
  return offers.find((offer) => offer.productId === productId);
}

export function getStockQuantity(stock: Stock, productId: number): number {
  return stock.items[String(productId)] ?? 0;
}

export function createOfferProduct(
  product: Product,
  offer: Offer,
  stock: Stock
): OfferProduct {
  return {
    ...product,
    percent: offer.percent,
    quantity: getStockQuantity(stock, product.id),
    discountedPrice: calculateDiscountedPrice(product.price, offer.percent),
  };
}

export function buildOfferProducts(
  products: Product[],
  offers: Offer[],
  stock: Stock
): OfferProduct[] {
  return products
    .map((product): OfferProduct | null => {
      const offer = findOfferForProduct(offers, product.id);
      return offer ? createOfferProduct(product, offer, stock) : null;
    })
    .filter((item): item is OfferProduct => item !== null);
}

export function filterDairyProducts(products: Product[]): Product[] {
  return filterProductsByCategory(products, CATEGORY_IDS.DAIRY);
}
