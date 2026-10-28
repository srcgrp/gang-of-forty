/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ProductItem, ShopModel } from '../types';
import { BRAND } from './brand';
import { HERO_ART, findBannerArt } from './art';
import { el } from './el';
import { formatNumber, formatPrice } from './format';
import { IMG, image } from './media';
import { safeHref, stripEmoji } from './safe';

function heroStage(tag: ProductItem | null, offersHref: string): HTMLElement {
  return el('div', { class: 'hero__stage' }, [
    el('span', { class: 'hero__disc', 'aria-hidden': 'true' }),
    ...HERO_ART.map(([name, alt, width, height]) =>
      image(`${IMG}hero/${name}.webp`, { className: `hero__item hero__item--${name}`, alt, width, height, lazy: false, priority: name === 'tomato' })),
    tag && el('a', { class: 'hero__tag', href: offersHref }, [
      el('span', { class: 'hero__tag-name', text: `${tag.product.name}، ${tag.product.unit}` }),
      el('span', { class: 'hero__tag-row' }, [
        el('del', {}, [el('span', { class: 'sr-only', text: 'قیمت قبلی: ' }), formatNumber(tag.oldPrice)]),
        el('strong', { text: formatPrice(tag.price) }),
        el('span', { class: 'hero__tag-off' }, [`${formatNumber(tag.percent)}٪`, el('span', { class: 'sr-only', text: ' تخفیف' })]),
      ]),
    ]),
  ]);
}

export function renderHero(model: ShopModel, tag: ProductItem | null): HTMLElement {
  const { hero, side } = model.home;
  const offersDef = model.carousels.find((carousel) => carousel.source === 'offers');
  const stage = heroStage(tag, offersDef ? `#${offersDef.id}` : '#categories');

  const feature = el('div', { class: 'hero__feature' }, [
    el('div', { class: 'hero__copy' }, [
      el('h1', { class: 'hero__title' }, [
        el('span', { class: 'hero__brand', text: `${BRAND.name}،` }),
        el('span', { class: 'hero__headline', text: stripEmoji(hero.title) }),
      ]),
      el('p', { class: 'hero__lead', text: stripEmoji(hero.text) }),
      el('div', { class: 'hero__actions' }, [
        hero.cta && el('a', { class: 'btn', href: safeHref(hero.cta.href), text: stripEmoji(hero.cta.label) }),
        offersDef && el('a', { class: 'btn btn--outline', href: `#${offersDef.id}`, text: stripEmoji(offersDef.title) }),
      ]),
    ]),
    stage,
  ]);

  const [sideFile, , sideWidth, sideHeight] = findBannerArt(`${side.title} ${side.text}`);
  const promo = el('div', { class: 'hero__promo' }, [
    el('div', { class: 'hero__promo-copy' }, [
      el('h2', { class: 'hero__promo-title', text: stripEmoji(side.title) }),
      el('p', { class: 'hero__promo-note', text: stripEmoji(side.text) }),
      side.cta && el('a', { class: 'btn btn--green', href: safeHref(side.cta.href), text: stripEmoji(side.cta.label) }),
    ]),
    image(`${IMG}${sideFile}`, { className: 'hero__promo-art', width: sideWidth, height: sideHeight, lazy: false }),
  ]);

  return el('section', { class: 'hero', 'aria-label': 'پیشنهاد اصلی' }, [feature, promo]);
}