import type { Category } from "../types"
import CategoryMenuItem from "./CategoryMenuItem"

type CategoryMenuProps = {
    categories: Category[]
    categoryId: number | null
    onPick: (id: number | null) => void
    isMobile?: boolean
}

export default function CategoryMenu({
    categories,
    categoryId,
    onPick,
    isMobile = false
}: CategoryMenuProps) {
    const title = (
        <>
            دسته‌بندی کالاها
            <img
                className="category-menu__chevron menu-chevron"
                src="svg/caret-left.svg"
                alt=""
                width={16}
                height={16}
                aria-hidden="true"
            />
        </>
    )

    const links = (
        <ul className={isMobile ? "mobile-categories" : "category-menu__list"}>
            {categories.map(function (category) {
                return (
                    <CategoryMenuItem
                        key={category.id}
                        category={category}
                        isActive={categoryId === category.id}
                        onPick={onPick}
                    />
                )
            })}
        </ul>
    )

    return (
        <li className="category-menu">
            {isMobile ? (
                <details className="mobile-category-menu">
                    <summary className="category-menu__toggle">{title}</summary>
                    {links}
                </details>
            ) : (
                <>
                    <a className="category-menu__toggle" href="#categories">
                        {title}
                    </a>
                    {links}
                </>
            )}
        </li>
    )
}