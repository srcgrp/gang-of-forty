import { isSort, type Filters } from '../types'

export const readFilters = (): Filters => {
  const params = new URLSearchParams(location.search)
  const sort: unknown = params.get('sort')
  return {
    category: params.get('category'),
    query: params.get('q') ?? '',
    sort: isSort(sort) ? sort : 'default',
  }
}

export const writeFilters = (filters: Filters): void => {
  const params = new URLSearchParams()
  if (filters.category !== null) params.set('category', filters.category)
  if (filters.query !== '') params.set('q', filters.query)
  if (filters.sort !== 'default') params.set('sort', filters.sort)
  const search: string = params.toString()
  history.replaceState(null, '', search === '' ? location.pathname : `?${search}`)
}
