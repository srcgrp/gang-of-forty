import type {
  Card,
  Category,
  CategoryCard,
  Offer,
  Product,
  Section,
  Stock,
} from '../../../shared/types.ts'
import { makeSearch } from './search.ts'
import { inCategory, offerMap, withOffer } from './select.ts'
import { toCard } from './toCard.ts'
import { categoryId } from './categories.ts'
import { categoryImageFor } from './image.ts'

export type Shelves = {
  categoryCards: CategoryCard[]
  sections: Section[]
  offered: Card[]
  search: (query: string, category: string | null) => Card[] | null
}

function toCategoryCard(c: Category): CategoryCard {
  return { slug: c.slug, name: c.name, emoji: c.emoji, image: categoryImageFor(c.slug) }
}

export function buildShelves(
  products: Product[],
  stock: Stock,
  offers: Offer[],
  categories: Category[],
): Shelves {
  const offerById: Map<number, Offer> = offerMap(offers)
  const cardOf = (p: Product): Card => toCard(p, stock, offerById.get(p.id))
  const find: (query: string) => Product[] = makeSearch(products)
  const sections: Section[] = categories
    .map(
      (c: Category): Section => ({
        slug: c.slug,
        name: c.name,
        cards: inCategory(products, c.id).map(cardOf),
      }),
    )
    .filter((s: Section): boolean => s.cards.length > 0)
  return {
    categoryCards: categories.map(toCategoryCard),
    sections,
    offered: withOffer(products, offerById).map(cardOf),
    search: (query: string, category: string | null): Card[] | null => {
      const id: number | null = categoryId(category)
      if (query === '' && id === null) return null
      const found: Product[] = query === '' ? products : find(query)
      return (id === null ? found : inCategory(found, id)).map(cardOf)
    },
  }
}