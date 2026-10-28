import type {
    AppData,
    Category,
    Home,
    Offer,
    Product,
    Shop,
    Stock,
} from './src/types';

const API_BASE = '../../api/';

async function fetchJSON<T>(fileName: string): Promise<T> {
    const response: Response = await fetch(`${API_BASE}${fileName}`);

    // fetch does not reject on a 404, so we have to check response.ok ourselves.
    if (!response.ok) {
        throw new Error(`${fileName}: HTTP ${response.status}`);
    }

    // If the body is not valid JSON, the returned promise rejects here.
    return response.json();
}

// Reads all six files at the same time with a single Promise.all.
export async function loadData(): Promise<AppData> {
    const [shop, categories, home, products, stock, offers] = await Promise.all(
        [
            fetchJSON<Shop>('shop.json'),
            fetchJSON<Category[]>('categories.json'),
            fetchJSON<Home>('home.json'),
            fetchJSON<Product[]>('products.json'),
            fetchJSON<Stock>('stock.json'),
            fetchJSON<Offer[]>('offers.json'),
        ],
    );

    return {shop, categories, home, products, stock, offers};
}
