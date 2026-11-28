/* Amirhossein (Armin) Panahi */

import type { ApiFailure } from '../types';

class ApiError extends Error {
  readonly failure: ApiFailure;

  constructor(failure: ApiFailure) {
    super(`${failure.kind}: ${failure.file}`);
    this.failure = failure;
  }
}

export function asApiFailure(error: unknown): ApiFailure {
  return error instanceof ApiError ? error.failure : { kind: 'shape', file: 'api' };
}

const apiUrl: unknown = import.meta.env.VITE_API_URL;
const API_BASE = typeof apiUrl === 'string' && apiUrl.trim() ? `${apiUrl.replace(/\/+$/, '')}/` : null;

export async function getJSON(path: string, signal?: AbortSignal): Promise<unknown> {
  if (API_BASE === null) throw new ApiError({ kind: 'shape', file: 'VITE_API_URL' });

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, signal ? { signal } : undefined);
  } catch {
    throw new ApiError({ kind: signal?.aborted ? 'timeout' : 'network', file: path });
  }

  if (!response.ok) {
    throw new ApiError({ kind: 'http', file: path, status: response.status });
  }

  try {
    const payload: unknown = await response.json();
    return payload;
  } catch {
    throw new ApiError({ kind: signal?.aborted ? 'timeout' : 'parse', file: path });
  }
}

export async function getChecked<T>(
  path: string,
  guard: (value: unknown) => value is T,
  signal?: AbortSignal,
): Promise<T> {
  const payload = await getJSON(path, signal);
  if (!guard(payload)) throw new ApiError({ kind: 'shape', file: path });
  return payload;
}