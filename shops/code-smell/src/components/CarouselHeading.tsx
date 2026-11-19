import { Link } from "@tanstack/react-router"
import type { CarouselWithProducts } from "../types"
import CarouselControls from "./CarouselControls"

type CarouselHeadingProps = {
    carousel: CarouselWithProducts
    titleId: string
    preview: boolean
}

export default function CarouselHeading({ carousel, titleId, preview }: CarouselHeadingProps) {
    const count = carousel.products.length
    const countText = count.toLocaleString("fa-IR")

    return (
        <header className="section__header section__header--carousel">
            <div className="carousel-heading-row">
                <h2 className="section__title" id={titleId}>
                    <span className="carousel-title__emoji" aria-hidden="true">
                        {carousel.id === "search-results" ? (
                            <img src="svg/magnifying-glass.svg" alt="" width={20} height={20} />
                        ) : (
                            carousel.emoji
                        )}
                    </span>
                    {carousel.title}
                </h2>
                <div className="carousel-heading-actions">
                    {!preview && count > 1 && <CarouselControls title={carousel.title} />}
                    {preview && (
                        <Link
                            className="button button--primary button--route"
                            to="/plp/$carouselId"
                            params={{ carouselId: carousel.id }}
                            search={{ sort: "default" }}
                            aria-label={"مشاهده همه (" + countText + ")، " + carousel.title}
                        >
                            مشاهده همه ({countText})
                        </Link>
                    )}
                </div>
            </div>
            <p className="section__subtitle">{countText} کالا</p>
        </header>
    )
}
