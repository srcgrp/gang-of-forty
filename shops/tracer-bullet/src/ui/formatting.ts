export function formatNumber(n: number): string {
    return new Intl.NumberFormat("fa-IR").format(n);
}

export function formatPrice(price: number): string {
    return `${formatNumber(price)} تومان`;
}