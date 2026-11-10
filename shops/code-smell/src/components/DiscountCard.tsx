export default function DiscountCard() {
    const giftAmount = 100000
    const minimumOrderAmount = 400000

    return (
        <article className="promo-card promo-card--dark">
            <span className="promo-card__eyebrow">ویژه خرید اول</span>
            <h3 className="promo-card__title">
                {giftAmount.toLocaleString("fa-IR")}{" "}تومان هدیه
            </h3>
            <p className="promo-card__text">
                برای اولین سفارش بالای{" "}
                {minimumOrderAmount.toLocaleString("fa-IR")}{" "}
                تومان، این کد را هنگام پرداخت وارد کنید.
            </p>
            <button
                className="button button--primary"
                type="button"
                aria-controls="first-order-discount"
                aria-expanded="false"
            >
                دریافت کد تخفیف
            </button>
            <p
                className="promo-card__code"
                id="first-order-discount"
                hidden
            >
                کد تخفیف:{" "}
                <code dir="ltr">SMELL100</code>
            </p>
            <img
                className="promo-card__art"
                src="images/Gift%20Box.webp"
                alt=""
                aria-hidden="true"
            />
        </article>
    )
}