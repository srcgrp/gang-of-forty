/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { CatalogView, ProductView, Route, ShopModel } from '../../types';
import { OFFERS_VIEW } from '../../types';
import { heroTag } from './hero-tag';
import { visibleProducts } from './search';

export function productView(model: ShopModel, route: Route): ProductView {
  const query = route.type === 'home' ? '' : route.query;
  const matches = query ? visibleProducts(model.searchIndex, query) : [];
  const slug = route.type === 'catalog' ? route.slug : '';
  const category = model.categoryBySlug.get(slug) ?? null;
  const base = slug === OFFERS_VIEW ? model.offerItems : category ? model.itemsByCategory.get(category.id) ?? [] : [];
  const scope = new Set(base.map((item) => item.product.id));
  const items = query ? matches.filter((item) => scope.has(item.product.id)) : base;
  const offerTitle = model.carousels.find((carousel) => carousel.source === 'offers')?.title ?? 'پیشنهاد ویژه';
  const catalog: CatalogView = {
    title: slug === OFFERS_VIEW ? offerTitle : category?.name ?? slug,
    category, items, query, found: slug === OFFERS_VIEW || category !== null,
  };
  return { route, catalog, matches, tag: heroTag(model.offerItems) };
}