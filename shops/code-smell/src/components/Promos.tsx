import type { Category, Home } from "../types"
import PromoCard from "./PromoCard"
import DiscountCard from "./DiscountCard"

type PromosProps = {
    home: Home
    categories: Category[]
    onPick: (id: number | null) => void
}

export default function Promos({ home, categories, onPick }: PromosProps) {
    const sideCategory = categories.find(function (category) {
        return "#" + category.slug === home.side.cta.href
    })

    return (
        <section
            className="section section--flush-top"
            id="special-offers"
            aria-labelledby="special-offers-title"
        >
            <div className="container">
                <header className="section__header">
                    <h2 className="section__title" id="special-offers-title">
                        پیشنهاد ویژه
                    </h2>
                    <p className="section__subtitle">
                        فرصت‌های محدود این هفته را از دست ندهید.
                    </p>
                </header>
                <div className="promo-grid">
                    {home.promos.map(function (promo) {
                        return (
                            <PromoCard
                                key={promo.href}
                                promo={promo}
                                categories={categories}
                                onPick={onPick}
                            />
                        )
                    })}
                    <DiscountCard />
                    <article className="hero-side promo-side">
                        <h3 className="hero-side__title">
                            <span className="hero-side__emoji" aria-hidden="true">
                                {home.side.emoji}
                            </span>
                            {home.side.title}
                        </h3>
                        <p className="hero-side__text">{home.side.text}</p>
                        <a
                            className="button button--primary"
                            href={sideCategory ? "#products" : home.side.cta.href}
                            onClick={function () {
                                onPick(sideCategory ? sideCategory.id : null)
                            }}
                        >
                            {home.side.cta.label}
                        </a>
                    </article>
                </div>
            </div>
        </section>
    )
}