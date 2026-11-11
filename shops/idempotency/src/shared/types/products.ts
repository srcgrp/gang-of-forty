export type Product = {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  unit: string;
  emoji?: string;
};

export type Offer = {
  productId: number;
  percent: number;
  label: string;
};

export type Stock = {
  items: Record<number, number>;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type CartItem = Pick<Product, "id" | "price"> & {
  quantity: number;
};

export type LoadState =
  | { status: "loading" }
  | { status: "success"; products: Product[] }
  | { status: "empty" }
  | { status: "error"; message: string };