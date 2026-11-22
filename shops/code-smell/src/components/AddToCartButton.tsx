import type { Product } from "../types"

type AddToCartButtonProps = {
    product: Product
    inStock: boolean
    onAdd: (id: number) => void
}

export default function AddToCartButton({
    product,
    inStock,
    onAdd
}: AddToCartButtonProps) {
    const buttonText = inStock ? "افزودن به سبد خرید" : "ناموجود"

    return (
        <button
            className="button button--secondary button--block"
            type="button"
            disabled={!inStock}
            aria-label={product.name + ":" + " " + buttonText}
            onClick={function () {
                onAdd(product.id)
            }}
        >
            <span aria-hidden="true">+</span>
            <span>{buttonText}</span>
        </button>
    )
}