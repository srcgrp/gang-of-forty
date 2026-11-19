import type { Product } from '../shared/types'
import { memo } from 'react'
import { Link } from '@tanstack/react-router'
import AddToCartButton from './AddToCartButton'
import Price from './Price'
import OfferBadge from './OfferBadge'

type ProductCardProps = {
    product: Product
    offerPercent?: number
    stock?: number
    cardId?: string
}

export default memo(function ProductCard({ product, offerPercent, stock, cardId }: ProductCardProps) {
    const unavailable = stock === 0

    return (
        <article className={`product-card${unavailable ? ' is-unavailable' : ''}`} id={cardId ?? `product-${product.id}`}>
            <div className="product-image">
                <span className="product-icon" aria-hidden="true">{product.emoji}</span>
                {offerPercent !== undefined && <OfferBadge percent={offerPercent} />}
            </div>
            <h3><Link className="product-title-link" to="/product/$productId" params={{ productId: String(product.id) }}>{product.name}</Link></h3>
            <p className="product-amount">{product.unit}</p>
            {unavailable && <p className="stock-status">ناموجود</p>}
            <Price value={product.price} {...(offerPercent !== undefined && { offerPercent })} />
            <Link className="listing-link product-view-link" to="/product/$productId" params={{ productId: String(product.id) }} aria-label={`نمایش محصول ${product.name}`}>نمایش محصول</Link>
            <AddToCartButton product={product} unavailable={unavailable} />
        </article>
    )
})
