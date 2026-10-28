import confetti from 'canvas-confetti';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
  duration: 3000,
  position: { x: 'left', y: 'bottom' },
  ripple: true,
  dismissible: true
});


interface Product {
  id: number;
  name: string;
  price: number;
  unit?: string;    
  emoji?: string;
  categoryId: number;
  tags?: string[];
}


const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
}

const createProductCard = (product: Product): HTMLElement => {
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

  const cardBtn: HTMLElement  = document.createElement('div');
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
}








const loadProducts = async(): Promise<void> => {
  const carousel = document.querySelector<HTMLElement>('#discounted-carousel');
  if(!carousel) return;
  const loadingText = carousel.querySelector<HTMLElement>('.loading-state');
  const errorText = carousel.querySelector<HTMLLIElement>('.error-state');

  try {
    const response = await fetch('/api/products.json');

    if (!response.ok) {
      throw new Error('مشکل در دریافت داده‌ها از سرور');
    }

    const products = await response.json();

    const dairyProducts = products.filter((product: Product) => product.categoryId === 7);

    if (loadingText) {
      loadingText.remove();
    }

    dairyProducts.forEach((product: Product) => {
      const card = createProductCard(product);
      if (carousel){
      carousel.appendChild(card);
    }
    });

  } catch (error: unknown) {
    console.error('خطا:', error);
    if (loadingText) {
      loadingText.remove();
    }
    if (errorText) {
      errorText.hidden = false;
    }
  }
}

loadProducts();
