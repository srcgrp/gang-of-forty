export type Product = {
  id: number;
  categoryId: number;
  name: string;
  emoji: string;
  unit: string;
  price: number;
  tags: string[];
  image?: string;
};

export type Category = {
  id: number;
  slug: string;
  name: string;
  emoji: string;
  color?: string;
  image?: string;
};

export type Offer = {
  productId: number;
  percent: number;
  label: string;
};

export type Stock = {
  items: Record<string, number>;
  updatedAt?: string;
};

export type Shelf = {
  id: string;
  title: string;
  source?: 'offers';
  categoryId?: number;
};

export type Card = {
  id: number;
  name: string;
  image?: string;
  emoji: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  unit: string;
  inStock: boolean;
  stockKnown: boolean;
  stockQty: number;
};

export type ShelfView = {
  shelf: Shelf;
  cards: Card[];
};

export type CarouselSort = 'default' | 'price';
