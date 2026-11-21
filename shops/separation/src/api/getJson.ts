export async function getJSON(path: string): Promise<unknown> {
  const res = await fetch(path)
  if (res.ok === false) {
    throw new Error(`خطا ${res.status} در ${path}`)
  }
  const data: unknown = await res.json()
  return data
}
