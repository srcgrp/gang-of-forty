import type { Catalog, Product } from '../types';
import { formatToman, toPersianDigits } from '../logic/format';
import { discountedPrice } from '../logic/pricing';

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function createProductCard(product: Product, catalog: Catalog): HTMLElement {
  const offer = catalog.offerMap.get(product.id);
  const outOfStock = catalog.stockMap.get(product.id) === 0;

  const card = el('div', 'carousel-card-sells');
  if (outOfStock) card.classList.add('out-of-stock');

  if (outOfStock) {
    card.appendChild(el('span', 'out-of-stock-badge', 'ناموجود'));
  } else if (offer) {
    card.appendChild(el('span', 'discount-badge', `٪${toPersianDigits(offer.percent)}`));
  }

  card.appendChild(el('div', 'carousel-image-sells', product.emoji));

  const addBtn = el('button', 'add-to-cart', '+');
  addBtn.type = 'button';
  addBtn.setAttribute('aria-label', `افزودن ${product.name} به سبد خرید`);
  addBtn.disabled = outOfStock;
  card.appendChild(addBtn);

  card.appendChild(el('h3', 'card-title-sells', product.name));

  const amountWrap = el('div', 'sell-amount-wrap');
  amountWrap.appendChild(el('p', 'sell-amount', product.unit));
  card.appendChild(amountWrap);

  const priceRow = el('div', 'price-row');
  if (offer) {
    priceRow.appendChild(
      el('p', 'price', formatToman(discountedPrice(product.price, offer.percent))),
    );
    priceRow.appendChild(el('del', 'old-price', formatToman(product.price)));
  } else {
    priceRow.appendChild(el('p', 'price regular-price', formatToman(product.price)));
  }
  card.appendChild(priceRow);

  return card;
}
