import type { CardData, Category } from '../types'
import { createText } from './dom'
import type { Elements } from './elements'
import { createCard } from './productCard'

const chip = (label: string, slug: string, active: boolean): HTMLButtonElement => {
  const button: HTMLButtonElement = createText('button', label, active ? 'chip active' : 'chip')
  button.type = 'button'
  button.dataset.slug = slug // '' means "all"
  button.setAttribute('aria-pressed', String(active))
  return button
}

export const renderCards = (cards: readonly CardData[], els: Elements): void => {
  els.list.replaceChildren(...cards.map((card) => createCard(card)))
}

export const renderCategories = (
  categories: readonly Category[],
  active: string | null,
  els: Elements,
): void => {
  if (categories.length === 0) return els.categories.replaceChildren()
  els.categories.replaceChildren(
    chip('همه', '', active === null),
    ...categories.map((c) => chip(`${c.emoji} ${c.name}`, c.slug, c.slug === active)),
  )
}
