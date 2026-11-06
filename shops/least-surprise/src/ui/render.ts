import type { ProductWithDetails } from '../types';

export function updateCartBadge(count: number, cartBadge: HTMLElement): void {
  cartBadge.textContent = String(count);
}

export function renderProducts(
  products: ProductWithDetails[],
  container: HTMLElement,
  onAddToCart: (product: ProductWithDetails) => void,
): void {
  container.innerHTML = '';

  products.forEach((product) => {
    const card = document.createElement('div');
    card.className = 'product-card';

    const discount = product.discountPercent ?? 0;
    const finalPrice = discount > 0
      ? Math.round(product.price * (1 - discount / 100))
      : product.price;

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;
    img.className = 'product-image';

    const title = document.createElement('h3');
    title.className = 'product-title';
    title.textContent = product.title;

    const priceBox = document.createElement('div');
    priceBox.className = 'product-price-box';

    if (discount > 0) {
      const oldPrice = document.createElement('span');
      oldPrice.className = 'old-price';
      oldPrice.textContent = `${product.price.toLocaleString('fa-IR')} تومان`;
      priceBox.appendChild(oldPrice);
    }

    const currentPrice = document.createElement('span');
    currentPrice.className = 'current-price';
    currentPrice.textContent = `${finalPrice.toLocaleString('fa-IR')} تومان`;
    priceBox.appendChild(currentPrice);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'add-to-cart-btn';
    btn.textContent = 'افزودن به سبد';

    // کلیک مستقیم روی خود دکمه
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      onAddToCart(product);
    });

    // افزودن منظم به کارت
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(priceBox);
    card.appendChild(btn);

    container.appendChild(card);
  });
}
