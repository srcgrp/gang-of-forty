export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId?: number;
  emoji?: string;
  unit?: string;
  desc?: string;
  rating?: number;
  reviews?: number;
  brand?: string;
  oldPrice?: number;
}

export interface Category {
  id: number;
  name: string;
  emoji?: string;
  slug?: string;
}

export interface Offer {
  productId: number;
  percent: number;
}

export interface StockData {
  items: Record<number, number>;
}

export interface Shop {
  week?: number;
  name?: string;
  slogan?: string;
  notice?: string;
  about?: string;
  phone?: string;
  copyright?: string;
  menu?: { label: string; href: string }[];
  help?: { label: string; href: string }[];
  schedule?: { days: string; time: string }[];
}

export interface HomeCarousel {
  id: string;
  title: string;
  emoji?: string;
  source?: string;
  categoryId?: number;
}

export interface Home {
  hero?: { title: string; text: string; cta: { label: string; href: string } };
  side?: { title: string; text: string; cta: { label: string; href: string } };
  promos?: { emoji: string; text: string; href: string }[];
  carousels?: HomeCarousel[];
}

export interface AppData {
  products: Product[];
  categories: Category[];
  shop: Shop;
  home: Home;
  offers: Offer[];
  stock: StockData;
}

export interface CartLine {
  id: number;
  name: string;
  price: number;
  quantity: number;
  emoji?: string | undefined;
}

export type ApiErrorType =
  | "timeout"
  | "abort"
  | "http"
  | "parse"
  | "network"
  | "unknown";

export type LoadState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string; type?: ApiErrorType };
