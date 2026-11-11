import type { Category } from "../types"

type CategoryMenuItemProps = {
    category: Category
    isActive: boolean
    onPick: (id: number) => void
}

export default function CategoryMenuItem({
    category,
    isActive,
    onPick
}: CategoryMenuItemProps) {
    return (
        <li>
            <a
                className="menu-link"
                href="#products"
                aria-current={isActive ? "true" : undefined}
                onClick={function () {
                    onPick(category.id)
                }}
            >
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
}