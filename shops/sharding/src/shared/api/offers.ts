import type { Offer } from '../types';
import { getJSON } from './get-json';
import { isRecord } from './is-record';

function isOffer(v: unknown): v is Offer {
  if (!isRecord(v)) return false;
  return (
    typeof v.productId === 'number' &&
    typeof v.percent === 'number' &&
    v.percent >= 0 &&
    v.percent <= 100 &&
    typeof v.label === 'string'
  );
}

export async function loadOffers(): Promise<Offer[]> {
  const data = await getJSON('offers.json');
  if (!Array.isArray(data) || !data.every(isOffer)) {
    throw new Error('Invalid offers.json');
  }
  return data;
}