import { DataError, HttpError } from "./errors";

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
