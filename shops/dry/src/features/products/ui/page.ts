export type Page = {
  offersBox: HTMLElement
  offersSection: HTMLElement
  sectionsHost: HTMLElement
  categoryGrid: HTMLElement
  searchInput: HTMLInputElement
  resultsSection: HTMLElement
  resultsBox: HTMLElement
  resultsStatus: HTMLElement
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
    offersBox: find('#offers .carousel'),
    offersSection: find('#offers'),
    sectionsHost: find('#category-sections'),
    categoryGrid: find('#category-grid'),
    searchInput,
    resultsSection: find('#search-results'),
    resultsBox: find('#results'),
    resultsStatus: find('#results-status'),
  }
}