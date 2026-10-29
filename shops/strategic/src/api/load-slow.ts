/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ApiData, ApiFailure } from '../types';
import { ApiError } from './http';
import { loadApiData } from './load';

const SLOW_AFTER_MS = 3000;
const SLOW = Symbol('slow');

export async function loadWithSlowNotice(onSlow: () => void): Promise<ApiData> {
  const request = loadApiData();
  let timerId: number | undefined;
  const slow = new Promise<typeof SLOW>((resolve) => {
    timerId = window.setTimeout(() => resolve(SLOW), SLOW_AFTER_MS);
  });
  try {
    const first = await Promise.race([request, slow]);
    if (first !== SLOW) return first;
    onSlow();
    return await request;
  } finally {
    if (timerId !== undefined) window.clearTimeout(timerId);
  }
}

export const asApiFailure = (error: unknown): ApiFailure =>
  error instanceof ApiError ? error : new ApiError('shape', 'api');