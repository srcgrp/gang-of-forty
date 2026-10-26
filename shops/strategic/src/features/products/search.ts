/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import { SORTS } from '../../types';
import type { ProductItem, SearchIndexEntry, Sort } from '../../types';
import { searchKey } from './search-key';

export function visibleProducts(index: readonly SearchIndexEntry[], query: string, sort: Sort = SORTS[0]): ProductItem[] {
  const terms = searchKey(query).split(' ').filter(Boolean);
  if (!terms.length) return [];

  const inName = (entry: SearchIndexEntry): boolean => terms.every((term) => entry.name.includes(term));
  const matches = index.filter((entry) =>
    terms.every((term) => entry.text.includes(term) || entry.categoryWords.includes(term)),
  );

  matches.sort((first, second) => {
    if (sort === 'name') return first.item.product.name.localeCompare(second.item.product.name, 'fa');
    return Number(inName(second)) - Number(inName(first));
  });
  return matches.map((entry) => entry.item);
}