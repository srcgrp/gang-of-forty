import useShelfScroll from './useShelfScroll';
import type { CartControls } from '../cart-controls';
import type { ProductItem, Category } from '../types';
import ProductGrid from './ProductGrid';

export default function CategoryShelf({ id, title, items, category, controls }: { id: string; title: string; items: ProductItem[]; category: Category; controls: CartControls }) {
  const { ref, edges, move } = useShelfScroll<HTMLUListElement>();
  return (
    <section className="shelf" id={id} aria-labelledby={`${id}-t`}>
      <div className="sec-head">
        <h2 id={`${id}-t`}>
          <span className="cat__icon cat__icon--head" aria-hidden="true">{category.emoji}</span>
          {title}
        </h2>
        <div className="arrows">
          <button className="arr arr--start" type="button" data-dir="-1" aria-label={`محصولات قبلی «${title}»`} disabled={edges.start} onClick={() => move(-1)}><svg className="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right" /></svg></button>
          <button className="arr arr--end" type="button" data-dir="1" aria-label={`محصولات بعدی «${title}»`} disabled={edges.end} onClick={() => move(1)}><svg className="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right" /></svg></button>
        </div>
      </div>
      <ul className="rail" ref={ref}>
        <ProductGrid items={items} controls={controls} />
        <li className="card card--all">
          <a className="offer-all" href={`?category=${category.slug}`} data-route="">
            <span className="offer-all__circle"><svg className="icon icon--mirror" aria-hidden="true" focusable="false"><use href="#i-arrow-right" /></svg></span>
            <span className="offer-all__text">
              مشاهده همه
              <span className="sr-only">{` ${title}`}</span>
            </span>
          </a>
        </li>
      </ul>
    </section>
  );
}