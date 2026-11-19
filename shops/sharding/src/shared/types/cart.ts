import type { Product } from './catalog';

export type Cart = Record<string, number>;

export type CartLine = Pick<Product, 'id'> & {
  quantity: number;
};

export type CartChange = 'add' | 'remove' | 'remove-line';

export type CartRow = {
  id: number;
  name: string;
  qty: number;
  lineTotal: number;
  image?: string;
  emoji: string;
};
