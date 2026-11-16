import type { Card, LoadSuccess } from '../../../shared/types.ts'
import { inCategory } from './select.ts'
import { cardsOf, offeredCards } from './view.ts'

export type PlpSort = 'default' | 'price'
export type Carousel = { title: string; cards: Card[] }

function sortCards(data: LoadSuccess, cards: Card[], sort: PlpSort): Card[] {
  if (sort === 'default') return cards
  const percent = new Map<number, number>(
    data.offers.map((o): [number, number] => [o.productId, o.percent]),
  )
  const finalPrice = new Map<number, number>(
    data.products.map((p): [number, number] => [p.id, p.price * (1 - (percent.get(p.id) ?? 0) / 100)]),
  )
  return [...cards].sort((a, b) => (finalPrice.get(a.id) ?? 0) - (finalPrice.get(b.id) ?? 0))
}

export function carouselProducts(
  data: LoadSuccess,
  carouselId: string,
  sort: PlpSort = 'default',
): Carousel | null {
  if (carouselId === 'offers') {
    return { title: 'پیشنهادهای ویژه', cards: sortCards(data, offeredCards(data), sort) }
  }
  const category = data.categories.find((c) => c.slug === carouselId)
  if (!category) return null
  const cards = cardsOf(data, inCategory(data.products, category.id))
  return { title: category.name, cards: sortCards(data, cards, sort) }
}