export type CartButtonProps = {
    count: number
    cartOpen: boolean
    onToggle: () => void
}

export default function CartButton({
    count,
    cartOpen,
    onToggle
}: CartButtonProps) {
    const countText = count.toLocaleString("fa-IR")

    return (
        <button
            className="cart-button"
            id="cart-button"
            type="button"
            aria-controls="cart"
            aria-expanded={cartOpen}
            aria-label={"سبد خرید:" + " " + countText + " " + "کالا"}
            onClick={onToggle}
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