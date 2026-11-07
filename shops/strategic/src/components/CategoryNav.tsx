import CategoryLink, { type CategoryListProps } from './CategoryLink';
import type { CSSProperties } from 'react';

function categoryColor(color: string): CSSProperties & { '--cat-bg': string } {
  return { '--cat-bg': color };
}

export default function CategoryNav({ categories, onPick }: CategoryListProps) {
  return (
    <section id="categories" aria-labelledby="categories-t">
      <div className="sec-head"><h2 id="categories-t">دسته‌بندی‌ها</h2></div>
      <ul className="cats">
        {categories.map(category => (
          <li key={category.id}>
            <CategoryLink category={category} onPick={onPick} className="cat">
              <span className="cat__icon-wrap" aria-hidden="true" style={categoryColor(category.color)}>{category.emoji}</span>
              {category.name}
            </CategoryLink>
          </li>
        ))}
      </ul>
    </section>
  );
}