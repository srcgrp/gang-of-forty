import type { ProductData, SuggestionsData, Product } from "../types";
import { getValidProducts, getOffers, getValidStock } from "./product-requests";

export async function fetchProducts(): Promise<ProductData> {
  const [products, offers] = await Promise.all([getValidProducts(), getOffers()]);
  return { products, offers };
}

export async function fetchSuggestions(): Promise<SuggestionsData> {
  const [products, offers, stock] = await Promise.all([
    getValidProducts(), getOffers(), getValidStock(),
  ]);
  return { products, offers, stock };
}

export async function loadProducts(): Promise<Product[]> {
  return getValidProducts();
}

export async function loadOffers() {
  return getOffers();
}

export async function loadStock() {
  return getValidStock();
}
