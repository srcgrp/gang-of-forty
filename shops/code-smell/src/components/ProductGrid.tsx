import type { Product } from "../types"
import ProductCard from "./ProductCard"

type ProductGridProps = {
    products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
    return (
        <section
            className="section section--muted"
            id="products"
            aria-labelledby="products-title"
        >
            <div className="container">
                <header className="section__header">
                    <h2 className="section__title" id="products-title">
                        کالاهای فروشگاه
                    </h2>
                </header>
                <ul className="product-grid">
                    {products.map(function (product) {
                        return (
                            <ProductCard key={product.id} product={product} />
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}