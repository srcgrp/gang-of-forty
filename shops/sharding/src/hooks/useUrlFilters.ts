import { useNavigate, useSearch } from '@tanstack/react-router'
import { toShopSearch } from '../shared/storage/url'

export function useUrlFilters() {
  const { category = '', q = '' } = useSearch({ from: '__root__' })
  const navigate = useNavigate()
  const filters = { category, query: q }

  function setQuery(query: string): void {
    void navigate({
      to: '.',
      search: () => toShopSearch({ category, query }),
      hash: true,
      replace: true,
      resetScroll: false,
    })
  }

  function pickCategory(category: string): void {
    void navigate({
      to: '/',
      search: toShopSearch({ category, query: q }),
      hash: category,
      resetScroll: false,
    })
  }

  return { filters, setQuery, pickCategory }
}
