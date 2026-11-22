import type { Category, HomeBanner } from '../shared/types'
import sideImage from '../../labaniat.jpg'

type SideBannerProps = {
    data: HomeBanner
    categories: Category[]
    onPick: (id: number) => void
}

export default function SideBanner({ data, categories, onPick }: SideBannerProps) {
    const category = categories.find(item => data.cta.href === `#${item.slug}`)

    return (
        <section className="story" id="home-side" aria-label="پیشنهاد فروشگاه">
            <div className="story-image">
                <img src={sideImage} alt={data.emoji} />
                <span>{data.title}</span>
            </div>
            <div>
                <h2>{data.title}</h2>
                <p>{data.text}</p>
                <a
                    href={category ? '#category-products' : data.cta.href}
                    onClick={category ? () => onPick(category.id) : undefined}
                >
                    {data.cta.label}
                </a>
            </div>
        </section>
    )
}
