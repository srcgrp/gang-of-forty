/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */


export type Product = {
  id: number;
  categoryId: number;
  name: string;
  emoji?: string;
  unit: string;
  price: number;
  tags?: string[];
};

export type Category = {
  id: number;
  slug: string;
  name: string;
  color?: string;
};

export type Offer = {
  productId: number;
  percent: number;
};

export type StockData = {
  items: Record<string, number | string>;
};

export type CallToAction = {
  label: string;
  href: string;
};

export type CarouselDefinition = {
  id: string;
  title: string;
  source?: string;
  categoryId?: number;
};

export type Promo = {
  text: string;
  href: string;
};

export type HomeData = {
  hero: {
    title: string;
    text: string;
    cta?: CallToAction | null;
  };
  side: {
    title: string;
    text: string;
    cta?: CallToAction | null;
  };
  carousels?: CarouselDefinition[];
  promos?: Promo[];
};

export type ShopMenuItem = {
  label: string;
  href: string;
};

export type ShopHelpItem = {
  label: string;
  href?: string;
};

export type ShopScheduleRow = {
  days: string;
  time: string;
};

export type ShopData = {
  notice?: string;
  menu?: ShopMenuItem[];
  about?: string;
  help?: ShopHelpItem[];
  schedule?: ShopScheduleRow[];
};

export type ApiData = {
  products: Product[];
  categories: Category[];
  stock: StockData;
  offers: Offer[];
  shop: ShopData;
  home: HomeData;
};

export type ProductItem = {
  product: Product;
  art: string | null;
  stock: number;
  soldOut: boolean;
  percent: number;
  oldPrice: number;
  price: number;
};

export type SearchIndexEntry = {
  item: ProductItem;
  name: string;
  text: string;
  categoryWords: string[];
};

export type ShopModel = {
  products: Product[];
  categories: Category[];
  offers: Offer[];
  shop: ShopData;
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