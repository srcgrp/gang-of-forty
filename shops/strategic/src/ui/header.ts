/* Amirhossein (Armin) Panahi */

import type { LinkOf, ShopData, ShopModel } from '../types';
import { dom } from './dom';
import { el } from './el';
import { formatNumber } from './format';
import { icon } from './media';
import { safeHref, stripEmoji } from './safe';

export function renderNotice(shop: Readonly<ShopData>): void {
  const text = stripEmoji(shop.notice);
  dom.notice.replaceChildren(...(text ? [icon('truck', 'icon--mirror'), el('span', { text })] : []));
}

export function renderNav(model: ShopModel, linkOf: LinkOf): void {
  const megaLinks = model.categories.map((category) => {
    const emoji = el('span', {
      class: 'cat__icon cat__icon--menu',
      'aria-hidden': 'true',
      text: category.emoji,
    });

    const link = el('a', {
      href: linkOf(category.slug),
      'data-route': true,
    }, [emoji, category.name]);

    return el('li', {}, [link]);
  });

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