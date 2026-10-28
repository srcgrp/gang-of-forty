/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { LinkOf, ShopModel } from '../types';
import { dom } from './dom';
import { el } from './el';
import { safeHref, stripEmoji } from './safe';

export function renderFooterData(model: ShopModel, linkOf: LinkOf): void {
  const { footer } = dom;
  const { shop } = model;

  footer.about.textContent = stripEmoji(shop.about);

  footer.cats.replaceChildren(...model.categories.map((category) =>
    el('li', {}, [el('a', { href: linkOf(category.slug), 'data-route': true, text: category.name })])));

  footer.help.replaceChildren(...shop.help.map((item) => {
    const label = stripEmoji(item.label);
    return el('li', {}, [item.href && item.href !== '#' ? el('a', { href: safeHref(item.href), text: label }) : label]);
  }));

  footer.hours.replaceChildren(...shop.schedule.map((row) =>
    el('li', { text: `${row.days}: ${row.time}` })));
}