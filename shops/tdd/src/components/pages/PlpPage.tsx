import { Link, useParams, useSearch } from '@tanstack/react-router'
import { useCatalogData } from '../../hooks/useCatalogData'
import { carouselProducts, sortProducts } from '../../features/products/products'
import ProductCard from '../ProductCard'

export default function PlpPage() {
    const { carouselId } = useParams({ from: '/plp/$carouselId' })
    const { sort } = useSearch({ from: '/plp/$carouselId' })
    const data = useCatalogData()
    const products = carouselProducts(data, carouselId)
    if (products === null) return <section><h1>این فهرست پیدا نشد</h1><Link className="listing-link" to="/">بازگشت به خانه</Link></section>
    const sortedProducts = sortProducts(products, data.offers, sort)
    const title = data.home.carousels.find(item => item.id === carouselId)?.title
        ?? data.categories.find(item => item.slug === carouselId)?.name

    return (
        <section className="plp">
            <header className="plp-heading">
                <div><h1>{title}</h1><p>{products.length.toLocaleString('fa-IR')} محصول</p></div>
                <Link className="listing-link" to="/"><span aria-hidden="true">→</span> بازگشت به خانه</Link>
            </header>
            <nav className="plp-sort" aria-label="مرتب‌سازی محصولات">
                <span>مرتب‌سازی:</span>
                <Link className="listing-link" to="/plp/$carouselId" params={{ carouselId }} search={{ sort: 'default' }} aria-current={sort === 'default' ? 'true' : undefined}>پیش‌فرض</Link>
                <Link className="listing-link" to="/plp/$carouselId" params={{ carouselId }} search={{ sort: 'price' }} aria-current={sort === 'price' ? 'true' : undefined}>ارزان‌ترین</Link>
            </nav>
            {products.length === 0 && <p>محصولی در این فهرست نیست.</p>}
            <div className="plp-grid">
                {sortedProducts.map(product => {
                    const offer = data.offers.find(item => item.productId === product.id)
                    return <ProductCard key={product.id} product={product} stock={data.stock.items[product.id] ?? 0} {...(offer && { offerPercent: offer.percent })} />
                })}
            </div>
        </section>
    )
}
