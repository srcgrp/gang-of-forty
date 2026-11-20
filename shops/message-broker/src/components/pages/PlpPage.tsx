import { Link, useParams } from '@tanstack/react-router'
import { useCatalog } from '../../hooks/useCatalog'
import { carouselProducts } from '../../catalog/carouselProducts'
import ProductGrid from '../ProductGrid'

export default function PlpPage() {
  const { carouselId } = useParams({
    from: '/plp/$carouselId'
  })

  const state = useCatalog()

  if (state.status === 'loading') {
    return <p>در حال دریافت اطلاعات...</p>
  }

  if (state.status === 'error') {
    return <p role="alert">{state.message}</p>
  }

  if (state.status === 'empty') {
    return <p>محصولی برای نمایش وجود ندارد.</p>
  }

  const carousel = state.home.carousels.find(
    item => item.id === carouselId
  )

  const category = state.categories.find(
    item => item.slug === carouselId
  )

  const products = carousel
    ? carouselProducts(state, carouselId)
    : category
      ? state.products.filter(
          product => product.categoryId === category.id
        )
      : null

  if (!products) {
    return <p>این فهرست پیدا نشد.</p>
  }

  const title = carousel
    ? `${carousel.emoji} ${carousel.title}`
    : `${category?.emoji} ${category?.name}`

  return (
    <section className="wrap">
      <h1>{title}</h1>
      <p>تعداد محصولات: {products.length}</p>
      <ProductGrid products={products} offers={state.offers} />
      <Link to="/">بازگشت به خانه</Link>
    </section>
  )
}