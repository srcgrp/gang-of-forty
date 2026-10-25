export type Product = {
    id: number; categoryId: number; name: string; emoji: string;
    unit: string; price: number; tags: string[];
};
export type Category = { id: number; slug: string; name: string; emoji: string; color: string };
export type Offer = { productId: number; percent: number; label: string };
export type Stock = { updatedAt: string; items: Record<string, number> };
export type Link = { label: string; href: string };
export type Banner = { title: string; text: string; emoji: string; cta: Link };
export type Promo = { text: string; emoji: string; color: string; href: string };
export type Carousel = { id: string; title: string; emoji: string } & (
    { source: 'offers'; categoryId?: never } | { categoryId: number; source?: never }
);
export type Home = { hero: Banner; side: Banner; promos: Promo[]; carousels: Carousel[] };
export type Shop = {
    owner: string; city: string; hours: { open: string; close: string };
    name: string; slogan: string; notice: string; about: string; address: string;
    phone: string; currency: string; copyright: string; deliveryFee: number;
    freeDeliveryOver: number; menu: Link[]; help: Link[];
    schedule: { days: string; time: string }[];
};
export type ProductView = Product & { stock: number; percent: number; originalPrice: number };
export type ShopInfo = Readonly<Shop>;
export type CartItem = Pick<Product, 'id'> & { quantity: number };
export type CartLine = Pick<ProductView, 'id' | 'name' | 'emoji' | 'price' | 'stock'> & {
    quantity: number; subtotal: number;
};
export type AppData = {
    products: ProductView[]; categories: Category[]; home: Home; shop: ShopInfo;
    notices: string[];
};
export const API_FILES = ['products.json', 'stock.json', 'offers.json', 'categories.json', 'home.json', 'shop.json'] as const satisfies readonly string[];
export type ApiFile = (typeof API_FILES)[number];
export const FILTER_FIELDS = ['category', 'search'] as const satisfies readonly string[];
export type FilterField = (typeof FILTER_FIELDS)[number];
export type CatalogQuery = Record<FilterField, string>;
export type CarouselView = Carousel & { products: ProductView[] };
export type CatalogView = {
    products: ProductView[]; query: CatalogQuery; category: Category | undefined; active: boolean;
};
export type AppHandlers = {
    query: () => CatalogQuery; changeQuery: (query: CatalogQuery) => void;
    add: (id: number) => void; navigateFragment: () => void;
    reloadCart: () => void; restoreNavigation: () => void;
};
export type LoadState =
    | { status: 'loading' }
    | { status: 'success'; data: AppData }
    | { status: 'empty'; data: AppData }
    | { status: 'error'; message: string };
