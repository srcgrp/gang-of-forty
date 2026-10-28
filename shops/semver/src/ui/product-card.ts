import confetti from 'canvas-confetti';
import type { Product } from '../types';
import { formatPrice } from './format';
import { notyf } from './notify';

export const createProductCard = (product: Product): HTMLElement => {
  const card: HTMLElement = document.createElement('article');
  card.className = 'product-cart';

  const imgBox: HTMLDivElement = document.createElement('div');
  imgBox.className = 'img';

  const emoji: HTMLElement = document.createElement('span');
  emoji.className = 'img-product';
  emoji.style.fontSize = '4rem';
  emoji.style.display = 'grid';
  emoji.style.placeItems = 'center';
  emoji.textContent = product.emoji || '📦';

  imgBox.appendChild(emoji);

  const details: HTMLElement = document.createElement('div');
  details.className = 'product-details';

  const title: HTMLElement = document.createElement('p');
  title.className = 'product-description';
  title.textContent = product.name;

  details.appendChild(title);

  const unit: HTMLElement = document.createElement('span');
  unit.className = 'product-unit';
  unit.textContent = product.unit || '';
  details.appendChild(unit);

  const cardBtn: HTMLElement = document.createElement('div');
  cardBtn.className = 'card-btn';

  const priceLabel: HTMLElement = document.createElement('p');
  priceLabel.className = 'price-label';
  priceLabel.textContent = formatPrice(product.price);

  const buyBtn: HTMLButtonElement = document.createElement('button');
  buyBtn.className = 'buynow-btn';
  buyBtn.setAttribute('type', 'button');
  buyBtn.setAttribute('aria-label', `افزودن ${product.name} به سبد خرید`);
  buyBtn.textContent = '+';

  buyBtn.addEventListener('click', (e: MouseEvent) => {
    e.stopPropagation();

    notyf.success(`${product.name} به سبد خرید اضافه شد!`);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
    });
  });

  cardBtn.appendChild(priceLabel);
  cardBtn.appendChild(buyBtn);

  card.appendChild(imgBox);
  card.appendChild(details);
  card.appendChild(cardBtn);

  return card;
};
