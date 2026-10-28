import type { Offer } from "../types";
import { isOffer } from "./validation/catalog";
import { getJSON } from "./get-json";

export async function loadOffers(): Promise<Offer[]> {
  const data = await getJSON("offers.json");

  if (!Array.isArray(data)) {
    throw new Error("Offers data must be an array");
  }

  if (!data.every(isOffer)) {
    throw new Error("Offers data contains invalid items");
  }

  return data;
}