const API_BASE = import.meta.env.VITE_API_URL ?? '/api';
const TIMEOUT = 8000;

export class HTTPError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`HTTP ${status}`);
    this.name = 'HTTPError';
    this.status = status;
  }
}

export async function getJSON(path: string): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const res = await fetch(`${API_BASE}/${path}`, { signal: controller.signal });
    if (!res.ok) {
      console.error(`[api] GET ${path} → HTTP ${res.status}`);
      throw new HTTPError(res.status);
    }
    const data: unknown = await res.json();
    return data;
  } finally {
    clearTimeout(timer);
  }
}