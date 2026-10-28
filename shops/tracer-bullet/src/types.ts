export type Link = { label: string; href: string; };

export type ScheduleRow = { days: string; time: string; };

export type Promo = { text: string; emoji: string; color: string; href: string; };

export type Banner = { title: string; text: string; emoji: string; cta: Link; };

export type Shop = {
    slogan: string;
    phone: string;
    notice: string;
    about: string;
    address: string;
    schedule: ScheduleRow[];
    menu: Link[];
    help: Link[];
};

export type OffersCarousel = { id: string; title: string; emoji: string; source: string; };

export type CategoryCarousel = { id: string; title: string; emoji: string; categoryId: number; };

export type Carousel = OffersCarousel | CategoryCarousel;

export type Home = { hero: Banner; side: Banner; promos: Promo[]; carousels: Carousel[]; };

export type Product = {
    id: number;
    categoryId: number;
    name: string;
    emoji: string;
    unit: string;
    price: number;
    tags: string[];
};

export type Offer = { productId: number; percent: number; label: string; };

export type Category = { id: number; slug: string; name: string; emoji: string; color: string; };

export type Stock = { updatedAt: string; items: Record<string, number>; };

export type CartLine = Pick<Product, "id" | "name" | "price"> & {
    quantity: number;
};

export type CardProduct = Pick<Product, "id" | "name" | "emoji" | "unit" | "price"> & {
    stock: number; newPrice?: number; percent?: number; label?: string;
};

export const SORTS = ["price", "name"] as const;
export type Sort = (typeof SORTS)[number];

export type Data = {
    products: Product[];
    offers: Offer[];
    stock: Stock;
    categories: Category[];
    shop: Shop;
    home: Home;
};

export type LoadState =
    | { status: "loading" }
    | { status: "success"; data: Data }
    | { status: "empty" }
    | { status: "error"; message: string };
