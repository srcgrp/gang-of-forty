import type { Offer, Product, Stock } from '../shared/types'
import ProductCard from './ProductCard'

type ProductGridProps = {
    products: Product[]
    stock: Stock
    offers: Offer[]
    onAdd: (id: number) => void
}

export default function ProductGrid({ products, stock, offers, onAdd }: ProductGridProps) {
    return (
        <section className="product-carousel" aria-labelledby="products-title">
            <header className="section-heading">
                <h2 id="products-title">محصولات پیشنهادی</h2>
            </header>
            <div className="product-track" aria-label="محصولات فروشگاه">
                {products.map(product => {
                    const offer = offers.find(item => item.productId === product.id)
                    const stockCount = stock.items[product.id]

                    return (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAdd={onAdd}
                            {...(offer && { offerPercent: offer.percent })}
                            {...(stockCount !== undefined && { stock: stockCount })}
                        />
                    )
                })}
            </div>
        </section>
    )
}
