import { useEffect, useState } from 'react'
import type { Product } from '../shared/types'
import type FuseType from 'fuse.js'

type UseSearchOptions = {
  products: Product[]
  query: string
  limit?: number
}

type SearchState =
  | { status: 'loading' }
  | { status: 'ready'; results: Product[] }
  | { status: 'error'; message: string }

export function useSearch({ products, query, limit = 8 }: UseSearchOptions): SearchState {
  const [fuse, setFuse] = useState<FuseType<Product> | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    import('fuse.js')
      .then(({ default: Fuse }) => {
        if (cancelled) return
        setFuse(
          new Fuse(products, {
            keys: ['name', 'tags'],
            threshold: 0.4,
            ignoreLocation: true,
          }),
        )
      })
      .catch((err: unknown) => {
        if (cancelled) return
        const message = err instanceof Error ? err.message : String(err)
        console.warn('[search] failed to load Fuse:', message)
        setError('جست‌وجو در دسترس نیست')
      })

    return () => {
      cancelled = true
    }
  }, [products])

  if (error) return { status: 'error', message: error }
  if (!fuse) return { status: 'loading' }

  const q = query.trim()
  if (!q) return { status: 'ready', results: [] }
  return { status: 'ready', results: fuse.search(q).map((r) => r.item).slice(0, limit) }
}