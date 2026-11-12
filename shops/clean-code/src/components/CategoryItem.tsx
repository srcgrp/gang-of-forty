import type { Category } from "../types/product.ts";

type CategoryItemProps = {
  category: Category;
  onPick: (id: number) => void;
};

export default function CategoryItem({ category, onPick }: CategoryItemProps) {
  return (
    <li>
      <a
        href={"#category-" + category.id}
        onClick={function (e) {
          e.preventDefault();
          onPick(category.id);
        }}
      >
        {category.emoji} {category.name}
      </a>
    </li>
  );
}
