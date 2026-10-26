/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { Category, ProductItem, ShopModel } from '../types';

export const emptyModel = (): ShopModel => ({
  products: [], categories: [], offers: [], shop: {},
  home: { hero: { title: '', text: '' }, side: { title: '', text: '' }, carousels: [], promos: [] },
  stockOf: (_id: number): number => 0,
  items: new Map<number, ProductItem>(),
  itemsByCategory: new Map<number, ProductItem[]>(),
  searchIndex: [],
  categoryById: new Map<number, Category>(),
  categoryBySlug: new Map<string, Category>(),
  categoryArt: new Map<number, string | null>(),
  offerItems: [], carousels: [],
});