import type { Category } from "../shared/types";

type Props = { categories: Category[] };

export default function CategoryNav({ categories }: Props) {
  return (
    <section id="categories" aria-labelledby="category-title">
      <div className="section-heading"><h2 id="category-title">از اینجا شروع کن</h2></div>
      <nav className="categories" aria-label="دسته‌بندی محصولات">
        {categories.map((category) => (
          <a key={category.id} className="category-tile" href={"#" + category.slug}>
            <span className="category-emoji" style={{ backgroundColor: category.color }} aria-hidden="true">
              {category.emoji}
            </span>
            <strong>{category.name}</strong>
          </a>
        ))}
      </nav>
    </section>
  );
}
