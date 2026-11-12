import type { CatalogItem } from '../types';

const normalize = (s: string) =>
  s.trim().toLowerCase().replace(/ي/g, 'ی').replace(/ك/g, 'ک');

export function matchesQuery(item: CatalogItem, query: string): boolean {
  const q = normalize(query);
  if (q === '') return true;
  return [item.name, ...item.tags].some((text) => normalize(text).includes(q));
}

export function filterItems(
  items: CatalogItem[],
  { categoryId = null, query = '' }: { categoryId?: number | null; query?: string },
): CatalogItem[] {
  return items.filter(
    (item) => (categoryId === null || item.categoryId === categoryId) && matchesQuery(item, query),
  );
}
