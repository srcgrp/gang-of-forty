export async function getJSON(path: string, signal?: AbortSignal): Promise<unknown> {
  const response = await fetch(`/api/${path}`, { signal })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.json()
}
