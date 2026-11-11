import type { Category } from "../types.ts";

type CategoryNavProps = {
  categories: Category[];
  selectedId: number | null;
  onPick: (id: number | null) => void;
};

export default function CategoryNav({categories, selectedId, onPick}: CategoryNavProps) {
  return (
    <section id="categories" aria-labelledby="categories-title">
      <h2 id="categories-title">دسته‌بندی‌ها</h2>
      <ul className="category-list">
        {categories.map((c) => {
          const isActive = c.id === selectedId;

          return (
            <li key={c.id}>
              <button
                type="button"
                aria-current={isActive ? "true" : undefined}
                onClick={() => onPick(isActive ? null : c.id)}
              >
                <span aria-hidden="true" style={{ background: c.color }}>
                  {c.emoji}
                </span>{" "}
                {c.name}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
