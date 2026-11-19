import type { ProductCardData } from "../types"
import { useCartStore } from "../hooks/useCartStore"

type AddToCartButtonProps = {
    product: ProductCardData
    onAdd: (id: number) => void
}

export default function AddToCartButton({
    product,
    onAdd
}: AddToCartButtonProps) {
    const canAdd = useCartStore(function (store) {
        const quantity = store.cart[String(product.id)] ?? 0
        return quantity < product.stockQuantity
    })
    const buttonText = canAdd ? "افزودن به سبد خرید" : "ناموجود"

    return (
        <button
            className="button button--secondary button--block"
            type="button"
            disabled={!canAdd}
            aria-label={product.name + ": " + buttonText}
            onClick={function () {
                onAdd(product.id)
            }}
        >
            <span aria-hidden="true">+</span>
            <span>{buttonText}</span>
        </button>
    )
}