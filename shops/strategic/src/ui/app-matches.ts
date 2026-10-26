/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { catalogItems } from './catalog-scope';
import type { Context } from './context';
import type { ProductItem, Route } from '../types';

export function matchesFor({ state, ports }: Context, route: Route): ProductItem[] {
  if (route.type === 'home' || !route.query) return [];
  const found = ports.visibleProducts(state.model.searchIndex, route.query);
  if (route.type === 'search') return found;
  const scope = catalogItems(state.model, route.slug) ?? [];
  const ids = new Set(scope.map((item) => item.product.id));
  return found.filter((item) => ids.has(item.product.id));
}