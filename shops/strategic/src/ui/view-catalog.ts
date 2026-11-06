/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { CatalogView, ShopModel } from '../types';
import type { View } from './dom';
import { categoryImage } from './category-image';
import { el } from './el';
import { notFound } from './not-found';
import { renderProducts } from './products';
import { backBar, emptySearch, resultsSection } from './results';
import { stripEmoji } from './safe';

export function renderCatalog(model: ShopModel, view: CatalogView, home: string): View {
  if (!view.found) return { title: 'دسته پیدا نشد', nodes: [notFound(home)] };
  const { category, items, query } = view;
  const title = stripEmoji(view.title);
  const heading = el('h1', { id: 'catalog-t', class: 'catalog__title' }, [
    category && categoryImage(model, category, 'cat__icon cat__icon--head', false),
    query ? `${title}: نتایج «${query}»` : title,
  ]);
  const content = items.length ? [renderProducts(items)] : [query
    ? emptySearch('کالایی با این عبارت در این بخش پیدا نشد.')
    : el('p', { class: 'state', text: 'فعلاً کالایی در این بخش نداریم.' })];
  return { title: query ? `${title}: ${query}` : title, nodes: [backBar(home), resultsSection(heading, items, content)] };
}