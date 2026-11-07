/* Amirhossein (Armin) Panahi */

import type { LinkOf, ShopModel } from '../types';
import { el } from './el';
import { safeColor } from './safe';

export function renderCategories(model: ShopModel, linkOf: LinkOf): HTMLElement {
  const tiles = model.categories.map((category) => {
    const color = safeColor(category.color);
    const iconBox = el('span', {
      class: 'cat__icon-wrap',
      'aria-hidden': 'true',
      text: category.emoji,
    });

    if (color) iconBox.style.setProperty('--cat-bg', color);

    const link = el('a', {
      class: 'cat',
      href: linkOf(category.slug),
      'data-route': true,
    }, [iconBox, category.name]);

    return el('li', {}, [link]);
  });

  return el('section', { id: 'categories', 'aria-labelledby': 'categories-t' }, [
    el('div', { class: 'sec-head' }, [el('h2', { id: 'categories-t', text: 'دسته‌بندی‌ها' })]),
    el('ul', { class: 'cats' }, tiles),
  ]);
}