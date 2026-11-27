import type { Carousel, Catalog, Offer } from '../types.ts';
import { API_URL } from './config.ts';
import { isCarousel, isOffer, isRecord } from './guards.ts';
import { FetchError, getJSON } from './http.ts';
import { fetchProducts } from './products.ts';

async function fetchOffers(): Promise<Offer[]> {
    const data = await getJSON(`${API_URL}/offers.json`);
    if (!Array.isArray(data)) {
        throw new FetchError('shape', 'offers.json is not a list');
    }
    const items: unknown[] = data;
    return items.filter(isOffer);
}

async function fetchCarousels(): Promise<Carousel[]> {
    const data = await getJSON(`${API_URL}/home.json`);
    const list: unknown = isRecord(data) ? data.carousels : undefined;
    if (!Array.isArray(list)) {
        throw new FetchError('shape', 'home.json has no carousels list');
    }
    const items: unknown[] = list;
    return items.filter(isCarousel);
}

export async function fetchCatalog(): Promise<Catalog> {
    const [products, offers, carousels] = await Promise.all([
        fetchProducts(),
        fetchOffers(),
        fetchCarousels(),
    ]);
    return { products, offers, carousels };
}