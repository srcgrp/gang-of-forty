import type { Product, Offer, Stock, ProductCard } from '../types';

export const formatNumber = (value: number): string =>
    new Intl.NumberFormat('fa-IR').format(value);

export const formatPrice = (value: number): string => formatNumber(value) + ' تومان';

export const finalPrice = (product: Pick<Product, 'price'>, offer?: Offer): number =>
    offer ? Math.round(product.price * (100 - offer.percent) / 100) : product.price;

export const inStock = (id: number, stock: Stock): boolean => (stock.items[id] ?? 0) > 0;

export const toCard = (product: Product, offers: Offer[], stock: Stock): ProductCard => {
    const offer = offers.find(item => item.productId === product.id);
    return {
        ...product,
        priceText: formatPrice(finalPrice(product, offer)),
        oldPriceText: offer ? formatPrice(product.price) : '',
        discountText: offer ? formatNumber(offer.percent) + '٪ تخفیف' : '',
        available: inStock(product.id, stock)
    };
};
