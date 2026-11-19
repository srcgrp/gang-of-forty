import { shelfElementId } from '../catalog/home-shelves';
import { Link } from '@tanstack/react-router';
import useShelfScroll from './useShelfScroll';
import type { ProductItem } from '../types';
import ProductGrid from './ProductGrid';

export default function CategoryShelf({ id, title, items, emoji, total }: { id: string; title: string; items: ProductItem[]; emoji: string; total: number }) {
  const { ref, edges, move } = useShelfScroll<HTMLUListElement>();
  return (
    <section className="shelf" id={shelfElementId(id)} aria-labelledby={`title:${shelfElementId(id)}`}>
      <div className="sec-head">
        <h2 id={`title:${shelfElementId(id)}`}>
          <span className="cat__icon cat__icon--head" aria-hidden="true">{emoji}</span>
          {title}
        </h2>
        <Link className="catalog__count" to="/plp/$carouselId" params={{ carouselId: id }} search={{ sort: 'default' }}>مشاهده همه ({total.toLocaleString('fa-IR')})</Link>
        <div className="arrows">
          <button className="arr arr--start" type="button" data-dir="-1" aria-label={`محصولات قبلی «${title}»`} disabled={edges.start} onClick={() => move(-1)}><svg className="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right" /></svg></button>
          <button className="arr arr--end" type="button" data-dir="1" aria-label={`محصولات بعدی «${title}»`} disabled={edges.end} onClick={() => move(1)}><svg className="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right" /></svg></button>
        </div>
      </div>
      <ul className="rail" ref={ref}>
        <ProductGrid items={items} />
        <li className="card card--all">
          <Link className="offer-all" to="/plp/$carouselId" params={{ carouselId: id }} search={{ sort: 'default' }}>
            <span className="offer-all__circle"><svg className="icon icon--mirror" aria-hidden="true" focusable="false"><use href="#i-arrow-right" /></svg></span>
            <span className="offer-all__text">
              مشاهده همه
              <span className="sr-only">{` ${title}`}</span>
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
}