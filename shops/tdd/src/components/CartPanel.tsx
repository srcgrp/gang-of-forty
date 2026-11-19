import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { useEffect } from 'react'
import type { Product, Offer } from '../shared/types'
import { useCartStore } from '../hooks/useCartStore'
import { cartCount, cartTotal } from '../features/cart/cart'

type CartPanelProps = {
    products: Product[]
    offers: Offer[]
}

const pageTitle = document.title

export default function CartPanel({ products, offers }: CartPanelProps) {
    const cart = useCartStore(s => s.lines)
    const count = useCartStore(s => cartCount(s.lines))
    const remove = useCartStore(s => s.remove)
    const clear = useCartStore(s => s.clear)
    const total = cartTotal(cart, products, offers)
    const formatPrice = (value: number) => value.toLocaleString('fa-IR')

    useEffect(() => {
        document.title = count ? `(${count}) ${pageTitle}` : pageTitle
    }, [count])

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
        if (result.isConfirmed) clear()
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
                                <button type="button" onClick={() => remove(line.productId)}>حذف</button>
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
