export interface ProductCardOptions {
  offer?: { productId: number; percent: number; label: string };
  stock: { updatedAt: string; items: Record<string, number> };
  categoryName: string;
  finalPrice: number;
}
export type OptionsForProduct = (product: {
  id: number;
  categoryId: number;
  name: string;
  image: string;
  unit: string;
  price: number;
  tags: string[];
}) => ProductCardOptions;
export interface CarouselElements {
  products: HTMLUListElement;
  viewport: HTMLDivElement;
  previous: HTMLButtonElement;
  next: HTMLButtonElement;
}
export interface CarouselState {
  offset: number;
  step: number;
  maxOffset: number;
}
