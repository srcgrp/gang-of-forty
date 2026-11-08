/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

import type { ApiErrorKind } from '../types';
export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly file: string;
  readonly status?: number;

  constructor(kind: ApiErrorKind, file: string, status?: number) {
    super(`${kind}: ${file}${status === undefined ? '' : ` (${status})`}`);
    this.name = 'ApiError';
    this.kind = kind;
    this.file = file;
    if (status !== undefined) this.status = status;
  }
}

const apiUrl: unknown = import.meta.env.VITE_API_URL;
const API_BASE = typeof apiUrl === 'string' && apiUrl.trim() ? `${apiUrl.replace(/\/+$/, '')}/` : null;

export async function getJSON(path: string, signal?: AbortSignal): Promise<unknown> {
  if (API_BASE === null) throw new ApiError('shape', 'VITE_API_URL');
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, signal ? { signal } : undefined);
  } catch {
    throw new ApiError(signal?.aborted ? 'timeout' : 'network', path);
  }
  if (!response.ok) throw new ApiError('http', path, response.status);

  try {
    const payload: unknown = await response.json();
    return payload;
  } catch {
    throw new ApiError(signal?.aborted ? 'timeout' : 'parse', path);
  }
}

export async function getChecked<T>(
  path: string,
  guard: (value: unknown) => value is T,
  signal?: AbortSignal,
): Promise<T> {
  const payload = await getJSON(path, signal);
  if (!guard(payload)) throw new ApiError('shape', path);
  return payload;
}