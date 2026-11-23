import type { ListingSearch } from "../catalog/shopPageData"
import type { CarouselWithProducts } from "../types"
import ProductCard from "./ProductCard"
import CarouselHeading from "./CarouselHeading"

type ProductGridProps = {
    carousels: CarouselWithProducts[]
    search?: ListingSearch
}

const previewSize = 6

export default function ProductGrid({ carousels, search }: ProductGridProps) {
    const productsStart = carousels.find((carousel) => carousel.id !== "offers")
    return (
        <div>
            {carousels.map(function (carousel, index) {
                const titleId = carousel.id + "-title"
                const products = carousel.products.slice(0, previewSize)
                const hasProducts = products.length > 0

                return (
                    <section
                        className={index % 2 === 0 ? "section section--muted" : "section"}
                        id={carousel.id}
                        key={carousel.id}
                        aria-labelledby={titleId}
                        data-carousel="true"
                        data-preview="true"
                    >
                        {carousel === productsStart && <div id="products" />}
                        <div className="container">
                            <CarouselHeading
                                carousel={carousel}
                                titleId={titleId}
                                search={search}
                            />
                            <p className="catalog-status" role="status" hidden={hasProducts}>
                                کالایی پیدا نشد!
                            </p>
                            <ul
                                className="product-grid"
                                tabIndex={0}
                                hidden={!hasProducts}
                                aria-label={(search ? "نتایج جستجو: " : "کاروسل ") + carousel.title}
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