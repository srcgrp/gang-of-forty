const cache = new Map<string, Promise<unknown>>();
export function clearRequestCache(...urls: string[]): void { urls.forEach((url) => cache.delete(url)); }
export function getJson(url: string): Promise<unknown> {
  const cached = cache.get(url);
  if (cached) return cached;
  const request = fetch(url).then(async (response): Promise<unknown> => {
    if (!response.ok) throw new Error(`Request failed (${response.status}): ${url}`);
    const data: unknown = await response.json();
    return data;
  });
  cache.set(url, request);
  void request.catch(() => { if (cache.get(url) === request) cache.delete(url); });
  return request;
}

// Lesson 5 compatibility name.
export const getJSON = getJson;
