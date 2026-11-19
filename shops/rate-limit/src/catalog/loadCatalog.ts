import { fetchRawCatalog } from '../api/catalog';
import type { Catalog } from '../types';
import { buildCatalog } from './build';

export async function loadCatalog(): Promise<Catalog> {
  const raw = await fetchRawCatalog();
  return buildCatalog(raw.products, raw.offers, raw.stock, raw.categories, raw.shop);
}
