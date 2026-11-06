export interface Product {
    id: number;
    categoryId: number;
    name: string;
    emoji: string;
    unit: string;
    price: number;
    tags: string[];
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
  
  export interface EnrichedProduct extends Product {
    stock: number;
    offer: Offer | null;
  }
  
  export interface CartLine extends Pick<Product, 'id' | 'name' | 'price'> {
    quantity: number;
  }
  
  export const SORTS = ['default', 'price-asc', 'price-desc'] as const;
  export type Sort = (typeof SORTS)[number];
  
  export type LoadState = 
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: EnrichedProduct[] }
    | { status: 'error'; message: string };