// Shop slug 
export function getShopSlug(): string {
  const parts = location.pathname.split('/').filter(Boolean);
  const i = parts.indexOf('shops');
  return i !== -1 && parts[i + 1] ? parts[i + 1] : 'default';
}

// Formatters 
export const priceFmt = new Intl.NumberFormat('fa-IR');

export const discountPct = new Intl.NumberFormat('fa-IR', {
  style: 'percent',
  maximumFractionDigits: 0,
});

// Offer helpers 
export function hasDiscount(
  offer: { percent: number } | null | undefined,
): offer is { percent: number } {
  return !!offer && offer.percent > 0;
}

export function applyOffer(
  price: number,
  offer: { percent: number } | null | undefined,
): number {
  if (!hasDiscount(offer)) return price;
  return Math.round(price * (1 - offer.percent / 100));
}

// Guards 
export function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}