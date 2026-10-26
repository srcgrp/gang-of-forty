/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

// ----- API Data -----
export type Product = { id: number; categoryId: number; name: string; emoji?: string; unit: string; price: number; tags?: string[] };
export type Category = { id: number; slug: string; name: string; color?: string };
export type Offer = { productId: number; percent: number };
export type StockData = { items: Record<string, number | string> };
export type CallToAction = { label: string; href: string };
export type HomeSection = { title: string; text: string; cta?: CallToAction | null };
export type CarouselDefinition = { id: string; title: string; source?: string; categoryId?: number };
export type Promo = { text: string; href: string };
export type HomeData = { hero: HomeSection; side: HomeSection; carousels?: CarouselDefinition[]; promos?: Promo[] };
export type ShopMenuItem = { label: string; href: string };
export type ShopHelpItem = { label: string; href?: string };
export type ShopScheduleRow = { days: string; time: string };
export type ShopData = {
  notice?: string; menu?: ShopMenuItem[]; about?: string; help?: ShopHelpItem[]; schedule?: ShopScheduleRow[];
};
export type ApiData = {
  products: Product[]; categories: Category[]; stock: StockData; offers: Offer[]; shop: ShopData; home: HomeData;
};

// ----- Page State -----
export type LoadState =
  | { status: 'loading' }
  | { status: 'success'; products: Product[] }
  | { status: 'empty' }
  | { status: 'error'; message: string };

// ----- Data Made In The Browser -----
export type ProductItem = {
  product: Product; art: string | null; stock: number; soldOut: boolean; percent: number; oldPrice: number; price: number;
};
export type CartLine = { productId: number; quantity: number };
export type CartItem = ProductItem & Pick<CartLine, 'quantity'>;
export type SearchIndexEntry = { item: ProductItem; name: string; text: string; categoryWords: string[] };
export type ShopModel = {
  products: Product[];
  categories: Category[];
  offers: Offer[];
  shop: Readonly<ShopData>;
  home: HomeData;
  stockOf: (id: number) => number;
  items: Map<number, ProductItem>;
  itemsByCategory: Map<number, ProductItem[]>;
  searchIndex: SearchIndexEntry[];
  categoryById: Map<number, Category>;
  categoryBySlug: Map<string, Category>;
  categoryArt: Map<number, string | null>;
  offerItems: ProductItem[];
  carousels: CarouselDefinition[];
};

// ----- App -----
export type Route = { type: 'home' } | { type: 'catalog'; slug: string; query: string } | { type: 'search'; query: string };
export type ApiErrorKind = 'network' | 'http' | 'parse' | 'timeout' | 'shape';
export type ApiFailure = { kind: ApiErrorKind; file: string; status?: number | undefined };
export type QtyOf = (id: number) => number;
export type AppState = { model: ShopModel; ready: boolean; cart: CartLine[]; pendingQuery: string; renderedSearch: string };
export const CATEGORY_PARAM = 'category';
export const QUERY_PARAM = 'q';

export const SORTS = ['relevance', 'name'] as const;
export type Sort = (typeof SORTS)[number];