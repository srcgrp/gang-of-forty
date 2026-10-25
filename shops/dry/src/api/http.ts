function apiBase(): string {
  const url: unknown = import.meta.env.VITE_API_URL
  if (typeof url !== 'string') throw new Error('VITE_API_URL is not set (see the .env files)')
  return url
}

export async function getJSON(file: string): Promise<unknown> {
  const res: Response = await fetch(`${apiBase()}/${file}`)
  if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`)
  return res.json()
}