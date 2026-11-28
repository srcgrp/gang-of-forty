import { useState } from 'react'
import { Link, useParams, useSearch } from '@tanstack/react-router'
import { useCatalog } from '../../hooks/useCatalog'
import { useCartStore } from '../../hooks/useCartStore'
import { useHomeConfig } from '../../hooks/useHomeConfig'
import { carouselProducts } from '../../catalog/carouselProducts'
import { sortProducts } from '../../catalog/sortProducts'
import SearchBox from '../SearchBox'
import ProductGrid from '../ProductGrid'
import PlpStatus from '../PlpStatus'
import SortOptions from '../SortOptions'

export default function PlpPage() {
  const { carouselId } = useParams({ from: '/plp/$carouselId' })
  const { sort } = useSearch({ from: '/plp/$carouselId' })
  const { loadState, retry } = useCatalog()
  const addItem = useCartStore((state) => state.addItem)
  const { homeConfig, configError } = useHomeConfig()
  const [query, setQuery] = useState('')

  const products = loadState.status === 'success'
    ? loadState.products
    : []

  const carousel = homeConfig?.carousels.find(
    (item) => item.id === carouselId,
  )

  const filteredProducts = carousel
    ? carouselProducts(products, carousel).filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()),
      )
    : []

  const sortedProducts = sortProducts(filteredProducts, sort)

  const handleAdd = (id: string) => {
    const product = products.find((item) => item.id === id)
    if (product) addItem(product)
  }

  if (configError) return <p>خطا در بارگذاری فهرست محصولات.</p>

  if (loadState.status !== 'success' || !homeConfig || !carousel) {
    return (
      <PlpStatus
        loading={loadState.status === 'loading' || !homeConfig}
        error={loadState.status === 'error' ? loadState.message : null}
        empty={loadState.status === 'empty'}
        notFound={Boolean(homeConfig && !carousel)}
        retry={retry}
      />
    )
  }

  return (
    <section className="plp-page">
      <div className="plp-header">
        <h2>{carousel.title}</h2>
        <Link to="/">بازگشت به صفحه اصلی</Link>
      </div>
      <SortOptions carouselId={carouselId} />
      <SearchBox query={query} onQuery={setQuery} />
      <ProductGrid products={sortedProducts} onAdd={handleAdd} />
    </section>
  )
}