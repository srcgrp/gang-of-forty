import type { Home, Shop } from "./content-types";

export type Product = {
  id: number;
  categoryId: number;
  name: string;
  emoji: string;
  unit: string;
  price: number;
  tags: string[];
};

export type Offer = {
  productId: number;
  percent: number;
  label: string;
};

export type Category = {
  id: number;
  slug: string;
  name: string;
  emoji: string;
  color: string;
};

export type Stock = {
  updatedAt: string;
  items: Record<number, number>;
};

export type CartLine = Pick<Product, "id" | "name" | "price"> & {
  quantity: number;
};

export const SORTS = ["price", "name"] as const;
export type Sort = (typeof SORTS)[number];

export type Data = {
  products: Product[];
  offers: Offer[];
  stock: Stock;
  categories: Category[];
  shop: Shop;
  home: Home;
};

export type CardProduct = {
  id: number;
  name: string;
  emoji: string;
  unit: string;
  price: number;
  stock: number;
  newPrice?: number;
  percent?: number;
  label?: string;
};