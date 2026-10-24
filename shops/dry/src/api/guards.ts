import type { Category, Offer, Product, Stock } from '../types.ts'

function isRecord(x: unknown): x is Record<string, unknown> {
    return typeof x === 'object' && x !== null && !Array.isArray(x)
}

function isString(x: unknown): x is string {
    return typeof x === 'string'
}

function isNumber(x: unknown): x is number {
    return typeof x === 'number' && Number.isFinite(x)
}

export function  isProduct(x: unknown): x is Product {
    return (
        isRecord(x) &&
        isNumber(x.id) &&
        isNumber(x.categoryId) &&
        isString(x.name) &&
        isString(x.emoji) &&
        isString(x.unit) &&
        isNumber(x.price) &&
        Array.isArray(x.tags) &&
        x.tags.every(isString)
    )
}

export function isCategory(x: unknown): x is Category {
  return (
    isRecord(x) &&
    isNumber(x.id) &&
    isString(x.slug) &&
    isString(x.name) &&
    isString(x.emoji)
  )
}

export function isOffer(x: unknown): x is Offer {
  return (
    isRecord(x) &&
    isNumber(x.productId) &&
    isNumber(x.percent) &&
    isString(x.label)
  )
}

export function isStock(x: unknown): x is Stock {
  return (
    isRecord(x) &&
    isString(x.updatedAt) &&
    isRecord(x.items) &&
    Object.values(x.items).every(isNumber)
  )
}