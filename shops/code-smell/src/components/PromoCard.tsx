import type { Home } from "../types"

type PromoCardProps = {
    promo: Home["promos"][number]
}

export default function PromoCard({ promo }: PromoCardProps) {
    return (
        <article
            className="promo-card promo-card--api"
            style={{ backgroundColor: promo.color }}
        >
            <h3 className="promo-card__title">{promo.text}</h3>
            <a className="button button--dark" href={promo.href}>
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