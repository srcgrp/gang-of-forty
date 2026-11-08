import type { Shop } from '../types';
import { getJSON } from './get-json';
import { isRecord } from './is-record';
import { isLink } from './is-link';

function isShop(v: unknown): v is Shop {
  if (!isRecord(v)) return false;
  return (
    typeof v.name === 'string' &&
    typeof v.slogan === 'string' &&
    typeof v.notice === 'string' &&
    typeof v.about === 'string' &&
    typeof v.address === 'string' &&
    typeof v.phone === 'string' &&
    Array.isArray(v.schedule) &&
    v.schedule.every(
      (s) => isRecord(s) && typeof s.days === 'string' && typeof s.time === 'string',
    ) &&
    Array.isArray(v.menu) &&
    v.menu.every(isLink) &&
    Array.isArray(v.help) &&
    v.help.every(isLink) &&
    typeof v.copyright === 'string'
  );
}

export async function loadShop(): Promise<Shop> {
  const data = await getJSON('shop.json');
  if (!isRecord(data)) throw new Error('Invalid shop.json');
  
  if (Array.isArray(data.menu)) data.menu = data.menu.filter(isLink);
  if (Array.isArray(data.help)) data.help = data.help.filter(isLink);
  
  if (!isShop(data)) throw new Error('Invalid shop.json');
  return data;
}