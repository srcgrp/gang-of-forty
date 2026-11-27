import { Link } from "@tanstack/react-router";
import type { Categories } from "../types";

interface CategoryGridProps { categories: Categories }

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="categories anchor-section" id="categories" aria-labelledby="categories-title">
      <div className="categories__header">
        <h2 id="categories-title" className="categories__title">دسته‌بندی‌ها</h2>
        <a href="#products" className="categories__link">مشاهده همه</a>
      </div>
      <div className="categories__grid">
        {categories.map((category) => (
          <Link
            className="category-card"
            to="/plp/$carouselId"
            params={{ carouselId: category.slug }}
            search={{ sort: "default" }}
            key={category.id}
          >
            <span className="category-card__image" style={{ backgroundColor: category.color }}>{category.emoji}</span>
            <span className="category-card__title">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
