import type { Category, Offer, Product, Stock } from "./product.ts";
import type { FrozenShop, Home } from "./shop.ts";

export type LoadState =
  | { status: "loading" }
  | {
      status: "success";
      products: Product[];
      stock: Stock;
      offers: Offer[];
      categories: Category[];
      shop: FrozenShop;
      home: Home;
    }
  | { status: "empty" }
  | { status: "error"; message: string };
