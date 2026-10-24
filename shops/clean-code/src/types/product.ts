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
  items: Record<string, number>;
};

export type MakeItem = (product: Product) => HTMLElement;

export type CartItem = Product & { qty: number };
