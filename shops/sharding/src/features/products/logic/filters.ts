import type { Product, Offer, Shelf, Category } from '../../../shared/types';

export function visibleProducts(
  products: Product[],
  catSlug: string,
  categories: Category[],
): Product[] {
  if (!catSlug) return products;
  const cat = categories.find((c) => c.slug === catSlug);
  return cat ? products.filter((p) => p.categoryId === cat.id) : products;
}

export function shelfProducts(cfg: Shelf, products: Product[], offers: Map<number, Offer>): Product[] {
  if (cfg.source === 'offers') {
    return products
      .filter((p) => offers.has(p.id))
      .sort((a, b) => (offers.get(b.id)?.percent ?? 0) - (offers.get(a.id)?.percent ?? 0));
  }
  if (cfg.categoryId == null) return products;
  return products.filter((p) => p.categoryId === cfg.categoryId);
}