import type { Category, Link } from "../types"
import type { CartButtonProps } from "./CartButton"
import BrandLogo from "./BrandLogo"
import CategoryNav from "./CategoryNav"
import CartButton from "./CartButton"

type HeaderProps = {
    categories?: Category[]
    menu?: Link[]
    categoryId: number | null
    cartControls: CartButtonProps
    onPick: (id: number | null) => void
}

export default function Header({
    categories = [],
    menu = [],
    categoryId,
    cartControls,
    onPick
}: HeaderProps) {
    const navigationProps = { categories, menu, categoryId, onPick }

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
                <CartButton {...cartControls} />
                <details className="mobile-menu" id="mobile-menu">
                    <summary className="menu-toggle" aria-label="منوی اصلی">
                        ☰
                    </summary>
                    <CategoryNav {...navigationProps} isMobile />
                </details>
            </div>
            <CategoryNav {...navigationProps} />
        </header>
    )
}