/* Amirhossein (Armin) Panahi */
/* Week 4 - Strategic Supermarket - Arch */

export type ApiErrorKind = 'network' | 'http' | 'parse' | 'timeout' | 'shape';
export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly file: string;
  readonly status?: number | undefined;

  constructor(kind: ApiErrorKind, file: string, status?: number) {
    super(`${kind}: ${file}${status === undefined ? '' : ` (${status})`}`);
    this.name = 'ApiError';
    this.kind = kind;
    this.file = file;
    this.status = status;
  }
}

const API_BASE = '/api/';

export async function getJSON(path: string, signal?: AbortSignal): Promise<unknown> {
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
    throw new ApiError('parse', path);
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