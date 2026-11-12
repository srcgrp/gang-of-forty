
import { useEffect, useState } from 'react'
import type { Category, Offer, LoadState } from '../types'
import { loadCategories, loadProducts, loadOffers } from '../api/client'

export function useShopData() {
  const [categories, setCategories] = useState<Category[]>([])
  const [offers, setOffers] = useState<Offer[]>([])
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    let ignore = false
    Promise.all([loadCategories(), loadProducts(), loadOffers()])
      .then(([cats, products, loadedOffers]) => {
        if (ignore) return
        setCategories(cats)
        setOffers(loadedOffers)
        setLoadState(products.length ? { status: 'success', products } : { status: 'empty' })
      })
      .catch(error => {
        if (ignore) return
        setLoadState({
          status: 'error',
          message: error instanceof Error ? error.message : 'خطا در دریافت اطلاعات'
        })
      })
    return () => { ignore = true }
  }, [])

  return { categories, offers, loadState }
}
