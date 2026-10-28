export async function getJSON(path: string): Promise<unknown> {
  const res = await fetch(path);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${path}`);
  }

  const data: unknown = await res.json();
  return data;
}