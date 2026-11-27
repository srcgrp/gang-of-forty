import { toggleFavorite } from '../rules/favorites.ts'

const FAVORITES_KEY = 'dry-favorites'
const listeners = new Set<() => void>()
let cache: number[] | null = null

function read(): number[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    const data: unknown = raw === null ? [] : JSON.parse(raw)
    return Array.isArray(data) && data.every((x): x is number => typeof x === 'number') ? data : []
  } catch {
    return []
  }
}

export function getFavorites(): number[] {
  if (cache === null) cache = read()
  return cache
}

export function subscribeFavorites(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function toggleStoredFavorite(id: number): void {
  cache = toggleFavorite(getFavorites(), id)
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(cache))
  } catch {
   
  }
  listeners.forEach((listener) => listener())
}