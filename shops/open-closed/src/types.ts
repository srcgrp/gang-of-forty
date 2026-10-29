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
export type LoadState =
    | { status: 'loading' }
    | { status: 'success'; products: Product[] }
    | { status: 'empty' }
    | { status: 'error'; message: string };

export type ProductPreview = Pick<Product, 'id' | 'name' | 'price'>;
export type ReadonlyProduct = Readonly<Product>;


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