export function formatNumber(number: number): string {
  return new Intl.NumberFormat("fa-IR").format(number);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR", { numberingSystem: "latn" }).format(price) + " تومان";
}
