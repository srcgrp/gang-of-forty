import type { CategoryCard, Section } from '../../../shared/types.ts'
import { el } from './dom.ts'
import { renderProducts } from './products.ts'

function createCategoryCard(category: CategoryCard): HTMLAnchorElement {
  const link: HTMLAnchorElement = el('a', 'category-card')
  link.href = `#${category.slug}`
  if (category.image) {
    const img: HTMLImageElement = el('img')
    img.src = category.image
    img.alt = ''
    link.append(img)
  } else {
    const emoji: HTMLSpanElement = el('span', 'category-emoji', category.emoji)
    emoji.setAttribute('aria-hidden', 'true')
    link.append(emoji)
  }
  link.append(el('h3', '', category.name))
  return link
}

export function renderCategoryGrid(grid: HTMLElement, categories: CategoryCard[]): void {
  grid.replaceChildren(...categories.map(createCategoryCard))
}

function createSection(section: Section): HTMLElement {
  const root: HTMLElement = el('section', 'products')
  root.id = section.slug

  const first: HTMLAnchorElement = el('a', '', '→')
  const last: HTMLAnchorElement = el('a', '', '←')
  first.setAttribute('aria-label', `ابتدای کاروسل ${section.name}`)
  last.setAttribute('aria-label', `انتهای کاروسل ${section.name}`)
  const nav: HTMLDivElement = el('div', 'carousel-nav')
  nav.append(first, last)

  const title: HTMLDivElement = el('div', 'section-title')
  title.append(el('h2', '', section.name), nav)

  const box: HTMLElement = el('section', 'carousel')
  box.setAttribute('aria-label', section.name)
  box.tabIndex = 0

  root.append(title, box)
  renderProducts(box, section.cards, section.slug)
  return root
}

export function renderSections(host: HTMLElement, sections: Section[]): void {
  host.replaceChildren(...sections.map(createSection))
}