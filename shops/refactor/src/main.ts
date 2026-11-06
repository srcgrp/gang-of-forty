import type { AppData, CartItem, CatalogQuery, LoadState } from './types';
import { loadWithDeadline, loadErrorMessage } from './api/load-with-deadline';
import { readCart, writeCart } from './storage/cart';
import { readQuery, writeQuery, readFragment } from './storage/url';
import { addOne } from './features/cart/add';
import { cartCount, reconcileCart } from './features/cart/calculate';
import { selectCatalog, selectCategoryShelf, selectShelves } from './features/products/select';
import { createLoadFlow } from './shared/load-flow';
import { collectNotices } from './shared/notices';
import { renderCartBadge } from './ui/cart-badge';
import { renderPage } from './ui/page';
import { renderCatalog, renderCategoryFragment } from './ui/catalog';
import { renderState, announce, scrollToFragment, scrollToCatalog } from './ui/state';
import { bindEvents } from './ui/events';
import { addedToCart } from './ui/feedback';

let state: LoadState = { status: 'loading' };
let items: CartItem[] = readCart();
let query: CatalogQuery = readQuery();

const data = (): AppData | undefined => state.status === 'success' || state.status === 'empty' ? state.data : undefined;
const refreshCart = (): void => { renderCartBadge(cartCount(items)); };
const refreshCatalog = (shop: AppData): void => renderCatalog(selectCatalog(shop.products, shop.categories, query));
const persistCart = (): void => {
  if (!writeCart(items)) announce('ذخیره‌سازی مرورگر در دسترس نیست؛ سبد تا پایان این نشست نگه داشته می‌شود.');
  refreshCart();
};
const applyFragment = (): void => {
  const fragment = readFragment(), shop = data();
  if (shop) renderCategoryFragment(selectCategoryShelf(shop.products, shop.categories, fragment), fragment);
  scrollToFragment(fragment);
};
const updateQuery = (next: CatalogQuery): void => {
  query = next; writeQuery(query); const shop = data();
  if (shop) { refreshCatalog(shop); applyFragment(); }
};
const add = (id: number): void => {
  const result = addOne(items, data()?.products.find((entry) => entry.id === id));
  if (result.status === 'maxed') announce('همهٔ موجودی این کالا در سبد شماست.');
  if (result.status !== 'added') return;
  items = result.items; persistCart(); addedToCart(result.name);
};
const render = (shop: AppData): void => {
  renderPage(shop, selectShelves(shop.products, shop.home.carousels)); refreshCatalog(shop);
  const reconciled = reconcileCart(items, shop.products);
  const changed = JSON.stringify(items) !== JSON.stringify(reconciled); items = reconciled; persistCart();
  const notices = collectNotices(shop.notices, changed, query, shop.categories);
  if (notices.length) announce(notices.join(' ')); applyFragment();
};
const show = (next: LoadState): void => {
  state = next; announce(''); renderState(next, () => { void start(); });
  if (next.status === 'success' || next.status === 'empty') render(next.data);
};
const start = createLoadFlow({
  load: (signal) => loadWithDeadline(signal, () => announce('اتصال قطع است یا پاسخ فروشگاه دیر رسیده؛ در حال تلاش برای دریافت اطلاعات…')),
  explain: loadErrorMessage, show,
});

bindEvents({
  query: () => query, add,
  changeQuery: (next) => { updateQuery(next); scrollToCatalog(); },
  navigateFragment: () => { if (query.category || query.search) updateQuery({ category: '', search: '' }); },
  reloadCart: () => { const shop = data(); if (shop) { items = reconcileCart(readCart(), shop.products); refreshCart(); } },
  restoreNavigation: () => { query = readQuery(); const shop = data(); if (shop) refreshCatalog(shop); applyFragment(); },
});
void start();
