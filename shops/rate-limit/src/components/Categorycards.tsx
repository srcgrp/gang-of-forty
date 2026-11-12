import type { Category } from '../types';

type CategoryCardsProps = {
  categories: Category[];
  onSelect: (categoryId: string) => void;
};

export default function CategoryCards({ categories, onSelect }: CategoryCardsProps) {
  return (
    <section className="category-section">
      <h2>دسته بندی ها</h2>
      <div className="category-list">
        {categories.map((c) => (
          <div className="category-card" key={c.id}>
            <a href={`#${c.slug}`} onClick={() => onSelect(c.id)}>
              <img alt="" src={`/images/${c.slug}.png`} />
              <h3 className="category-card-title">{c.name}</h3>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}