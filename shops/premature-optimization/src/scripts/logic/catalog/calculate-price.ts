import type { Offer } from "../../types";
export function calculatePrice(price: number, offer?: Offer): number {
  return offer ? Math.round((price * (100 - offer.percent)) / 100) : price;
}
