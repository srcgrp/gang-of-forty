import type { Category, Home } from "../types"

type PromoCardProps = {
    promo: Home["promos"][number]
    categories: Category[]
    onPick: (id: number | null) => void
}

export default function PromoCard({ promo, categories, onPick }: PromoCardProps) {
    const category = categories.find(function (item) {
        return "#" + item.slug === promo.href
    })

    return (
        <article
            className="promo-card promo-card--api"
            style={{ backgroundColor: promo.color }}
        >
            <h3 className="promo-card__title">{promo.text}</h3>
            <a
                className="button button--dark"
                href={category ? "#products" : promo.href}
                onClick={function () {
                    onPick(category ? category.id : null)
                }}
            >
                مشاهده کالاها
            </a>
            <span
                className="promo-card__art promo-card__emoji"
                aria-hidden="true"
            >
                {promo.emoji}
            </span>
        </article>
    )
}