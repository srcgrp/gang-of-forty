import type { Shelf, ShelfView } from '../../../shared/types';
import type { AppState } from '../../../shared/state/app-state';
import { shelfProducts } from './filters';
import { cardOf } from './to-card';

export function buildShelves(s: AppState): ShelfView[] {
  const shelves: Shelf[] = [];
  if (s.offerMap.size > 0) {
    shelves.push({ id: 'offers', title: 'پیشنهادهای ویژه امروز', source: 'offers' });
  }
  for (const c of s.categories) {
    shelves.push({ id: c.slug, title: c.name, categoryId: c.id });
  }
  if (s.categories.length === 0) {
    shelves.push({ id: 'all', title: 'همه محصولات' });
  }
  return shelves.map((shelf) => ({
    shelf,
    cards: shelfProducts(shelf, s.products, s.offerMap).map((p) => cardOf(p, s)),
  }));
}