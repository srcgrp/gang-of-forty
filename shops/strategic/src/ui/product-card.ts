/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ProductItem } from '../types';
import { buyControl } from './buy-control';
import { el } from './el';
import { formatNumber, formatPrice } from './format';
import { IMG, image, placeholderPic } from './media';

function badgeOf({ soldOut, percent }: ProductItem): HTMLElement | null {
  if (soldOut) return el('span', { class: 'badge badge--out', text: 'ناموجود' });
  if (percent) return el('span', { class: 'badge' }, [`${formatNumber(percent)}٪`, el('span', { class: 'sr-only', text: ' تخفیف' })]);
  return null;
}

export function productCard(item: ProductItem): HTMLLIElement {
  const { product, art, soldOut, percent, oldPrice, price } = item;

  const priceBox = el('p', { class: 'price' }, percent
    ? [
        el('del', {}, [el('span', { class: 'sr-only', text: 'قیمت قبلی: ' }), formatNumber(oldPrice)]),
        el('strong', { text: formatPrice(price) }),
      ]
    : [el('strong', { text: formatPrice(price) })]);

  return el('li', { class: soldOut ? 'card card--out' : 'card' }, [
    el('article', { class: 'card__body' }, [
      el('div', { class: 'pic' }, [art ? image(`${IMG}products/${art}.webp`, { width: 600, height: 600 }) : placeholderPic(), badgeOf(item)]),
      el('h3', { text: product.name }),
      el('p', { class: 'unit', text: product.unit }),
      el('div', { class: 'buy' }, [priceBox, buyControl(product, soldOut)]),
    ]),
  ]);
}