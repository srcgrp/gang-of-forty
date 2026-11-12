export async function getJSON(url: string): Promise<unknown> {
  const res: Response = await fetch(url);
  if (!res.ok) {
    throw new Error("bad response");
  }
  return await res.json();
}
