import { toPersianDigits } from './price';

const FALLBACK_NAME = 'محدودیت نرخ';

export function cartTitle(shopName: string | undefined, count: number): string {
  const name = shopName ?? FALLBACK_NAME;
  return count > 0 ? `${name} ${toPersianDigits(count)} 🛒` : name;
}