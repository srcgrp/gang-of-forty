import type { SORTS } from "./sorts";

/* ------------------------- DOM ------------------------- */

export type MakeElement = <T extends keyof HTMLElementTagNameMap>(
  tag: T,
  className?: string,
  text?: string,
) => HTMLElementTagNameMap[T];

export type AppendLinks = (
  container: Element,
  label: string,
  href?: string,
  className?: string,
) => HTMLAnchorElement;

/* --------------------- API data ----------------------- */

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  image: string;
  unit: string;
  price: number;
  tags: string[];
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  image: string;
  emoji: string | null;
  color: string;
}

export interface Offer {
  productId: number;
  percent: number;
  label: string;
}

export interface Stock {
  updatedAt: string;
  items: Record<string, number>;
}

export interface ShopMenuItem {
  label: string;
  href: string;
}

export interface ShopScheduleItem {
  days: string;
  time: string;
}

export interface ShopHours {
  open: string;
  close: string;
}

export interface Shop {
  name: string;
  slogan: string | null;
  owner: string;
  city: string;
  phone: string;
  hours: ShopHours;
  deliveryFee: number;
  freeDeliveryOver: number;
  currency: string;
  notice: string | null;
  about: string;
  address: string;
  schedule: ShopScheduleItem[];
  menu: ShopMenuItem[];
  copyright: string;
}

// home.json
export interface CallToAction {
  label: string;
  href: string;
}

export interface BannerData {
  title: string;
  text: string;
  name?: string;
  emoji: string;
  cta?: CallToAction;
}

export interface Promo {
  text: string;
  href: string;
  name?: string;
  emoji: string;
}

export interface CarouselConfig {
  id: string;
  title: string;
  emoji?: string | null;
  source?: string;
  categoryId?: number | null;
  category?: Pick<Category, "id">;
}

export interface Home {
  hero?: BannerData | null;
  side?: BannerData | null;
  promos?: Promo[];
  carousels?: CarouselConfig[];
}

/* --------------------------- Page state -------------------------- */

export interface CatalogData {
  products: Product[];
  stock: Stock;
  offers: Offer[];
  categories: Category[];
  shop: Shop;
  home: Home;
}

export type LoadState =
  | { status: "loading" }
  | ({ status: "success" } & CatalogData)
  | { status: "empty" }
  | { status: "error"; message: string };

/* ----------------------------- Cart ------------------------------ */

export type Cart = Record<string, number>;

export interface CartLine extends Pick<Product, "id" | "name" | "price"> {
  quantity: number;
}

/* ------------------------ Sort ---------------------- */

export type Sort = (typeof SORTS)[number];

/* ---------------------------- UI state --------------------------- */

export interface ProductCardOptions {
  offer?: Offer;
  stock: Stock;
  categoryName: string;
}

export type OptionsForProduct = (product: Product) => ProductCardOptions;

export interface CarouselElements {
  products: HTMLUListElement;
  viewport: HTMLDivElement;
  previous: HTMLButtonElement;
  next: HTMLButtonElement;
}

export interface CarouselState {
  offset: number;
  step: number;
  maxOffset: number;
}
