import type { Card, Category, LoadState, LoadSuccess } from '../../../shared/types.ts'
import { categoryImageFor } from './image.ts'
import { inCategory } from './select.ts'
import { cardsOf } from './view.ts'

export type CategoryCard = { slug: string; name: string; emoji: string; image: string | null }
export type Section = { slug: string; name: string; cards: Card[] }

export function categoriesOf(state: LoadState): Category[] {
  return state.status === 'success' ? state.categories : []
}

export function categoryCards(categories: Category[]): CategoryCard[] {
  return categories.map((c) => ({
    slug: c.slug,
    name: c.name,
    emoji: c.emoji,
    image: categoryImageFor(c.slug),
  }))
}

export function sectionsOf(data: LoadSuccess): Section[] {
  return data.categories
    .map((c) => ({ slug: c.slug, name: c.name, cards: cardsOf(data, inCategory(data.products, c.id)) }))
    .filter((s) => s.cards.length > 0)
}