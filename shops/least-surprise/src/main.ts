import confetti from 'canvas-confetti';
import { getJSON, isProduct, isStockItem, isOfferItem } from './api/products';
import { addToCart } from './cart/cart';
import { renderProducts, updateCartBadge } from './ui/render';
import type { CartItem, ProductWithDetails, LoadState } from './types';

let cart: CartItem[] = [];

function triggerConfetti(): void {
  void confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    zIndex: 99999,
  });
}

function handleAdd(product: ProductWithDetails, badgeEl: HTMLElement): void {
  cart = addToCart(cart, product, product.stock);
  const cur = Number.parseInt(badgeEl.textContent?.trim() || '3', 10);
  const next = Number.isNaN(cur) ? 4 : cur + 1;
  updateCartBadge(next, badgeEl);
  triggerConfetti();
}

function renderUI(state: LoadState, root: HTMLElement, badge: HTMLElement): void {
  switch (state.status) {
    case 'loading':
      root.innerHTML = '<div class="loading">در حال بارگذاری...</div>';
      break;
    case 'empty':
      root.innerHTML = '<div class="empty">محصولی یافت نشد.</div>';
      break;
    case 'error':
      root.innerHTML = `<div class="error">خطا: ${state.message}</div>`;
      break;
    case 'success':
      renderProducts(state.products, root, (p) => handleAdd(p, badge));
      break;
    default: {
      const ex: never = state;
      return ex;
    }
  }
}

async function start(): Promise<void> {
  const base = import.meta.env.BASE_URL ?? '/';
  const root = document.querySelector<HTMLElement>('#products-container') ??
               document.querySelector<HTMLElement>('.products-grid') ??
               document.querySelector<HTMLElement>('main');
  const badge = document.querySelector<HTMLElement>('#cart-badge') ??
                document.querySelector<HTMLElement>('.cart-badge') ??
                document.querySelector<HTMLElement>('.badge');

  if (!root || !badge) return;
  renderUI({ status: 'loading' }, root, badge);

  try {
    const [rawP, rawS, rawO] = await Promise.all([
      getJSON<unknown[]>(`${base}products.json`),
      getJSON<unknown[]>(`${base}stock.json`),
      getJSON<unknown[]>(`${base}offers.json`),
    ]);

    const prods = Array.isArray(rawP) ? rawP.filter(isProduct) : [];
    const stocks = Array.isArray(rawS) ? rawS.filter(isStockItem) : [];
    const offers = Array.isArray(rawO) ? rawO.filter(isOfferItem) : [];

    if (prods.length === 0) {
      renderUI({ status: 'empty' }, root, badge);
      return;
    }

    const items: ProductWithDetails[] = prods.map((p) => ({
      ...p,
      stock: stocks.find((s) => s.id === p.id)?.stock ?? 0,
     discountPercent: offers.find((o) => o.id === p.id)?.discountPercent ?? 0,

    }));

    renderUI({ status: 'success', products: items }, root, badge);
  } catch (err) {
    renderUI({ status: 'error', message: err instanceof Error ? err.message : 'خطا' }, root, badge);
  }
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', () => void start())
  : void start();
