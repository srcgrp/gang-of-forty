const ROUND_TO = 1000;

export function discountedPrice(price: number, percent: number): number {
    const raw = (price * (100 - percent)) / 100;
    return Math.round(raw / ROUND_TO) * ROUND_TO;
}
