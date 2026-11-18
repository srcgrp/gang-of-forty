import { useEffect, useState } from 'react'
import { loadAllData } from './shared/api/load-all'
import { initialShopData, shopLoadError } from './shared/state/shop-data'
import { withCategoryImages } from './shared/logic/content-utils'
import { useCartStore } from './hooks/useCartStore'
import { useUrlFilters } from './hooks/useUrlFilters'
import ShopPage from './components/ShopPage'

export default function App() {
  const filters = useUrlFilters()
  const [data, setData] = useState(initialShopData)
  const mobileMenu = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false
    loadAllData().then((result) => {
      if (ignore) return
      const next = { ...result, categories: withCategoryImages(result.categories) }
      setData(next)
      if (result.skippedProducts === 0) useCartStore.getState().reconcile(next.products, next.stock)
    }).catch((error: unknown) => {
      if (ignore) return
      const res = shopLoadError(error)
      setData((current) => ({ ...current, res }))
    })
    return () => { ignore = true }
  }, [attempt])

  function retry(): void {
    setData((current) => ({ ...current, res: { status: 'loading' } }))
    setAttempt((current) => current + 1)
  }

  return (
    <ShopPage
      data={data}
      filters={filters}
      mobileMenu={mobileMenu}
      onRetry={retry}
    />
  )
}
