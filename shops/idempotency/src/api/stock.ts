import type { Stock } from "../types";
import { isStock } from "./validation/stock";
import { getJSON } from "./get-json";
export async function loadStock(): Promise<Stock> {
  const data = await getJSON("stock.json");

  if (!isStock(data)) {
    throw new Error("Invalid stock data");
  }

  return data;
}