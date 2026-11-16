import { useEffect, useState } from 'react'
import type { UrlFilters } from '../shared/types'
import { readUrlFilters, writeUrlFilters } from '../shared/storage/url'

type SetFilters = (next: UrlFilters, mode?: 'push' | 'replace') => void

export function useUrlFilters(): [UrlFilters, SetFilters] {
  const [filters, setFiltersState] = useState<UrlFilters>(() => readUrlFilters())

  useEffect(() => {
    function onPop(): void {
      setFiltersState(readUrlFilters())
    }
    window.addEventListener('popstate', onPop)
    return () => {
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  function setFilters(next: UrlFilters, mode: 'push' | 'replace' = 'replace'): void {
    setFiltersState(next)
    writeUrlFilters(next, mode)
  }

  return [filters, setFilters]
}