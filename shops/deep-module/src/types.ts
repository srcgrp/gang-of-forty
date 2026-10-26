export interface Product {
  id: number;
  name: string;
  emoji?: string;
  unit?: string;
  price: number;
  categoryId?: number;
}

export interface Category {
  id: number;
  name: string;
  emoji?: string;
  color?: string;
}

// Utility Type 1: Pick
export type ProductId = Pick<Product, "id">;

// Utility Type 2: Record (برای موجودی انبار)
export type StockMap = Record<number, number>;

export interface CartItem extends Product {
  quantity: number;
}

export interface Offer {
  productId: number;
  percent: number;
}

export interface StockData {
  items: StockMap;
}
export interface AppData {
  products: Product[];
  categories: Category[];
  shop: Shop;
  home: Home;
  offers: Offer[];
  stock: StockData;
}

export interface AppState {
  data: AppData | null;
  cart: CartItem[];
  filters: FilterState;
  searchIds: Set<number> | null;
  searchQuery: string;
}
export interface ShopMenu {
  href: string;
  label: string;
}

export interface ShopHelp {
  href: string;
  label: string;
}

export interface ShopSchedule {
  days: string;
  time: string;
}

export interface Shop {
  name?: string;
  slogan?: string;
  notice?: string;
  about?: string;
  phone?: string;
  copyright?: string;
  menu?: ShopMenu[];
  help?: ShopHelp[];
  schedule?: ShopSchedule[];
}

export interface HeroCTA {
  href: string;
  label: string;
}

export interface HeroSection {
  title?: string;
  text?: string;
  cta?: HeroCTA;
}

export interface HomePromo {
  href: string;
  emoji?: string;
  text?: string;
}

export interface Home {
  hero?: HeroSection;
  side?: HeroSection;
  promos?: HomePromo[];
}

// استفاده از as const (بدون enum)
export const SORTS = ["default", "price-asc", "price-desc", "name"] as const;
export type Sort = (typeof SORTS)[number];

export interface FilterState {
  categoryId: string;
  stock: "all" | "in" | "out";
  discount: "all" | "yes";
  sort: Sort;
}

export type ApiErrorType =
  | "offline"
  | "timeout"
  | "network"
  | "http"
  | "parse"
  | "abort"
  | "unknown";

export type LoadState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string; kind: ApiErrorType };
export interface AppData {
  products: Product[];
  categories: Category[];
  shop: Shop;
  home: Home;
  offers: Offer[];
  stock: StockData;
}

export interface AppState {
  data: AppData | null;
  cart: CartItem[];
  filters: FilterState;
  searchIds: Set<number> | null;
  searchQuery: string;
}
