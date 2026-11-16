export function scrollCarousel(section: HTMLElement, direction: string): void {
    const cards = section.querySelectorAll<HTMLLIElement>(".product-grid > li")
    let target: HTMLLIElement | undefined

    if (direction === "start") {
        target = cards[0]
    } else {
        target = cards[cards.length - 1]
    }

    if (target) {
        target.scrollIntoView({
            block: "nearest",
            inline: "start"
        })

        target.focus({
            preventScroll: true
        })
    }
}
export function createCarouselControls(section: HTMLElement, title: string): HTMLElement {
    const controls = document.createElement("nav")
    controls.className = "carousel-controls"
    controls.setAttribute("aria-label", "کنترل کاروسل " + title)

    const directions = ["start", "end"]

    directions.forEach(function (direction) {
        const control = document.createElement("a")
        control.href = "#" + section.id + "-item-1"

        const positionLabel = direction === "start" ? "ابتدای" : "انتهای"
        const controlLabel = positionLabel + " " + "کاروسل" + " " + title

        control.setAttribute("aria-label", controlLabel)
        control.title = controlLabel

        const arrowDirection = direction === "start" ? "right" : "left"
        const carouselArrow = document.createElement("img")
        carouselArrow.className = "carousel-arrow"
        carouselArrow.src = "svg/caret-" + arrowDirection + ".svg"
        carouselArrow.alt = ""
        carouselArrow.width = 13
        carouselArrow.height = 13
        carouselArrow.setAttribute("aria-hidden", "true")

        control.append(carouselArrow)

        control.addEventListener("click", function (event: MouseEvent) {
            event.preventDefault()
            scrollCarousel(section, direction)
        })

        controls.append(control)
    })

    return controls
}