import type { Home } from "../types";
import { isHome } from "./validation/home";
import { getJSON } from "./get-json";

export async function loadHome(): Promise<Home> {
  const data = await getJSON("/api/home.json");

  if (!isHome(data)) {
    throw new Error("Invalid home data");
  }

  return data;
}