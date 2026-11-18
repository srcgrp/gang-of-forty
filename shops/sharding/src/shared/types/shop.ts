import type { Category, Offer, Product, Shelf, Stock } from './catalog';

export type Link = {
  label: string;
  href: string;
};

export type Shop = {
  name: string;
  slogan: string;
  notice: string;
  about: string;
  address: string;
  phone: string;
  schedule: {
    days: string;
    time: string;
  }[];
  menu: Link[];
  help: Link[];
  copyright: string;
};

export type Home = {
  hero?: {
    title?: string;
    text?: string;
    cta?: Link;
  };
  carousels?: Shelf[];
};

export type LoadState =
  | { status: 'loading' }
  | { status: 'success'; products: Product[] }
  | { status: 'empty' }
  | { status: 'error'; message: string };

export type AppState = {
  shop: Readonly<Shop> | null;
  home: Home | null;
  categories: Category[];
  products: Product[];
  stock: Stock | null;
  offerMap: Map<number, Offer>;
  res: LoadState;
};
