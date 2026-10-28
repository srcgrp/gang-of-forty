export interface Product {
  id: number;
  name: string;
  price: number;
  unit?: string;
  emoji?: string;
  categoryId: number;
  tags?: string[];
}

export interface Offer {
  productId: number;
  percent: number;
  label: string;
}

export interface StockData {
  items: Record<string, number>;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  emoji: string;
  color: string;
}


export type LoadState =
  | { status: 'loading' }
  | { status: 'success'; products: Product[] }
  | { status: 'empty' }
  | { status: 'error'; message: string };
