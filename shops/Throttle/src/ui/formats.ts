const numbers = new Intl.NumberFormat('fa-IR')

export const formatNumber = (n: number): string => numbers.format(n)
export const formatPrice = (n: number): string => `${numbers.format(n)} تومان`
