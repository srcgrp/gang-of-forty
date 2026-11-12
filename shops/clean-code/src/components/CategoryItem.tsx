import type { Category } from "../types/product.ts";

type CategoryItemProps = {
  category: Category;
  selected: boolean;
  onPick: (id: number | null) => void;
};

export default function CategoryItem({
  category,
  selected,
  onPick,
}: CategoryItemProps) {
  return (
    <li>
      <a
        className={selected ? "active" : ""}
        data-cat={category.slug}
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
