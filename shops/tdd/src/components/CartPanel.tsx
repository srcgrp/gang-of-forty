import type { CartLine, Product } from '../shared/types'

type CartPanelProps = {
    cart: CartLine[]
    products: Product[]
    count: number
    total: number
    onRemove: (productId: number) => void
    onClear: () => void
}

export default function CartPanel({ cart, products, count, total, onRemove, onClear }: CartPanelProps) {
    const formatPrice = (value: number) => value.toLocaleString('fa-IR')

    return (
        <div className="cart-actions">
            <details className="cart-widget">
                <summary className="cart">
                    سبد خرید 🛒 <strong aria-live="polite">{formatPrice(count)}</strong>
                </summary>
                <div className="cart-panel">
                    {cart.length === 0 ? <p>سبد خرید خالی است.</p> : cart.map(line => {
                        const product = products.find(item => item.id === line.productId)
                        if (!product) return null

                        return (
                            <div className="cart-row" key={line.productId}>
                                <span>{product.name} × {formatPrice(line.quantity)}</span>
                                <button type="button" onClick={() => onRemove(line.productId)}>حذف</button>
                            </div>
                        )
                    })}
                    <p className="cart-total">جمع: {formatPrice(total)} تومان</p>
                </div>
            </details>
            <button className="clear-cart" type="button" onClick={onClear} disabled={count === 0}>
                خالی‌کردن
            </button>
        </div>
    )
}
