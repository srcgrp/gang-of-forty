import { dom } from './dom.ts';
import { formatCount } from './format.ts';

export function showCartCount(count: number): void {
    dom.cartCount.textContent = formatCount(count);
}