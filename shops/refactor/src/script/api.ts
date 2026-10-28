import { BASEURL } from './config.js';
import type {
    ApiProduct,
    AppData,
    Category,
    Home,
    Offer,
    ProductView,
    Shop,
    Stock,
} from './type.js';

const fetchJSON = async <T>(file: string): Promise<T> => {

    const response = await fetch(`${BASEURL}/${file}`);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status} — ${file}`);
    }

    return response.json();
};


const buildProducts = (
    products: ApiProduct[],
    stock: Stock,
    offers: Offer[]
    ): ProductView[] =>
    products.map((product) => {
        const offer = offers.find((item) => item.productId === product.id);

        return {
            ...product,
            stock: stock.items[product.id] ?? 0,
            off: offer?.percent,
            oldPrice: offer ? product.price : undefined,
            price: offer
                ? Math.round(product.price * (1 - offer.percent / 100))
                : product.price,
        };
    });

const loadAppData = async (): Promise<AppData> => {
    const [products, stock, offers, categories, home, shop] = await Promise.all([
        fetchJSON<ApiProduct[]>('products.json'),
        fetchJSON<Stock>('stock.json'),
        fetchJSON<Offer[]>('offers.json'),
        fetchJSON<Category[]>('categories.json'),
        fetchJSON<Home>('home.json'),
        fetchJSON<Shop>('shop.json'),
    ]);

    return {
        products: buildProducts(products, stock, offers),
        categories,
        home,
        shop,
    };
};

export { loadAppData };
