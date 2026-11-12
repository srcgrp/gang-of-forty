export function finalPrice(price: number, percent: number): number {
  return (price * (100 - percent)) / 100;
}
