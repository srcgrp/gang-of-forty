export type Product = {
  id: number;
  categoryId: number;
  name: string;
  emoji: string;
  unit: string;
  price: number;
  tags: string[];
};
export type Stock = { updatedAt: string; items: Record<string, number> };
export type Category = {
  id: number;
  slug: string;
  name: string;
  emoji: string;
  color: string;
};
export type Categories = Category[];
export type Offer = { productId: number; percent: number; label: string };
export type Offers = Offer[];
export type ProductData = { products: Product[]; offers: Offers };
export type SuggestionsData = {
  products: Product[];
  stock: Stock;
  offers: Offers;
};
export type ProductCardData = {
  product: Product;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  outOfStock?: boolean;
};
