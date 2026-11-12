export default function CategoryNav() {
    return (
        <>
            <nav className="primary-navigation desktop-navigation" aria-label="منوی اصلی">
                <div className="category-menu">
                    <a className="category-trigger" href="#categories">
                        دسته‌بندی‌ها <span aria-hidden="true">⌄</span>
                    </a>
                    <div className="category-dropdown" id="desktop-categories"></div>
                </div>
            </nav>

            <details className="mobile-menu">
                <summary><span aria-hidden="true">☰</span> منوی فروشگاه</summary>
                <nav className="mobile-navigation" aria-label="منوی اصلی موبایل">
                    <details className="mobile-categories">
                        <summary>دسته‌بندی محصولات</summary>
                        <div className="mobile-category-links" id="mobile-categories"></div>
                    </details>
                </nav>
            </details>
        </>
    )
}
