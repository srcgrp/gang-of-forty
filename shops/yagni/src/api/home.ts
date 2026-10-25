import type { Home } from '../types';
import { getJson, clearRequestCache } from './request';
import { isHome } from './guards-home';
export async function fetchHome(): Promise<Home> {
  const url = '../../api/home.json';
  const data = await getJson(url);
  if (!isHome(data)) { clearRequestCache(url); throw new Error('Invalid home API response'); }
  return data;
}
