import { Notyf } from 'notyf';
import confetti from 'canvas-confetti';
import type { Cart, Product } from './types';
import { fetchProducts, fetchSuggestions } from './api/products';
import { fetchCategories } from './api/categories';
import { fetchShop } from './api/shop';
import { fetchHome } from './api/home';
import { readCart, writeCart } from './storage/cart-storage';
import { addProduct, countCartItems, totalCartPrice } from './cart/cart-logic';
import { productCardData, productsForCategory, suggestionCardData } from './catalog/catalog-logic';
import { renderError } from './ui/error';
import { renderProductSkeletons, renderCategorySkeletons } from './ui/skeletons';
import { renderLoadState } from './ui/load-state';
import { renderProductCards, renderSuggestionsCount } from './ui/products';
import { renderCategories as showCategories } from './ui/categories';
import { renderShopInfo } from './ui/shop';
import { renderHome as showHome } from './ui/home';
import { renderCartSummary } from './ui/cart';
const notyf = new Notyf(); let cart: Cart = readCart(); let products: Product[] = [];
function element<T extends HTMLElement>(selector: string): T | null { return document.querySelector<T>(selector); }
async function loadCatalog(): Promise<void> {
  const selectors = ['.fruitsVegetablesProducts', '.dairyProducts', '.bakeryPastriesProducts', '.staplesGroceriesProducts', '.beveragesProducts', '.meatProteinProducts', '.snacksProducts'];
  selectors.forEach((selector) => { const node = element<HTMLElement>(selector); if (node) renderLoadState({ status: 'loading' }, node, () => void loadCatalog(), () => undefined); });
  try {
    const catalog = await fetchProducts(); products = catalog.products;
    selectors.forEach((selector, index) => { const node = element<HTMLElement>(selector); if (!node) return; const items = productsForCategory(catalog.products, index + 1); const retry = (): void => { void loadCatalog(); }; if (!items.length) { renderLoadState({ status: 'empty' }, node, retry, () => undefined); return; } renderLoadState({ status: 'success', products: items }, node, retry, (validProducts) => renderProductCards(node, productCardData(validProducts, catalog.offers), `products-${index + 1}`)); });
  } catch { selectors.forEach((selector) => { const node = element<HTMLElement>(selector); if (node) renderLoadState({ status: 'error', message: 'دریافت محصولات با خطا مواجه شد' }, node, () => void loadCatalog(), () => undefined); }); }
}
async function loadSuggestions(): Promise<void> {
  const node = element<HTMLElement>('.suggestions'); if (!node) return; renderProductSkeletons(node);
  try { const data = await fetchSuggestions(); renderSuggestionsCount(data.products.length); renderProductCards(node, suggestionCardData(data.products, data.offers, data.stock.items), 'offers'); }
  catch { renderError(node, 'دریافت محصولات پیشنهادی با خطا مواجه شد', () => void loadSuggestions()); }
}
async function loadCategories(): Promise<void> { const node = element<HTMLElement>('#categories-grid'); if (!node) return; renderCategorySkeletons(node); try { showCategories(node, await fetchCategories()); } catch { renderError(node, 'دریافت دسته‌بندی‌ها با خطا مواجه شد', () => void loadCategories()); } }
async function loadShop(): Promise<void> { try { renderShopInfo(await fetchShop()); } catch { const node = element<HTMLElement>('#footer'); if (node) renderError(node, 'بارگذاری اطلاعات فروشگاه ناموفق بود', () => void loadShop()); } }
async function loadHome(): Promise<void> { try { showHome(await fetchHome()); } catch { const node = element<HTMLElement>('#banner'); if (node) renderError(node, 'بارگذاری اطلاعات صفحه اصلی ناموفق بود', () => void loadHome()); } }
document.addEventListener('click', (event: MouseEvent) => {
  const target = event.target; if (!(target instanceof Element)) return; const button = target.closest<HTMLButtonElement>('[data-product-id][data-price]'); if (!button || button.disabled) return;
  const productId = Number(button.dataset.productId); const price = Number(button.dataset.price); const product = products.find((item) => item.id === productId); if (!product || !Number.isFinite(price)) return;
  cart = addProduct(cart, product, price); if (!writeCart(cart)) notyf.error('ذخیره سبد خرید در این مرورگر امکان‌پذیر نیست'); renderCartSummary(countCartItems(cart), totalCartPrice(cart)); notyf.success('محصول به سبد خرید اضافه شد'); confetti();
});
function render(): void {
  renderCartSummary(countCartItems(cart), totalCartPrice(cart));
}
function start(): void {
  render();
  void loadCatalog();
  void loadSuggestions();
  void loadCategories();
  void loadShop();
  void loadHome();
}
document.addEventListener('DOMContentLoaded', start);
