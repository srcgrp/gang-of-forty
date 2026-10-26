import type { Category, Offer, Product, Stock } from '../types.ts'

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function isProduct(x: unknown): x is Product {
  if (isObject(x) === false) return false
  return (
    typeof x.id === 'number' &&
    typeof x.categoryId === 'number' &&
    typeof x.name === 'string' &&
    typeof x.emoji === 'string' &&
    typeof x.unit === 'string' &&
    typeof x.price === 'number' &&
    Array.isArray(x.tags)
  )
}

export function isCategory(x: unknown): x is Category {
  if (isObject(x) === false) return false
  return (
    typeof x.id === 'number' &&
    typeof x.slug === 'string' &&
    typeof x.name === 'string' &&
    typeof x.emoji === 'string' &&
    typeof x.color === 'string'
  )
}

export function isOffer(x: unknown): x is Offer {
  if (isObject(x) === false) return false
  return (
    typeof x.productId === 'number' &&
    typeof x.percent === 'number' &&
    typeof x.label === 'string'
  )
}

export function isStock(x: unknown): x is Stock {
  if (isObject(x) === false) return false
  if (typeof x.updatedAt !== 'string') return false
  if (isObject(x.items) === false) return false
  const values = Object.values(x.items)
  for (const v of values) {
    if (typeof v !== 'number') return false
  }
  return true
}
