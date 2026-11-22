import type { Category, Link } from "../types"
import CategoryMenu from "./CategoryMenu"

type CategoryNavProps = {
    categories: Category[]
    menu: Link[]
    categoryId: number | null
    onPick: (id: number | null) => void
    isMobile?: boolean
}

export default function CategoryNav({
    categories,
    menu,
    categoryId,
    onPick,
    isMobile = false
}: CategoryNavProps) {
    return (
        <nav
            className={isMobile ? "mobile-nav" : "site-nav"}
            aria-label={isMobile ? "منوی اصلی موبایل" : "منوی اصلی"}
        >
            <ul className="site-nav__list container">
                <CategoryMenu
                    categories={categories}
                    categoryId={categoryId}
                    onPick={onPick}
                    isMobile={isMobile}
                />
                {menu.map(function (entry) {
                    return (
                        <li key={entry.href}>
                            <a className="site-nav__link" href={entry.href}>
                                {entry.label}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}