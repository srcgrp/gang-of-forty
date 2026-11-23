import { Link, useParams, useSearch } from '@tanstack/react-router'
import { carouselProducts, sortCarouselCards } from '../../catalog/carousels'
import { cardOf } from '../../features/products/logic/to-card'
import { useCatalog } from '../../hooks/useCatalog'
import PlpSortLinks from '../PlpSortLinks'
import ProductCard from '../ProductCard'
import ProductSkeleton from '../ProductSkeleton'
import ProductStatus from '../ProductStatus'
import { Icon } from '../Icon'

export default function PlpPage() {
  const { carouselId } = useParams({ from: '/plp/$carouselId' })
  const { sort } = useSearch({ from: '/plp/$carouselId' })
  const state = useCatalog()

  if (state.status === 'loading') return <ProductSkeleton />
  if (state.status === 'error') {
    return <ProductStatus variant="error" title="بارگذاری محصولات ناموفق بود" text={state.message} onRetry={state.retry} />
  }

  const { data } = state
  const shelf = data.carousels.find((item) => item.id === carouselId)
  const products = carouselProducts(data, carouselId)
  const cards = products && sortCarouselCards(products.map((product) => cardOf(product, data)), sort)

  return (
    <section className="product-shelf" aria-labelledby="plp-title">
      <div className="container">
        <div className="product-shelf__inner">
          <div className="product-shelf__main">
            <header className="plp__heading">
              <div>
                <h1 className="plp__title" id="plp-title">{shelf?.title ?? 'این فهرست پیدا نشد'}</h1>
                {cards && (
                  <div className="plp__meta">
                    <p className="plp__count">{cards.length.toLocaleString('fa-IR')} محصول</p>
                    <PlpSortLinks carouselId={carouselId} sort={sort} />
                  </div>
                )}
              </div>
              <Link to="/" search={true} className="catalog-link">
                <Icon name="arrowForward" width="16" height="16" fill="currentColor" />
                بازگشت به خانه
              </Link>
            </header>
            {cards && (cards.length > 0 ? (
              <ul className="plp__grid" aria-labelledby="plp-title">
                {cards.map((card) => (
                  <ProductCard key={card.id} card={card} anchorId={`product-${card.id}`} />
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
