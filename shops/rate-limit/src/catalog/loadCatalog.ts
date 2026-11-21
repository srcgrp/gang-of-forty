import { fetchRawCatalog } from '../api/catalog';
import type { CatalogItem, LoadState } from '../types';
import { buildCatalog } from './build';

function toLoadState(items: CatalogItem[]): LoadState<CatalogItem> {
  return items.length === 0 ? { status: 'empty' } : { status: 'success', products: items };
}

export async function loadCatalog() {
  const raw = await fetchRawCatalog();
  const catalog = buildCatalog(raw.products, raw.offers, raw.stock, raw.categories);
  return { state: toLoadState(catalog.items), categories: catalog.categories, shop: raw.shop };
}