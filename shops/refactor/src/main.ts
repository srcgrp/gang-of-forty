import type { AppData, CartItem, CatalogQuery, LoadState } from './types';
import { loadWithDeadline } from './api/load-with-deadline';
import { readCart, writeCart } from './storage/cart';
import { readQuery, writeQuery, readFragment } from './storage/url';
import { cartCount, reconcileCart, setQuantity } from './features/cart/calculate';
import { selectCatalog, selectCarousel, selectCategoryShelf } from './features/catalog/select';
import { renderCartBadge } from './ui/cart-badge';
import { renderShop } from './ui/shop';
import { renderHero } from './ui/hero';
import { renderCatalog, renderHomeSections, renderCategoryFragment } from './ui/catalog';
import { renderState, announce, scrollToFragment, scrollToCatalog } from './ui/state';
import { bindEvents } from './ui/events';
import { addedToCart } from './ui/feedback';

let state: LoadState = { status: 'loading' };
let items: CartItem[] = readCart();
let query: CatalogQuery = readQuery();
let controller: AbortController | undefined;

const data = (): AppData | undefined => state.status === 'success' || state.status === 'empty' ? state.data : undefined;

const refreshCart = (): void => { renderCartBadge(cartCount(items)); };
const refreshCatalog = (shop: AppData): void => renderCatalog(selectCatalog(shop.products, shop.categories, query));
const persistCart = (): void => {
  if (!writeCart(items)) announce('ذخیره‌سازی مرورگر در دسترس نیست؛ سبد تا پایان این نشست نگه داشته می‌شود.');
  refreshCart();
};

const updateQuery = (next: CatalogQuery): void => {
  query = next; writeQuery(query); const shop = data();
  if (shop) { refreshCatalog(shop); applyFragment(); }
};

const changeQuery = (next: CatalogQuery): void => {
  updateQuery(next); scrollToCatalog();
};

const add = (id: number): void => {
  const product = data()?.products.find((entry) => entry.id === id);
  if (!product || product.stock === 0) return;
  const current = items.find((entry) => entry.id === id)?.quantity ?? 0;
  if (current >= product.stock) { announce('همهٔ موجودی این کالا در سبد شماست.'); return; }
  items = setQuantity(items, product, current + 1); persistCart(); addedToCart(product.name);
};

const applyFragment = (): void => {
  const fragment = readFragment(), shop = data();
  if (shop) renderCategoryFragment(selectCategoryShelf(shop.products, shop.categories, fragment), fragment);
  scrollToFragment(fragment);
};

const render = (shop: AppData): void => {
  renderShop(shop); renderHero(shop.home);
  renderHomeSections(shop.home.carousels.map((shelf) => ({ ...shelf, products: selectCarousel(shop.products, shelf) })), shop.home);
  refreshCatalog(shop);
  const reconciled = reconcileCart(items, shop.products);
  const changed = JSON.stringify(items) !== JSON.stringify(reconciled); items = reconciled; persistCart();
  const notices = [...shop.notices]; if (changed) notices.push('سبد خرید با موجودی فعلی هماهنگ شد.');
  if (query.category && !shop.categories.some((category) => category.slug === query.category))
    notices.push('دسته‌بندی درخواستی وجود ندارد؛ می‌توانید فیلتر را پاک کنید.');
  if (notices.length) announce(notices.join(' ')); applyFragment();
};

const start = async (): Promise<void> => {
  controller?.abort(); const current = new AbortController(); controller = current;
  state = { status: 'loading' }; renderState(state, () => { void start(); }); announce('');
  try {
    const shop = await loadWithDeadline(current.signal, () => announce('اتصال قطع است یا پاسخ فروشگاه دیر رسیده؛ در حال تلاش برای دریافت اطلاعات…'));
    if (controller !== current) return;
    announce(''); state = { status: shop.products.length ? 'success' : 'empty', data: shop };
    renderState(state, () => { void start(); }); render(shop);
  } catch (error: unknown) {
    if (controller !== current) return;
    const message = current.signal.aborted ? 'مهلت اتصال تمام شد. اتصال اینترنت را بررسی و دوباره تلاش کنید.'
      : error instanceof TypeError ? 'ارتباط با فروشگاه برقرار نشد. اتصال اینترنت را بررسی و دوباره تلاش کنید.'
        : error instanceof Error ? error.message : 'دریافت اطلاعات فروشگاه ممکن نشد.';
    current.abort(); announce(''); state = { status: 'error', message }; renderState(state, () => { void start(); });
  }
};

bindEvents({
  query: () => query, changeQuery, add,
  navigateFragment: () => {
    if (query.category || query.search) updateQuery({ category: '', search: '' });
  }, reloadCart: () => {
    const shop = data(); if (shop) { items = reconcileCart(readCart(), shop.products); refreshCart(); }
  }, restoreNavigation: () => {
    query = readQuery(); const shop = data(); if (shop) refreshCatalog(shop); applyFragment();
  }
});
void start();
