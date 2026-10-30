export interface Product {
  id: number;
  name: string;
  price: number;
  unit?: string;
  emoji?: string;
  categoryId: number;
  tags?: string[];
}

export interface Offer {
  productId: number;
  percent: number;
  label: string;
}

export interface StockData {
  items: Record<string, number>;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  emoji: string;
  color: string;
}

export interface ProductView {
  product: Product;
  offer?: Offer;
  stock?: number;
}

export type LoadState =
  | { status: 'loading' }
  | { status: 'success'; products: ProductView[] }
  | { status: 'empty' }
  | { status: 'error'; message: string };


  
export interface CartLine {
  productId: number;
  qty: number;
}

export interface ShopLink {
  label: string;
  href: string;
}

export interface ShopSchedule {
  days: string;
  time: string;
}

export interface ShopHours {
  open: string;
  close: string;
}

export interface Shop {
  name: string;
  slogan: string;
  owner: string;
  city: string;
  phone: string;
  hours: ShopHours;
  deliveryFee: number;
  freeDeliveryOver: number;
  currency: string;
  notice: string;
  about: string;
  address: string;
  schedule: ShopSchedule[];
  menu: ShopLink[];
  help: ShopLink[];
  copyright: string;
}

export interface HomeCta {
  label: string;
  href: string;
}

export interface HomeBanner {
  title: string;
  text: string;
  emoji: string;
  cta: HomeCta;
}

export interface HomePromo {
  text: string;
  emoji: string;
  color: string;
  href: string;
}

export interface CarouselConfig {
  id: string;
  title: string;
  emoji: string;
  source?: string;
  categoryId?: number;
}

export interface Home {
  hero: HomeBanner;
  side: HomeBanner;
  promos: HomePromo[];
  carousels: CarouselConfig[];
}
