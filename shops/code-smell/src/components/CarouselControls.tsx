import type { MouseEvent } from "react"

type CarouselControlsProps = {
    title: string
}

function scrollCarousel(
    event: MouseEvent<HTMLAnchorElement>,
    direction: string
): void {
    event.preventDefault()
    const edge = direction === "start" ? "first-child" : "last-child"
    const target = event.currentTarget.closest("section")
        ?.querySelector<HTMLLIElement>(".product-grid > li:" + edge)

    if (target) {
        target.scrollIntoView({ block: "nearest", inline: "start" })
    }
}

export default function CarouselControls({ title }: CarouselControlsProps) {
    return (
        <nav
            className="carousel-controls"
            aria-label={"کنترل کاروسل" + " " + title}
        >
            {["start", "end"].map(function (direction) {
                const label = (direction === "start" ? "ابتدای" : "انتهای") +
                    " " + "کاروسل" + " " + title
                const arrow = direction === "start" ? "right" : "left"

                return (
                    <a
                        href="#products"
                        key={direction}
                        aria-label={label}
                        title={label}
                        onClick={function (event: MouseEvent<HTMLAnchorElement>) {
                            scrollCarousel(event, direction)
                        }}
                    >
                        <img
                            className="carousel-arrow"
                            src={"svg/caret-" + arrow + ".svg"}
                            alt=""
                            width={13}
                            height={13}
                            aria-hidden="true"
                        />
                    </a>
                )
            })}
        </nav>
    )
}