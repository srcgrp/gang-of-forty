import type { Category, HomeBanner } from '../shared/types'
import { Link } from '@tanstack/react-router'
import heroImage from '../../1.jpg'

type HeroProps = {
    data: HomeBanner
    categories: Category[]
}

export default function Hero({ data, categories }: HeroProps) {
    const category = categories.find(item => data.cta.href === `#${item.slug}`)

    return (
        <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
                <p className="eyebrow"><span></span> تازگی، از ارزیابی تا انتخاب</p>
                <h1 id="hero-title">{data.title}</h1>
                <p>{data.text}</p>
                <div className="hero-actions">
                    {category ? <Link className="hero-primary-action" to="/plp/$carouselId" params={{ carouselId: category.slug }} search={{ sort: 'default' }}>{data.cta.label}</Link>
                        : <a className="hero-primary-action" href={data.cta.href}>{data.cta.label}</a>}
                    <Link className="hero-secondary-action" to="/" hash="about">داستان سام مارکت</Link>
                </div>
                <ul className="hero-benefits">
                    <li>قیمت‌های روشن</li><li>انتخاب روز</li><li>سبد به‌صرفه</li>
                </ul>
            </div>
            <div className="hero-visual">
                <div className="hero-image-frame">
                    <img src={heroImage} alt="نارنگی‌های تازه و رسیده در سبد محصول" />
                </div>
                <p className="freshness-card">
                    <strong>انتخاب امروز سام</strong>
                    <span>تازه، خوش‌رنگ و آماده برای سبد تو</span>
                </p>
                <div className="tdd-orbit" aria-hidden="true">
                    <span className="orbit-red">معیار</span><span className="orbit-green">انتخاب</span><span className="orbit-blue">بهبود</span>
                </div>
            </div>
        </section>
    )
}
