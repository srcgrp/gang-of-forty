export interface Product {
    id: number;
    categoryId: number;
    name: string;
    emoji?: string;
    image?: string;
    unit?: string;
    price: number;
    tags?: string[];
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
    label?: string;
}

export interface Stock {
    updatedAt: string;
    items: Record<string, number>;
}

export interface ShopHours {
    open: string;
    close: string;
}

export interface ShopSchedule {
    days: string;
    time: string;
}

export interface ShopLink {
    label: string;
    href: string;
}

export interface Shop {
    name: string;
    slogan: string;
    owner: string;
    city: string;
    phone: string;
    hours: ShopHours;
    deliveryFee: number;
    freeDeliveryOver: number;
    currency: string;
    notice: string;
    about: string;
    address: string;
    schedule: ShopSchedule[];
    menu: ShopLink[];
    help: ShopLink[];
    copyright: string;
}

export type CartProduct = Pick<Product, 'id' | 'name' | 'price'>;

export type CartLine = CartProduct & {
    quantity: number;
};

export type StockItems = Record<string, number>;

export type ReadonlyShop = Readonly<Shop>;

export const SORTS = ['default', 'price-asc', 'price-desc', 'name'] as const;

export type Sort = (typeof SORTS)[number];

// --- Type Guards (گام ۳: لبه امن) ---

export function isProduct(x: unknown): x is Product {
    if (typeof x !== 'object' || x === null) return false;
    const p = x as Record<string, unknown>;
    return (
        typeof p.id === 'number' &&
        typeof p.categoryId === 'number' &&
        typeof p.name === 'string' &&
        typeof p.price === 'number'
    );
}

export function isCategory(x: unknown): x is Category {
    if (typeof x !== 'object' || x === null) return false;
    const c = x as Record<string, unknown>;
    return (
        typeof c.id === 'number' &&
        typeof c.slug === 'string' &&
        typeof c.name === 'string'
    );
}

export function isOffer(x: unknown): x is Offer {
    if (typeof x !== 'object' || x === null) return false;
    const o = x as Record<string, unknown>;
    return (
        typeof o.productId === 'number' &&
        typeof o.percent === 'number'
    );
}

export function isStock(x: unknown): x is Stock {
    if (typeof x !== 'object' || x === null) return false;
    const s = x as Record<string, unknown>;
    return (
        typeof s.updatedAt === 'string' &&
        typeof s.items === 'object' &&
        s.items !== null
    );
}

// --- LoadState (Union Type وضعیت صفحه) ---

export type LoadState =
    | { status: 'loading' }
    | { status: 'success'; products: Product[]; offers: Offer[]; stock: Stock }
    | { status: 'empty' }
    | { status: 'error'; message: string };

