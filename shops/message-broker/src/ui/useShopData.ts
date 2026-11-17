
import { useEffect, useState } from 'react'
import type { Category, Offer, LoadState, Home } from '../types'
import { loadCategories, loadProducts, loadOffers, loadHome } from '../api/client'

export function useShopData() {
  const [categories, setCategories] = useState<Category[]>([])
  const [offers, setOffers] = useState<Offer[]>([])
  const [home, setHome] = useState<Home | null>(null)
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    let ignore = false
    Promise.all([loadCategories(), loadProducts(), loadOffers(), loadHome()])
      .then(([cats, products, loadedOffers, loadedHome]) => {
        if (ignore) return
        setCategories(cats)
        setOffers(loadedOffers)
        setHome(loadedHome)
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

  return { categories, offers, home, loadState }
}
