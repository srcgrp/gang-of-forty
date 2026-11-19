import { Link } from "@tanstack/react-router"
import type { Category } from "../types"

type CategoryListProps = {
  categories: Category[]
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <section className="categories">
      <h2>دسته بندی ها</h2>
      <ul>
        {categories.map((category) => (
          <li className="category-item" key={category.id}>
            <Link to="/plp/$carouselId" params={{ carouselId: category.slug }}>
              <span className="category-icon" aria-hidden="true">{category.emoji}</span>
              <h3>{category.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}