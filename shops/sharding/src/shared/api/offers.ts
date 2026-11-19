import type { Offer } from '../types';
import { getJSON } from './get-json';
import { isRecord } from './is-record';

function isOffer(v: unknown): v is Offer {
  if (!isRecord(v)) return false;
  return (
    typeof v.productId === 'number' && Number.isSafeInteger(v.productId) && v.productId > 0 &&
    typeof v.percent === 'number' &&
    v.percent >= 0 &&
    v.percent <= 100 &&
    typeof v.label === 'string'
  );
}

export async function loadOffers(): Promise<Offer[]> {
  const data = await getJSON('offers.json');
  if (!Array.isArray(data)) {
    throw new Error('Invalid offers.json');
  }
  const offers = data.filter(isOffer);
  const dropped = data.length - offers.length;
  if (dropped > 0) console.warn(`[api] ${dropped} invalid offer(s) removed`);
  return offers;
}
