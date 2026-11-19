import { Link, useParams } from '@tanstack/react-router'
import { carouselProducts } from '../../catalog/carousels'
import { cardOf } from '../../features/products/logic/to-card'
import { useCatalog } from '../../hooks/useCatalog'
import ProductCard from '../ProductCard'
import ProductSkeleton from '../ProductSkeleton'
import ProductStatus from '../ProductStatus'

export default function PlpPage() {
  const { carouselId } = useParams({ from: '/plp/$carouselId' })
  const state = useCatalog()

  if (state.status === 'loading') return <ProductSkeleton />
  if (state.status === 'error') {
    return <ProductStatus variant="error" title="بارگذاری محصولات ناموفق بود" text={state.message} onRetry={state.retry} />
  }

  const { data } = state
  const shelf = data.carousels.find((item) => item.id === carouselId)
  const products = carouselProducts(data, carouselId)

  return (
    <section className="product-shelf" aria-labelledby="plp-title">
      <div className="container">
        <div className="product-shelf__inner">
          <div className="product-shelf__main">
            <header className="plp__heading">
              <div>
                <h1 className="plp__title" id="plp-title">{shelf?.title ?? 'این فهرست پیدا نشد'}</h1>
                {products && <p className="plp__count">{products.length.toLocaleString('fa-IR')} محصول</p>}
              </div>
              <Link to="/" search={true} className="catalog-link">
                <svg width="16" height="16" fill="currentColor" aria-hidden="true">
                  <use href="./icons.svg#arrowForward" />
                </svg>
                بازگشت به خانه
              </Link>
            </header>
            {products && (products.length > 0 ? (
              <ul className="plp__grid" aria-labelledby="plp-title">
                {products.map((product) => (
                  <ProductCard key={product.id} card={cardOf(product, data)} anchorId={`product-${product.id}`} />
                ))}
              </ul>
            ) : (
              <p className="product-shelf__status">محصولی در این فهرست نیست.</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
