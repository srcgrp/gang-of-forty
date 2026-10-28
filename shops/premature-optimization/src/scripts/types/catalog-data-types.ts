export interface Product {
  id: number;
  categoryId: number;
  name: string;
  image: string;
  unit: string;
  price: number;
  tags: string[];
}
export interface Category {
  id: number;
  slug: string;
  name: string;
  image: string;
  emoji: string | null;
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
