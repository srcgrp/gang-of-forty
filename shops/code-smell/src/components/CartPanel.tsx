import Price from "./Price"

export default function CartPanel() {
    return (
        <section
            className="section"
            id="cart"
            aria-labelledby="cart-title"
        >
            <div className="container">
                <header className="section__header">
                    <h2 className="section__title" id="cart-title">
                        سبد خرید
                    </h2>
                </header>
                <p>سبد خرید شما خالی است.</p>
                <p>
                    <strong>جمع سبد خرید:</strong>
                </p>
                <Price amount={0} />
            </div>
        </section>
    )
}