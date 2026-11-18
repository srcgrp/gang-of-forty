import { Link, useParams,useSearch } from '@tanstack/react-router'
import { carouselProducts } from '../../features/catalog/carousel'
import { sortProducts } from '../../features/catalog/sort'
import { useCatalog } from '../../hooks/useCatalog'
import { formatNumber } from '../format'
import ProductCard from '../ProductCard'
import Status from '../Status'

export default function PlpPage() {
   const { state, retry } = useCatalog()
  const { carouselId } = useParams({ from: '/plp/$carouselId' })
    const { sort } = useSearch({ from: '/plp/$carouselId' })


  if (state.status !== 'success') {
    return <Status state={state}  onRetry={retry}/>
  }

  const { products, home } = state.data
   const carousel = home.carousels.find((entry) => entry.id === carouselId)
  const found = carouselProducts(home.carousels, products, carouselId)
  const items = found === null ? null : sortProducts(found, sort)

  if (carousel === undefined || items === null) {
    return (
      <main id="content" tabIndex={-1} className="container">
        <h1 className="section-title">اینجا چیزی پیدا نشد.</h1>
        <p className="empty-message">کاروسل «{carouselId}» وجود ندارد؛ از لینک‌های صفحهٔ اصلی یکی را انتخاب کن.</p>
        <Link className="sale-show-btn" to="/" search={{ q: '', category: undefined }}>بازگشت به خانه</Link>
      </main>
    )
  }

  return (
    <main id="content" tabIndex={-1} className="container">
        <div className="section-head">
        <h1 className="section-title" id="plp-title">
          <span aria-hidden="true">{carousel.emoji}</span> {carousel.title}
          <span> ({formatNumber(items.length)} کالا)</span>
        </h1>
        <div className="sort-links" role="group" aria-label="مرتب‌سازی کالاها">
          <Link className={`sort-link${sort === 'default' ? ' is-active' : ''}`}
            to="/plp/$carouselId" params={{ carouselId }}
            search={{ sort: 'default' }}>پیش‌فرض</Link>
          <Link className={`sort-link${sort === 'price' ? ' is-active' : ''}`}
            to="/plp/$carouselId" params={{ carouselId }}
            search={{ sort: 'price' }}>ارزان‌ترین</Link>
        </div>
        <Link className="sale-show-btn" to="/" search={{ q: '', category: undefined }}>بازگشت به خانه</Link>
      </div>
      {items.length === 0 ? (
        <p className="empty-message">فعلاً کالایی در این کاروسل نیست.</p>
      ) : (
        <ul className="catalog-grid">
           {items.map((product) => (
            <ProductCard key={product.id} product={product} inStock={product.stock > 0}
              discount={product.percent > 0 ? product.percent : undefined} />
          ))}
        </ul>
      )}
    </main>
  )
}