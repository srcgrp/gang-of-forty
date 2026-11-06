import { DataError } from "./errors";
import { getJSON } from "./http";

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
