import type { Product } from '../shared/types'
import Price from './Price'
import OfferBadge from './OfferBadge'

type ProductCardProps = {
    product: Product
    onAdd: (id: number) => void
    offerPercent?: number
    stock?: number
}

export default function ProductCard({ product, onAdd, offerPercent, stock }: ProductCardProps) {
    return (
        <article className="product-card" id={`product-${product.id}`}>
            <div className="product-image">
                <span className="product-icon" aria-hidden="true">{product.emoji}</span>
                {offerPercent !== undefined && <OfferBadge percent={offerPercent} />}
            </div>
            <h3>{product.name}</h3>
            <p className="product-amount">{product.unit}</p>
            {stock !== undefined && <p className="product-stock">موجودی: {stock}</p>}
            <Price value={product.price} {...(offerPercent !== undefined && { offerPercent })} />
            <button
                className="add-button"
                type="button"
                aria-label={`افزودن ${product.name} به سبد خرید`}
                onClick={() => onAdd(product.id)}
            >
                افزودن به سبد <span aria-hidden="true">+</span>
            </button>
        </article>
    )
}
