import type { Catalog, Offer, Product, Stock } from '../types';

export function buildCatalog(
  products: Product[],
  stock: Stock,
  offers: Offer[],
): Catalog {
  const stockMap = new Map<number, number>(
    Object.entries(stock.items).map(([id, qty]) => [Number(id), qty]),
  );
  const offerMap = new Map<number, Offer>(
    offers.map((offer) => [offer.productId, offer]),
  );
  return { products, stockMap, offerMap };
}

export function discountedPrice(price: number, percent: number): number {
  return price * (1 - percent / 100);
}

export function productsWithOffer(catalog: Catalog): Product[] {
  return catalog.products.filter((p) => catalog.offerMap.has(p.id));
}

export function productsInCategory(catalog: Catalog, categoryId: number): Product[] {
  return catalog.products.filter((p) => p.categoryId === categoryId);
}
