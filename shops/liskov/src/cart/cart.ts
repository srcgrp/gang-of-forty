import type {CartLine, Product} from '../types';

export function addToCart(cart: CartLine[], productId: number): CartLine[] {
    const existingItem = cart.find((item) => item.productId === productId);

    if (existingItem) {
        return cart.map((item) =>
            item.productId === productId
                ? {...item, quantity: item.quantity + 1}
                : item,
        );
    }

    return [...cart, {productId, quantity: 1}];
}

export function removeFromCart(
    cart: CartLine[],
    productId: number,
): CartLine[] {
    return cart.filter((item) => item.productId !== productId);
}

export function decreaseCartQuantity(
    cart: CartLine[],
    productId: number,
): CartLine[] {
    return cart
        .map((item) =>
            item.productId === productId
                ? {...item, quantity: item.quantity - 1}
                : item,
        )
        .filter((item) => item.quantity > 0);
}

export function cartTotal(cart: CartLine[], products: Product[]): number {
    return cart.reduce((total, item) => {
        const product = products.find(
            (product) => product.id === item.productId,
        );

        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}
