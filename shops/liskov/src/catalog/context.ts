import type {AppData, Category, Offer, Product} from '../types';

export type Context = {
    products: Product[];
    offers: Offer[];
    categoryById: Map<number, Category>;
    productById: Map<number, Product>;
    stockById: Record<number, number>;
    offerByProductId: Map<number, Offer>;
};

function indexBy<Item, Key>(
    items: Item[],
    getKey: (item: Item) => Key,
): Map<Key, Item> {
    return new Map(
        items.map((item: Item): [Key, Item] => [getKey(item), item]),
    );
}

export function buildContext({
    categories,
    products,
    stock,
    offers,
}: AppData): Context {
    return {
        products,
        offers,
        categoryById: indexBy(categories, (category: Category) => category.id),
        productById: indexBy(products, (product: Product) => product.id),
        stockById: stock.items,
        offerByProductId: indexBy(offers, (offer: Offer) => offer.productId),
    };
}
