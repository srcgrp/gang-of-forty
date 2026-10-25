import type { Card } from '../types.ts'
import { createCard } from './card.ts'
import type { Page } from './page.ts'

function setSearching(page: Page, on: boolean): void {
  page.resultsSection.hidden = !on
  page.offersSection.hidden = on
  page.dairySection.hidden = on
}

export function renderResults(page: Page, cards: Card[], summary: string): void {
  page.resultsBox.replaceChildren(...cards.map(createCard))
  page.resultsStatus.textContent = summary
  setSearching(page, true)
}

export function clearResults(page: Page): void {
  setSearching(page, false)
}