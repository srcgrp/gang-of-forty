import CategoryLink, { type CategoryListProps } from './CategoryLink';
import type { CSSProperties } from 'react';

function categoryColor(color: string): CSSProperties & { '--cat-bg': string } {
  return { '--cat-bg': color };
}

export default function CategoryNav({ categories, categoryId, onPick, menu = false }: CategoryListProps & { menu?: boolean }) {
  if (menu) {
    return (
      <ul className="mega-panel">
        {categories.map(category => (
          <li key={category.id}>
            <CategoryLink active={category.id === categoryId} category={category} onPick={onPick}>
              <span className="cat__icon cat__icon--menu" aria-hidden="true">{category.emoji}</span>
              {category.name}
            </CategoryLink>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section id="categories" aria-labelledby="categories-t">
      <div className="sec-head"><h2 id="categories-t">دسته‌بندی‌ها</h2></div>
      <ul className="cats">
        {categories.map(category => (
          <li key={category.id}>
            <CategoryLink active={category.id === categoryId} category={category} onPick={onPick} className="cat">
              <span className="cat__icon-wrap" aria-hidden="true" style={categoryColor(category.color)}>{category.emoji}</span>
              {category.name}
            </CategoryLink>
          </li>
        ))}
      </ul>
    </section>
  );
}