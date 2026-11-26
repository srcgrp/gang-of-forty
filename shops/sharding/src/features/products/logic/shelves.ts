import type { AppState, Shelf, ShelfView } from '../../../shared/types';
import { shelfProducts } from './filters';
import { cardOf } from './to-card';

export function buildShelves(state: AppState): ShelfView[] {
  const shelves: Shelf[] = [];
  if (state.offerMap.size > 0) {
    shelves.push({ id: 'offers', title: 'پیشنهادهای ویژه امروز', source: 'offers' });
  }
  for (const category of state.categories) {
    shelves.push({ id: category.slug, title: category.name, categoryId: category.id });
  }
  if (state.categories.length === 0) {
    shelves.push({ id: 'all', title: 'همه محصولات' });
  }
  return shelves.map((shelf) => ({
    shelf,
    cards: shelfProducts(shelf, state.products, state.offerMap).map((product) => cardOf(product, state)),
  }));
}
