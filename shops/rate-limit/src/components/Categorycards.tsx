import type { Category } from '../types';

type CategoryCardsProps = {
  categories: Category[];
  activeId: number | null;
  onPick: (id: number | null) => void;
};

export default function CategoryCards({ categories, activeId, onPick }: CategoryCardsProps) {
  return (
    <section className="category-section">
      <h2>دسته بندی ها</h2>
      <div className="category-list">
        {categories.map((c) => (
          <div className={`category-card${c.id === activeId ? ' is-active' : ''}`} key={c.id}>
            <a href={`#${c.slug}`} onClick={() => onPick(c.id)}>
              <img alt="" src={`/images/${c.slug}.png`} />
              <h3 className="category-card-title">{c.name}</h3>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}