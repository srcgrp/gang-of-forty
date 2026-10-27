import type { Shop } from "../types";
import { isShop } from "./validation/shop";
import { getJSON } from "./get-json";
export async function loadShop(): Promise<Shop> {
  const data = await getJSON("/api/shop.json");

  if (!isShop(data)) {
    throw new Error("Invalid shop data");
  }

  return data;
}