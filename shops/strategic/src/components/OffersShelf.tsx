import { shelfElementId } from '../catalog/home-shelves';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import useShelfScroll from './useShelfScroll';
import SaleCountdown from './SaleCountdown';
import type { ProductItem } from '../types';
import ProductGrid from './ProductGrid';

export default function OffersShelf({ id, title, items, total }: { id: string; title: string; items: ProductItem[]; total: number }) {
  const { ref, edges, move } = useShelfScroll<HTMLDivElement>();
  const [countdownVisible, setCountdownVisible] = useState(false);
  return (
    <section className="shelf offers" id={shelfElementId(id)} aria-labelledby={`title:${shelfElementId(id)}`}>
      <div className="offers__box">
        <div className="offers__toolbar">
          {countdownVisible && <SaleCountdown />}
          <button
            className="offers__timer-toggle"
            type="button"
            aria-expanded={countdownVisible}
            onClick={() => setCountdownVisible(visible => !visible)}
          >
            {countdownVisible ? 'بستن شمارشگر' : 'نمایش شمارشگر حراج'}
          </button>
        </div>
        <div className="offers__scroller" ref={ref}>
          <div className="offers__intro">
            <h2 className="offers__title" id={`title:${shelfElementId(id)}`}>
              {title.split(' ').map((word, offset, words) => <span key={words.slice(0, offset + 1).join(' ')}>{word}{' '}</span>)}
            </h2>
            <Link className="offers__all" to="/plp/$carouselId" params={{ carouselId: id }} search={{}}>
              {`مشاهده همه (${total.toLocaleString('fa-IR')}) `}
              <svg className="icon icon--mirror" aria-hidden="true" focusable="false"><use href="#i-chevron-right" /></svg>
            </Link>
            <img className="offers__art" src="./assets/images/hero/offer.webp" alt="" width="1536" height="1024" loading="lazy" decoding="async" />
          </div>
          <ul className="offers__list">
            <ProductGrid items={items} />
            <li className="card card--all">
              <Link className="offer-all" to="/plp/$carouselId" params={{ carouselId: id }} search={{}}>
                <span className="offer-all__circle"><svg className="icon icon--mirror" aria-hidden="true" focusable="false"><use href="#i-arrow-right" /></svg></span>
                <span className="offer-all__text">
                  مشاهده همه
                  <span className="sr-only">{` ${title}`}</span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <button className="offers__nav offers__nav--prev arr--start" type="button" data-dir="-1" aria-label={`محصولات قبلی «${title}»`} disabled={edges.start} onClick={() => move(-1)}><svg className="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right" /></svg></button>
        <button className="offers__nav offers__nav--next arr--end" type="button" data-dir="1" aria-label={`محصولات بعدی «${title}»`} disabled={edges.end} onClick={() => move(1)}><svg className="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right" /></svg></button>
      </div>
    </section>
  );
}
