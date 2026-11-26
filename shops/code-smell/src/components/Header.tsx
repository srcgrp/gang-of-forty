import { Link } from "@tanstack/react-router"
import type { MouseEvent } from "react"
import type { ShopData } from "../types"
import type { CatalogControls } from "../hooks/useCatalog"
import BrandLogo from "./BrandLogo"
import CategoryNav from "./CategoryNav"
import CartButton from "./CartButton"
import CartPanel from "./CartPanel"
import Announcement from "./Announcement"
import SearchBox from "./SearchBox"
import ThemeToggle from "./ThemeToggle"

type HeaderProps = {
    data: ShopData
    catalogControls: CatalogControls
}

function closeMobileMenu(event: MouseEvent<HTMLDetailsElement>): void {
    if (event.target instanceof Element && event.target.closest("a[href]")) {
        event.currentTarget.open = false
        event.currentTarget.querySelector("summary")?.focus({ preventScroll: true })
    }
}

export default function Header({ data, catalogControls }: HeaderProps) {
    const { categories, shop } = data
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
                <Link className="brand" to="/" hash="top" onClick={() => catalogControls.onQuery("")}>
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
                    <CartButton products={data.products} />
                    <ThemeToggle />
                </div>
                <details className="mobile-menu" id="mobile-menu" onClick={closeMobileMenu}>
                    <summary className="menu-toggle" aria-label="منوی اصلی">
                        ☰
                    </summary>
                    <CategoryNav {...navigationProps} isMobile />
                </details>
            </div>
            <CategoryNav {...navigationProps} />
            <CartPanel products={data.products} offers={data.offers} stock={data.stock.items} />
        </header>
    )
}