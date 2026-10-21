export interface Product {
  id: number;
  name: string;
  emoji: string;
  unit: string;
  price: number;
  categoryId: number;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  emoji: string;
  color: string;
}

export interface Offer {
  productId: number;
  percent: number;
  label: string;
}

export interface Stock {
  updatedAt: string;
  items: Record<string, number>;
}

export type ApiResult<T> =
  | { status: 'loading' }
  | { status: 'empty' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

export interface Catalog {
  products: Product[];
  stockMap: Map<number, number>;
  offerMap: Map<number, Offer>;
}

export const SNACKS_CATEGORY_ID = 7;
