import type { EnrichedProduct } from '../types';
import { Notyf } from 'notyf';
import confetti from 'canvas-confetti';

const faNum = new Intl.NumberFormat('fa-IR');

export const notyf = new Notyf({
  duration: 2000,
  position: { x: 'center', y: 'bottom' }
});

export function createProductCard(product: EnrichedProduct, onAdd: (p: EnrichedProduct) => void): HTMLElement {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.id = `p-${product.id}`;

  if (product.offer) {
    const pct = faNum.format(product.offer.percent);
    const badge = document.createElement('span');
    badge.className = 'discount';
    badge.textContent = `${pct}٪`;
    card.append(badge);
  }

  const img = document.createElement('div');
  img.className = 'product-img';
  const emoji = document.createElement('span');
  emoji.textContent = product.emoji || '🛒';
  emoji.setAttribute('aria-hidden', 'true');
  img.append(emoji);
  card.append(img);

  const title = document.createElement('h3');
  title.textContent = product.name;
  card.append(title);

  const meta = document.createElement('p');
  meta.className = 'product-meta';
  meta.textContent = product.unit;
  card.append(meta);

  const foot = document.createElement('div');
  foot.className = 'product-foot';
  
  const price = document.createElement('span');
  price.className = 'price';
  price.textContent = `${faNum.format(product.price)} تومان`;
  foot.append(price);

  const btn = document.createElement('button');
  btn.className = 'add-btn';
  btn.type = 'button';
  btn.textContent = product.stock > 0 ? '+' : '✕';
  
  if (product.stock <= 0) {
    btn.disabled = true;
    card.classList.add('out-of-stock');
    const outBadge = document.createElement('span');
    outBadge.className = 'out-badge';
    outBadge.textContent = 'ناموجود';
    card.append(outBadge);
  } else {
    btn.addEventListener('click', () => {
      onAdd(product);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.8 } });
    });
  }
  
  foot.append(btn);
  card.append(foot);
  return card;
}

export function renderCarousel(container: HTMLUListElement, products: EnrichedProduct[], onAdd: (p: EnrichedProduct) => void): void {
  container.replaceChildren();
  container.setAttribute('aria-busy', 'false');
  
  if (products.length === 0) {
    const li = document.createElement('li');
    li.className = 'carousel-state';
    li.textContent = 'محصولی برای نمایش نیست.';
    container.append(li);
    return;
  }

  const frag = document.createDocumentFragment();
  products.forEach(p => {
    const li = document.createElement('li');
    li.append(createProductCard(p, onAdd));
    frag.append(li);
  });
  container.append(frag);
}