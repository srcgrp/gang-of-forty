/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { LinkOf, ShopModel } from '../types';
import { categoryImage } from './category-image';
import { el } from './el';
import { icon } from './media';
import { safeColor } from './safe';

export function renderCategories(model: ShopModel, linkOf: LinkOf): HTMLElement {
  const tiles = model.categories.map((category) => {
    const color = safeColor(category.color);
    const iconBox = el('span', { class: 'cat__icon-wrap' }, [categoryImage(model, category, 'cat__icon', false) ?? icon('bag')]);
    if (color) iconBox.style.setProperty('--cat-bg', color);
    return el('li', {}, [el('a', { class: 'cat', href: linkOf(category.slug), 'data-route': true }, [iconBox, category.name])]);
  });

  return el('section', { id: 'categories', 'aria-labelledby': 'categories-t' }, [
    el('div', { class: 'sec-head' }, [el('h2', { id: 'categories-t', text: 'دسته‌بندی‌ها' })]),
    el('ul', { class: 'cats' }, tiles),
  ]);
}