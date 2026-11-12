import type { CartLine, Product, Stock } from '../types';
import { inStock } from '../catalog/pricing';

export const addToCart = (cart: CartLine[], id: number, stock: Stock): CartLine[] => {
    const current = cart.find(line => line.id === id);
    if (!inStock(id, stock) || (current && current.quantity >= (stock.items[id] ?? 0))) return cart;
    return current ? cart.map(line => line.id === id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...cart, { id, quantity: 1 }];
};

export const removeFromCart = (cart: CartLine[], id: number): CartLine[] =>
    cart.filter(line => line.id !== id);

export const cartCount = (cart: CartLine[]): number =>
    cart.reduce((total, line) => total + line.quantity, 0);

export const reconcileCart = (cart: CartLine[], products: Product[], stock: Stock): CartLine[] => {
    const result: CartLine[] = [];
    for (const line of cart) {
        if (!products.some(product => product.id === line.id) || !inStock(line.id, stock)) continue;
        const current = result.find(item => item.id === line.id);
        const quantity = Math.min((current?.quantity ?? 0) + line.quantity, stock.items[line.id] ?? 0);
        if (current) current.quantity = quantity;
        else result.push({ id: line.id, quantity });
    }
    return result;
};
