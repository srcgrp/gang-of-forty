export class HttpError extends Error {
  url: string;
  status: number;

  constructor(url: string, status: number) {
    super(`${url} responded ${status}`);
    this.name = "HttpError";
    this.url = url;
    this.status = status;
  }
}

export class DataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataError";
  }
}

export async function getJSON(path: string): Promise<unknown> {
  const res = await fetch(path);
  if (!res.ok) throw new HttpError(path, res.status);

  try {
    const data: unknown = await res.json();
    return data;
  } catch {
    throw new DataError(`${path} is not valid JSON`);
  }
}

export async function getValidated<T>(
  path: string,
  guard: (x: unknown) => x is T
): Promise<T> {
  const data = await getJSON(path);
  if (!guard(data)) throw new DataError(`${path} has an unexpected shape`);
  return data;
}

export async function getList<T>(
  path: string,
  guard: (x: unknown) => x is T
): Promise<T[]> {
  const data = await getJSON(path);
  if (!Array.isArray(data)) throw new DataError(`${path} is not an array`);

  const items: unknown[] = data;
  const valid = items.filter(guard);
  const dropped = items.length - valid.length;
  if (dropped > 0) {
    console.warn(`${path}: dropped ${dropped} invalid item(s) out of ${items.length}`);
  }
  return valid;
}
