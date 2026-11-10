import type { Product } from "../types"
import Price from "./Price"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <li>
            <article className="product-card">
                <div className="product-card__media">
                    <span className="product-card__emoji" aria-hidden="true">
                        {product.emoji}
                    </span>
                </div>
                <h3 className="product-card__title">{product.name}</h3>
                <p className="product-card__unit">{product.unit}</p>
                <p
                    className="product-card__tags"
                    hidden={product.tags.length === 0}
                >
                    {product.tags.join(" · ")}
                </p>
                <div className="product-card__footer">
                    <Price amount={product.price} />
                    <button
                        className="button button--secondary button--block"
                        type="button"
                        aria-label={"افزودن به سبد خرید:" + " " + product.name}
                    >
                        <span aria-hidden="true">+</span>
                        <span>افزودن به سبد خرید</span>
                    </button>
                </div>
            </article>
        </li>
    )
}