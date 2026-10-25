import type { Card, Offer, Product, Stock } from '../types.ts'
import { makeSearch } from './search.ts'
import { inCategory, offerMap, withOffer } from './select.ts'
import { toCard } from './toCard.ts'

const DAIRY_CATEGORY_ID: number = 2

export type Shelves = {
  dairy: Card[]
  offered: Card[]
  search: (query: string) => Card[]
}

export function buildShelves(products: Product[], stock: Stock, offers: Offer[]): Shelves {
  const offerById: Map<number, Offer> = offerMap(offers)
  const cardOf = (p: Product): Card => toCard(p, stock, offerById.get(p.id))
  const find: (query: string) => Product[] = makeSearch(products)
  return {
    dairy: inCategory(products, DAIRY_CATEGORY_ID).map(cardOf),
    offered: withOffer(products, offerById).map(cardOf),
    search: (query: string): Card[] => find(query).map(cardOf),
  }
}