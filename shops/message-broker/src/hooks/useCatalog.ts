import { useEffect, useState } from 'react'
import type { Catalog, LoadState } from '../types'
import {loadCategories, loadProducts, loadOffers, loadHome, loadShop } from '../api/client'
  
export function useCatalog(): LoadState<Catalog> {
  const [state, setState] = useState<LoadState<Catalog>>({
    status: 'loading'
  })

  useEffect(() => {
    let ignore = false

    Promise.all([
      loadCategories(),
      loadProducts(),
      loadOffers(),
      loadHome(),
      loadShop()
    ])
      .then(([categories, products, offers, home, shop]) => {
        if (ignore) return

        const catalog = { categories, products, offers, home, shop }

        setState(
          products.length
           ? { status: 'success', ...catalog }
           : { status: 'empty' }
        )
      })
      .catch(error => {
        if (ignore) return

        setState({
          status: 'error',
          message: error instanceof Error
            ? error.message
            : 'خطا در دریافت اطلاعات'
        })
      })

    return () => {
      ignore = true
    }
  }, [])

  return state
}
