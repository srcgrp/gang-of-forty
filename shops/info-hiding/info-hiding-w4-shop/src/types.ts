export type Product = {
    id: number; categoryId: number; name: string; emoji: string;
    unit: string; price: number; tags: string[];
};

export type Category = {
    id: number; slug: string; name: string; emoji: string; color?: string;
};

export type Offer = { productId: number; percent: number; label: string };
export type Stock = { updatedAt: string; items: Record<string, number> };

export type Shop = {
    name: string; slogan: string; owner: string; city: string; phone: string;
    hours: { open: string; close: string };
    deliveryFee: number; freeDeliveryOver: number; currency: string;
};

export type CartLine = Pick<Product, 'id'> & { quantity: number };
export type CartRow = Pick<Product, 'id' | 'name'> & {
    quantity: number; price: string; subtotal: string;
};

export type ProductCard = Product & {
    priceText: string; oldPriceText: string; discountText: string;
    available: boolean;
};

export const SORTS = ['default', 'price-asc', 'price-desc'] as const;
export type Sort = (typeof SORTS)[number];
export type Filters = { categoryId: number | null; query: string; sort: Sort };

export type LoadState =
    | { status: 'loading' }
    | { status: 'success'; products: Product[] }
    | { status: 'empty' }
    | { status: 'error'; message: string };

export type Catalog = {
    products: Product[]; categories: Category[]; offers: Offer[]; stock: Stock;
};

export type Handlers = {
    add: (id: number) => void;
    remove: (id: number) => void;
    search: (query: string) => void;
    category: (value: string) => void;
    sort: (value: string) => void;
    retry: () => void;
};
