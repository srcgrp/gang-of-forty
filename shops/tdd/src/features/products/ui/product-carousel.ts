import type { Product, Offer } from '../../../shared/types'
import { createProductCard } from './product-card'

type CarouselElements = {
    prefix: string
    track: HTMLElement
    controls: HTMLElement
    status: HTMLParagraphElement
}

function showStatus(carousel: CarouselElements, message: string, isError: boolean = false): void {
    carousel.status.textContent = message
    carousel.status.classList.toggle("is-error", isError)
}
export function renderProducts(carousel: CarouselElements, products: Product[], unavailableByProduct: Map<number, boolean>, offers: Map<number, Offer>, finalPrices: Map<number, number>, onAdd: () => void): void {
    carousel.track.replaceChildren()
    carousel.controls.hidden = true

    if (products.length === 0) {
        showStatus(carousel, "محصولی برای نمایش وجود ندارد.")
    } else {
        products.forEach((product, index) => {
            let cardId = `${carousel.prefix}-product-${product.id}`
            if (index === 0) {
                cardId = `${carousel.prefix}-first`
            } else if (index === products.length - 1) {
                cardId = `${carousel.prefix}-last`
            }

            const isUnavailable = unavailableByProduct.get(product.id) ?? false
            const offer = offers.get(product.id)
            const finalPrice = finalPrices.get(product.id) ?? product.price
            carousel.track.append(createProductCard(product, cardId, isUnavailable, offer, finalPrice, onAdd))
        })

        const firstLink = carousel.controls.querySelector<HTMLAnchorElement>("a:first-child")
        const lastLink = carousel.controls.querySelector<HTMLAnchorElement>("a:last-child")
        if (!firstLink || !lastLink) throw new Error("Missing carousel links")

        firstLink.href = `#${carousel.prefix}-first`
        lastLink.href = products.length === 1
            ? `#${carousel.prefix}-first`
            : `#${carousel.prefix}-last`

        showStatus(carousel, "")
        carousel.controls.hidden = false
    }
}
