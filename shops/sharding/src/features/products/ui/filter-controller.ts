import type { AppState, UrlFilters } from '../../../shared/types';
import { cardOf } from '../logic/to-card';
import { setupCatFilter, showCategory } from './category-filter';
import { setupSearch } from './search';

export function setupFilters(
  state: AppState,
  readFilters: () => UrlFilters,
  writeFilters: (filters: UrlFilters, mode?: 'push' | 'replace') => void,
  readHash: () => string,
): void {
  let filters = readFilters();
  showCategory(filters.category, state.categories);

  const restoreSearch = setupSearch({
    products: state.products,
    toCard: (product) => cardOf(product, state),
    initialQuery: filters.query,
    onQueryChange: (query) => {
      filters.query = query;
      writeFilters(filters);
    },
  });

  setupCatFilter({
    onSelect: (category) => {
      filters.category = category;
      writeFilters(filters, 'push');
      showCategory(category, state.categories);
    },
    onPop: () => {
      filters = readFilters();
      showCategory(filters.category, state.categories);
      restoreSearch(filters.query);
    },
    onHiddenShelf: () => {
      filters.category = '';
      writeFilters(filters);
      showCategory('', state.categories);
    },
    getHash: readHash,
  });
}
