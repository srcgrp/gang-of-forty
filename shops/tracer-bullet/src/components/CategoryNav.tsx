import type { Category } from "../types.ts";

type CategoryNavProps = {
  categories: Category[];
};

export default function CategoryNav({ categories }: CategoryNavProps) {
  return (
    <section id="categories" aria-labelledby="categories-title">
      <h2 id="categories-title">دسته‌بندی‌ها</h2>
      <ul className="category-list">
        {categories.map((c) => (
          <li key={c.id}>
            <a href={`#${c.slug}`}>
              <span aria-hidden="true" style={{ background: c.color }}>
                {c.emoji}
              </span>{" "}
              {c.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
