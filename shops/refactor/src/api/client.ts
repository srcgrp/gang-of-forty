import type { ApiFile } from '../types';

const API_URL: string = import.meta.env.VITE_API_URL;

export const getJSON = async (file: ApiFile, signal: AbortSignal): Promise<unknown> => {
  const response: Response = await fetch(`${API_URL.replace(/\/$/, '')}/${file}`, { signal, cache: 'no-store' });
  if (!response.ok) throw new Error(`دریافت ${file} موفق نبود (HTTP ${response.status}).`);
  try { return await response.json(); }
  catch (error: unknown) {
    if (signal.aborted) throw error;
    throw new Error(`پاسخ ${file} یک JSON معتبر نیست.`);
  }
};
