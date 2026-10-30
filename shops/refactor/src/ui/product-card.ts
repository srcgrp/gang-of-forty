import type { ProductView } from '../types';
import { button, el, icon } from './dom';
import { formatNumber } from './format';

export const productCard = (product: ProductView, prefix: string): HTMLLIElement => {
  const card = el('li', `card${product.stock === 0 ? ' card--out' : ''}`);
  card.id = `${prefix}-product-${product.id}`;
  card.dataset.productId = String(product.id);
  const media = el('div', 'card-media');
  const emoji = el('span', 'card-emoji', product.emoji);
  emoji.setAttribute('aria-hidden', 'true'); media.append(emoji);
  if (product.percent > 0) media.append(el('span', 'chip-off', `${formatNumber(product.percent)}٪`));
  if (product.stock === 0) media.append(el('span', 'chip-out', 'ناموجود'));
  const body = el('div', 'card-body');
  body.append(el('h3', 'card-title', product.name), el('p', 'card-weight', product.unit));
  const price = el('p', 'price');
  if (product.percent > 0) {
    const original = el('del', '', formatNumber(product.originalPrice));
    original.prepend(el('span', 'sr-only', 'قیمت قبل از تخفیف: ')); price.append(original);
  }
  const amount = el('strong', '', formatNumber(product.price));
  amount.append(el('small', '', 'تومان')); price.append(amount);
  const add = button('', 'act-btn act-cart');
  add.dataset.add = String(product.id); add.disabled = product.stock === 0;
  add.setAttribute('aria-label', `افزودن ${product.name} به سبد خرید`);
  add.append(icon('i-cart'));
  const foot = el('div', 'card-foot'); foot.append(price, add);
  card.append(media, body, foot); return card;
};
