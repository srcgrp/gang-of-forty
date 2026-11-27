/* Amirhossein (Armin) Panahi */

import type { ApiData } from '../types';
import { loadApiData } from './load';

const SLOW_AFTER_MS = 3000;

export async function loadWithSlowNotice(onSlow: () => void): Promise<ApiData> {
  const timerId = window.setTimeout(onSlow, SLOW_AFTER_MS);

  try {
    return await loadApiData();
  } finally {
    window.clearTimeout(timerId);
  }
}