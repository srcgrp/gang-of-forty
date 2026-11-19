import { Link } from '@tanstack/react-router'
import type { Category } from '../types'

export default function CategoryNav({ categories }: { categories: Category[] }) {
  return <nav className="categories" aria-label="دسته‌بندی محصولات">
    <h2>دسته‌بندی محصولات</h2>
    <div className="category-list">
      {categories.map((category) => <Link key={category.id} className="category-card"
        to="/plp/$carouselId" search={{ sort: 'default' }} params={{ carouselId: category.slug }}>
        <span className="category-icon">{category.emoji}</span><span>{category.name}</span>
      </Link>)}
    </div>
  </nav>
}
