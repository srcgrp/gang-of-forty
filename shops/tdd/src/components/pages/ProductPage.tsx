import { Link, useParams } from '@tanstack/react-router'
import { useCatalog } from '../../hooks/useCatalog'
import LoadStatus from '../LoadStatus'
import Price from '../Price'
import OfferBadge from '../OfferBadge'
import AddToCartButton from '../AddToCartButton'

export default function ProductPage() {
    const { productId } = useParams({ from: '/product/$productId' })
    const { state, retry } = useCatalog()
    if (state.status !== 'success') return <LoadStatus state={state} onRetry={retry} />

    const data = state.data
    const product = data.products.find(item => item.id === Number(productId))
    if (!product) return <section><h1>محصول پیدا نشد</h1><Link className="listing-link" to="/">بازگشت به خانه</Link></section>
    const offer = data.offers.find(item => item.productId === product.id)
    const unavailable = (data.stock.items[product.id] ?? 0) === 0

    return (
        <section className="product-detail">
            <header className="plp-heading">
                <h1>{product.name}</h1>
                <Link className="listing-link" to="/"><span aria-hidden="true">→</span> بازگشت به خانه</Link>
            </header>
            <div className={`product-card${unavailable ? ' is-unavailable' : ''}`}>
                <div className="product-image">
                    <span className="product-icon" aria-hidden="true">{product.emoji}</span>
                    {offer && <OfferBadge percent={offer.percent} />}
                </div>
                <p className="product-amount">{product.unit}</p>
                {unavailable && <p className="stock-status">ناموجود</p>}
                <Price value={product.price} {...(offer && { offerPercent: offer.percent })} />
                <AddToCartButton product={product} unavailable={unavailable} />
            </div>
        </section>
    )
}
