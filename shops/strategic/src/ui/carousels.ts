/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { LinkOf, ShopModel } from '../types';
import { SHOW_REMAINING_CATEGORIES } from './config';
import { stripEmoji } from './safe';
import { categoryCarousel, offersCarousel } from './shelves';

export function renderCarousels(model: ShopModel, linkOf: LinkOf): HTMLElement[] {
  const sections: HTMLElement[] = [];
  const usedIds = new Set<string>(['categories', 'contact', 'top', 'main']);
  const coveredCategories = new Set<number>();

  for (const def of model.carousels) {
    if (usedIds.has(def.id)) continue;
    if (def.source === 'offers') {
      sections.push(offersCarousel(model, def, linkOf));
      usedIds.add(def.id);
    } else if (typeof def.categoryId === 'number') {
      const category = model.categoryById.get(def.categoryId);
      if (!category) continue;
      sections.push(categoryCarousel(model, def.id, category, stripEmoji(def.title) || category.name, linkOf));
      coveredCategories.add(category.id);
      usedIds.add(def.id);
    }
  }

  if (SHOW_REMAINING_CATEGORIES) {
    for (const category of model.categories) {
      if (!coveredCategories.has(category.id) && !usedIds.has(category.slug)) {
        sections.push(categoryCarousel(model, category.slug, category, category.name, linkOf));
      }
    }
  }
  return sections;
}