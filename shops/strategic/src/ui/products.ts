/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ProductItem } from '../types';
import { el } from './el';
import { productCard } from './product-card';

export const renderProducts = (items: readonly ProductItem[]): HTMLUListElement =>
  el('ul', { class: 'grid' }, items.map((item) => productCard(item)));