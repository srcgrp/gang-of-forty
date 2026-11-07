/* Amirhossein (Armin) Panahi */

import type { LinkOf, ProductItem, ShopModel, View } from '../types';
import { renderCarousels } from './carousels';
import { renderCategories } from './categories';
import { renderHero } from './hero';
import { renderPromos } from './promos';

export function renderHome(model: ShopModel, linkOf: LinkOf, tag: ProductItem | null): View {
  const sections = renderCarousels(model, linkOf);
  const promos = renderPromos(model);
  if (promos) sections.splice(1, 0, promos);
  return { title: null, nodes: [renderHero(model, tag), renderCategories(model, linkOf), ...sections] };
}