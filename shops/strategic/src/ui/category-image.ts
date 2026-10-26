/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { Category, ShopModel } from '../types';
import { IMG, image } from './media';

export function categoryImage(model: ShopModel, category: Category, className: string, lazy = true): HTMLImageElement | null {
  const art = model.categoryArt.get(category.id);
  return art ? image(`${IMG}categories/${art}.webp`, { className, width: 96, height: 96, lazy }) : null;
}