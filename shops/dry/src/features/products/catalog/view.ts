import type { Card, LoadSuccess, Product } from '../../../shared/types.ts'
import { inCategory, offerMap, withOffer } from './select.ts'
import { toCard } from './toCard.ts'

const DAIRY_CATEGORY_ID = 2

export function cardsOf(data: LoadSuccess, products: Product[] = data.products): Card[] {
  const offers = offerMap(data.offers)
  return products.map((p) => toCard(p, data.stock, offers.get(p.id)))
}

export function cardsInCategory(data: LoadSuccess, categoryId: number | null): Card[] {
  if (categoryId === null) return cardsOf(data)
  return cardsOf(data, inCategory(data.products, categoryId))
}

export function offeredCards(data: LoadSuccess): Card[] {
  return cardsOf(data, withOffer(data.products, offerMap(data.offers)))
}

export function dairyCards(data: LoadSuccess): Card[] {
  return cardsOf(data, inCategory(data.products, DAIRY_CATEGORY_ID))
}