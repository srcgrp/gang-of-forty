export type Product = {
  id: number;
  categoryId: number;
  name: string;
  emoji: string;
  unit: string;
  price: number;
  tags: string[];
};
export type CartItem = Pick<Product, "id" | "name" | "price"> & { quantity: number };
export type Category = {
  id: number;
  slug: string;
  name: string;
  emoji: string;
  color: string;
};
export type Offer = { productId: number; percent: number; label: string };
export type Stock = { updatedAt: string; items: Record<number, number> };
export type MenuLink = { label: string; href: string };
export type Schedule = { days: string; time: string };
export type Shop = {
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
  schedule: Schedule[];
  menu: MenuLink[];
  help: MenuLink[];
  copyright: string;
};
export type Banner = { title: string; text: string; emoji: string; cta: MenuLink };
export type Promo = { text: string; emoji: string; color: string; href: string };
export type Carousel = { id: string; title: string; emoji: string } & (
  | { source: "offers"; categoryId?: never }
  | { source?: undefined; categoryId: number }
);
export type Home = { hero: Banner; side: Banner; promos: Promo[]; carousels: Carousel[] };
export type LoadState =
  | { status: "loading" }
  | { status: "success"; products: Product[] }
  | { status: "empty" }
  | { status: "error"; message: string };
export type CardView = {
  id: number;
  name: string;
  emoji: string;
  unit: string;
  price: string;
  oldPrice: string;
  badge: string;
  available: boolean;
  item: CartItem;
};
export type SectionView = { id: string; title: string; carousel: boolean; cards: CardView[] };
export type PageView = { sections: SectionView[] };
export type ShopData = {
  products: Product[]; stock: Stock; offers: Offer[];
  categories: Category[]; shop: Shop; home: Home;
};
export type SearchState = { query: string; category: string; sort: string };
