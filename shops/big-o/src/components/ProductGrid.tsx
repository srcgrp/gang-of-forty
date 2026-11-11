import rightArrow from "../../assets/icons/arrow-right.svg"
import leftArrow from "../../assets/icons/arrow-left.svg"
import type { CardInfo, Product } from "../types"
import ProductCard from "./ProductCard"

type ProductGridProps = {
  sectionId: string
  title: string
  getInfo: (product: Product) => CardInfo
  products: Product[]
  onAdd: (id: number) => void
}


export default function ProductGrid({title, sectionId, getInfo, products, onAdd}: ProductGridProps) {
    const firstCard = `first-${sectionId}`
    const lastCard = `last-${sectionId}`

    function signArrow(i: number): string | undefined {
        if (i === 0) return firstCard
        if (i === products.length - 1) return lastCard
        return undefined
    }

    return (
        <section  className="product-carousel" id={sectionId}>
            <div className="carousel-header">
                <h2>{title}</h2>
                <div className="carousel-arrows">
                    <a href={`#${firstCard}`}><img src={rightArrow} alt="" /><span className="visually-hidden">اولین محصول در {title}</span></a>
                    <a href={`#${lastCard}`}><img src={leftArrow} alt="" /><span className="visually-hidden">آخرین محصول در {title}</span></a>
                </div>
            </div>
            <ul>
                {products.map((product, index) => (
                    <ProductCard key={product.id} product={product} info={getInfo(product)} anchorId={signArrow(index)} onAdd={onAdd} />
                ))}
            </ul>
        </section>
    )
}