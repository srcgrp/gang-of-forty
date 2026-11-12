import type { Category, HomePromo } from '../shared/types'

type PromoGridProps = {
    promos: HomePromo[]
    categories: Category[]
    onPick: (id: number) => void
}

export default function PromoGrid({ promos, categories, onPick }: PromoGridProps) {
    return (
        <div id="home-promos" className="promo-grid" aria-label="پیشنهادهای منتخب">
            {promos.map((promo, index) => {
                const category = categories.find(item => promo.href === `#${item.slug}`)

                return (
                    <article className={index % 2 === 0 ? 'promo promo-primary' : 'promo promo-secondary'} key={promo.href}>
                        <div>
                            <h2>{promo.text}</h2>
                            <a
                                href={category ? '#category-products' : promo.href}
                                onClick={category ? () => onPick(category.id) : undefined}
                            >
                                مشاهده محصولات
                            </a>
                        </div>
                        <span style={{ background: promo.color }} aria-hidden="true">{promo.emoji}</span>
                    </article>
                )
            })}
        </div>
    )
}
