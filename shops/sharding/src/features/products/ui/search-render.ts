import type { Product, Card } from '../../../shared/types';
import { renderSearchResults } from './search-results';

export function createSearchFor(
  products: Product[],
  toCard: (p: Product) => Card,
  input: HTMLInputElement,
  box: HTMLElement,
) {
  let fusePromise: Promise<import('fuse.js').default<Product>> | null = null;
  
  const getFuse = () => {
    if (!fusePromise) {
      fusePromise = import('fuse.js').then(({ default: Fuse }) =>
        new Fuse(products, { keys: ['name', 'tags'], threshold: 0.4, ignoreLocation: true }),
      );
    }
    return fusePromise;
  };

  const close = () => {
    box.hidden = true;
    box.replaceChildren();
  };

  const searchFor = async (query: string): Promise<void> => {
    const q = query.trim();
    if (!q) return close();
    const fuse = await getFuse();
    if (input.value.trim() !== q) return;
    const hits = fuse.search(q).map((r) => r.item).slice(0, 8);
    renderSearchResults(box, hits, toCard);
  };

  return { searchFor, close };
}