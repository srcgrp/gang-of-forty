import type { Product } from '../shared/types'
import ProductCard from './ProductCard'

export default function ProductGrid({ products }: { products: Product[] }) {
    return (
        <section className="product-carousel" aria-labelledby="products-title">
            <header className="section-heading">
                <h2 id="products-title">محصولات پیشنهادی</h2>
            </header>
            <div className="product-track" aria-label="محصولات فروشگاه">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}
