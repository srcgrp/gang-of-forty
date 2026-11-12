export interface Product {
  readonly id: string | number;
  readonly title: string;
  readonly price: number;
  readonly category: string;
  readonly image: string;
}


export interface StockItem {
  readonly productId: string;
  readonly stock: number;
}

export interface OfferItem {
  readonly productId: string;
  readonly discountPercent: number;
}


export interface ProductWithDetails extends Omit<Product, 'id'> {
  readonly id: string;
  readonly stock: number;
  readonly discountPercent: number;
  readonly finalPrice: number;
}


export interface CartItem {
  readonly product: ProductWithDetails;
  readonly quantity: number;
}

export type LoadState =
  | { readonly status: 'loading' }
  | { readonly status: 'success'; readonly products: ProductWithDetails[] }
  | { readonly status: 'empty' }
  | { readonly status: 'error'; readonly message: string };
