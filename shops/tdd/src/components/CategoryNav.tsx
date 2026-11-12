import type { Category } from '../shared/types'

type CategoryNavProps = {
    categories: Category[]
    activeCategoryId: number | null
    onPick: (categoryId: number) => void
}

export default function CategoryNav({ categories, activeCategoryId, onPick }: CategoryNavProps) {
    return (
        <>
            <nav className="primary-navigation desktop-navigation" aria-label="منوی اصلی">
                <div className="category-menu">
                    <a className="category-trigger" href="#categories">
                        دسته‌بندی‌ها <span aria-hidden="true">⌄</span>
                    </a>
                    <div className="category-dropdown" id="desktop-categories">
                        {categories.map(category => (
                            <a
                                key={category.id}
                                href={`#${category.slug}`}
                                className={activeCategoryId === category.id ? 'is-active' : undefined}
                                aria-current={activeCategoryId === category.id ? 'true' : undefined}
                                onClick={() => onPick(category.id)}
                            >
                                <span aria-hidden="true">{category.emoji}</span>
                                {category.name}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            <details className="mobile-menu">
                <summary><span aria-hidden="true">☰</span> منوی فروشگاه</summary>
                <nav className="mobile-navigation" aria-label="منوی اصلی موبایل">
                    <details className="mobile-categories">
                        <summary>دسته‌بندی محصولات</summary>
                        <div className="mobile-category-links" id="mobile-categories">
                            {categories.map(category => (
                                <a
                                    key={category.id}
                                    href={`#${category.slug}`}
                                    className={activeCategoryId === category.id ? 'is-active' : undefined}
                                    aria-current={activeCategoryId === category.id ? 'true' : undefined}
                                    onClick={() => onPick(category.id)}
                                >
                                    <span aria-hidden="true">{category.emoji}</span>
                                    {category.name}
                                </a>
                            ))}
                        </div>
                    </details>
                </nav>
            </details>
        </>
    )
}
