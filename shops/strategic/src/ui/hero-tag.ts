/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ProductItem } from '../types';
import { HERO_NAMES } from './art';

export function heroTag(offerItems: readonly ProductItem[]): ProductItem | null {
  let best: ProductItem | null = null;
  for (const item of offerItems) {
    if (item.percent && !item.soldOut && item.art && HERO_NAMES.has(item.art) && (!best || item.percent > best.percent)) best = item;
  }
  return best;
}