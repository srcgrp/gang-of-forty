import type { Offer, Product, Stock } from '../types';

export function filterByCategory(products: Product[], categoryId: number): Product[] {
    return products.filter(product => product.categoryId === categoryId);
}

export function createProductsMap(products: Product[]): Map<number, Product> {
    const map = new Map<number, Product>();
    products.forEach(p => map.set(p.id, p));
    return map;
}

export function createOffersMap(offers: Offer[]): Map<number, Offer> {
    const map = new Map<number, Offer>();
    offers.forEach(o => map.set(o.productId, o));
    return map;
}

export function createStockMap(stock: Stock): Map<number, number> {
    const map = new Map<number, number>();
    const stockItems = stock.items || {};
    Object.entries(stockItems).forEach(([key, val]) => {
        map.set(Number(key), Number(val));
    });
    return map;
}
