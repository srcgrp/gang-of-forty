import { fetchShopData } from './api/index';
import { renderCarousel, notyf } from './ui/index';
import { getCart, saveCart } from './storage/index';
import { addToCart, getCartCount } from './cart/index';
import type { EnrichedProduct, LoadState } from './types';

async function init(): Promise<void> {
  const specialList = document.querySelector<HTMLUListElement>('#special .carousel');
  const regularList = document.querySelector<HTMLUListElement>('#regular .carousel');
  const cartBadge = document.getElementById('cart-count');

  if (!specialList || !regularList || !cartBadge) return;

  let cart = getCart();
  const updateCartUI = () => {
    cartBadge.textContent = new Intl.NumberFormat('fa-IR').format(getCartCount(cart));
  };
  updateCartUI();

  const handleAddToCart = (product: EnrichedProduct) => {
    cart = addToCart(cart, product);
    saveCart(cart);
    updateCartUI();
    notyf.success(`«${product.name}» به سبد اضافه شد`);
  };

  let state: LoadState = { status: 'loading' };
  
  [specialList, regularList].forEach(list => {
    const li = document.createElement('li');
    li.className = 'carousel-state';
    li.innerHTML = '<span class="spinner"></span><span>در حال بارگذاری...</span>';
    list.replaceChildren(li);
  });

  try {
    const { products, offers, stock } = await fetchShopData();
    
    const enriched: EnrichedProduct[] = products.map(p => ({
      ...p,
      stock: stock.items[p.id] ?? 1,
      offer: offers.find(o => o.productId === p.id) || null
    }));

    state = { status: 'success', data: enriched };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'خطای ناشناخته';
    state = { status: 'error', message };
  }

  if (state.status === 'success') {
    renderCarousel(specialList, state.data.filter(p => p.offer !== null), handleAddToCart);
    renderCarousel(regularList, state.data, handleAddToCart);
  } else if (state.status === 'error') {
    [specialList, regularList].forEach(list => {
      const li = document.createElement('li');
      li.className = 'carousel-state carousel-error';
      li.textContent = `⚠️ ${state.message}`;
      list.replaceChildren(li);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => { init(); });