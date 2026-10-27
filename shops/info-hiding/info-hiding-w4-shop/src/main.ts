import type { CartLine, Catalog, Filters, LoadState, Product, ProductCard } from './types';
import { loadCatalog } from './api/catalog';
import { loadCart, saveCart } from './storage/cart';
import { addToCart, removeFromCart, cartCount, reconcileCart } from './cart/rules';
import { cartRows, cartTotal } from './cart/rows';
import { visibleProducts, parseSort } from './catalog/filter';
import { toCard, formatNumber, formatPrice } from './catalog/pricing';
import { renderStatus } from './ui/status';
import { renderProducts } from './ui/products';
import { renderCategories } from './ui/categories';
import { renderCart, renderTotal, renderCartCount } from './ui/cart';
import { bindEvents } from './ui/events';
import { showNotice } from './ui/feedback';

let state: LoadState = { status: 'loading' };
let catalog: Catalog = { products: [], categories: [], offers: [], stock: { updatedAt: '', items: {} } };
let cart: CartLine[] = loadCart();
const filters: Filters = { categoryId: null, query: '', sort: 'default' };

const render = (): void => {
    renderStatus(state);
    renderCart(cartRows(cart, catalog.products, catalog.offers));
    renderTotal(formatPrice(cartTotal(cart, catalog.products, catalog.offers)));
    renderCartCount(formatNumber(cartCount(cart)));
    if (state.status !== 'success') return;
    renderCategories(catalog.categories, filters.categoryId);
    const cards = (items: Product[]): ProductCard[] => items.map(item => toCard(item, catalog.offers, catalog.stock));
    renderProducts('offers', cards(catalog.products.filter(item => catalog.offers.some(offer => offer.productId === item.id))));
    renderProducts('dairy', cards(catalog.products.filter(item => item.categoryId === 2)));
    renderProducts('catalog', cards(visibleProducts(catalog.products, filters, catalog.offers)));
};

const start = async (): Promise<void> => {
    state = { status: 'loading' };
    render();
    try {
        catalog = await loadCatalog();
        cart = reconcileCart(cart, catalog.products, catalog.stock);
        saveCart(cart);
        state = catalog.products.length > 0 ? { status: 'success', products: catalog.products } : { status: 'empty' };
    } catch (error: unknown) {
        state = { status: 'error', message: 'دریافت اطلاعات انجام نشد. اتصال را بررسی کنید و دوباره تلاش کنید.' };
    }
    render();
    document.getElementById(location.hash.slice(1))?.scrollIntoView();
};

bindEvents({
    add: id => {
        if (!catalog.products.some(product => product.id === id)) return;
        const next = addToCart(cart, id, catalog.stock);
        if (next === cart) { showNotice(false); return; }
        cart = next;
        saveCart(cart);
        render();
        showNotice(true);
    },
    remove: id => { cart = removeFromCart(cart, id); saveCart(cart); render(); },
    search: query => { filters.query = query; render(); },
    category: value => { filters.categoryId = value === '' ? null : Number(value); render(); },
    sort: value => { filters.sort = parseSort(value); render(); },
    retry: () => { void start(); }
});

void start();
