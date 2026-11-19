import SectionLink from "./SectionLink"
import type { Category, Link } from "../types"
import CategoryMenu from "./CategoryMenu"

type CategoryNavProps = {
    categories: Category[]
    menu: Link[]
    categoryId: number | null
    onPick: (id: number | null) => void
    onQuery: (value: string) => void
    isMobile?: boolean
}

export default function CategoryNav({
    categories,
    menu,
    categoryId,
    onPick,
    onQuery,
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
                    const isOffers = entry.href === "#offers"
                    const category = categories.find(function (item) {
                        return entry.href === "#" + item.slug
                    })
                    const showsProducts = isOffers || category !== undefined

                    function selectProducts(): void {
                        if (isOffers) {
                            onPick(null)
                            onQuery("")
                        } else if (category) {
                            onPick(category.id)
                        }
                    }

                    return (
                        <li key={entry.href}>
                            <SectionLink
                                className="site-nav__link"
                                href={category ? "#products" : entry.href}
                                onClick={showsProducts ? selectProducts : undefined}
                            >
                                {entry.label}
                            </SectionLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}