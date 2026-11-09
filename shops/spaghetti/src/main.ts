import { API_BASE, getJSON } from './api/client';
import { filterByCategory, createProductsMap, createOffersMap, createStockMap } from './catalog/products';
import { formatPrice, createEl, createPlusIcon, renderError } from './ui/dom';
import { renderOffersSkeletonLoading, renderSkeletonLoading } from './ui/skeleton';
import { setupCarouselScroll, populateCarousel, populateOffersCarousel } from './ui/carousel';
import type { Offer, Product, Stock, LoadState } from './types';
import { isProduct, isOffer, isStock } from './types';

async function initStore(): Promise<void> {
    const offersContainer = document.querySelector<HTMLElement>('#special-offers .amazing-offer-list-div');
    const containers = {
        fruits: document.getElementById('fruits-carousel-list'),
        dairy: document.getElementById('dairy-carousel-list'),
        bakery: document.getElementById('bakery-carousel-list'),
        snacks: document.getElementById('snacks-carousel-list'),
        drinks: document.getElementById('drinks-carousel-list'),
        protein: document.getElementById('protein-carousel-list')
    };

    renderOffersSkeletonLoading(offersContainer, 5);
    Object.values(containers).forEach(c => renderSkeletonLoading(c, 6));

    let state: LoadState = { status: 'loading' };
    try {
        const [pRaw, oRaw, sRaw] = await Promise.all([
            getJSON(`${API_BASE}/products.json`),
            getJSON(`${API_BASE}/offers.json`).catch(() => []),
            getJSON(`${API_BASE}/stock.json`).catch(() => ({ updatedAt: '', items: {} }))
        ]);

        const validProducts = (Array.isArray(pRaw) ? pRaw : []).filter(isProduct);
        const validOffers = (Array.isArray(oRaw) ? oRaw : []).filter(isOffer);
        const validStock: Stock = isStock(sRaw) ? sRaw : { updatedAt: '', items: {} };

        state = validProducts.length === 0 ? { status: 'empty' } : {
            status: 'success', products: validProducts, offers: validOffers, stock: validStock
        };
    } catch (err: unknown) {
        state = { status: 'error', message: err instanceof Error ? err.message : 'خطای بارگذاری' };
    }

    switch (state.status) {
        case 'empty':
            renderError(offersContainer, 'هیچ کالایی یافت نشد.');
            break;
        case 'error':
            renderError(offersContainer, state.message);
            break;
        case 'success': {
            const { products, offers, stock } = state;
            const pMap = createProductsMap(products);
            const oMap = createOffersMap(offers);
            const sMap = createStockMap(stock);

            if (offersContainer) {
                populateOffersCarousel(offersContainer, offers, pMap, sMap);
                setupCarouselScroll('#special-offers', offersContainer);
            }

            const catMap = [
                { id: 1, sec: '#fruits-vegetables', el: containers.fruits },
                { id: 2, sec: '#dairy', el: containers.dairy },
                { id: 3, sec: '#bakery', el: containers.bakery },
                { id: 7, sec: '#snacks', el: containers.snacks },
                { id: 5, sec: '#drinks', el: containers.drinks },
                { id: 6, sec: '#protein', el: containers.protein },
            ];

            catMap.forEach(({ id, sec, el }) => {
                if (el) {
                    populateCarousel(el, filterByCategory(products, id), oMap, sMap);
                    setupCarouselScroll(sec, el);
                }
            });
            break;
        }
        default: {
            const exhaustive: never = state;
            console.error('Unknown state', exhaustive);
        }
    }
}

console.log('initStore started')

initStore();
