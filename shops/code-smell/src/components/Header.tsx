import type { Category, Link } from "../types"
import BrandLogo from "./BrandLogo"
import CategoryNav from "./CategoryNav"

type HeaderProps = {
    categories?: Category[]
    menu?: Link[]
}

export default function Header({
    categories = [],
    menu = []
}: HeaderProps) {
    return (
        <header className="site-header">
            <p className="announcement" id="announcement">
                🚚 ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان
            </p>
            <div className="site-header__bar container" id="header-bar">
                <a className="brand" href="#top">
                    <BrandLogo />
                    <span className="brand__text" id="brand-text">
                        <strong className="brand__name">
                            سوپرمارکت بوی کد
                        </strong>
                    </span>
                </a>
                <div className="search" id="search-root" role="search">
                    <label className="sr-only" htmlFor="product-search">
                        جستجوی کالا
                    </label>
                    <img
                        className="search__icon"
                        src="svg/magnifying-glass.svg"
                        alt=""
                        width={18}
                        height={18}
                        aria-hidden="true"
                    />
                    <input
                        className="search__input"
                        id="product-search"
                        type="search"
                        placeholder="جستجوی کالا..."
                        disabled
                    />
                </div>
                <a className="cart-button" id="cart-button" href="#cart">
                    <img
                        className="cart-button__icon"
                        src="svg/shopping-cart.svg"
                        alt=""
                        width={20}
                        height={20}
                        aria-hidden="true"
                    />
                    <span className="cart-button__label">سبد خرید</span>
                    <span className="cart-button__badge">۰</span>
                </a>
                <details className="mobile-menu" id="mobile-menu">
                    <summary className="menu-toggle" aria-label="منوی اصلی">
                        ☰
                    </summary>
                    <CategoryNav categories={categories} menu={menu} isMobile />
                </details>
            </div>
            <CategoryNav categories={categories} menu={menu} />
        </header>
    )
}