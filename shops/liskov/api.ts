import type {AppData, Product} from './src/types';

import {
    isCategory,
    isHome,
    isOffer,
    isProduct,
    isShop,
    isStock,
} from './src/api/guards';
import {getJSON} from './src/api/index';

export async function loadData(): Promise<AppData> {
    const [
        shopData,
        categoriesData,
        homeData,
        productsData,
        stockData,
        offersData,
    ] = await Promise.all([
        getJSON('shop.json'),
        getJSON('categories.json'),
        getJSON('home.json'),
        getJSON('products.json'),
        getJSON('stock.json'),
        getJSON('offers.json'),
    ]);

    if (!isShop(shopData)) {
        throw new Error('Invalid shop data');
    }

    if (!Array.isArray(categoriesData) || !categoriesData.every(isCategory)) {
        throw new Error('Invalid categories data');
    }

    if (!isHome(homeData)) {
        throw new Error('Invalid home data');
    }

    if (!Array.isArray(productsData)) {
        throw new Error('Invalid products data');
    }

    const products: Product[] = productsData.filter(isProduct);
    const invalidProductsCount = productsData.length - products.length;

    if (invalidProductsCount > 0) {
        console.warn(`Ignored ${invalidProductsCount} invalid product(s).`);
    }

    if (!isStock(stockData)) {
        throw new Error('Invalid stock data');
    }

    if (!Array.isArray(offersData) || !offersData.every(isOffer)) {
        throw new Error('Invalid offers data');
    }

    return {
        shop: shopData,
        categories: categoriesData,
        home: homeData,
        products,
        stock: stockData,
        offers: offersData,
    };
}
