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
            <details>
                <summary className="button button--primary">
                    دریافت کد تخفیف
                </summary>
                <p
                    className="promo-card__code"
                    id="first-order-discount"
                >
                    کد تخفیف:{" "}
                    <code dir="ltr">SMELL100</code>
                </p>
            </details>
            <img
                className="promo-card__art"
                src="images/Gift%20Box.webp"
                alt=""
                aria-hidden="true"
            />
        </article>
    )
}