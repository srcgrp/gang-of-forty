import type { Offer, Product } from '../types';
import { createProductCard, createAmazingOfferCard } from './product-card';

export function setupCarouselScroll(
    sectionSelector: string,
    listSelector: string | HTMLElement
): void {
    const section = document.querySelector<HTMLElement>(sectionSelector);
    const list = typeof listSelector === 'string'
        ? document.querySelector<HTMLElement>(listSelector)
        : listSelector;
    if (!section || !list) return;

    const prevBtn = section.querySelector<HTMLButtonElement>('.previous-arrow-button, .prev-btn');
    const nextBtn = section.querySelector<HTMLButtonElement>('.next-arrow-button, .next-btn');
    const scrollStep = 220;

    if (prevBtn) {
        prevBtn.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            list.scrollBy({ left: scrollStep, behavior: 'smooth' });
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e: MouseEvent) => {
            e.preventDefault();
            list.scrollBy({ left: -scrollStep, behavior: 'smooth' });
        });
    }
}

export function populateCarousel(
    container: HTMLElement | null,
    productsList: Product[],
    offersMap: Map<number, Offer>,
    stockMap: Map<number, number>
): void {
    if (!container) return;
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    productsList.forEach(prod => {
        const offer = offersMap.get(prod.id);
        const stock = stockMap.get(prod.id);
        fragment.appendChild(createProductCard(prod, offer, stock));
    });
    container.appendChild(fragment);
}

export function populateOffersCarousel(
    container: HTMLElement | null,
    offersList: Offer[],
    productsMap: Map<number, Product>,
    stockMap: Map<number, number>
): void {
    if (!container) return;
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    offersList.forEach((offer, idx) => {
        const product = productsMap.get(offer.productId);
        if (product) {
            const stock = stockMap.get(offer.productId);
            fragment.appendChild(createAmazingOfferCard(product, offer, stock, idx));
        }
    });

    container.appendChild(fragment);
}
