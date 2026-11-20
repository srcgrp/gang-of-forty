import { useEffect, useState } from 'react'
import { fetchProducts } from '../api/products.ts'
import { errorMessage } from '../lib/errorMessage.ts'
import type { Catalog, LoadState } from '../types.ts'

export function useCatalog(): LoadState<Catalog> {
  const [state, setState] = useState<LoadState<Catalog>>({ status: 'loading' })

  useEffect(() => {
    let ignore = false
    fetchProducts()
      .then((products) => {
        if (ignore) return
        setState(
          products.length === 0
            ? { status: 'empty' }
            : { status: 'success', data: { products } },
        )
      })
      .catch((err: unknown) => {
        if (ignore) return
        console.warn('بارگذاری محصولات ناموفق بود:', err)
        setState({ status: 'error', message: errorMessage(err) })
      })
    return () => {
      ignore = true
    }
  }, [])

  return state
}