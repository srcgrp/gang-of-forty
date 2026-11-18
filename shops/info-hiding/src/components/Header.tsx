type HeaderProps = { count: string };
export default function Header({ count }: HeaderProps) {
    return (
<header className="header">
        <div className="header-content">
            <a className="brand" href="#top">
                <svg width="54" height="54" viewBox="0 0 64 64" role="img" aria-labelledby="logo-title">
                    <title id="logo-title">لوگوی سوپرمارکت یاسمن</title>
                    <circle cx="32" cy="32" r="30" fill="#e9f4ed" />
                    <rect x="14" y="27" width="36" height="24" rx="5" fill="#24583e" />
                    <rect x="21" y="17" width="22" height="18" rx="8" fill="none" stroke="#24583e" strokeWidth="4" />
                    <ellipse cx="31" cy="37" rx="5" ry="9" fill="#f4d77b" />
                    <ellipse cx="39" cy="33" rx="7" ry="4" fill="#f4d77b" />
                </svg>
                <span><strong>سوپرمارکت یاسمن</strong><small>تازگی، نزدیک خانهٔ شما</small></span>
            </a>

            <a className="cart" href="#cart-panel">سبد خرید <span>{count}</span></a>
        </div>
        <nav aria-label="منوی اصلی">
            <details className="mobile-menu">
                <summary>☰ منوی فروشگاه</summary>
                <div>
                    <a href="#offers">پیشنهاد ویژه امروز</a>
                    <a href="#dairy">لبنیات</a>
                    <a href="#fruit">میوه و سبزی</a>
                    <a href="#bakery">نان و صبحانه</a>
                    <a href="#drinks">نوشیدنی</a>
                    <a href="#pantry">مواد غذایی</a>
                    <a href="#about">دربارهٔ ما</a>
                </div>
            </details>
            <div className="desktop-menu">
                <div className="dropdown"><button type="button">همه دسته‌ها ▾</button>
                    <div className="dropdown-links">
                        <a href="#offers">پیشنهاد ویژه امروز</a>
                        <a href="#dairy">لبنیات</a>
                        <a href="#fruit">میوه و سبزی</a>
                        <a href="#bakery">نان و صبحانه</a>
                        <a href="#drinks">نوشیدنی</a>
                        <a href="#pantry">مواد غذایی</a>
                    </div>
                </div>
                <a href="#offers">پیشنهاد ویژه امروز</a><a href="#dairy">لبنیات</a><a
                    href="#categories">دسته‌بندی‌ها</a><a href="#about">دربارهٔ ما</a>
            </div>
        </nav>
    </header>
    );
}
