import type {Cart} from '../types';

export function addToCart(cart: Cart, productId: string): void {
    cart[productId] = (cart[productId] ?? 0) + 1;
}

export function countCartItems(cart: Cart): number {
    return Object.values(cart).reduce(
        (sum: number, quantity: number): number => sum + quantity,
        0,
    );
}
