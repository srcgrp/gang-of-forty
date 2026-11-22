
import { useEffect, useState } from 'react'
import type { Category, Offer, LoadState, Home, Shop} from '../types'
import { loadCategories, loadProducts, loadOffers, loadHome, loadShop } from '../api/client'

export function useShopData() {
  const [categories, setCategories] = useState<Category[]>([])
  const [offers, setOffers] = useState<Offer[]>([])
  const [home, setHome] = useState<Home | null>(null)
   const [shop, setShop] = useState<Shop | null>(null)
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    let ignore = false
    Promise.all([loadCategories(), loadProducts(), loadOffers(), loadHome(), loadShop()])
      .then(([cats, products, loadedOffers, loadedHome, loadedShop]) => {
        if (ignore) return
        setCategories(cats)
        setOffers(loadedOffers)
        setHome(loadedHome)
        setShop(loadedShop)
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

  return { categories, offers, home, shop, loadState }
}
