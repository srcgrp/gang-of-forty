/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ProductItem, ShopModel } from '../types';
import { OFFERS_VIEW } from './config';

export function catalogItems(model: ShopModel, slug: string): readonly ProductItem[] | null {
  if (slug === OFFERS_VIEW) return model.offerItems;
  const category = model.categoryBySlug.get(slug);
  return category ? model.itemsByCategory.get(category.id) ?? [] : null;
}