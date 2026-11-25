export type ApiFile = 'products.json' | 'stock.json' | 'offers.json' | 'categories.json' | 'shop.json'

function apiBase(): string {
  const url: unknown = import.meta.env.VITE_API_URL
  return typeof url === 'string' && url ? url : '/api'
}

export async function getJSON(file: ApiFile): Promise<unknown> {
  const res: Response = await fetch(`${apiBase()}/${file}`)
  if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`)
  return res.json()
}
