import { useEffect } from "react"
import type { Product } from "../types"
import { cartCount } from "../cart/cartRules"
import { useCartStore } from "../hooks/useCartStore"

type CartButtonProps = {
    products: Product[]
}

export default function CartButton({ products }: CartButtonProps) {
    const count = useCartStore((store) => cartCount(store.cart, products))
    const cartOpen = useCartStore((store) => store.cartOpen)
    const toggle = useCartStore((store) => store.toggle)
    const countText = count.toLocaleString("fa-IR")

    useEffect(function () {
        document.title = "بوی کد | سبد خرید: " + countText + " کالا"
    }, [countText])

    return (
        <button
            className="cart-button"
            id="cart-button"
            type="button"
            aria-controls="cart"
            aria-expanded={cartOpen}
            aria-label={"سبد خرید: " + countText + " کالا"}
            onClick={toggle}
        >
            <img
                className="cart-button__icon"
                src="svg/shopping-cart.svg"
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
            />
            <span className="cart-button__label">سبد خرید</span>
            <span className="cart-button__badge">{countText}</span>
        </button>
    )
}
