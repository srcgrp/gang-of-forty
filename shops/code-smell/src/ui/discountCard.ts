import { Fireworks } from "fireworks-js"

function showOfferFireworks(card: HTMLElement): void {
    const layer = document.createElement("div")
    layer.className = "offer-fireworks"
    layer.setAttribute("aria-hidden", "true")
    card.append(layer)
    const fireworks = new Fireworks(layer, { particles: 30 })
    fireworks.start()

    window.setTimeout(function () {
        fireworks.stop(true)
        layer.remove()
    }, 2500)
}

export function createDiscountCard(): HTMLElement {
    const numberFormat = new Intl.NumberFormat("fa-IR")
    const card = document.createElement("article")
    card.className = "promo-card promo-card--dark"
    const label = document.createElement("span")
    label.className = "promo-card__eyebrow"
    label.textContent = "ویژه خرید اول"

    const heading = document.createElement("h3")
    heading.className = "promo-card__title"
    heading.textContent = numberFormat.format(100000) + " " + "تومان هدیه"
    const description = document.createElement("p")
    description.className = "promo-card__text"
    description.textContent =
        "برای اولین سفارش بالای" + " " +
        numberFormat.format(400000) + " " +
        "تومان، این کد را هنگام پرداخت وارد کنید."

    const button = document.createElement("button")
    button.className = "button button--primary"
    button.type = "button"
    button.textContent = "دریافت کد تخفیف"
    const discountCode = document.createElement("p")
    discountCode.className = "promo-card__code"
    discountCode.id = "first-order-discount"
    discountCode.hidden = true

    const codeValue = document.createElement("code")
    codeValue.textContent = "SMELL100"
    codeValue.dir = "ltr"
    discountCode.append("کد تخفیف:" + " ", codeValue)
    button.setAttribute("aria-controls", discountCode.id)
    button.setAttribute("aria-expanded", "false")
    button.addEventListener("click", function () {
        discountCode.hidden = false
        button.setAttribute("aria-expanded", "true")
        showOfferFireworks(card)
    })

    const image = document.createElement("img")
    image.className = "promo-card__art"
    image.src = "images/Gift%20Box.webp"
    image.alt = ""
    image.setAttribute("aria-hidden", "true")
    card.append(label, heading, description, button, discountCode, image)
    return card
}