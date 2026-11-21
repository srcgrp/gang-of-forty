import type { Category } from "../types";

export function CategoryNav({
  categories,
  activeId,
  onPick,
}: {
  categories: Category[];
  activeId: number | null;
  onPick: (id: number | null) => void;
}) {
  return (
    <nav className="category-nav">
      <button
        onClick={() => onPick(null)}
        className={activeId === null ? "active" : ""}
      >
        همه
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onPick(cat.id)}
          className={activeId === cat.id ? "active" : ""}
        >
          {cat.name}
        </button>
      ))}
    </nav>
  );
}
