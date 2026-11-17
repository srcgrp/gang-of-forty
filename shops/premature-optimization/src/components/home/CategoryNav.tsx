import type { Category } from "../../scripts/types";
import AnchorLink from "../shared/AnchorLink.tsx";
import { Art } from "../shared/Art.tsx";

type CategoryNavProps = { categories: Category[] };

export default function CategoryNav({ categories }: CategoryNavProps) {
  return (
    <section className="categories" id="categories">
      <h2 className="categories-title">دسته‌بندی‌ها</h2>
      <div className="categories-section" id="category-cards">
        {categories.map((c) => (
          <AnchorLink key={c.id} targetId={c.slug} className="categories-box">
            <span
              className="categories-icon"
              style={{ backgroundColor: c.color }}
            >
              <Art value={c.image ?? c.emoji ?? "🛒"} alt={c.name} />
            </span>
            <p className="categories-name">{c.name}</p>
          </AnchorLink>
        ))}
      </div>
    </section>
  );
}
