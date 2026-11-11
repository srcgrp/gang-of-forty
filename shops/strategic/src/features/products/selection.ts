import type { Category, ProductItem, Route, ShopModel } from '../../types';
import { OFFERS_ID, OFFERS_VIEW } from '../../types';
import { productView } from './view-model';

type Selection = { category: Category | undefined; title: string; items: readonly ProductItem[] };

export function selectionView(model: ShopModel, categoryId: number | null, query: string): Selection {
  const category = categoryId === null ? undefined : model.categoryById.get(categoryId);
  const slug = categoryId === OFFERS_ID ? OFFERS_VIEW : category?.slug;
  const route: Route = slug ? { type: 'catalog', slug, query } : query ? { type: 'search', query } : { type: 'home' };
  const found = productView(model, route);
  const title = query ? `نتایج جستجوی «${query}»` : category?.name ?? 'پیشنهاد ویژه امروز';
  return { category, title, items: slug ? found.catalog.items : found.matches };
}