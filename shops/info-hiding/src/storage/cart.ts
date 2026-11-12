import type { CartLine } from '../types';
import { isCartLine } from '../api/guards';

const key = 'yasaman-cart-v4';

export const loadCart = (): CartLine[] => {
    try {
        const text = localStorage.getItem(key);
        if (!text) return [];
        const data: unknown = JSON.parse(text);
        if (!Array.isArray(data)) return [];
        const rows: unknown[] = data;
        return rows.filter(isCartLine);
    } catch {
        return [];
    }
};

export const saveCart = (cart: CartLine[]): void => {
    try {
        localStorage.setItem(key, JSON.stringify(cart.map(line => ({ id: line.id, quantity: line.quantity }))));
    } catch {
        console.warn('Cart could not be saved on this device');
    }
};
