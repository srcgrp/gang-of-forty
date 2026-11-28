import { Link, useParams } from '@tanstack/react-router'
import { useCatalog } from '../../hooks/useCatalog'
import ProductCard from '../ProductCard'
import Status from '../Status'
import ProductGallery from '../product/ProductGallery'
import ProductInfo from '../product/ProductInfo'

export default function ProductPage() {
  const { state, retry } = useCatalog()
  const { productId } = useParams({ from: '/product/$productId' })

  if (state.status !== 'success') return <Status state={state} onRetry={retry} />

  const id = Number(productId)
  const product = Number.isFinite(id)
    ? state.data.products.find((entry) => entry.id === id)
    : undefined

  if (!product) {
    return (
      <main id="content" tabIndex={-1} className="container">
        <h1 className="section-title">محصول پیدا نشد</h1>
        <p className="empty-message">کالایی با شناسهٔ «{productId}» در فروشگاه نیست؛ از صفحهٔ اصلی یکی را انتخاب کن.</p>
        <Link className="sale-show-btn" to="/" search={{ q: '', category: undefined }}>بازگشت به خانه</Link>
      </main>
    )
  }

  const category = state.data.categories.find((c) => c.id === product.categoryId)
  const similar = state.data.products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4)

  return (
    <main id="content" tabIndex={-1} className="container pd-page">
      <nav className="pd-crumb" aria-label="مسیر">
        <Link to="/" search={{ q: '', category: undefined }}>خانه</Link>
        <span aria-hidden="true">/</span>
        {category && (
          <>
            <Link to="/" search={{ q: '', category: category.id }}>{category.name}</Link>
            <span aria-hidden="true">/</span>
          </>
        )}
        <span aria-current="page">{product.name}</span>
      </nav>

      <article className="pd-main">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </article>

      {similar.length > 0 && (
        <section className="pd-similar" aria-labelledby="similar-title">
          <h2 className="section-title" id="similar-title">محصولات مشابه</h2>
          <ul className="catalog-grid">
            {similar.map((item) => (
              <ProductCard key={item.id} product={item} inStock={item.stock > 0}
                discount={item.percent > 0 ? item.percent : undefined} />
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
