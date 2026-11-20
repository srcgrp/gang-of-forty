/*
 * Shapes of the JSON files served by the API (../../api/).
 * These types are a promise to TypeScript: it cannot verify the server's
 * response at runtime, it only checks that our code uses the data consistently.
 */

export type Link = {
    href: string;
    label: string;
};

/* ---------- shop.json ---------- */

export type ScheduleEntry = {
    days: string;
    time: string;
};

export type Shop = {
    name: string;
    notice: string;
    menu: Link[];
    phone: string;
    address: string;
    about: string;
    help: Link[];
    schedule: ScheduleEntry[];
    copyright: string;
};

/* ---------- categories.json ---------- */

export type Category = {
    id: number;
    slug: string;
    name: string;
    emoji: string;
    color: string;
};

/* ---------- home.json ---------- */

export type Banner = {
    title: string;
    text: string;
    emoji: string;
    cta: Link;
};

export type Promo = {
    href: string;
    text: string;
    emoji: string;
    color: string;
};

// A carousel shows either the discounted products (source: 'offers')
// or all products of one category (categoryId).
export type CarouselConfig = {
    id: string;
    title: string;
    emoji: string;
    source?: string;
    categoryId?: number;
};

export type Home = {
    hero: Banner;
    side: Banner;
    promos: Promo[];
    carousels: CarouselConfig[];
};

/* ---------- products.json, stock.json, offers.json ---------- */

export type Product = {
    id: number;
    categoryId: number;
    name: string;
    emoji: string;
    unit: string;
    price: number;
    tags: string[];
};

// Maps a product ID to the quantity in stock. A missing key means "out of stock".
export type Stock = {
    items: Record<number, number>;
};

export type Offer = {
    productId: number;
    percent: number;
};

/* ---------- Combined data ---------- */

export type AppData = {
    shop: Shop;
    categories: Category[];
    home: Home;
    products: Product[];
    stock: Stock;
    offers: Offer[];
};

/* ---------- Cart (localStorage) ---------- */

// Stored format: { "201": 2, "104": 1 } means product ID -> quantity.
export type Cart = Record<string, number>;
