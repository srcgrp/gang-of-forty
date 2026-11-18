import type { Category } from "../types"

type CategoryNavProps = {
  categories: Category[]
  onPick: (id: number) => void
  activeId: number | null
}

export default function CategoryNav({categories, onPick, activeId}: CategoryNavProps) {
    return (
        <nav className="navbar" aria-label="منوی اصلی">
            <ul>
                <li className="all-categories">
                <a href="#">همه دسته‌ها</a>
                <ul className="mega-menu">
                    {categories.map((category) => 
                        <li key={category.id} >
                            <a href={`#${category.slug}`}  onClick={() => onPick(category.id)} aria-current={category.id === activeId ? "true" : undefined}>{category.name}</a>
                        </li>
                    )}
                </ul>
                </li>
                <li><a href="#special-products">پیشنهاد ویژه</a></li>
                <li><a href="#">میوه و سبزی</a></li>
                <li><a href="#dairy">لبنیات</a></li>
                <li><a href="#">نان تازه</a></li>
                <li><a href="#">تماس با ما</a></li>
            </ul>
        </nav>
    )
}