export const THEMES = ['auto', 'light', 'dark'] as const;
export type Theme = (typeof THEMES)[number];

export function isTheme(v: unknown): v is Theme {
  return THEMES.some((t) => t === v);
}

export type Product = {
  id: number; categoryId: number; name: string; emoji: string;
  unit: string; price: number; tags: string[]; image?: string;
};

export type Category = {
  id: number; slug: string; name: string; emoji: string;
  color?: string; image?: string;
};

export type Offer = { productId: number; percent: number; label: string };
export type Stock = { items: Record<string, number>; updatedAt?: string };
export type Link = { label: string; href: string };
export type Shelf = { id: string; title: string; source?: 'offers'; categoryId?: number };

export type Shop = {
  name: string; slogan: string; notice: string; about: string;
  address: string; phone: string;
  schedule: { days: string; time: string }[];
  menu: Link[]; help: Link[]; copyright: string;
};

export type Home = {
  hero?: { title?: string; text?: string; cta?: Link };
  carousels?: Shelf[];
};

export type Cart = Record<string, number>;
export type CartLine = Pick<Product, 'id'> & { quantity: number };
export type CartChange = 'add' | 'remove' | 'remove-line';

export type LoadState =
  | { status: 'loading' }
  | { status: 'success'; products: Product[] }
  | { status: 'empty' }
  | { status: 'error'; message: string };

export type Card = {
  id: number; name: string; image?: string; emoji: string;
  price: number; oldPrice?: number; discountPercent?: number;
  unit: string; inStock: boolean; qty: number; stockQty: number;
};

export type CartRow = {
  id: number; name: string; qty: number;
  lineTotal: number; image?: string; emoji: string;
};

export type CartView = { count: number; rows: CartRow[]; total: number };
export type ShelfView = { shelf: Shelf; cards: Card[] };

export const SORTS = ['default', 'price-asc', 'price-desc', 'discount'] as const;
export type Sort = (typeof SORTS)[number];