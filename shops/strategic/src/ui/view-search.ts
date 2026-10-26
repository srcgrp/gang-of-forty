/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ProductItem } from '../types';
import type { View } from './dom';
import { el } from './el';
import { renderProducts } from './products';
import { emptySearch, resultsSection } from './results';

export function renderSearch(query: string, items: readonly ProductItem[]): View {
  const heading = el('h1', { id: 'catalog-t', class: 'catalog__title', text: `نتایج جستجو برای «${query}»` });
  const content = items.length
    ? [el('h2', { class: 'sr-only', text: 'فهرست کالاها' }), renderProducts(items)]
    : [emptySearch('کالایی با این عبارت پیدا نشد. عبارت دیگری را امتحان کنید.')];

  return { title: `جستجو: ${query}`, nodes: [resultsSection(heading, items, content)] };
}