import type { Shelf, Card } from '../../../shared/types';
import { renderProductCard } from './product-card';
import { renderStatus } from './shelf-status';
import { buildShelf } from './shelf-builder';
export { buildShelf }; 

export function fillShelf(id: string, cards: Card[]): void {
  const grid = document.getElementById(`${id}-grid`);
  const status = document.getElementById(`${id}-status`);
  if (!grid || !status) return;

  if (cards.length === 0) {
    renderStatus(id, 'هنوز محصولی برای نمایش نداریم', 'فعلاً محصولی در این بخش موجود نیست.', false);
    return;
  }

  status.hidden = true;
  grid.hidden = false;
  grid.removeAttribute('aria-busy');
  grid.replaceChildren();

  const frag = document.createDocumentFragment();
  cards.forEach((card, i) => {
    const el = renderProductCard(card);
    el.style.setProperty('--i', String(i));
    if (i === 0) el.id = `${id}-start`;
    if (i === cards.length - 1) el.id = `${id}-end`;
    frag.appendChild(el);
  });
  grid.appendChild(frag);
}

export function renderPlaceholder(title: string, message: string, isError: boolean): void {
  const root = document.getElementById('product-shelves');
  if (!root) return;
  root.replaceChildren();
  const cfg: Shelf = { id: 'skeleton', title: 'محصولات' };
  root.appendChild(buildShelf(cfg));
  root.querySelector('.carousel-nav')?.remove();
  renderStatus(cfg.id, title, message, isError);
}