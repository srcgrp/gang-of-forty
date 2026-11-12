
import type { CatalogQuery } from '../types';

export const readQuery = (): CatalogQuery => {
  const params = new URLSearchParams(window.location.search);
  return { category: params.get('category') ?? '', search: params.get('q') ?? '' };
};

export const readFragment = (): string => {
  try { return decodeURIComponent(window.location.hash.slice(1)); }
  catch { return ''; }
};

export const writeQuery = (query: CatalogQuery): void => {
  const url = new URL(window.location.href);
  const values = { category: query.category, q: query.search };

  for (const [key, value] of Object.entries(values)) {
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  }

  url.hash = '';
  if (url.href !== window.location.href) history.pushState(null, '', url);
};
