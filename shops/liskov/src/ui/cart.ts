import {countCartItems} from '../cart/cart';
import {dom} from './dom';

import type {Cart} from '../types';

const faNumber = new Intl.NumberFormat('fa-IR');

export function renderCartCount(cart: Cart): void {
    const count = faNumber.format(countCartItems(cart));
    dom.cartCount.textContent = count;
    dom.cart.setAttribute('aria-label', `سبد خرید، ${count} کالا`);
}
