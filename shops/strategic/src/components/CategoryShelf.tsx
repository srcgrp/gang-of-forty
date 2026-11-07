import type { Product, Category } from '../types';
import ProductGrid from './ProductGrid';

export default function CategoryShelf({ products, category, onAdd }: { products: Product[]; category: Category; onAdd: (id: number) => void }) {
  return (
    <section className="shelf" id={category.slug} aria-labelledby={`${category.slug}-t`}>
      <div className="sec-head">
        <h2 id={`${category.slug}-t`}>
          <span className="cat__icon cat__icon--head" aria-hidden="true">{category.emoji}</span>
          {category.name}
        </h2>
        <div className="arrows">
          <button className="arr arr--start" type="button" data-dir="-1" aria-label={`محصولات قبلی «${category.name}»`} disabled><svg className="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right" /></svg></button>
          <button className="arr arr--end" type="button" data-dir="1" aria-label={`محصولات بعدی «${category.name}»`} disabled><svg className="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right" /></svg></button>
        </div>
      </div>
      <ul className="rail">
        <ProductGrid products={products} onAdd={onAdd} />
        <li className="card card--all">
          <a className="offer-all" href={`?category=${category.slug}`} data-route="">
            <span className="offer-all__circle"><svg className="icon icon--mirror" aria-hidden="true" focusable="false"><use href="#i-arrow-right" /></svg></span>
            <span className="offer-all__text">
              مشاهده همه
              <span className="sr-only">{` ${category.name}`}</span>
            </span>
          </a>
        </li>
      </ul>
    </section>
  );
}