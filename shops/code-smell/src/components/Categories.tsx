import type { Category } from "../types"

type CategoriesProps = {
    categories: Category[]
}

export default function Categories({ categories }: CategoriesProps) {
    return (
        <section
            className="section"
            id="categories"
            aria-labelledby="categories-title"
        >
            <div className="container">
                <header className="section__header">
                    <div className="category-heading">
                        <h2 className="section__title" id="categories-title">
                            دسته‌بندی کالاها
                        </h2>
                        <p className="section__subtitle">
                            برای خرید راحتتر، دسته بندی مورد نظرتان را انتخاب کنید.
                        </p>
                    </div>
                    <a
                        className="button button--secondary category-reset"
                        href="#categories"
                    >
                        مشاهده همه‌ی دسته‌ها
                    </a>
                </header>
                <ul className="category-grid">
                    {categories.map(function (category) {
                        return (
                            <li
                                key={category.id}
                                className="category-card"
                                id={"category-" + category.slug}
                            >
                                <a
                                    className="category-card__link"
                                    href={"#" + category.slug}
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
                    })}
                </ul>
            </div>
        </section>
    )
}