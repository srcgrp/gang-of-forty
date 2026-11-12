export function calculateDiscountedPrice(
  price: number,
  percent: number,
): number {
  return Math.round(((100 - percent) * price) / 100);
}