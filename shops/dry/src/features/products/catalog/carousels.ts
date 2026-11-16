import type { Card, LoadSuccess } from '../../../shared/types.ts'
import { inCategory } from './select.ts'
import { cardsOf, offeredCards } from './view.ts'

export type Carousel = { title: string; cards: Card[] }

export function carouselProducts(data: LoadSuccess, carouselId: string): Carousel | null {
    if (carouselId === 'offers') return { title: 'پیشنهادهای ویژه', cards: offeredCards(data) }
    const category = data.categories.find((c) => c.slug === carouselId)
    if (!category) return null
    return { title: category.name, cards: cardsOf(data, inCategory(data.products, category.id)) }
}