import type { Category } from "../../scripts/types";
import { Art } from "../shared/Art.tsx";

type CategoryNavProps = {
  categories: Category[];
  activeId: number | null;
  onPick: (id: number) => void;
};

export default function CategoryNav({
  categories,
  activeId,
  onPick,
}: CategoryNavProps) {
  return (
    <section className="categories" id="categories">
      <h2 className="categories-title">دسته‌بندی‌ها</h2>
      <div className="categories-section" id="category-cards">
        {categories.map((c) => (
          <a
            key={c.id}
            className={
              c.id === activeId ? "categories-box is-active" : "categories-box"
            }
            href={`#${c.slug}`}
            aria-current={c.id === activeId ? "true" : undefined}
            onClick={() => onPick(c.id)}
          >
            <span
              className="categories-icon"
              style={{ backgroundColor: c.color }}
            >
              <Art value={c.image ?? c.emoji ?? "🛒"} alt={c.name} />
            </span>
            <p className="categories-name">{c.name}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
