import type { Category, ShopLink } from '../shared/types'
import { Link } from '@tanstack/react-router'

type CategoryNavProps = {
    categories: Category[]
    shopLinks: ShopLink[]
    activeCategoryId: number | null
}

export default function CategoryNav({ categories, shopLinks, activeCategoryId }: CategoryNavProps) {
    const renderShopLink = (link: ShopLink) => {
        const category = categories.find(item => link.href === `#${item.slug}`)

        if (category) return <Link to="/plp/$carouselId" params={{ carouselId: category.slug }} search={{ sort: 'default' }} key={link.href}>{link.label}</Link>
        return link.href.startsWith('#')
            ? <Link to="/" hash={link.href.slice(1)} key={link.href}>{link.label}</Link>
            : <a href={link.href} key={link.href}>{link.label}</a>
    }

    return (
        <>
            <nav className="primary-navigation desktop-navigation" aria-label="منوی اصلی">
                {shopLinks.map(renderShopLink)}
                <div className="category-menu">
                    <Link className="category-trigger" to="/" hash="categories">دسته‌بندی‌ها <span aria-hidden="true">⌄</span></Link>
                    <div className="category-dropdown" id="desktop-categories">
                        {categories.map(category => (
                            <Link
                                key={category.id}
                                to="/plp/$carouselId" params={{ carouselId: category.slug }} search={{ sort: 'default' }}
                                className={activeCategoryId === category.id ? 'is-active' : undefined}
                                aria-current={activeCategoryId === category.id ? 'true' : undefined}
                            >
                                <span aria-hidden="true">{category.emoji}</span>{category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
            <details className="mobile-menu">
                <summary aria-label="منوی فروشگاه"><span aria-hidden="true">☰</span> منو</summary>
                <nav className="mobile-navigation" aria-label="منوی اصلی موبایل">
                    {shopLinks.map(renderShopLink)}
                    <details className="mobile-categories">
                        <summary>دسته‌بندی محصولات</summary>
                        <div className="mobile-category-links" id="mobile-categories">
                            {categories.map(category => (
                                <Link
                                    key={category.id}
                                    to="/plp/$carouselId" params={{ carouselId: category.slug }} search={{ sort: 'default' }}
                                    className={activeCategoryId === category.id ? 'is-active' : undefined}
                                    aria-current={activeCategoryId === category.id ? 'true' : undefined}
                                >
                                    <span aria-hidden="true">{category.emoji}</span>{category.name}
                                </Link>
                            ))}
                        </div>
                    </details>
                </nav>
            </details>
        </>
    )
}
