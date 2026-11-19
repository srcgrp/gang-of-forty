import { Link } from "@tanstack/react-router"
import type { Category, Shop } from "../types"
import type { CatalogControls } from "../hooks/useCatalog"
import BrandLogo from "./BrandLogo"
import CategoryNav from "./CategoryNav"
import CartButton from "./CartButton"
import Announcement from "./Announcement"
import SearchBox from "./SearchBox"
import ThemeToggle from "./ThemeToggle"

type HeaderProps = {
    categories: Category[]
    shop: Shop
    catalogControls: CatalogControls
}

export default function Header({
    categories,
    shop,
    catalogControls
}: HeaderProps) {
    const { categoryId, onPick } = catalogControls
    const navigationProps = {
        categories,
        menu: shop.menu,
        categoryId,
        onPick,
        onQuery: catalogControls.onQuery
    }

    return (
        <header className="site-header">
            <Announcement notice={shop.notice} />
            <div className="site-header__bar container" id="header-bar">
                <Link className="brand" to="/" hash="top">
                    <BrandLogo />
                    <span className="brand__text" id="brand-text">
                        <strong className="brand__name">
                            سوپرمارکت بوی کد
                        </strong>
                        <span className="brand__tagline">{shop.slogan}</span>
                    </span>
                </Link>
                <SearchBox
                    query={catalogControls.query}
                    onQuery={catalogControls.onQuery}
                />
                <div className="header-actions">
                    <CartButton />
                    <ThemeToggle />
                </div>
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