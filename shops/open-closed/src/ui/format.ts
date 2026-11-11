import type { ProductPreview } from '../types.ts';

const numberFormat = new Intl.NumberFormat('fa-IR');

export function formatCount(count: number): string {
    return numberFormat.format(count);
}

export function formatPrice(price: number): string {
    return `${numberFormat.format(price)} تومان`;
}

export function describeProduct({ name, price }: ProductPreview): string {
    return `${name}، ${formatPrice(price)}`;
}