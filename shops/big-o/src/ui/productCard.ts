import type { CardInfo, Product } from '../types';
import { createBadge } from './badge';
import { formatNumber } from './format';
import { createPriceBox } from './priceBox';

export function createProductCard(
  product: Product,
  info: CardInfo,
  onAdd: (product: Product) => void,
): HTMLLIElement {
  const { percent, label, finalPrice, inStock = true } = info;

  // Main parts
  const img: HTMLElement = document.createElement('span');
  img.textContent = product.emoji;
  img.classList.add('product-img');
  img.setAttribute('aria-hidden', 'true');

  const title: HTMLHeadingElement = document.createElement('h3');
  title.textContent = product.name;
  title.id = `product-${product.id}`;

  const unit: HTMLParagraphElement = document.createElement('p');
  unit.textContent = product.unit;

  // Button: "+" icon (hidden from screen readers) and a hidden text for them
  const plus: HTMLElement = document.createElement('span');
  plus.textContent = '+';
  plus.setAttribute('aria-hidden', 'true');

  const plusText: HTMLElement = document.createElement('span');
  plusText.textContent = 'افزودن به سبد خرید';
  plusText.classList.add('visually-hidden');

  const button: HTMLButtonElement = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-describedby', title.id);
  button.append(plus, plusText);
  button.addEventListener('click', () => onAdd(product));

  // Footer: price + button
  const footer: HTMLDivElement = document.createElement('div');
  footer.classList.add('card-footer');
  footer.append(createPriceBox(product.price, finalPrice), button);

  // Card: image, optional badge, title, unit, footer
  const card: HTMLElement = document.createElement('article');
  card.classList.add('product-card');
  card.append(img);

  if (!inStock) {
    card.classList.add('out-of-stock');
    button.disabled = true;
    card.append(createBadge('ناموجود', 'ناموجود', 'stock-badge'));
  } else if (label !== undefined && percent !== undefined) {
    card.append(createBadge(`${formatNumber(percent)} ٪`, label, 'discount-badge'));
  }

  card.append(title, unit, footer);

  // List item that wraps the card
  const item: HTMLLIElement = document.createElement('li');
  item.append(card);
  return item;
}