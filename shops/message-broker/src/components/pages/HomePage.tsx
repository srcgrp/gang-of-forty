import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useCatalog } from '../../hooks/useCatalog'
import { carouselProducts } from '../../catalog/carouselProducts'
import CategoryNav from '../CategoryNav'
import ProductGrid from '../ProductGrid'
import CartPanel from '../CartPanel'
import Hero from '../Hero'

export default function HomePage() {
  const state = useCatalog()
  const [categoryId, setCategoryId] = useState<number | null>(null)

  if (state.status === 'loading') return <p>در حال دریافت اطلاعات...</p>
  if (state.status === 'error') return <p role="alert">{state.message}</p>
  if (state.status === 'empty') return <p>محصولی برای نمایش وجود ندارد.</p>

  const visible = categoryId === null
    ? state.products
    : state.products.filter(p => p.categoryId === categoryId)

  return (
     <main id="main" tabIndex={-1}>
      <Hero home={state.home} />
      <CategoryNav categories={state.categories} activeCategoryId={categoryId} onPick={setCategoryId} />

      {state.home.carousels.map(carousel => {
        const products = carouselProducts(state, carousel.id) ?? []
        return (
          <section className="wrap" key={carousel.id}>
            <h2>{carousel.emoji} {carousel.title}</h2>
            <p>تعداد محصولات: {products.length}</p>
            <ProductGrid products={products.slice(0, 6)} offers={state.offers} />
            <Link to="/plp/$carouselId" params={{ carouselId: carousel.id }}>
              مشاهده همه ({products.length})
            </Link>
          </section>
        )
      })}

      <Hero id="posters-2" home={state.home} />
      <section className="wrap" id="new-products">
        <h2>محصولات</h2>
        <ProductGrid products={visible} offers={state.offers} />
      </section>
      <CartPanel products={state.products} offers={state.offers} />
    </main>
  )
}
