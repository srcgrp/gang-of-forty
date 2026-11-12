import type { Cart, Product } from '../types.ts';

export type CartLine = { product: Product; quantity: number };

export function addItem(cart: Cart, productId: number): Cart {
    const exists = cart.some((item) => item.productId === productId);
    if (!exists) return [...cart, { productId, quantity: 1 }];

    return cart.map((item) =>
        item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
    );
}

export function removeItem(cart: Cart, productId: number): Cart {
    return cart.filter((item) => item.productId !== productId);
}

export function totalQuantity(cart: Cart): number {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function cartLines(cart: Cart, products: Product[]): CartLine[] {
    return cart.flatMap((item) => {
        const product = products.find((p) => p.id === item.productId);
        return product ? [{ product, quantity: item.quantity }] : [];
    });
}

export function cartSubtotal(lines: CartLine[]): number {
    return lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
}
