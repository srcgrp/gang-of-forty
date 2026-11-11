export function isUnavailable(stockCount: number | undefined): boolean {
    return stockCount === 0;
}