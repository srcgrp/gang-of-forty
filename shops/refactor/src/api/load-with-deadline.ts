import type { AppData } from '../types';
import { loadShop } from './load-shop';

export const loadWithDeadline = async (signal: AbortSignal, onSlow: () => void): Promise<AppData> => {
  const controller = new AbortController();
  const cancel = (): void => controller.abort();
  signal.addEventListener('abort', cancel, { once: true });
  if (signal.aborted) cancel();
  let slowTimer: ReturnType<typeof setTimeout> | undefined;
  const timeout = setTimeout(cancel, 12000);
  try {
    const request = loadShop(controller.signal);
    const slow = new Promise<undefined>((resolve) => { slowTimer = setTimeout(() => resolve(undefined), 2000); });
    const first = await Promise.race([request, slow]);
    if (first === undefined && !signal.aborted) onSlow();
    return first ?? await request;
  } catch (error: unknown) {
    if (controller.signal.aborted && !signal.aborted) throw new Error('مهلت اتصال تمام شد. اتصال اینترنت را بررسی و دوباره تلاش کنید.');
    throw error;
  } finally {
    clearTimeout(timeout); clearTimeout(slowTimer);
    signal.removeEventListener('abort', cancel); controller.abort();
  }
};
