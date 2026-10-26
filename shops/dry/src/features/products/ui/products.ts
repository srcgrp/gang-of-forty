import type { Card } from '../../../shared/types.ts'
import { createCard } from './card.ts'
import { renderStatus } from './status.ts'

function linkArrows(box: HTMLElement, prefix: string, count: number): void {
  const section: Element | null = box.closest('.products')
  if (!section) return
  const links: NodeListOf<HTMLAnchorElement> =
    section.querySelectorAll<HTMLAnchorElement>('.carousel-nav a')
  const first: HTMLAnchorElement | undefined = links[0]
  const last: HTMLAnchorElement | undefined = links[1]
  if (first) first.href = `#${prefix}-1`
  if (last) last.href = `#${prefix}-${count}`
}

export function renderProducts(box: HTMLElement, cards: Card[], prefix: string): void {
  if (cards.length === 0) {
    renderStatus(box, 'محصولی برای نمایش وجود ندارد.', 'info')
    return
  }
  const items: HTMLDivElement[] = cards.map(createCard)
  items.forEach((item: HTMLDivElement, i: number): void => {
    item.id = `${prefix}-${i + 1}`
  })
  box.setAttribute('aria-busy', 'false')
  box.replaceChildren(...items)
  linkArrows(box, prefix, items.length)
}