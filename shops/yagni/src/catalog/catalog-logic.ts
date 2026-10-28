import type { Product, Offer, ProductCardData } from "../types";
export function productsForCategory(
  products: Product[],
  categoryId: number,
): Product[] {
  return products.filter((product) => product.categoryId === categoryId);
}
export function discountedPrice(product: Product, offer?: Offer): number {
  return offer
    ? Math.round(product.price * (1 - offer.percent / 100))
    : product.price;
}
export function productCardData(
  products: Product[],
  offers: Offer[],
): ProductCardData[] {
  return products.map((product) => {
    const offer = offers.find((item) => item.productId === product.id);
    const price = discountedPrice(product, offer);
    return {
      product,
      price,
      ...(offer
        ? { originalPrice: product.price, discountPercent: offer.percent }
        : {}),
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
      const price = discountedPrice(product, offer);
      return {
        product,
        price,
        originalPrice: product.price,
        discountPercent: offer?.percent,
        outOfStock: (stock[String(product.id)] ?? 0) <= 0,
      };
    });
}

export function finalPrice(product: Product, offer?: Offer): number {
  return discountedPrice(product, offer);
}
export function inStock(
  productId: number,
  stock: Record<string, number>,
): boolean {
  return (stock[String(productId)] ?? 0) > 0;
}
export function visibleProducts(products: Product[], query = ""): Product[] {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return products.slice();
  return products.filter(
    (product) =>
      product.name.toLocaleLowerCase().includes(normalized) ||
      product.tags.some((tag) => tag.toLocaleLowerCase().includes(normalized)),
  );
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
    ...(offer
      ? { originalPrice: product.price, discountPercent: offer.percent }
      : {}),
    ...(stock ? { outOfStock: !inStock(product.id, stock) } : {}),
  };
}
