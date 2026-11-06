import { toPersianDigits } from "./digits";

export const DEFAULT_CURRENCY = "تومان";

export const formatPrice = (n: number): string =>
  toPersianDigits(Math.round(n).toLocaleString("en-US")).replace(/,/g, "٬");
