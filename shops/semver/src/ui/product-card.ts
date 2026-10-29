import confetti from 'canvas-confetti';
import type { ProductView } from '../types';
import { formatPrice } from './format';
import { notyf } from './notify';

const discountedPrice = (price: number, percent: number): number => {
  return Math.round((price * (100 - percent)) / 100);
};

export const createProductCard = (item: ProductView): HTMLElement => {
  const { product, offer, stock } = item;
  const isOutOfStock = stock === 0;

  const card: HTMLElement = document.createElement('article');
  card.className = 'product-cart';
  if (isOutOfStock) {
    card.classList.add('out-of-stock');
  }

  if (offer && !isOutOfStock) {
    const badge: HTMLElement = document.createElement('span');
    badge.className = 'offer-badge';
    badge.textContent = `${offer.percent}٪ تخفیف`;
    card.appendChild(badge);
  }

  if (isOutOfStock) {
    const badge: HTMLElement = document.createElement('span');
    badge.className = 'stock-badge';
    badge.textContent = 'ناموجود';
    card.appendChild(badge);
  }

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

  const prices: HTMLElement = document.createElement('div');
  prices.className = 'prices';

  const finalPrice = offer ? discountedPrice(product.price, offer.percent) : product.price;

  if (offer) {
    const oldPrice: HTMLElement = document.createElement('span');
    oldPrice.className = 'price-old';
    oldPrice.textContent = formatPrice(product.price);
    prices.appendChild(oldPrice);
  }

  const priceLabel: HTMLElement = document.createElement('p');
  priceLabel.className = 'price-label';
  priceLabel.textContent = formatPrice(finalPrice);
  prices.appendChild(priceLabel);

  const buyBtn: HTMLButtonElement = document.createElement('button');
  buyBtn.className = 'buynow-btn';
  buyBtn.setAttribute('type', 'button');
  buyBtn.textContent = '+';

  if (isOutOfStock) {
    buyBtn.disabled = true;
    buyBtn.setAttribute('aria-label', `${product.name} ناموجود است`);
  } else {
    buyBtn.setAttribute('aria-label', `افزودن ${product.name} به سبد خرید`);
    buyBtn.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation();

      notyf.success(`${product.name} به سبد خرید اضافه شد!`);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    });
  }

  cardBtn.appendChild(prices);
  cardBtn.appendChild(buyBtn);

  card.appendChild(imgBox);
  card.appendChild(details);
  card.appendChild(cardBtn);

  return card;
};
