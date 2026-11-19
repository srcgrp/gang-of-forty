import { Link } from "@tanstack/react-router"
import type { Category } from "../types"

type CategoryNavProps = {
  categories: Category[]
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  return (
    <nav className="navbar" aria-label="منوی اصلی">
      <ul>
        <li className="all-categories">
          <Link to="/">همه دسته‌ها</Link>
          <ul className="mega-menu">
            {categories.map((category) => (
              <li key={category.id}>
                <Link to="/plp/$carouselId" params={{ carouselId: category.slug }}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li><Link to="/plp/$carouselId" params={{ carouselId: "offers" }}>پیشنهاد ویژه</Link></li>
        <li><Link to="/plp/$carouselId" params={{ carouselId: "fruits" }}>میوه و سبزی</Link></li>
        <li><Link to="/plp/$carouselId" params={{ carouselId: "dairy" }}>لبنیات</Link></li>
        <li><Link to="/plp/$carouselId" params={{ carouselId: "bakery" }}>نان تازه</Link></li>
        <li><a href="#">تماس با ما</a></li>
      </ul>
    </nav>
  )
}