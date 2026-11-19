import { Link } from '@tanstack/react-router';
import type { Category } from '../types';

type CategoryCardsProps = {
  categories: Category[];
};

export default function CategoryCards({ categories }: CategoryCardsProps) {
  return (
    <section className="category-section">
      <h2>دسته بندی ها</h2>
      <div className="category-list">
        {categories.map((c) => (
          <div className="category-card" key={c.id}>
            <Link to="/plp/$carouselId" params={{ carouselId: c.slug }}>
              <img alt="" src={`/images/${c.slug}.png`} />
              <h3 className="category-card-title">{c.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
