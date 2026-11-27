import type { ProductItem } from '../types';

export type PriceSort = 'default' | 'price';

export function sortProducts(items: readonly ProductItem[], sort: PriceSort): readonly ProductItem[] {
  return sort === 'price' ? [...items].sort((a, b) => a.price - b.price) : items;
}
