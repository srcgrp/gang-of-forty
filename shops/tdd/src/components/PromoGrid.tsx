import type { Category, HomePromo } from '../shared/types'
import { Link } from '@tanstack/react-router'

type PromoGridProps = {
    promos: HomePromo[]
    categories: Category[]
}

export default function PromoGrid({ promos, categories }: PromoGridProps) {
    return (
        <div id="home-promos" className="promo-grid" aria-label="پیشنهادهای منتخب">
            {promos.map((promo, index) => {
                const category = categories.find(item => promo.href === `#${item.slug}`)

                return (
                    <article className={index % 2 === 0 ? 'promo promo-primary' : 'promo promo-secondary'} key={promo.href}>
                        <div>
                            <h2>{promo.text}</h2>
                            {category ? <Link to="/plp/$carouselId" params={{ carouselId: category.slug }} search={{ sort: 'default' }}>مشاهده محصولات</Link>
                                : <a href={promo.href}>مشاهده محصولات</a>}
                        </div>
                        <span style={{ background: promo.color }} aria-hidden="true">{promo.emoji}</span>
                    </article>
                )
            })}
        </div>
    )
}
