import type { Product, Stock, Offer, Category, Shop, Home } from "./types";

const apiUrl: string = import.meta.env.VITE_API_URL || "../../api";

async function getJSON<Data>(file: string): Promise<Data> {
  const response: Response = await fetch(apiUrl + "/" + file);
  if (!response.ok) {
    throw new Error("دریافت اطلاعات ناموفق بود: " + response.status);
  }
  return await response.json();
}

export function getProducts(): Promise<Product[]> {
  return getJSON<Product[]>("products.json");
}

export function getStock(): Promise<Stock> {
  return getJSON<Stock>("stock.json");
}

export function getOffers(): Promise<Offer[]> {
  return getJSON<Offer[]>("offers.json");
}

export function getCategories(): Promise<Category[]> {
  return getJSON<Category[]>("categories.json");
}

export function getShop(): Promise<Shop> {
  return getJSON<Shop>("shop.json");
}

export function getHome(): Promise<Home> {
  return getJSON<Home>("home.json");
}
