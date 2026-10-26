export type Product = {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  unit: string;
  emoji?: string;
};

export type Offer = {
  productId: number;
  percent: number;
  label: string;
};

export type Stock = {
  items: Record<number, number>;
};

export type Hero = {
  title: string;
  text: string;
  cta: {
    label: string;
    href: string;
  };
};

export type HomeCarousel = {
  id: string;
  title: string;
  source?: string;
  categoryId?: number;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type Promo = {
  href: string;
  text: string;
};

export type LinkItem = {
  href: string;
  label: string;
};

export type Shop = {
  help: LinkItem[];
  menu: LinkItem[];
  about: string;
  schedule: {
    days: string;
    time: string;
  }[];
  phone: string;
  address: string;
  name: string;
  copyright: string;
  notice: string;
};

export type Home = {
  hero: Hero;
  side: Hero;
  promos: Promo[];
  carousels: HomeCarousel[];
};

export type CartItem = Pick<Product, "id" | "price"> & {
  quantity: number;
};

export const THEMES = ["light", "dark"] as const;
export type Theme = (typeof THEMES)[number];

export const PRODUCT_FILTERS = ["all", "offers"] as const;
export type ProductFilter = (typeof PRODUCT_FILTERS)[number];