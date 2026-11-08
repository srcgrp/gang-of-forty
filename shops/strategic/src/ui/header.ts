/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { LinkOf, ShopData, ShopModel } from '../types';
import { dom } from './dom';
import { categoryImage } from './category-image';
import { el } from './el';
import { formatNumber } from './format';
import { icon } from './media';
import { safeHref, stripEmoji } from './safe';

export function renderNotice(shop: Readonly<ShopData>): void {
  const text = stripEmoji(shop.notice);
  dom.notice.replaceChildren(...(text ? [icon('truck', 'icon--mirror'), el('span', { text })] : []));
}

export function renderNav(model: ShopModel, linkOf: LinkOf): void {
  const megaLinks = model.categories.map((category) =>
    el('li', {}, [el('a', { href: linkOf(category.slug), 'data-route': true }, [categoryImage(model, category, 'cat__icon cat__icon--menu'), category.name])]));

  const menu = model.shop.menu.map((item) =>
    el('li', {}, [el('a', { href: safeHref(item.href), text: stripEmoji(item.label) })]));

  dom.navList.replaceChildren(
    el('li', { class: 'mega' }, [
      el('a', { href: '#categories' }, [icon('menu'), ' همه دسته‌ها']),
      el('ul', { class: 'mega-panel' }, megaLinks),
    ]),
    ...menu,
  );
  dom.search.placeholder = `جستجو در میان ${formatNumber(model.products.length)} کالا…`;
}