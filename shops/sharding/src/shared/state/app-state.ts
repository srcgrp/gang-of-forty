import type { Shop, Home, Category, Product, Stock, Offer, Cart, LoadState } from '../types';

export type AppState = {
  shop: Readonly<Shop> | null;
  home: Home | null;
  categories: Category[];
  products: Product[];
  stock: Stock | null;
  offerMap: Map<number, Offer>;
  cart: Cart;
  res: LoadState;
};

export function createState(cart: Cart): AppState {
  return {
    shop: null, home: null, categories: [], products: [], stock: null,
    offerMap: new Map(), cart, res: { status: 'loading' },
  };
}