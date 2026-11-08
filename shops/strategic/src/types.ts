/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

export type Product = { id: number; categoryId: number; name: string; emoji: string; unit: string; price: number; tags: string[] };
export type Category = { id: number; slug: string; name: string; emoji: string; color: string };
export type Offer = { productId: number; percent: number; label: string };
export type StockData = { updatedAt: string; items: Record<string, number> };
export type CallToAction = { label: string; href: string };
export type HomeSection = { title: string; text: string; emoji: string; cta?: CallToAction | null };
export type CarouselDefinition = { id: string; title: string; emoji: string; source?: 'offers'; categoryId?: number };
export type Promo = { text: string; href: string; emoji: string; color: string };
export type HomeData = { hero: HomeSection; side: HomeSection; carousels: CarouselDefinition[]; promos: Promo[] };
export type ShopMenuItem = { label: string; href: string };
export type ShopHelpItem = { label: string; href?: string };
export type ShopScheduleRow = { days: string; time: string };
export type ShopData = {
  name: string; slogan: string; owner: string; city: string; phone: string; hours: { open: string; close: string };
  deliveryFee: number; freeDeliveryOver: number; currency: string; notice: string; about: string; address: string;
  schedule: ShopScheduleRow[]; menu: ShopMenuItem[]; help: ShopHelpItem[]; copyright: string;
};
export type ApiData = { products: Product[]; categories: Category[]; stock: StockData; offers: Offer[]; shop: ShopData; home: HomeData };
export type LoadState =
  | { status: 'loading' }
  | { status: 'success'; products: Product[] }
  | { status: 'empty' }
  | { status: 'error'; message: string; failure?: ApiFailure };
export type ProductItem = { product: Product; art: string | null; stock: number; soldOut: boolean; percent: number; oldPrice: number; price: number };
export type CartLine = { productId: number; quantity: number };
export type CartItem = ProductItem & Pick<CartLine, 'quantity'> & { subtotal: number; oldSubtotal: number };
export type CartChange = { lines: CartLine[]; name: string; before: number; after: number };
export type CartTotals = { total: number; oldTotal: number; discount: number };
export type CartView = CartTotals & { ready: boolean; count: number; rows: readonly CartItem[] };
export type SearchIndexEntry = { item: ProductItem; name: string; text: string; categoryWords: string[] };
export type ShopModel = {
  products: Product[]; categories: Category[]; offers: Offer[]; shop: Readonly<ShopData>; home: HomeData;
  stockOf: (id: number) => number; items: Map<number, ProductItem>; itemsByCategory: Map<number, ProductItem[]>;
  searchIndex: SearchIndexEntry[]; categoryById: Map<number, Category>; categoryBySlug: Map<string, Category>;
  categoryArt: Map<number, string | null>; offerItems: ProductItem[]; carousels: CarouselDefinition[];
};
export type Route = { type: 'home' } | { type: 'catalog'; slug: string; query: string } | { type: 'search'; query: string };
export type ApiErrorKind = 'network' | 'http' | 'parse' | 'timeout' | 'shape';
export type ApiFailure = { kind: ApiErrorKind; file: string; status?: number };
export type QtyOf = (id: number) => number;
export type CatalogView = { title: string; category: Category | null; items: readonly ProductItem[]; query: string; found: boolean };
export type ProductView = { route: Route; catalog: CatalogView; matches: ProductItem[]; tag: ProductItem | null };
export type LinkOf = (slug: string) => string;
export type PageView = { model: ShopModel; products: ProductView; home: string; hashId: string; linkOf: LinkOf; cartIds: number[]; qtyOf: QtyOf };
export type DrawOptions = { focus?: boolean; smooth?: boolean; top?: number };
export type Actions = {
  retry: () => void; edit: (text: string) => void; search: (text: string) => void;
  change: (id: number, direction: 'add' | 'remove', celebrate: boolean) => void;
  navigate: (href: string) => void; section: (href: string) => void;
};
export const CATEGORY_PARAM = 'category';
export const QUERY_PARAM = 'q';
export const OFFERS_VIEW = 'offers';
export const SORTS = ['relevance', 'name'] as const;
export type Sort = (typeof SORTS)[number];