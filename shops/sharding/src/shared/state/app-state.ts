import type { AppState, Cart } from '../types';

export function createState(cart: Cart): AppState {
  return {
    shop: null,
    home: null,
    categories: [],
    products: [],
    stock: null,
    offerMap: new Map(),
    cart,
    res: { status: 'loading' },
  };
}
