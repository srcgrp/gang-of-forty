export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId?: number | undefined;
  emoji?: string | undefined;
  unit?: string | undefined;
  desc?: string | undefined;
  rating?: number | undefined;
  reviews?: number | undefined;
  brand?: string | undefined;
  oldPrice?: number | undefined;
}

export interface Category {
  id: number;
  name: string;
  emoji?: string | undefined;
  slug?: string | undefined;
}

export interface Offer {
  productId: number;
  percent: number;
}

export interface StockData {
  items: Record<number, number>;
}

export interface Shop {
  name?: string | undefined;
  slogan?: string | undefined;
  notice?: string | undefined;
  about?: string | undefined;
  phone?: string | undefined;
  copyright?: string | undefined;
  menu?: { label: string; href: string }[] | undefined;
  help?: { label: string; href: string }[] | undefined;
  schedule?: { days: string; time: string }[] | undefined;
}

export interface Home {
  hero?:
    | { title: string; text: string; cta: { label: string; href: string } }
    | undefined;
  side?:
    | { title: string; text: string; cta: { label: string; href: string } }
    | undefined;
  promos?: { emoji: string; text: string; href: string }[] | undefined;
}

export interface AppData {
  products: Product[];
  categories: Category[];
  shop: Shop;
  home: Home;
  offers: Offer[];
  stock: StockData;
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
  | { status: "loading" }
  | { status: "error"; message: string; kind: ApiErrorType }
  | { status: "success"; data: T };

export interface CartLine {
  id: number;
  name: string;
  price: number;
  quantity: number;
  emoji?: string | undefined;
}

export type ProductCardProps = {
  product: Product;
  stock?: number | undefined;
  discountPercent?: number | undefined;
  cartQuantity?: number | undefined;
  onAdd: (id: number) => void;
  isLiked?: boolean | undefined;
  onToggleWishlist?: ((p: Product) => void) | undefined;
};
