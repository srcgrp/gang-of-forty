/* Amirhossein (Armin) Panahi */

import type { ApiData, ApiFailure } from '../types';
import { ApiError } from './http';
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

export const asApiFailure = (error: unknown): ApiFailure =>
  error instanceof ApiError ? error : new ApiError('shape', 'api');