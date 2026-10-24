const faNumber: Intl.NumberFormat = new Intl.NumberFormat('fa-IR')

export function formatNumber(n: number): string {
    return faNumber.format(n)
}

export function formatPrice(n: number): string {
    return faNumber.format(n) +  'تومان '
}

export function formatPercent(n:number): string {
    return faNumber.format(n) + 'Z'
}