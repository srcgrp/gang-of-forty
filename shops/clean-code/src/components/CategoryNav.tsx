import type { Category } from "../types/product.ts";
import CategoryItem from "./CategoryItem.tsx";

type CategoryNavProps = {
  categories: Category[];
  onPick: (id: number) => void;
};

export default function CategoryNav({ categories, onPick }: CategoryNavProps) {
  return (
    <nav className="category-nav">
      <section id="categories">
        <h2>دسته‌بندی‌ها</h2>
        <ul className="cat-list">
          {categories.map(function (category) {
            return (
              <CategoryItem
                key={category.id}
                category={category}
                onPick={onPick}
              />
            );
          })}
        </ul>
      </section>
    </nav>
  );
}
