
import './theme';
import './menu';

import Fuse from 'fuse.js';
import {
  fetchShop, fetchCategories, fetchHome, fetchProducts,
  fetchStock, fetchOffers,
} from './api';
import { state, changeQty, updateCartBadge } from './state';
import { enrichShop, enrichCategories, enrichHome, enrichProduct } from './overrides';
import {
  notyf, renderShell, renderCarousels, renderCartButton, renderError,
  setupCarouselControls, renderBannerSkeletons, renderShellSkeletons,
  renderProductSkeletons
} from './ui';
import { setupSearch } from './search';
import { fireConfetti } from './confetti';

const MIN_SKELETON_MS = 300;

// Cart event delegation 
function setupCartEvents(): void {
  document.addEventListener('click', (e) => {
    if (!(e.target instanceof Element)) return;
    const btn = e.target.closest<HTMLButtonElement>('[data-action="inc"], [data-action="dec"]');
    if (!btn || btn.disabled) return;
    const actions = btn.closest<HTMLElement>('.product__actions');
    if (!actions) return;
    const id = actions.dataset.productId;
    if (!id) return;

    e.preventDefault();
    const name = actions.dataset.productName || 'کالا';
    const delta = btn.dataset.action === 'inc' ? 1 : -1;
    const qty = changeQty(id, delta);
    renderCartButton(actions, id, name);

    if (delta > 0) {
      notyf.success(`${name} به سبد اضافه شد`);
      fireConfetti(); 
    } else if (qty === 0) {
      notyf.error(`${name} از سبد حذف شد`);
    }

    const card = actions.closest<HTMLElement>('.product');
    if (card) {
      card.classList.remove('product--cart-pulse');
      void card.offsetWidth;
      card.classList.add('product--cart-pulse');
    }
  });
}

// Category navigation 
function getCatParam(): string {
  return new URLSearchParams(location.search).get('cat') || '';
}

function setupCategoryNavigation(): void {
  const applyFilter = (slug: string) => {
    const { home, categories, stockData } = state;
    if (!home || !stockData) return;

    const cat = categories.find((c) => c.slug === slug);
    if (!slug || !cat) {
      renderCarousels(home);
      return;
    }

    const filtered: typeof home = {
      ...home,
      carousels: [{ id: cat.slug, title: cat.name, emoji: cat.emoji, categoryId: cat.id }],
    };

    const root = document.getElementById('carousels-root');
    root?.querySelectorAll<HTMLElement>('section.products').forEach((sec) => {
      sec.hidden = sec.id !== cat.slug;
    });

    renderCarousels(filtered);
    const section = document.getElementById(cat.slug);
    if (section) section.hidden = false;
  };

  const clearFilter = () => {
    const root = document.getElementById('carousels-root');
    root?.querySelectorAll<HTMLElement>('section.products').forEach((s) => {
      s.hidden = false;
    });
    renderCarousels(state.home);
  };

  document.addEventListener('click', (e) => {
    if (!(e.target instanceof Element)) return;
    const link = e.target.closest<HTMLAnchorElement>('a[data-cat-slug], a.category');
    if (!link) return;
    const slug = link.dataset.catSlug;
    if (!slug) return;

    e.preventDefault();
    const url = new URL(location.href);
    url.searchParams.set('cat', slug);
    url.hash = slug;
    history.pushState({ cat: slug }, '', url);
    applyFilter(slug);
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  let lastCat = getCatParam();
  window.addEventListener('popstate', () => {
    const slug = getCatParam();
    if (slug === lastCat) return;
    lastCat = slug;
    if (slug) applyFilter(slug);
    else clearFilter();
  });
}

// Helpers 
function showSlowConnection(show: boolean): void {
  const el = document.getElementById('slow-connection');
  if (!el) return;
  if (show) {
    el.hidden = false;
    el.setAttribute('data-visible', 'true');
  } else {
    el.hidden = true;
    el.removeAttribute('data-visible');
  }
}

function errorMessage(err: unknown): string {
  if (err instanceof Error && err.name === 'AbortError') {
    return 'زمان انتظار برای دریافت داده به پایان رسید. لطفاً دوباره تلاش کنید.';
  }
  return 'داده‌ها در دسترس نیست. لطفاً اتصال اینترنت را بررسی کنید.';
}

function waitMinSkeleton(startedAt: number): Promise<void> {
  const remaining = MIN_SKELETON_MS - (performance.now() - startedAt);
  return remaining > 0 ? new Promise((r) => setTimeout(r, remaining)) : Promise.resolve();
}

function clearShellSkeletons(): void {
  document.getElementById('hero-video')?.classList.remove('hero-video--skeleton');
  document.getElementById('weekly-title')?.classList.remove('hero-carousel__title--skeleton');
}

function showAllErrors(message: string): void {
  ['offers', 'fruits', 'dairy'].forEach((id) => renderError(id, message));
}

// Init 
async function init(): Promise<void> {
  document.querySelector('.search')?.addEventListener('submit', (e) => e.preventDefault());

  updateCartBadge();
  setupCartEvents();
  setupCategoryNavigation();
  setupSearch();

  const startedAt = performance.now();
  const slowTimer = setTimeout(() => showSlowConnection(true), 3000);

  renderShellSkeletons();
  renderBannerSkeletons();
  renderProductSkeletons(); 

  try {
    const [shopRaw, categoriesRaw, homeRaw, productsRaw, stockData, offers] =
      await Promise.all([
        fetchShop(),
        fetchCategories(),
        fetchHome(),
        fetchProducts(),
        fetchStock(),
        fetchOffers(),
      ]);

    state.shop = enrichShop(shopRaw);
    state.categories = enrichCategories(categoriesRaw);
    state.home = enrichHome(homeRaw);
    state.products = productsRaw.map(enrichProduct);
    state.stockData = stockData;
    state.offers = offers;
    state.fuse = new Fuse(state.products, {
      keys: ['name', 'tags'],
      threshold: 0.4,
      ignoreLocation: true,
    });

    clearTimeout(slowTimer);
    showSlowConnection(false);
    await waitMinSkeleton(startedAt);

    renderShell();
    renderCarousels();
    setupCarouselControls();

    const catSlug = getCatParam();
    if (catSlug) {
      const url = new URL(location.href);
      url.searchParams.set('cat', catSlug);
      history.replaceState({ cat: catSlug }, '', url);
    }
  } catch (err: unknown) {
    clearTimeout(slowTimer);
    showSlowConnection(false);
    console.error('[shop] data failed:', err);
    await waitMinSkeleton(startedAt);
    clearShellSkeletons();
    showAllErrors(errorMessage(err));
    setupCarouselControls();
  }
}

init();