import type { Category } from '../shared/types'

type CategoryGridProps = {
    categories: Category[]
    onPick: (id: number) => void
}

export default function CategoryGrid({ categories, onPick }: CategoryGridProps) {
    return (
        <section className="categories" id="categories" aria-labelledby="categories-title">
            <h2 id="categories-title">دسته‌بندی‌ها</h2>
            <div className="category-grid" id="category-grid">
                {categories.map(category => (
                    <a href="#category-products" key={category.id} onClick={() => onPick(category.id)}>
                        <span style={{ background: category.color }} aria-hidden="true">{category.emoji}</span>
                        <strong>{category.name}</strong>
                    </a>
                ))}
            </div>
        </section>
    )
}
