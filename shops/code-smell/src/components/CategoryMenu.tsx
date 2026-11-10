import type { Category } from "../types"

type CategoryMenuProps = {
    categories: Category[]
    isMobile?: boolean
}

export default function CategoryMenu({
    categories,
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
                    <li key={category.id}>
                        <a className="menu-link" href={"#" + category.slug}>
                            <span
                                className="menu-link__icon category-visual"
                                style={{ backgroundColor: category.color }}
                                aria-hidden="true"
                            >
                                <span className="category-icon__emoji">
                                    {category.emoji}
                                </span>
                            </span>
                            {category.name}
                        </a>
                    </li>
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