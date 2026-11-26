import type { Product } from '../../../shared/types';
import Fuse from 'fuse.js';

export function searchProducts(products: Product[], query: string): Product[] {
  const text = query.trim();
  if (!text) return products;
  const search = new Fuse(products, { keys: ['name', 'tags'], threshold: 0.4, ignoreLocation: true });
  return search.search(text).map((result) => result.item);
}
