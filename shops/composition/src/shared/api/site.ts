import type { Shop, Home } from "../types";
import { getJSON } from "./http";
import { isShop } from "./shop-guard";
import { isHome } from "./home-guard";

export async function getShop(): Promise<Shop> {
  const data = await getJSON("shop.json");
  if (!isShop(data)) throw new Error("اطلاعات فروشگاه معتبر نیست.");
  return data;
}

export async function getHome(): Promise<Home> {
  const data = await getJSON("home.json");
  if (!isHome(data)) throw new Error("اطلاعات صفحهٔ اصلی معتبر نیست.");
  return data;
}
