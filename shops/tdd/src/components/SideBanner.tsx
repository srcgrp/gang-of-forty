import type { Category, HomeBanner } from '../shared/types'
import { Link } from '@tanstack/react-router'
import sideImage from '../../labaniat.jpg'

type SideBannerProps = {
    data: HomeBanner
    categories: Category[]
}

export default function SideBanner({ data, categories }: SideBannerProps) {
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
                {category ? <Link to="/plp/$carouselId" params={{ carouselId: category.slug }} search={{ sort: 'default' }}>{data.cta.label}</Link>
                    : <a href={data.cta.href}>{data.cta.label}</a>}
            </div>
        </section>
    )
}
