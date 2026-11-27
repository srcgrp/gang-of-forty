const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export const DEFAULT_CURRENCY = 'تومان';

export function toPersianDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

export function formatPrice(amount: number): string {
  return amount.toLocaleString('fa-IR');
}

export function formatMoney(amount: number, currency: string = DEFAULT_CURRENCY): string {
  return `${formatPrice(amount)} ${currency}`;
}

export function discountPercent(oldPrice: number, price: number): number {
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}