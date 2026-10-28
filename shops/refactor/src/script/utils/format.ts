export const formatPrice = (n: number): string =>
    new Intl.NumberFormat('fa-IR').format(n);