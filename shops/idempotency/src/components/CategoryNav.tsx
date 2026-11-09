
import type { Category } from "../shared/types/products";

type CategoryNavProps = {
  categories: Category[];
  activeCategoryId: number | null;
  onPick: (id: number | null) => void;
};

export default function CategoryNav({
  categories,
  activeCategoryId,
  onPick,
}: CategoryNavProps) {
  return (
    <nav className="main-nav desktop-nav" aria-label="منوی اصلی">
      <a
        href="#products"
        className={
          activeCategoryId === null ? "category-link-active" : ""
        }
        aria-current={activeCategoryId === null ? "true" : undefined}
        onClick={(event) => {
          event.preventDefault();
          onPick(null);
        }}
      >
        همه محصولات
      </a>

      {categories.map((category) => (
        <a
          key={category.id}
          href="#products"
          className={
            activeCategoryId === category.id ? "category-link-active" : ""
          }
          aria-current={
            activeCategoryId === category.id ? "true" : undefined
          }
          onClick={(event) => {
            event.preventDefault();
            onPick(category.id);
          }}
        >
          {category.name}
        </a>
      ))}
    </nav>
  );
}
