export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

export interface StockItem {
  id: number;
  stock: number;
}

export interface OfferItem {
  id: number;
  discountPercent: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ProductWithDetails extends Product {
  stock: number;
  discountPercent: number;
  finalPrice?: number;
}

export type LoadState =
  | { status: 'loading' }
  | { status: 'success'; products: ProductWithDetails[] }
  | { status: 'empty' }
  | { status: 'error'; message: string };
