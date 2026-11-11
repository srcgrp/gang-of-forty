import type { CarouselView, CatalogView, Home } from '../types';
import { el } from './dom';
import { formatNumber } from './format';
import { clearCarousels, createCarousel } from './carousel';
import { productCard } from './product-card';
import { createPromos } from './hero';

export const renderHomeSections = (shelves: CarouselView[], home: Home): void => {
  const root = document.querySelector<HTMLDivElement>('#home-sections');
  if (!root) return;
  clearCarousels(root); root.replaceChildren();
  for (const [index, carousel] of shelves.entries()) {
    root.append(createCarousel(carousel.id, carousel.title, carousel.emoji, carousel.products));
    if (index === 0 && home.promos.length) root.append(createPromos(home));
  }
};
export const renderCategoryFragment = (shelf: CarouselView | undefined, slug: string): void => {
  const root = document.querySelector<HTMLDivElement>('#fragment-section');
  if (!root) return;
  if (root.dataset.slug === slug) return;
  clearCarousels(root); root.replaceChildren(); root.dataset.slug = slug;
  if (shelf && !document.getElementById(slug)) root.append(createCarousel(shelf.id, shelf.title, shelf.emoji, shelf.products));
};
export const renderCatalog = ({ products, query, category, active }: CatalogView): void => {
  const home = document.querySelector<HTMLDivElement>('#home-sections');
  if (home) home.hidden = active;
  const catalog = document.querySelector<HTMLElement>('#catalog'); if (catalog) catalog.hidden = !active;
  const fragment = document.querySelector<HTMLDivElement>('#fragment-section'); if (fragment) fragment.hidden = active;
  const grid = document.querySelector<HTMLUListElement>('#catalog-grid');
  if (grid) {
    grid.hidden = !active;
    grid.replaceChildren(...products.map((product) => productCard(product, 'results')));
    if (active && !products.length) grid.append(el('li', 'empty-message', 'کالایی با این مشخصات پیدا نشد.'));
  }
  const result = document.querySelector<HTMLParagraphElement>('#result-count');
  if (result) result.textContent = `${formatNumber(products.length)} کالا${category ? ` در ${category.name}` : ''}`;
  const input = document.querySelector<HTMLInputElement>('#q'); if (input) input.value = query.search;
  document.querySelectorAll<HTMLAnchorElement>('[data-category]').forEach((anchor) => {
    if (anchor.dataset.category === query.category) anchor.setAttribute('aria-current', 'true');
    else anchor.removeAttribute('aria-current');
  });
};
