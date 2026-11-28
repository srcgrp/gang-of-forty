
import { useState } from 'react'
import type { ProductWithDetails } from '../../types'
import { useCatalog } from '../../hooks/useCatalog'
import { useCartStore } from '../../hooks/useCartStore'
import { useHomeConfig } from '../../hooks/useHomeConfig'
import SearchBox from '../SearchBox'
import SaleCountdown from '../SaleCountdown'
import HomeCarousel from '../HomeCarousel'

export default function HomePage() {
  const { loadState, retry } = useCatalog()
  const addItem = useCartStore((state) => state.addItem)
  const { homeConfig, configError } = useHomeConfig()
  const [query, setQuery] = useState('')

  const products: ProductWithDetails[] =
    loadState.status === 'success' ? loadState.products : []

  const handleAdd = (id: string) => {
    const product = products.find((item) => item.id === id)
    if (product) addItem(product)
  }

  return (
    <>
      <h2>به سوپرمارکت Least Surprise خوش آمدید</h2>
      <SearchBox query={query} onQuery={setQuery} />
      <SaleCountdown initialSeconds={120} />

      {loadState.status === 'loading' && (
        <p>در حال بارگذاری محصولات...</p>
      )}

      {loadState.status === 'error' && (
        <div className="error-state">
          <p>خطا: {loadState.message}</p>
          <button onClick={retry}>تلاش دوباره</button>
        </div>
      )}

      {loadState.status === 'empty' && (
        <p>محصولی برای نمایش وجود ندارد.</p>
      )}

      {configError && (
        <p>خطا در بارگذاری دسته‌بندی‌های صفحه اصلی.</p>
      )}

      {homeConfig && loadState.status === 'success' && (
        <div className="home-carousels">
          {homeConfig.carousels.map((carousel) => (
            <HomeCarousel
              key={carousel.id}
              carousel={carousel}
              products={products}
              query={query}
              onAdd={handleAdd}
            />
          ))}
        </div>
      )}
    </>
  )
}
