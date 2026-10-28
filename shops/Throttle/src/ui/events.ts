import type { Elements } from './elements'

export type Handlers = Readonly<{
  onSearch: (query: string) => void
  onSort: (value: string) => void
  onCategory: (slug: string | null) => void
  onAdd: (id: number) => void
}>

const buttonOf = (e: MouseEvent): HTMLButtonElement | null =>
  e.target instanceof Element ? e.target.closest<HTMLButtonElement>('button') : null

export const bindEvents = (els: Elements, handlers: Handlers): void => {
  els.search.addEventListener('input', () => handlers.onSearch(els.search.value))
  els.sort.addEventListener('change', () => handlers.onSort(els.sort.value))
  els.categories.addEventListener('click', (e: MouseEvent) => {
    const slug: string | undefined = buttonOf(e)?.dataset.slug
    if (slug !== undefined) handlers.onCategory(slug === '' ? null : slug)
  })
  els.list.addEventListener('click', (e: MouseEvent) => {
    const button: HTMLButtonElement | null = buttonOf(e)
    if (button === null || button.disabled) return
    const id = Number(button.dataset.id)
    if (Number.isInteger(id)) handlers.onAdd(id)
  })
}
