import type { Product } from "./product.ts";

export const SORTS = ["price", "name", "newest"] as const;
export type Sort = (typeof SORTS)[number];

export type LoadState =
  | { status: "loading" }
  | { status: "success"; products: Product[] }
  | { status: "empty" }
  | { status: "error"; message: string };
