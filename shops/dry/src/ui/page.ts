export type Page = {
  dairyBox: HTMLElement
  offersBox: HTMLElement
  dairySection: HTMLElement
  offersSection: HTMLElement
  searchInput: HTMLInputElement
  resultsSection: HTMLElement
  resultsBox: HTMLElement
  resultsStatus: HTMLElement
  cartCount: HTMLElement
}

function find(selector: string): HTMLElement {
  const node: HTMLElement | null = document.querySelector<HTMLElement>(selector)
  if (!node) throw new Error(`index.html is missing ${selector}`)
  return node
}

export function findPage(): Page {
  const searchInput: HTMLInputElement | null = document.querySelector<HTMLInputElement>('#search')
  if (!searchInput) throw new Error('index.html is missing #search')
  return {
    dairyBox: find('#dairy .carousel'),
    offersBox: find('#offers .carousel'),
    dairySection: find('#dairy'),
    offersSection: find('#offers'),
    searchInput,
    resultsSection: find('#search-results'),
    resultsBox: find('#results'),
    resultsStatus: find('#results-status'),
    cartCount: find('#cart-count'),
  }
}