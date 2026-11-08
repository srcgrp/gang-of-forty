import type { ApiFile } from '../types'

const API_URL: string = import.meta.env.VITE_API_URL

export const getJSON = async (file: ApiFile): Promise<unknown> => {
  const response = await fetch(`${API_URL}/${file}`)
  if (!response.ok) {
    throw new Error(`دریافت ${file} موفق نبود (HTTP ${response.status}).`)
  }
  try {
    return await response.json()
  } catch {
    throw new Error(`پاسخ ${file} یک JSON معتبر نیست.`)
  }
}