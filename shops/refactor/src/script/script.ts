import type { AppData } from './type.js';
import { initCategories } from './funcs/categorys.js';
import { loadAppData } from './api.js';
import { showLoading, showError, renderSkeletons } from './components/skeleton.js';
import {
     renderHero,
    renderPromos,
    renderFooter,
    getAndShowProducts,
    getAndShowAllProducts,
    updateSearchPlaceholders,
    initAddToCart,
    initMouseDrag,
     initCarousels,
} from './funcs/products.js'

const SLOW_AFTER_MS = 3000;
const SLOW = Symbol('slow');

const MESSAGE_CONTAINERS = ['.hero-grid', '.cat-list', '.sub-menu', '.footer-cols'];
const TRACK_SELECTORS = ['.products-track-off', '.products-track-latest', '.product-fruit'];


const forEachContainer = (selectors: string[], action: (container: HTMLElement) => void): void => {
    selectors.forEach((selector) => {
        document.querySelectorAll<HTMLElement>(selector).forEach(action);
    });
};

const delay = (ms: number): Promise<typeof SLOW> =>
    new Promise((resolve) => {
        setTimeout(() => resolve(SLOW), ms);
});

const showLoadingStates = (): void => {
    forEachContainer(MESSAGE_CONTAINERS, showLoading);
    forEachContainer(TRACK_SELECTORS, (track) => renderSkeletons(track));
};

const showErrorStates = (): void => {
    const message = 'خطا در بارگیری. لطفاً دوباره تلاش کنید.';

    forEachContainer(['.hero-grid'], (container) => showError(container, message, 'alert'));
    forEachContainer(
        [...MESSAGE_CONTAINERS.slice(1), ...TRACK_SELECTORS],
        (container) => showError(container, message)
    );
};

const showSlowNotice = (): void => {
    forEachContainer(MESSAGE_CONTAINERS, (container) => {
        showError(container, 'اتصال کند است؛ لطفاً کمی صبر کنید ...');
    });
};

const fetchAppData = async (): Promise<AppData | null> => {
    const dataPromise = loadAppData();

    try {
        const first = await Promise.race([dataPromise, delay(SLOW_AFTER_MS)]);

        if (first === SLOW) {
            showSlowNotice();
        }

        return await dataPromise;
    } catch (err: unknown) {
        console.error('خطا در بارگیری اطلاعات:', err);
        return null;
    }
};

const renderPage = (data: AppData): void => {
   renderHero(data.home);
    renderPromos(data.home.promos);
    initCategories(data.categories, data.products);
    getAndShowAllProducts(data.products);
    getAndShowProducts('.product-fruit', 1, data.products);
    updateSearchPlaceholders(data.products.length);
    renderFooter(data.shop);
};

const startApp = async (): Promise<void> => {
    initAddToCart();
    initCarousels();
    showLoadingStates();
    initMouseDrag()

    const data = await fetchAppData();
    if (data) {
        renderPage(data);
    } else {
        showErrorStates();
    }
};

void startApp();
