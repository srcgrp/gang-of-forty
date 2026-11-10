export default function Hero() {
    return (
        <section className="hero" id="hero" aria-labelledby="hero-title">
            <div className="hero__inner container">
                <div className="hero__content">
                    <p className="hero__eyebrow">سوپرمارکت بوی کد</p>
                    <h1 className="hero__title" id="hero-title">
                        <span className="hero-title__emoji" aria-hidden="true">
                            🛒
                        </span>{" "}
                        خرید روزانه، ساده و سریع
                    </h1>
                    <p className="hero__text">
                        کالاهای مورد نیازتان را انتخاب کنید و سبد خریدتان را بسازید.
                    </p>
                    <div className="hero__actions">
                        <a className="button button--primary" href="#products">
                            دیدن کالاها
                        </a>
                        <a className="button button--secondary" href="#categories">
                            دسته‌بندی کالاها
                        </a>
                    </div>
                    <ul className="hero__features">
                        <li>ارسال در شهر نمونه</li>
                        <li>ساعت فعالیت: ۸ تا ۲۲</li>
                        <li>ارسال رایگان از ۵۰۰ هزار تومان</li>
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