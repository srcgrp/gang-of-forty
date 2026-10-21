import type { ApiResult, Catalog } from '../types';
import { createProductCard } from './productCard';

function renderSkeleton(container: HTMLElement, count: number): void {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const card = document.createElement('div');
    card.className = 'skeleton-card';

    const img = document.createElement('div');
    img.className = 'skeleton-img';
    const title = document.createElement('div');
    title.className = 'skeleton-title';
    const price = document.createElement('div');
    price.className = 'skeleton-price';

    card.append(img, title, price);
    fragment.appendChild(card);
  }
  container.replaceChildren(fragment);
}

function renderMessage(container: HTMLElement, message: string, isError: boolean): void {
  const p = document.createElement('p');
  p.className = isError ? 'error-message' : 'empty-message';
  p.textContent = message;
  container.replaceChildren(p);
}

function renderProducts(container: HTMLElement, catalog: Catalog): void {
  const fragment = document.createDocumentFragment();
  for (const product of catalog.products) {
    fragment.appendChild(createProductCard(product, catalog));
  }
  container.replaceChildren(fragment);
}

export function renderSection(
  container: HTMLElement,
  state: ApiResult<Catalog>,
  emptyText: string,
): void {
  switch (state.status) {
    case 'loading':
      renderSkeleton(container, 4);
      return;
    case 'empty':
      renderMessage(container, emptyText, false);
      return;
    case 'error':
      renderMessage(container, state.message, true);
      return;
    case 'success':
      renderProducts(container, state.data);
      return;
    default: {
      const unhandled: never = state;
      throw new Error(`Unhandled state: ${JSON.stringify(unhandled)}`);
    }
  }
}
