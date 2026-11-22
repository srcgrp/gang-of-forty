import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
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

    const handleClear = async () => {
        if (!count) return
        const result = await Swal.fire({
            title: "سبد خرید خالی شود؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "بله، خالی شود",
            cancelButtonText: "انصراف",
            focusCancel: true
        })
        if (result.isConfirmed) onClear()
    }

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
            <button className="clear-cart" type="button" onClick={handleClear} disabled={count === 0}>
                خالی‌کردن
            </button>
        </div>
    )
}
