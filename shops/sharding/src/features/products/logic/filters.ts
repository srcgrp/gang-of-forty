import type { Product, Offer, Shelf } from '../../../shared/types';
import Fuse from 'fuse.js';

export function searchProducts(products: Product[], query: string): Product[] {
  const text = query.trim();
  if (!text) return products;
  const search = new Fuse(products, { keys: ['name', 'tags'], threshold: 0.4, ignoreLocation: true });
  return search.search(text).map((result) => result.item);
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
