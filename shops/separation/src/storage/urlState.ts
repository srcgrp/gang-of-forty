export type UrlFilters = {
  category: string | undefined
  query: string
}

export function readFilters(): UrlFilters {
  const params = new URLSearchParams(window.location.search)
  const category = params.get('category')
  return {
    category: category === null || category === '' ? undefined : category,
    query: params.get('q') ?? '',
  }
}

export function writeFilters(filters: UrlFilters): void {
  const params = new URLSearchParams()
  if (filters.category !== undefined) params.set('category', filters.category)
  if (filters.query !== '') params.set('q', filters.query)
  const search = params.toString()
  const tail = search === '' ? '' : `?${search}`
  const path = `${window.location.pathname}${tail}${window.location.hash}`
  window.history.replaceState(null, '', path)
}

export function subscribeFilters(onChange: (filters: UrlFilters) => void): void {
  window.addEventListener('popstate', () => onChange(readFilters()))
}
