export type Product = {
    id: number;
    categoryId: number;
    name: string;
    emoji: string;
    unit: string;
    price: number;
    tags?: string[];
};

export type Category = {
    id: number;
    slug: string;
    name: string;
    emoji: string;
    color: string;
};

export type Offer = {
    productId: number;
    percent: number;
    label: string;
};

export type Stock = {
    updatedAt: string;
    items: Record<string, number>;
};

export type Shop = {
    name: string;
    slogan: string;
    owner: string;
    city: string;
    phone: string;
    hours: {
        open: string;
        close: string;
    };
    deliveryFee: number;
    freeDeliveryOver: number;
    currency: string;
    notice: string;
    about: string;
    address: string;
    schedule: {
        days: string;
        time: string;
    }[];
    menu: {
        label: string;
        href: string;
    }[];
    help: {
        label: string;
        href?: string;
    }[];
    copyright: string;
};

export type CartItem = {
    productId: number;
    quantity: number;
};

export type CartLine = Product & {
    quantity: number;
};

export type ProductPreview = Pick<
    Product,
    "id" | "name" | "emoji" | "price"
>;

export type ProductUpdate = Partial<
    Pick<Product, "name" | "price" | "tags">
>;

export type LoadState<T> =
    | { status: "loading" }
    | { status: "success"; data: T }
    | { status: "empty" }
    | { status: "error"; message: string };

export const SORT_OPTIONS = [
    "price-asc",
    "price-desc",
    "name"
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export const FILTER_OPTIONS = [
    "all",
    "discounted",
    "available"
] as const;

export type FilterOption = (typeof FILTER_OPTIONS)[number];