/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ShopModel } from '../types';
import { dom } from './dom';
import { el } from './el';
import { safeHref, stripEmoji } from './safe';

export function renderFooterData(model: ShopModel): void {
  const { footer } = dom;
  const { shop } = model;

  footer.about.textContent = stripEmoji(shop.about);

  footer.cats.replaceChildren(...model.categories.map((category) =>
    el('li', {}, [el('a', { href: `#${category.slug}`, text: category.name })])));

  footer.help.replaceChildren(...(Array.isArray(shop.help) ? shop.help : []).map((item) => {
    const label = stripEmoji(item.label);
    return el('li', {}, [item.href && item.href !== '#' ? el('a', { href: safeHref(item.href), text: label }) : label]);
  }));

  footer.hours.replaceChildren(...(Array.isArray(shop.schedule) ? shop.schedule : []).map((row) =>
    el('li', { text: `${row.days}: ${row.time}` })));
}