import type { Offer, Product, ProductCardData } from "../types";

export function discountedPrice(product: Product, offer?: Offer): number {
  return offer ? Math.round(product.price * (1 - offer.percent / 100)) : product.price;
}

export function finalPrice(product: Product, offer?: Offer): number {
  return discountedPrice(product, offer);
}

export function inStock(productId: number, stock: Record<string, number>): boolean {
  return (stock[String(productId)] ?? 0) > 0;
}

export function toCard(
  product: Product,
  offers: Offer[],
  stock?: Record<string, number>,
): ProductCardData {
  const offer = offers.find((item) => item.productId === product.id);
  const price = discountedPrice(product, offer);
  return {
    product,
    price,
    ...(offer ? { originalPrice: product.price, discountPercent: offer.percent } : {}),
    ...(stock ? { outOfStock: !inStock(product.id, stock) } : {}),
  };
}
