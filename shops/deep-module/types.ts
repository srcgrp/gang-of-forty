export type LoadState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: T };

export interface CartLine {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export type ProductCardProps = {
  product: Product;
  stock?: number;
  discountPercent?: number;
  onAdd: (id: number) => void;
};
