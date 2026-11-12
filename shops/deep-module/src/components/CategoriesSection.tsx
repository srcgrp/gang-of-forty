import type { Category } from "../types";

export function CategoriesSection({ categories }: { categories: Category[] }) {
  return (
    <section id="categories" className="categories">
      <div className="categories__wrapper">
        <header className="section-head"><h2 className="section-head__title">دسته‌بندی‌ها</h2></header>
        <ul className="categories__grid">
          {categories.map((cat) => (
            <li key={cat.id}>
              <a href={`#cat-${cat.id}`} className="category-card">
                <span className="category-card__icon">{cat.emoji || "📦"}</span>
                <span className="category-card__title">{cat.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}