import type { ProductCardData } from '../types';
import { createProductCard } from './product-card';
export function renderProductCards(container: HTMLElement, cards: ProductCardData[], anchorPrefix?: string): void {
  const fragment = document.createDocumentFragment();
  if (anchorPrefix) { const start = document.createElement('span'); start.id = `${anchorPrefix}-start`; start.className = 'anchor-section'; fragment.append(start); }
  cards.forEach((data) => fragment.append(createProductCard(data)));
  if (anchorPrefix) { const end = document.createElement('span'); end.id = `${anchorPrefix}-end`; end.className = 'anchor-section'; fragment.append(end); }
  container.replaceChildren(fragment);
}
export function renderSuggestionsCount(count: number): void {
  const input = document.querySelector<HTMLInputElement>('.header__search input');
  if (input) input.placeholder = `می‌تونی بین ${count.toLocaleString('fa-IR')} محصول جستجو کنی`;
}
