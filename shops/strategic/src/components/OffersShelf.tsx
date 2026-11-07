import type { Product } from '../types';
import ProductGrid from './ProductGrid';

export default function OffersShelf({ products, onAdd }: { products: Product[]; onAdd: (id: number) => void }) {
  return (
    <section className="shelf offers" id="offers" aria-labelledby="offers-t">
      <div className="offers__box">
        <div className="offers__scroller">
          <div className="offers__intro">
            <h2 className="offers__title" id="offers-t">
              <span>پیشنهاد</span>
              <span>ویژه</span>
              <span>امروز</span>
            </h2>
            <img className="offers__art" src="./assets/images/hero/offer.webp" alt="" width="1536" height="1024" loading="lazy" decoding="async" />
            <a className="offers__all" href="./?category=offers" data-route="">
              {"مشاهده همه "}
              <svg className="icon icon--mirror" aria-hidden="true" focusable="false"><use href="#i-chevron-right" /></svg>
            </a>
          </div>
          <ul className="offers__list">
            <ProductGrid products={products} onAdd={onAdd} />
            <li className="card card--all">
              <a className="offer-all" href="./?category=offers" data-route="">
                <span className="offer-all__circle"><svg className="icon icon--mirror" aria-hidden="true" focusable="false"><use href="#i-arrow-right" /></svg></span>
                <span className="offer-all__text">
                  مشاهده همه
                  <span className="sr-only">{" پیشنهاد ویژه امروز"}</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
        <button className="offers__nav offers__nav--prev arr--start" type="button" data-dir="-1" aria-label="محصولات قبلی «پیشنهاد ویژه امروز»" disabled><svg className="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right" /></svg></button>
        <button className="offers__nav offers__nav--next arr--end" type="button" data-dir="1" aria-label="محصولات بعدی «پیشنهاد ویژه امروز»"><svg className="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right" /></svg></button>
      </div>
    </section>
  );
}