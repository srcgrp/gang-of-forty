export async function getJSON(filename: string): Promise<unknown> {
  const apiBase = import.meta.env.VITE_API_URL;

  if (!apiBase) {
    throw new Error("VITE_API_URL is not configured");
  }

  const url = `${apiBase.replace(/\/$/, "")}/${filename}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
  }

  return response.json();
}