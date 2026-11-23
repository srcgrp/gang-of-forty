import type { Category, Shop } from "../types"
import type { CartButtonProps } from "./CartButton"
import type { SearchBoxProps } from "./SearchBox"
import BrandLogo from "./BrandLogo"
import CategoryNav from "./CategoryNav"
import CartButton from "./CartButton"
import Announcement from "./Announcement"
import SearchBox from "./SearchBox"

export type CatalogControls = SearchBoxProps & {
    categoryId: number | null
    onPick: (id: number | null) => void
}

type HeaderProps = {
    categories: Category[]
    shop: Shop
    catalogControls: CatalogControls
    cartControls: CartButtonProps
}

export default function Header({
    categories,
    shop,
    catalogControls,
    cartControls
}: HeaderProps) {
    const { categoryId, onPick } = catalogControls
    const navigationProps = { categories, menu: shop.menu, categoryId, onPick }

    return (
        <header className="site-header">
            <Announcement notice={shop.notice} />
            <div className="site-header__bar container" id="header-bar">
                <a className="brand" href="#top">
                    <BrandLogo />
                    <span className="brand__text" id="brand-text">
                        <strong className="brand__name">
                            سوپرمارکت بوی کد
                        </strong>
                        <span className="brand__tagline">{shop.slogan}</span>
                    </span>
                </a>
                <SearchBox
                    query={catalogControls.query}
                    onQuery={catalogControls.onQuery}
                />
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