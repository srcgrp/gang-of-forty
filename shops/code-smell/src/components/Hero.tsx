import type { Banner, Category, Shop } from "../types"

type HeroProps = {
    hero: Banner
    shop: Shop
    categories: Category[]
    onPick: (id: number | null) => void
}

export default function Hero({ hero, shop, categories, onPick }: HeroProps) {
    const category = categories.find(function (item) {
        return "#" + item.slug === hero.cta.href
    })

    return (
        <section className="hero" id="hero" aria-labelledby="hero-title">
            <div className="hero__inner container">
                <div className="hero__content">
                    <p className="hero__eyebrow">سوپرمارکت بوی کد</p>
                    <h1 className="hero__title" id="hero-title">
                        <span className="hero-title__emoji" aria-hidden="true">
                            {hero.emoji}
                        </span>{" "}
                        {hero.title}
                    </h1>
                    <p className="hero__text">{hero.text}</p>
                    <div className="hero__actions">
                        <a
                            className="button button--primary"
                            href={category ? "#products" : hero.cta.href}
                            onClick={function () {
                                onPick(category ? category.id : null)
                            }}
                        >
                            {hero.cta.label}
                        </a>
                        <a className="button button--secondary" href="#categories">
                            دسته‌بندی کالاها
                        </a>
                    </div>
                    <ul className="hero__features">
                        <li>{"ارسال در" + " " + shop.city}</li>
                        <li>
                            {"ساعت فعالیت:" + " " + shop.hours.open + " " +
                                "تا" + " " + shop.hours.close}
                        </li>
                        <li>
                            {"ارسال رایگان از" + " " +
                                shop.freeDeliveryOver.toLocaleString("fa-IR") +
                                " " + shop.currency}
                        </li>
                    </ul>
                </div>
                <div className="hero__image-wrap">
                    <img
                        className="hero__image"
                        src="images/Golden%20Tote.webp"
                        alt=""
                        width={320}
                        height={320}
                        aria-hidden="true"
                    />
                </div>
            </div>
        </section>
    )
}