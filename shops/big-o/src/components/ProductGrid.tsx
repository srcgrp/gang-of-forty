import rightArrow from "../../assets/icons/arrow-right.svg"
import leftArrow from "../../assets/icons/arrow-left.svg"
import type { ReactNode } from "react"
import type { CardInfo, Product } from "../types"
import ProductCard from "./ProductCard"

type ProductGridProps = {
  sectionId: string
  title: string
  getInfo: (product: Product) => CardInfo
  products: Product[]
  headerExtra?: ReactNode
}

export default function ProductGrid({ title, sectionId, getInfo, products, headerExtra }: ProductGridProps) {
    const firstCard = `first-${sectionId}`
    const lastCard = `last-${sectionId}`

    function signArrow(i: number): string | undefined {
        if (i === 0) return firstCard
        if (i === products.length - 1) return lastCard
        return undefined
    }

    // Scrolls one card into view inside the row, without changing the address
    function scrollToCard(id: string) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
    }

    return (
        <section className="product-carousel" id={sectionId}>
            <div className="carousel-header">
                <div className="carousel-title">
                    <h2>{title}</h2>
                    {headerExtra}
                </div>
                <div className="carousel-arrows">
                    <button type="button" onClick={() => scrollToCard(firstCard)}>
                        <img src={rightArrow} alt="" />
                        <span className="visually-hidden">اولین محصول در {title}</span>
                    </button>
                    <button type="button" onClick={() => scrollToCard(lastCard)}>
                        <img src={leftArrow} alt="" />
                        <span className="visually-hidden">آخرین محصول در {title}</span>
                    </button>
                </div>
            </div>
            <ul>
                {products.map((product, index) => (
                    <ProductCard key={product.id} product={product} info={getInfo(product)} anchorId={signArrow(index)} />
                ))}
            </ul>
        </section>
    )
}