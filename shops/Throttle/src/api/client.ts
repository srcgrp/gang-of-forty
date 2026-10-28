const raw: unknown = import.meta.env.VITE_API_URL
const base: string = typeof raw === 'string' ? raw : '/api'

export const getJSON = async (path: string): Promise<unknown> => {
  const res: Response = await fetch(`${base}/${path}`)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`)
  try {
    return await res.json()
  } catch {
    throw new Error(`${path} is not valid JSON`)
  }
}
