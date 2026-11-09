
import type { Category } from "../shared/types/products";

type CategoryNavProps = {
  categories: Category[];
  onPick: (id: number | null) => void;
};

export default function CategoryNav({
  categories,
  onPick,
}: CategoryNavProps) {
  return (
    <nav className="main-nav desktop-nav" aria-label="منوی اصلی">
      <a
        href="#products"
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
