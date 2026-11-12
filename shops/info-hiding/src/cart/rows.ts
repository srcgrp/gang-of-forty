import type { Product, Offer, CartLine, CartRow } from '../types';
import { finalPrice, formatPrice } from '../catalog/pricing';

export const cartRows = (cart: CartLine[], products: Product[], offers: Offer[]): CartRow[] =>
    cart.map(line => {
        const product = products.find(item => item.id === line.id);
        if (!product) return null;
        const price = finalPrice(product, offers.find(offer => offer.productId === product.id));
        return {
            id: product.id, name: product.name, quantity: line.quantity,
            price: formatPrice(price), subtotal: formatPrice(price * line.quantity)
        };
    }).filter((row): row is CartRow => row !== null);

export const cartTotal = (cart: CartLine[], products: Product[], offers: Offer[]): number =>
    cart.reduce((total, line) => {
        const product = products.find(item => item.id === line.id);
        if (!product) return total;
        const offer = offers.find(item => item.productId === product.id);
        return total + finalPrice(product, offer) * line.quantity;
    }, 0);
