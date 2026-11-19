import { Link, useParams } from '@tanstack/react-router'
import { useCatalog } from '../../hooks/useCatalog'
import { carouselProducts } from '../../features/products/products'
import LoadStatus from '../LoadStatus'
import ProductCard from '../ProductCard'

export default function PlpPage() {
    const { carouselId } = useParams({ from: '/plp/$carouselId' })
    const { state, retry } = useCatalog()
    if (state.status !== 'success') return <LoadStatus state={state} onRetry={retry} />

    const data = state.data
    const products = carouselProducts(data, carouselId)
    if (products === null) return <section><h1>این فهرست پیدا نشد</h1><Link className="listing-link" to="/">بازگشت به خانه</Link></section>
    const title = data.home.carousels.find(item => item.id === carouselId)?.title
        ?? data.categories.find(item => item.slug === carouselId)?.name

    return (
        <section className="plp">
            <header className="plp-heading">
                <div><h1>{title}</h1><p>{products.length.toLocaleString('fa-IR')} محصول</p></div>
                <Link className="listing-link" to="/"><span aria-hidden="true">→</span> بازگشت به خانه</Link>
            </header>
            {products.length === 0 && <p>محصولی در این فهرست نیست.</p>}
            <div className="plp-grid">
                {products.map(product => {
                    const offer = data.offers.find(item => item.productId === product.id)
                    return <ProductCard key={product.id} product={product} stock={data.stock.items[product.id] ?? 0} {...(offer && { offerPercent: offer.percent })} />
                })}
            </div>
        </section>
    )
}
