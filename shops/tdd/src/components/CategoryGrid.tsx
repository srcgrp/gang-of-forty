import type { Category } from '../shared/types'
import { Link } from '@tanstack/react-router'

type CategoryGridProps = {
    categories: Category[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
    return (
        <section className="categories" id="categories" aria-labelledby="categories-title">
            <h2 id="categories-title">دسته‌بندی‌ها</h2>
            <div className="category-grid" id="category-grid">
                {categories.map(category => (
                    <Link to="/plp/$carouselId" params={{ carouselId: category.slug }} key={category.id}>
                        <span style={{ background: category.color }} aria-hidden="true">{category.emoji}</span>
                        <strong>{category.name}</strong>
                    </Link>
                ))}
            </div>
        </section>
    )
}
