export type Cart = Record<string, number>;
export interface CartLine {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
