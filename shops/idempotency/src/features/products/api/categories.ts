import type { Category } from "../../../shared/types";
import { isCategory } from "./validation/catalog";
import { getJSON } from "../../../shared/api/get-json";

export async function loadCategories(): Promise<Category[]> {
  const data = await getJSON("categories.json");

  if (!Array.isArray(data)) {
    throw new Error("Categories data must be an array");
  }

  if (!data.every(isCategory)) {
    throw new Error("Categories data contains invalid items");
  }

  return data;
}