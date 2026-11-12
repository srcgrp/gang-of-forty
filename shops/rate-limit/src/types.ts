export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  unit: string;
  emoji: string;
  categoryId: string;
  tags: string[];
}
export interface Category {
  id: string;
  slug: string;
  name: string;
  emoji: string;
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
export interface ShopLink {
  label: string;
  href: string;
}
export interface ShopSchedule {
  days: string;
  time: string;
}
export interface Shop {
  name: string;
  slogan: string;
  owner: string;
  city: string;
  phone: string;
  hours: { open: string; close: string };
  deliveryFee: number;
  freeDeliveryOver: number;
  currency: string;
  notice: string;
  about: string;
  address: string;
  copyright: string;
  schedule: ShopSchedule[];
  menu: ShopLink[];
  help: ShopLink[];
}
export type ShopInfo = Readonly<Shop>;

export interface CatalogItem extends Product {
  stock: number;
  color?: string;
  percent?: number;
  label?: string;
  oldPrice?: number;
}
export interface Catalog {
  items: CatalogItem[];
  specials: CatalogItem[];
  categories: Category[];
}
export interface CategoryGroup {
  category: Category;
  items: CatalogItem[];
}
export type CategorySection = CategoryGroup & { countText: string };

export type CartLine = Pick<Product, "id" | "name" | "price"> & {
  quantity: number;
};
export type Cart = Readonly<Record<number, CartLine>>;
export interface CartAddDetail {
  product: CatalogItem;
  quantity: number;
}
declare global {
  interface DocumentEventMap {
    "cart:add": CustomEvent<CartAddDetail>;
  }
}

export const SORTS = [
  "default",
  "price-asc",
  "price-desc",
  "discount",
] as const;
export type Sort = (typeof SORTS)[number];
export type SortComparators = Record<
  Sort,
  (a: CatalogItem, b: CatalogItem) => number
>;

export type LoadState<P extends Product = Product> =
  | { status: "loading" }
  | { status: "success"; products: P[] }
  | { status: "empty" }
  | { status: "error"; message: string };

export interface StateView {
  skeletons: number;
  emptyText: string;
  errorTitle: string;
  retry: () => void;
  build: (products: CatalogItem[]) => HTMLElement[];
}

export interface CardView {
  emoji: string;
  name: string;
  unit: string;
  color?: string;
  tag?: string;
  badge?: string;
  stockText?: string;
  price: string;
  oldPrice?: string;
  currency: string;
  soldOut: boolean;
  disabled: boolean;
  addLabel: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}