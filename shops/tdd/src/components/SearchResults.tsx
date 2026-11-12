import type { Offer, Product, Stock } from '../shared/types'
import ProductCard from './ProductCard'

type SearchResultsProps = {
    query: string
    products: Product[]
    stock: Stock
    offers: Offer[]
    onAdd: (id: number) => void
}

export default function SearchResults({ query, products, stock, offers, onAdd }: SearchResultsProps) {
    if (!query.trim()) return null

    return (
        <section className="product-carousel" id="search-results" aria-labelledby="search-results-title">
            <header className="section-heading">
                <h2 id="search-results-title">نتایج جست‌وجو</h2>
                <p role="status">{products.length} محصول پیدا شد</p>
            </header>
            {products.length > 0 ? (
                <div className="product-track" aria-label="محصولات یافت‌شده">
                    {products.map((product, index) => {
                        const offer = offers.find(item => item.productId === product.id)
                        const cardId = index === 0 ? 'search-results-first' : index === products.length - 1 ? 'search-results-last' : undefined
                        return (
                            <ProductCard
                                key={product.id}
                                product={product}
                                {...(cardId && { cardId })}
                                onAdd={onAdd}
                                stock={stock.items[product.id] ?? 0}
                                {...(offer && { offerPercent: offer.percent })}
                            />
                        )
                    })}
                </div>
            ) : (
                <p className="carousel-status">محصولی با این نام پیدا نشد.</p>
            )}
        </section>
    )
}
