import type { Product } from '../shared/types'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
import { useCartStore } from '../hooks/useCartStore'
import Price from './Price'
import OfferBadge from './OfferBadge'

type ProductCardProps = {
    product: Product
    offerPercent?: number
    stock?: number
    cardId?: string
}

const notyf = new Notyf({ duration: 2000, position: { x: "left", y: "top" } })

export default function ProductCard({ product, offerPercent, stock, cardId }: ProductCardProps) {
    const add = useCartStore(s => s.add)
    const unavailable = stock === 0
    const handleAdd = () => {
        add(product.id)
        notyf.success("به سبد خرید اضافه شد")
    }

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
            <button className="add-button" type="button" aria-label={`افزودن ${product.name} به سبد خرید`} disabled={unavailable} onClick={handleAdd}>
                افزودن به سبد <span aria-hidden="true">{unavailable ? '×' : '+'}</span>
            </button>
        </article>
    )
}
