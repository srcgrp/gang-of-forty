import type { Category } from "../types"

type CategoryCardProps = {
    category: Category
    onPick: (id: number) => void
}

export default function CategoryCard({
    category,
    onPick
}: CategoryCardProps) {
    return (
        <li
            className="category-card"
            id={"category-" + category.slug}
        >
            <a
                className="category-card__link"
                href="#products"
                onClick={function () {
                    onPick(category.id)
                }}
            >
                <span
                    className="category-card__icon category-visual"
                    style={{ backgroundColor: category.color }}
                    aria-hidden="true"
                >
                    <span className="category-icon__emoji">
                        {category.emoji}
                    </span>
                </span>
                <h3 className="category-card__title">
                    {category.name}
                </h3>
                <p className="category-card__meta">
                    دیدن کالاها ←
                </p>
            </a>
        </li>
    )
}