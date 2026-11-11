import type { Category } from "../types"
import CategoryCard from "./CategoryCard"

type CategoriesProps = {
    categories: Category[]
    onPick: (id: number | null) => void
}

export default function Categories({
    categories,
    onPick
}: CategoriesProps) {
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
                        onClick={function () {
                            onPick(null)
                        }}
                    >
                        مشاهده همه‌ی دسته‌ها
                    </a>
                </header>
                <ul className="category-grid">
                    {categories.map(function (category) {
                        return (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                onPick={onPick}
                            />
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}