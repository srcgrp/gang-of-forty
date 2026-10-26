/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { Category, ProductItem, ShopModel } from '../types';
import { catalogItems } from './catalog-scope';
import type { View } from './dom';
import { categoryImage } from './category-image';
import { OFFERS_VIEW } from './config';
import { el } from './el';
import { notFound } from './not-found';
import { renderProducts } from './products';
import { backBar, emptySearch, resultsSection } from './results';
import { stripEmoji } from './safe';

export function renderCatalog(model: ShopModel, slug: string, home: string, query = '', matches: readonly ProductItem[] = []): View {
  const base = catalogItems(model, slug);
  if (!base) return { title: 'دسته پیدا نشد', nodes: [notFound(home)] };

  let title: string;
  let category: Category | null = null;
  if (slug === OFFERS_VIEW) {
    const def = model.carousels.find((carousel) => carousel.source === 'offers');
    title = (def && stripEmoji(def.title)) || 'پیشنهاد ویژه';
  } else {
    category = model.categoryBySlug.get(slug) ?? null;
    title = category?.name ?? slug;
  }

  const items = query ? matches : base;
  const heading = el('h1', { id: 'catalog-t', class: 'catalog__title' }, [
    category && categoryImage(model, category, 'cat__icon cat__icon--head', false),
    query ? `${title}: نتایج «${query}»` : title,
  ]);

  let content: HTMLElement[] = [renderProducts(items)];
  if (!items.length) {
    content = [query ? emptySearch('کالایی با این عبارت در این بخش پیدا نشد.') : el('p', { class: 'state', text: 'فعلاً کالایی در این بخش نداریم.' })];
  }
  return { title: query ? `${title}: ${query}` : title, nodes: [backBar(home), resultsSection(heading, items, content)] };
}