import type { Product, Card } from '../../../shared/types';
import { closestTarget } from '../../../shared/ui/dom';
import { createSearchFor } from './search-render';

type SearchDeps = {
  products: Product[];
  toCard: (p: Product) => Card;
  initialQuery: string;
  onQueryChange: (query: string) => void;
};

export function setupSearch(deps: SearchDeps): (query: string) => void {
  const input = document.querySelector<HTMLInputElement>('#search-input');
  const box = document.getElementById('search-results');
  if (!input || !box) return () => {};

  input.closest('form')?.addEventListener('submit', (e) => e.preventDefault());

  const { searchFor, close } = createSearchFor(deps.products, deps.toCard, input, box);

  input.addEventListener('focus', () => void searchFor(input.value), { once: true });

  input.value = deps.initialQuery;

  input.addEventListener('input', () => {
    const query = input.value.trim();
    deps.onQueryChange(query);
    void searchFor(query);
  });

  if (deps.initialQuery.trim()) {
    void searchFor(deps.initialQuery);
  }

  box.addEventListener('click', (e) => {
    const item = closestTarget<HTMLElement>(e, '.search-results__item');
    if (!item || item.dataset.stock === 'out') return;
    if (closestTarget(e, '.search-results__actions')) return;
    
    const pid = item.dataset.productId;
    if (pid) {
      close();
      document.querySelector(`[data-product-id="${pid}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.composedPath().includes(box) && e.target !== input) close();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  return (query: string) => {
    input.value = query;
    void searchFor(query);
  };
}