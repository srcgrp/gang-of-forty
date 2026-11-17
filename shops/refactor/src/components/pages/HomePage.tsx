import { useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { selectProducts } from '../../features/products/select'
import { useCatalog } from '../../hooks/useCatalog'
import CarouselRow from '../CarouselRow'
import CategoryNav from '../CategoryNav'
import Hero from '../Hero'
import ProductGrid from '../ProductGrid'
import SaleCountdown from '../SaleCountdown'
import Status from '../Status'

export default function HomePage() {
  const { state } = useCatalog()
  const { q: searchQ, category: searchCategory } = useSearch({ from: '/' })
  const q = searchQ ?? ''
  const category = searchCategory ?? null
  const navigate = useNavigate()
  const [showAll, setShowAll] = useState(false)
  const [showCountdown, setShowCountdown] = useState(true)

  if (state.status !== 'success') {
    return <Status state={state} />
  }

  const { products, categories, home } = state.data
  const results = selectProducts(products, category, q)
  const visible = category !== null || q.trim() || showAll ? results : results.slice(0, 12)

  return (
    <main id="content" tabIndex={-1}>
      <h1 className="sr-only">صفحهٔ اصلی فروشگاه</h1>
      <Hero main={home.hero} side={home.side} />
      {showCountdown && <SaleCountdown onClose={() => setShowCountdown(false)} />}
    
      <CategoryNav categories={categories} activeId={category}
        onPick={(id) => navigate({ to: '/', search: { q, category: id ?? undefined } })} />
      <div className="shop-layout container">
        <ProductGrid products={visible} showAll={showAll}
          onToggleAll={() => setShowAll((open) => !open)} showToggle={category === null && !q.trim()}
          showSaleButton={!showCountdown} onShowSale={() => setShowCountdown(true)} />
      </div>
        {home.carousels.map((carousel) => (
        <CarouselRow key={carousel.id} carousels={home.carousels} carousel={carousel} products={products} />
      ))}
    </main>
  )
}