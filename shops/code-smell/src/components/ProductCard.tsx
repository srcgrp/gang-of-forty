import type { ProductCardData } from "../types"
import Price from "./Price"
import OfferBadge from "./OfferBadge"
import AddToCartButton from "./AddToCartButton"

type ProductCardProps = {
    product: ProductCardData
    onAdd: (id: number) => void
}

export default function ProductCard({
    product,
    onAdd
}: ProductCardProps) {
    return (
        <li>
            <article className="product-card">
                <div className="product-card__media">
                    <span className="product-card__emoji" aria-hidden="true">
                        {product.emoji}
                    </span>
                    {product.offer && (
                        <OfferBadge offer={product.offer} />
                    )}
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
                    <Price
                        amount={product.finalPrice}
                        originalPrice={
                            product.offer ? product.price : undefined
                        }
                    />
                    <AddToCartButton
                        product={product}
                        inStock={!product.isUnavailable}
                        onAdd={onAdd}
                    />
                </div>
            </article>
        </li>
    )
}