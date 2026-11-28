import type { CarouselWithProducts } from "../types"
import ProductCard from "./ProductCard"
import CarouselHeading from "./CarouselHeading"

type ProductGridProps = {
    carousels: CarouselWithProducts[]
    preview?: boolean
}

const previewSize = 4

export default function ProductGrid({ carousels, preview = false }: ProductGridProps) {
    const productsStart = carousels.find((carousel) => carousel.id !== "offers")
    return (
        <div>
            {carousels.map(function (carousel, index) {
                const titleId = carousel.id + "-title"
                const products = preview ? carousel.products.slice(0, previewSize) : carousel.products
                const hasProducts = products.length > 0

                return (
                    <section
                        className={index % 2 === 0 ? "section section--muted" : "section"}
                        id={carousel.id}
                        key={carousel.id}
                        aria-labelledby={titleId}
                        data-carousel="true"
                        data-preview={preview ? "true" : undefined}
                    >
                        {carousel === productsStart && <div id="products" />}
                        <div className="container">
                            <CarouselHeading carousel={carousel} titleId={titleId} preview={preview} />
                            <p className="catalog-status" role="status" hidden={hasProducts}>
                                کالایی پیدا نشد!
                            </p>
                            <ul
                                className="product-grid"
                                tabIndex={0}
                                hidden={!hasProducts}
                                aria-label={"کاروسل" + " " + carousel.title}
                            >
                                {products.map(function (product) {
                                    return <ProductCard key={product.id} product={product} />
                                })}
                            </ul>
                        </div>
                    </section>
                )
            })}
        </div>
    )
}