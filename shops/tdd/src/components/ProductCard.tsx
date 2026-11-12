import type { Product } from '../shared/types'
import Price from './Price'
import OfferBadge from './OfferBadge'

type ProductCardProps = {
    product: Product
    onAdd: (id: number) => void
    offerPercent?: number
    stock?: number
    cardId?: string
}

export default function ProductCard({ product, onAdd, offerPercent, stock, cardId }: ProductCardProps) {
    const unavailable = stock === 0

    return (
        <article className={`product-card${unavailable ? ' is-unavailable' : ''}`} id={cardId ?? `product-${product.id}`}>
            <div className="product-image">
                <span className="product-icon" aria-hidden="true">{product.emoji}</span>
                {offerPercent !== undefined && <OfferBadge percent={offerPercent} />}
            </div>
            <h3>{product.name}</h3>
            <p className="product-amount">{product.unit}</p>
            {unavailable && <p className="stock-status">ناموجود</p>}
            <Price value={product.price} {...(offerPercent !== undefined && { offerPercent })} />
            <button className="add-button" type="button" aria-label={`افزودن ${product.name} به سبد خرید`} disabled={unavailable} onClick={() => onAdd(product.id)}>
                افزودن به سبد <span aria-hidden="true">{unavailable ? '×' : '+'}</span>
            </button>
        </article>
    )
}
