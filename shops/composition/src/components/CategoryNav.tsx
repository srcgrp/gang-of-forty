import type { Category } from "../shared/types";

type Props = {
  categories: Category[]; categoryId: number | null; onPick: (categoryId: number | null) => void;
};
export default function CategoryNav({ categories, categoryId, onPick }: Props) {
  return (
    <section id="categories" aria-labelledby="category-title">
      <div className="section-heading">
        <h2 id="category-title">از اینجا شروع کن</h2>
        <button type="button" className="clear-search" aria-pressed={categoryId === null}
          onClick={() => onPick(null)}>همهٔ دسته‌ها</button>
      </div>
      <nav className="categories" aria-label="دسته‌بندی محصولات">
        {categories.map(category => (
          <button key={category.id} type="button" className="category-tile"
            aria-pressed={categoryId === category.id} onClick={() => onPick(category.id)}>
            <span className="category-emoji" style={{ backgroundColor: category.color }} aria-hidden="true">
              {category.emoji}
            </span>
            <strong>{category.name}</strong>
          </button>
        ))}
      </nav>
    </section>
  );
}
