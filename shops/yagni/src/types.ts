export type CartItem = Pick<Product, "name" | "price"> & {
  productId: number;
  quantity: number;
};
export type Cart = CartItem[];
export type Product = {
  id: number;
  categoryId: number;
  name: string;
  emoji: string;
  unit: string;
  price: number;
  tags: string[];
};
export type Stock = { updatedAt: string; items: Record<string, number> };
export type Category = {
  id: number;
  slug: string;
  name: string;
  emoji: string;
  color: string;
};
export type Categories = Category[];
export type Offer = { productId: number; percent: number; label: string };
export type Offers = Offer[];
export type ProductData = { products: Product[]; offers: Offers };
export type SuggestionsData = {
  products: Product[];
  stock: Stock;
  offers: Offers;
};
export type Schedule = { days: string; time: string };
export type MenuItem = { label: string; href: string };
export type HelpItem = { label: string; href: string };
export type Shop = {
  readonly name: string;
  readonly slogan: string;
  readonly owner: string;
  readonly city: string;
  readonly phone: string;
  readonly hours: Readonly<{
    open: string;
    close: string;
  }>;
  readonly deliveryFee: number;
  readonly freeDeliveryOver: number;
  readonly currency: string;
  readonly notice: string;
  readonly about: string;
  readonly address: string;
  readonly schedule: readonly Schedule[];
  readonly menu: readonly MenuItem[];
  readonly help: readonly HelpItem[];
  readonly copyright: string;
};
export type ShopData = { shop: Shop; categories: Categories };
export type HomeSlide = {
  emoji: string;
  title: string;
  text: string;
  cta: { href: string; label: string };
};
export type Promo = {
  href: string;
  color: string;
  emoji: string;
  text: string;
};
export type HomeCarousel = {
  id: string;
  title: string;
  emoji: string;
  source?: "offers";
  categoryId?: number;
};
export type Home = {
  hero: HomeSlide;
  side: HomeSlide;
  promos: Promo[];
  carousels: HomeCarousel[];
};
export type ProductCardData = {
  product: Product;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  outOfStock?: boolean;
};
export type LoadState =
  | { status: "loading" }
  | { status: "success"; products: Product[] }
  | { status: "empty" }
  | { status: "error"; message: string };
