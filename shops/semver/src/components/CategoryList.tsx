import type { Category } from "../types";

export default function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <>
      <h2 id="categories" className="section-title">
        دسته‌بندی‌ها
      </h2>
      <article className="flex-item-categories">
        {categories.map((category) => (
          <a
            className="item"
            href={`#${category.slug}`}
            aria-label={`رفتن به دسته ${category.name}`}
            key={category.id}
          >
            <span className="category-emoji">{category.emoji}</span>
            <p>{category.name}</p>
          </a>
        ))}
      </article>
    </>
  );
}
