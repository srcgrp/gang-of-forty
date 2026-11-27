import type { Category, ShopLink } from '../shared/types'

type CategoryNavProps = {
    categories: Category[]
    shopLinks: ShopLink[]
    activeCategoryId: number | null
    onPick: (categoryId: number) => void
}

export default function CategoryNav({ categories, shopLinks, activeCategoryId, onPick }: CategoryNavProps) {
    const renderShopLink = (link: ShopLink) => {
        const category = categories.find(item => link.href === `#${item.slug}`)

        return (
            <a
                href={category ? '#category-products' : link.href}
                key={link.href}
                onClick={category ? () => onPick(category.id) : undefined}
            >
                {link.label}
            </a>
        )
    }

    return (
        <>
            <nav className="primary-navigation desktop-navigation" aria-label="منوی اصلی">
                {shopLinks.map(renderShopLink)}
                <div className="category-menu">
                    <a className="category-trigger" href="#categories">دسته‌بندی‌ها <span aria-hidden="true">⌄</span></a>
                    <div className="category-dropdown" id="desktop-categories">
                        {categories.map(category => (
                            <a
                                key={category.id}
                                href="#category-products"
                                className={activeCategoryId === category.id ? 'is-active' : undefined}
                                aria-current={activeCategoryId === category.id ? 'true' : undefined}
                                onClick={() => onPick(category.id)}
                            >
                                <span aria-hidden="true">{category.emoji}</span>{category.name}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
            <details className="mobile-menu">
                <summary><span aria-hidden="true">☰</span> منوی فروشگاه</summary>
                <nav className="mobile-navigation" aria-label="منوی اصلی موبایل">
                    {shopLinks.map(renderShopLink)}
                    <details className="mobile-categories">
                        <summary>دسته‌بندی محصولات</summary>
                        <div className="mobile-category-links" id="mobile-categories">
                            {categories.map(category => (
                                <a
                                    key={category.id}
                                    href="#category-products"
                                    className={activeCategoryId === category.id ? 'is-active' : undefined}
                                    aria-current={activeCategoryId === category.id ? 'true' : undefined}
                                    onClick={() => onPick(category.id)}
                                >
                                    <span aria-hidden="true">{category.emoji}</span>{category.name}
                                </a>
                            ))}
                        </div>
                    </details>
                </nav>
            </details>
        </>
    )
}
