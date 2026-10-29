import type { Product } from '../types.ts';
import { isProduct } from './guards.ts';
import { FetchError, getJSON } from './http.ts';

const PRODUCTS_URL = '../../api/products.json';

export async function fetchProducts(): Promise<Product[]> {
    const data = await getJSON(PRODUCTS_URL);

    if (!Array.isArray(data)) {
        throw new FetchError('shape', 'products.json is not a list');
    }

    const items: unknown[] = data;
    const products: Product[] = [];
    let skipped = 0;

    for (const item of items) {
        if (isProduct(item)) {
            products.push(item);
        } else {
            skipped += 1;
            console.warn('محصول نامعتبر نادیده گرفته شد:', item);
        }
    }

    if (skipped > 0) {
        console.warn(`${skipped} محصول به‌خاطر ساختار نامعتبر حذف شد.`);
    }
    return products;
}