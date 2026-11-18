import type { AppState, ShelfView } from '../../../shared/types';
import { carouselProducts } from '../../../catalog/carousels';
import { cardOf } from './to-card';

export function buildShelves(state: AppState): ShelfView[] {
  return state.carousels
    .filter((shelf) => state.offerMap.size > 0 || (shelf.id !== 'offers' && shelf.source !== 'offers'))
    .map((shelf) => ({
      shelf,
      cards: (carouselProducts(state, shelf.id) ?? []).map((product) => cardOf(product, state)),
    }));
}
