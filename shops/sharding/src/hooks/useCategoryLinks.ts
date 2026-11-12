import { useEffect } from 'react'
import type { Category, UrlFilters } from '../shared/types'
import { writeUrlHash } from '../shared/storage/url'

function navigateToCategory(
  hash: string,
  filters: UrlFilters,
  setFilters: (filters: UrlFilters, mode?: 'push' | 'replace') => void,
): void {
  setFilters({ ...filters, category: hash === 'offers' ? '' : hash }, 'push')
  if (hash === 'offers') writeUrlHash(hash, 'replace')
  requestAnimationFrame(() => {
    const target = (hash && document.getElementById(hash)) || document.querySelector('.product-shelf')
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

export function useCategoryLinks(
  categories: Category[],
  filters: UrlFilters,
  setFilters: (filters: UrlFilters, mode?: 'push' | 'replace') => void,
): (category: string) => void {
  useEffect(() => {
    function onClick(event: MouseEvent): void {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (!(event.target instanceof Element)) return
      const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]')
      const hash = link?.getAttribute('href')?.slice(1)
      const category = categories.find((item) => item.slug === hash)
      if (!category && hash !== 'offers') return

      event.preventDefault()
      navigateToCategory(hash ?? '', filters, setFilters)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [categories, filters, setFilters])

  return (category) => navigateToCategory(category, filters, setFilters)
}
