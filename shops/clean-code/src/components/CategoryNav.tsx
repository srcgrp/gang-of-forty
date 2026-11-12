import type { Category } from "../types/product.ts";
import CategoryItem from "./CategoryItem.tsx";

type CategoryNavProps = {
  categories: Category[];
  selectedId: number | null;
  onPick: (id: number | null) => void;
};

export default function CategoryNav({
  categories,
  selectedId,
  onPick,
}: CategoryNavProps) {
  return (
    <nav className="category-nav">
      <section id="categories">
        <h2>دسته‌بندی‌ها</h2>
        <ul className="cat-list">
          <li>
            <a
              className={selectedId === null ? "active" : ""}
              data-cat="all"
              href="#categories"
              onClick={function (e) {
                e.preventDefault();
                onPick(null);
              }}
            >
              همه
            </a>
          </li>
          {categories.map(function (category) {
            return (
              <CategoryItem
                key={category.id}
                category={category}
                selected={selectedId === category.id}
                onPick={onPick}
              />
            );
          })}
        </ul>
      </section>
    </nav>
  );
}
