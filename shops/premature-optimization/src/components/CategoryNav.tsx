import Art from "./Art.tsx";
import { CATEGORIES } from "./sampleData.ts";

export default function CategoryNav() {
  return (
    <section className="categories" id="categories">
      <h2 className="categories-title">دسته‌بندی‌ها</h2>
      <div className="categories-section" id="category-cards">
        {CATEGORIES.map((c) => (
          <a key={c.id} className="categories-box" href={`#${c.slug}`}>
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
