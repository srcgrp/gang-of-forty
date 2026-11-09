import type { Category } from "../shared/types/products";
import { categoryImages } from "../features/products/data";

type CategoryGridProps = {
  categories: Category[];
  onPick: (id: number | null) => void;
};

export default function CategoryGrid({
  categories,
  onPick,
}: CategoryGridProps) {
  return (
    <section
      id="categories"
      className="categories"
      aria-labelledby="categories-title"
    >
      <h2 id="categories-title">دسته‌بندی‌ها</h2>

      <div className="category-grid" id="category-grid">
        {categories.map((category) => (
          <a
            key={category.id}
            className="category-card"
            href="#products"
            onClick={() => onPick(category.id)}
          >
            <img
              src={categoryImages[category.id] ?? ""}
              alt=""
              aria-hidden="true"
            />
            <span>{category.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}