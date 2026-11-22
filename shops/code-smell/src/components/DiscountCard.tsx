import { useEffect } from "react"
import { Fireworks } from "fireworks-js"

export default function DiscountCard() {
    const giftAmount = 100000
    const minimumOrderAmount = 400000
    useEffect(function () {
        const details = document.querySelector<HTMLDetailsElement>("#discount-details")
        const layer = document.querySelector<HTMLDivElement>("#discount-fireworks")
        if (details && layer) {
            let fireworks: Fireworks | undefined
            let timer: number | undefined
            const stopFireworks = function (): void {
                window.clearTimeout(timer)
                fireworks?.stop(true)
                fireworks = undefined
                layer.replaceChildren()
            }
            const showFireworks = function (): void {
                stopFireworks()
                if (details.open) {
                    fireworks = new Fireworks(layer, { particles: 30 })
                    fireworks.start()
                    timer = window.setTimeout(stopFireworks, 2500)
                }
            }
            details.addEventListener("toggle", showFireworks)
            return function () {
                details.removeEventListener("toggle", showFireworks)
                stopFireworks()
            }
        }
    }, [])
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
            <details id="discount-details">
                <summary className="button button--primary">
                    دریافت کد تخفیف
                </summary>
                <p className="promo-card__code" id="first-order-discount">
                    کد تخفیف:{" "}<code dir="ltr">SMELL100</code>
                </p>
            </details>
            <img
                className="promo-card__art"
                src="images/Gift%20Box.webp"
                alt=""
                aria-hidden="true"
            />
            <div className="offer-fireworks" id="discount-fireworks" aria-hidden="true" />
        </article>
    )
}