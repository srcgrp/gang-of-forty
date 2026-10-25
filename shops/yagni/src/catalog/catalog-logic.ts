import type { Product, Offer, ProductCardData } from '../types';
export function productsForCategory(products: Product[], categoryId: number): Product[] {
  return products.filter((product) => product.categoryId === categoryId);
}
export function discountedPrice(product: Product, offer?: Offer): number {
  return offer ? Math.round(product.price * (1 - offer.percent / 100)) : product.price;
}
export function productCardData(products: Product[], offers: Offer[]): ProductCardData[] {
  return products.map((product) => {
    const offer = offers.find((item) => item.productId === product.id);
    const price = discountedPrice(product, offer);
    return { product, price, ...(offer ? { originalPrice: product.price, discountPercent: offer.percent } : {}) };
  });
}
export function suggestionCardData(products: Product[], offers: Offer[], stock: Record<string, number>): ProductCardData[] {
  return products.filter((product) => offers.some((offer) => offer.productId === product.id)).map((product) => {
    const offer = offers.find((item) => item.productId === product.id);
    const price = discountedPrice(product, offer);
    return { product, price, originalPrice: product.price, discountPercent: offer?.percent, outOfStock: (stock[String(product.id)] ?? 0) <= 0 };
  });
}
