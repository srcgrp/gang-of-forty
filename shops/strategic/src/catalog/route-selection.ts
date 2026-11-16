import type { Route, ShopModel } from '../types';
import { OFFERS_ID, OFFERS_VIEW } from '../types';

export function routeSelection(model: ShopModel, route: Route) {
  const slug = route.type === 'catalog' ? route.slug : null;
  const category = slug === null ? undefined : model.categoryBySlug.get(slug);
  return {
    categoryId: slug === OFFERS_VIEW ? OFFERS_ID : category?.id ?? null,
    missing: slug !== null && slug !== OFFERS_VIEW && !category,
  };
}
