export type Product = {
    id: number;
    categoryId: number;
    name: string;
    emoji: string;
    unit: string;
    price: number;
    tags: string[];
};

export type Category = {
    id: number;
    slug: string;
    name: string;
    emoji: string;
    color: string;
};

export type Stock = {
    updatedAt: string;
    items: Record<number, number>;
};

export type Offer = {
    productId: number;
    percent: number;
    label: string;
};

export type ShopSchedule = {
    days: string;
    time: string;
};

export type ShopLink = {
    label: string;
    href: string;
};

export type ShopHours = {
    open: string;
    close: string;
};

export type Shop = {
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
};

export type CartItem = {
    productId: number;
    quantity: number;
};

export type Cart = CartItem[];

/* ------------------------------------- */
export type ProductPreview = Pick<Product, 'id' | 'name' | 'price'>;
export type ReadonlyProduct = Readonly<Product>;

/* ----------------------------------- */
export const CATEGORY_SLUGS = [
    'fruits',
    'dairy',
    'bakery',
    'pantry',
    'drinks',
    'protein',
    'snacks',
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export const CART_STORAGE_KEY = 'open-closed-cart' as const;

export const SHOP_DEFAULTS = {
    currency: 'تومان',
    deliveryFee: 35000,
    freeDeliveryOver: 500000,
} satisfies Pick<Shop, 'currency' | 'deliveryFee' | 'freeDeliveryOver'>;

/* ------------------------------------------- */
export type LoadState =
    | { status: 'loading' }
    | { status: 'success'; products: Product[] }
    | { status: 'empty' }
    | { status: 'error'; message: string };

/* ------------------------------------------ */
export function isProduct(value: unknown): value is Product {
    return (
        typeof value === 'object' &&
        value !== null &&
        'id' in value &&
        typeof (value as Product).id === 'number' &&
        'categoryId' in value &&
        typeof (value as Product).categoryId === 'number' &&
        'name' in value &&
        typeof (value as Product).name === 'string' &&
        'emoji' in value &&
        typeof (value as Product).emoji === 'string' &&
        'unit' in value &&
        typeof (value as Product).unit === 'string' &&
        'price' in value &&
        typeof (value as Product).price === 'number' &&
        'tags' in value &&
        Array.isArray((value as Product).tags) &&
        (value as Product).tags.every((t) => typeof t === 'string')
    );
}

export function isCategory(value: unknown): value is Category {
    return (
        typeof value === 'object' &&
        value !== null &&
        'id' in value &&
        typeof (value as Category).id === 'number' &&
        'slug' in value &&
        typeof (value as Category).slug === 'string' &&
        'name' in value &&
        typeof (value as Category).name === 'string' &&
        'emoji' in value &&
        typeof (value as Category).emoji === 'string' &&
        'color' in value &&
        typeof (value as Category).color === 'string'
    );
}

export function isOffer(value: unknown): value is Offer {
    return (
        typeof value === 'object' &&
        value !== null &&
        'productId' in value &&
        typeof (value as Offer).productId === 'number' &&
        'percent' in value &&
        typeof (value as Offer).percent === 'number' &&
        'label' in value &&
        typeof (value as Offer).label === 'string'
    );
}

export function isStock(value: unknown): value is Stock {
    if (typeof value !== 'object' || value === null) return false;

    const v = value as Stock;
    if (typeof v.updatedAt !== 'string') return false;
    if (typeof v.items !== 'object' || v.items === null) return false;

    return Object.entries(v.items).every(
        ([key, qty]) => !Number.isNaN(Number(key)) && typeof qty === 'number'
    );
}