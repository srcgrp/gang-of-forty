import type { Category, Offer, Product, Shop, Stock } from '../types'

type Rec = Record<string, unknown>
const isRec = (x: unknown): x is Rec => typeof x === 'object' && x !== null
const isStr = (x: unknown): x is string => typeof x === 'string'
const isNum = (x: unknown): x is number => typeof x === 'number' && Number.isFinite(x)

export const isProduct = (x: unknown): x is Product =>
  isRec(x) &&
  isNum(x.id) &&
  isNum(x.categoryId) &&
  isStr(x.name) &&
  isStr(x.emoji) &&
  isStr(x.unit) &&
  isNum(x.price) &&
  Array.isArray(x.tags) &&
  x.tags.every(isStr)

export const isCategory = (x: unknown): x is Category =>
  isRec(x) && isNum(x.id) && isStr(x.slug) && isStr(x.name) && isStr(x.emoji) && isStr(x.color)

export const isOffer = (x: unknown): x is Offer =>
  isRec(x) && isNum(x.productId) && isNum(x.percent) && isStr(x.label)

export const isStock = (x: unknown): x is Stock =>
  isRec(x) && isRec(x.items) && Object.values(x.items).every(isNum)

export const isShop = (x: unknown): x is Shop =>
  isRec(x) && isStr(x.name) && isStr(x.slogan) && isStr(x.notice)
