
import type { Product } from '../types'

export function isProduct(item: unknown): item is Product {
  if (typeof item !== 'object' || item === null) return false

  return (
    'id' in item &&
    (typeof item.id === 'string' || typeof item.id === 'number') &&
    'title' in item &&
    typeof item.title === 'string' &&
    'price' in item &&
    typeof item.price === 'number' &&
    'category' in item &&
    typeof item.category === 'string' &&
    'image' in item &&
    typeof item.image === 'string'
  )
}

export function isStockRecord(
  item: unknown,
): item is { id: string | number; stock: number } {
  if (typeof item !== 'object' || item === null) return false

  return (
    'id' in item &&
    (typeof item.id === 'string' || typeof item.id === 'number') &&
    'stock' in item &&
    typeof item.stock === 'number'
  )
}

export function isOfferItem(
  item: unknown,
): item is { id: string | number; discount: number } {
  if (typeof item !== 'object' || item === null) return false

  return (
    'id' in item &&
    (typeof item.id === 'string' || typeof item.id === 'number') &&
    'discount' in item &&
    typeof item.discount === 'number'
  )
}
