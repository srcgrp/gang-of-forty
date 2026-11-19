import { Link } from '@tanstack/react-router'
import type { Catalog } from '../shared/types'
import { carouselProducts } from '../features/products/products'
import ProductCard from './ProductCard'

type ProductGridProps = { data: Catalog }

export default function ProductGrid({ data }: ProductGridProps) {
    return (
        <div id="home-carousels">
            {data.home.carousels.map(carousel => {
                const products = carouselProducts(data, carousel.id) ?? []
                const preview = products.slice(0, 6)
                return (
                    <section className="product-carousel" id={carousel.id} key={carousel.id}>
                        <header className="section-heading carousel-heading">
                            <h2>{carousel.emoji} {carousel.title}</h2>
                            <Link className="listing-link" to="/plp/$carouselId" params={{ carouselId: carousel.id }}>
                                مشاهده همه ({products.length.toLocaleString('fa-IR')}) <span aria-hidden="true">←</span>
                            </Link>
                        </header>
                        {preview.length > 0 && <nav className="carousel-controls" aria-label={`کنترل‌های ${carousel.title}`}>
                            <Link to="/" hash={`${carousel.id}-first`}>اولین محصول →</Link>
                            <Link to="/" hash={`${carousel.id}-${preview.length === 1 ? 'first' : 'last'}`}>آخرین محصول ←</Link>
                        </nav>}
                        <div className="product-track" aria-label={`محصولات ${carousel.title}`}>
                            {preview.map((product, index) => {
                                const offer = data.offers.find(item => item.productId === product.id)
                                const cardId = index === 0 ? `${carousel.id}-first`
                                    : index === preview.length - 1 ? `${carousel.id}-last` : `product-${carousel.id}-${product.id}`
                                return <ProductCard key={product.id} product={product} cardId={cardId}
                                    stock={data.stock.items[product.id] ?? 0} {...(offer && { offerPercent: offer.percent })} />
                            })}
                        </div>
                    </section>
                )
            })}
        </div>
    )
}
