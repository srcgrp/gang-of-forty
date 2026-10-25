export type Category = {
    id: number;
    name: string;
    slug: string;
    emoji: string;
    color?: string;
};

export interface CTA {
    label: string;
    href: string;
}

export interface MainCardProps {
    title: string;
    text: string;
    emoji: string;
    image: string;
    cta: {
        label: string;
        href: string;
    };
}

export interface PromoItem {
    href: string;
    bg: string;
    emoji: string;
    text: string;
}

export type FooterLink = {
    label: string;
    href: string;
};

export type Schedule = {
    days: string;
    time: string;
};

export type Shop = {
    about: string;
    deliveryFee: number;
    freeDeliveryOver: number;
    currency: string;
    phone: string;
    address: string;
    menu: FooterLink[];
    help: FooterLink[];
    schedule: Schedule[];
};

export type Home = {
    hero: MainCardProps;
    side: MainCardProps;
    promos: PromoItem[];
};

export type ApiProduct = {
    id: number;
    categoryId: number;
    name: string;
    emoji: string;
    unit: string;
    price: number;
    tags: string[];
};

export type ProductView = ApiProduct & {
    off: number | undefined;
    oldPrice: number | undefined;
    stock: number;
    unit?: string;
};
export type Stock = {
    items: Record<number, number>;
    updatedAt: string;
};

export type Offer = {
    productId: number;
    percent: number;
    label: string;
};

export type AppData = {
    products: ProductView[];
    categories: Category[];
    home: Home;
    shop: Shop;
};