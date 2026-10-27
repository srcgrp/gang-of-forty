import type { Product, Category, Offer, Stock, Catalog } from '../types';
import { getJSON } from './http';
import { loadList } from './list';
import { isProduct, isCategory, isOffer, isStock } from './guards';

export const loadProducts = (): Promise<Product[]> => loadList('products.json', isProduct);
export const loadCategories = (): Promise<Category[]> => loadList('categories.json', isCategory);
export const loadOffers = (): Promise<Offer[]> => loadList('offers.json', isOffer);

export const loadStock = async (): Promise<Stock> => {
    const data: unknown = await getJSON('stock.json');
    if (!isStock(data)) throw new Error('Invalid stock data');
    return data;
};

export const loadCatalog = async (): Promise<Catalog> => {
    const [products, categories, offers, stock] = await Promise.all([
        loadProducts(), loadCategories(), loadOffers(), loadStock()
    ]);
    return { products, categories, offers, stock };
};
