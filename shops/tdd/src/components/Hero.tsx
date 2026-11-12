import heroImage from '../../1.jpg'

export default function Hero() {
    return (
        <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
                <p className="eyebrow"><span></span> تازگی، از ارزیابی تا انتخاب</p>
                <h1 id="hero-title">اول بررسی، بعد راهی سبد تو.</h1>
                <p>برای انتخاب محصولات روزمره، تازگی و کیفیت را با دقت بیشتری بررسی کن و بعد خریدت را به سبد بسپار.</p>
                <div className="hero-actions">
                    <a className="hero-primary-action" href="#categories">مشاهده دسته‌بندی‌ها</a>
                    <a className="hero-secondary-action" href="#about">داستان سام مارکت</a>
                </div>
                <ul className="hero-benefits">
                    <li>قیمت‌های روشن</li>
                    <li>انتخاب روز</li>
                    <li>سبد به‌صرفه</li>
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
                    <span className="orbit-red">معیار</span>
                    <span className="orbit-green">انتخاب</span>
                    <span className="orbit-blue">بهبود</span>
                </div>
            </div>
        </section>
    )
}
