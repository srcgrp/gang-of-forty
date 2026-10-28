import type { Product, Offer, Stock, CardProduct } from "../types";

export function withOfferAndStock(
    product: Product,
    offers: Offer[],
    stock: Stock
): CardProduct {
    const offer = offers.find(o => o.productId === product.id);

    const result: CardProduct = {
        ...product,
        stock: stock.items[product.id]
    };

    if (offer) {
        result.percent = offer.percent;
        result.label = offer.label;
        result.newPrice = Math.round(
            product.price * (100 - offer.percent) / 100
        );
    }

    return result;
}

export function getSpecialOfferProducts(
    products: Product[],
    offers: Offer[],
    stock: Stock
): CardProduct[] {
    return offers.flatMap(offer => {
        const product = products.find(p => p.id === offer.productId);

        if (!product) {
            return [];
        }

        return [{
            ...withOfferAndStock(product, offers, stock),
            newPrice: Math.round(
                product.price * (100 - offer.percent) / 100
            ),
            percent: offer.percent,
            label: offer.label
        }];
    });
}