import type { Home } from "../types"
import PromoCard from "./PromoCard"
import DiscountCard from "./DiscountCard"

const samplePromos: Home["promos"] = [
    {
        text: "پیشنهاد میوه‌های تازه",
        emoji: "🍎",
        color: "#fde3dc",
        href: "#fruits"
    },
    {
        text: "پیشنهاد لبنیات",
        emoji: "🥛",
        color: "#e2eefc",
        href: "#dairy"
    }
]

export default function Promos() {
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
                    {samplePromos.map(function (promo) {
                        return <PromoCard key={promo.href} promo={promo} />
                    })}
                    <DiscountCard />
                    <article className="hero-side promo-side">
                        <h3 className="hero-side__title">
                            <span className="hero-side__emoji" aria-hidden="true">
                                🥖
                            </span>
                            نان داغ، هر روز ساعت ۷
                        </h3>
                        <p className="hero-side__text">
                            انواع نان و شیرینی را در فروشگاه ببینید.
                        </p>
                        <a className="button button--primary" href="#products">
                            مشاهده کالاها
                        </a>
                    </article>
                </div>
            </div>
        </section>
    )
}