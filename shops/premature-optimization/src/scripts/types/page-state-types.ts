import type { Product, Stock, Offer, Category } from "./catalog-data-types";
import type { Shop } from "./shop-data-types";
import type { Home } from "./home-data-types";
export interface CatalogData {
  products: Product[];
  stock: Stock;
  offers: Offer[];
  categories: Category[];
  shop: Shop;
  home: Home;
}
export type LoadState =
  | { status: "loading" }
  | ({ status: "success" } & CatalogData)
  | { status: "empty" }
  | { status: "error"; message: string };
