export async function getJSON<T>(url: string): Promise<T> {
  const res: Response = await fetch(url);
  if (!res.ok) {
    throw new Error("bad response");
  }
  return await res.json();
}
