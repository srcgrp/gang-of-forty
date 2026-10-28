import 'notyf/notyf.min.css';

import {loadData} from '../api';
import {addToCart} from './cart/cart';
import {buildContext} from './catalog/context';
import {loadCart, saveCart} from './storage/cart';
import {createPromos, renderBanners} from './ui/banners';
import {renderCarousels} from './ui/carousels';
import {renderCartCount} from './ui/cart';
import {renderCategories} from './ui/categories';
import {dom} from './ui/dom';
import {showAddedFeedback} from './ui/feedback';
import {renderLoadState} from './ui/load-state';
import {renderSearch, renderShop} from './ui/shop';

import type {AppData, Cart, LoadState} from './types';

const cart: Cart = loadCart();

function handleCartClick(event: MouseEvent): void {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest<HTMLButtonElement>(
        'button[data-product-id]',
    );

    if (!button || button.disabled) return;

    const {productId, productName} = button.dataset;

    if (productId === undefined || productName === undefined) return;

    addToCart(cart, productId);
    saveCart(cart);
    renderCartCount(cart);
    showAddedFeedback(button, productName);
}

function scrollToHash(): void {
    if (!location.hash) return;

    document.getElementById(location.hash.slice(1))?.scrollIntoView();
}

function renderPage(data: AppData): void {
    const context = buildContext(data);

    renderShop(data.shop);
    renderCategories(data.categories);
    renderBanners(data.home);

    renderCarousels(
        data.home.carousels,
        context,
        createPromos(data.home.promos),
    );

    renderSearch(data.products.length);

    dom.main.setAttribute('aria-busy', 'false');
    scrollToHash();
}

async function init(): Promise<void> {
    renderCartCount(cart);
    dom.carousels.addEventListener('click', handleCartClick);

    let state: LoadState = {status: 'loading'};
    renderLoadState(state);

    try {
        const data = await loadData();

        renderPage(data);

        state =
            data.products.length > 0
                ? {status: 'success', products: data.products}
                : {status: 'empty'};

        renderLoadState(state);
    } catch (error: unknown) {
        console.warn('Loading page data failed:', error);

        state = {
            status: 'error',
            message:
                error instanceof Error
                    ? error.message
                    : 'بارگذاری اطلاعات ناموفق بود. لطفاً دوباره تلاش کنید.',
        };

        renderLoadState(state);
    }
}

void init();
