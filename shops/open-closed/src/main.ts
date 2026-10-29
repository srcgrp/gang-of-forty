import { FetchError } from './api/http.ts';
import { fetchProducts } from './api/products.ts';
import { addItem, totalQuantity } from './cart/cart.ts';
import { loadCart, saveCart } from './storage/cart.ts';
import type { Cart, ReadonlyProduct } from './types.ts';
import { showCartCount } from './ui/badge.ts';
import { celebrate } from './ui/feedback.ts';
import { render } from './ui/render.ts';

const DAIRY_CATEGORY_ID = 2;

let cart: Cart = loadCart();

function errorMessage(err: unknown): string {
    if (err instanceof TypeError) {
        return 'ارتباط با سرور برقرار نشد. اینترنت خود را بررسی کنید و دوباره تلاش کنید.';
    }
    if (err instanceof FetchError && err.kind === 'http') {
        return 'فهرست محصولات پیدا نشد. کمی بعد دوباره تلاش کنید.';
    }
    return 'اطلاعات محصولات درست دریافت نشد. کمی بعد دوباره تلاش کنید.';
}

function handleAdd(product: ReadonlyProduct, button: HTMLButtonElement): void {
    cart = addItem(cart, product.id);
    saveCart(cart);
    showCartCount(totalQuantity(cart));
    celebrate(button, product.name);
}

const handlers = {
    onAdd: handleAdd,
    onRetry: () => { void loadDairy(); },
};

async function loadDairy(): Promise<void> {
    render({ status: 'loading' }, handlers);
    try {
        const products = await fetchProducts();
        const dairy = products.filter((p) => p.categoryId === DAIRY_CATEGORY_ID);

        if (dairy.length === 0) {
            render({ status: 'empty' }, handlers);
            return;
        }
        render({ status: 'success', products: dairy }, handlers);
    } catch (err: unknown) {
        console.warn('بارگذاری لبنیات ناموفق بود:', err);
        render({ status: 'error', message: errorMessage(err) }, handlers);
    }
}

showCartCount(totalQuantity(cart));
void loadDairy();