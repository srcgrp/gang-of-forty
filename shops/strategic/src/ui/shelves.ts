/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { LinkOf, Category, ShopModel } from '../types';
import { categoryImage } from './category-image';
import { OFFERS_VIEW } from '../types';
import { el } from './el';
import { IMG, icon, image } from './media';
import { FALLBACK_BANNER } from './art';
import { productCard } from './product-card';
import { stripEmoji } from './safe';
import { arrowButton, seeAllCard } from './shelf-parts';

export function offersCarousel(model: ShopModel, def: ShopModel['carousels'][number], linkOf: LinkOf): HTMLElement {
  const title = stripEmoji(def.title);
  const words = title.split(' ').flatMap((word, index) => (index ? [' ', el('span', { text: word })] : [el('span', { text: word })]));
  const [artFile, , artWidth, artHeight] = FALLBACK_BANNER;

  const intro = el('div', { class: 'offers__intro' }, [
    el('h2', { class: 'offers__title', id: `${def.id}-t` }, words),
    image(`${IMG}${artFile}`, { className: 'offers__art', width: artWidth, height: artHeight }),
    el('a', { class: 'offers__all', href: linkOf(OFFERS_VIEW), 'data-route': true }, ['مشاهده همه ', icon('chevron-right', 'icon--mirror')]),
  ]);

  const list = el('ul', { class: 'offers__list' }, [...model.offerItems.map((item) => productCard(item)), seeAllCard(linkOf(OFFERS_VIEW), title)]);

  return el('section', { class: 'shelf offers', id: def.id, 'aria-labelledby': `${def.id}-t` }, [
    el('div', { class: 'offers__box' }, [
      el('div', { class: 'offers__scroller' }, [intro, list]),
      arrowButton(-1, `محصولات قبلی «${title}»`, 'offers__nav offers__nav--prev'),
      arrowButton(1, `محصولات بعدی «${title}»`, 'offers__nav offers__nav--next'),
    ]),
  ]);
}

export function categoryCarousel(model: ShopModel, id: string, category: Category, title: string, linkOf: LinkOf): HTMLElement {
  const items = model.itemsByCategory.get(category.id) ?? [];
  return el('section', { class: 'shelf', id, 'aria-labelledby': `${id}-t` }, [
    el('div', { class: 'sec-head' }, [
      el('h2', { id: `${id}-t` }, [categoryImage(model, category, 'cat__icon cat__icon--head', false), title]),
      el('div', { class: 'arrows' }, [
        arrowButton(-1, `محصولات قبلی «${title}»`, 'arr'),
        arrowButton(1, `محصولات بعدی «${title}»`, 'arr'),
      ]),
    ]),
    el('ul', { class: 'rail' }, [...items.map((item) => productCard(item)), seeAllCard(linkOf(category.slug), title)]),
  ]);
}