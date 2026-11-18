import type { Category } from "../types"

type CategoryListProps = {
  categories: Category[]
  onSelect: (id: number) => void
}


export default function CategoryList({categories, onSelect}: CategoryListProps) {
    return (
        <section className="categories">
            <h2>دسته بندی ها</h2>
            <ul>
                {categories.map((category) => 
                    <li className="category-item" key={category.id}>
                        <a href={`#${category.slug}`}  onClick={() => onSelect(category.id)}>
                            <span className="category-icon" aria-hidden="true">{category.emoji}</span>
                            <h3>{category.name}</h3>
                        </a>
                    </li>
                )}
            </ul>
        </section>
        
    )
}