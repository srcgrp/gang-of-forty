type Product = {
  id: number;
  categoryId: number;
  name: string;
  emoji: string;
  unit: string;
  price: number;
  tags: string[];
};

export type LoadState =
  | { status: "loading" }
  | { status: "success"; products: Product[] }
  | { status: "empty" }
  | { status: "error"; message: string };
