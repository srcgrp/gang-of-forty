import type { CartControls } from '../cart-controls';
import type { Category, ProductItem } from '../types';
import ProductGrid from './ProductGrid';

type CatalogProps = { title: string; category?: Category | undefined; items: readonly ProductItem[]; controls: CartControls };

export default function Catalog({ title, category, items, controls }: CatalogProps) {
  return (
    <>
      <div className="back-bar">
        <a className="back-btn" href="./"><svg className="icon" aria-hidden="true"><use href="#i-arrow-right" /></svg>بازگشت به صفحه اصلی</a>
      </div>
      <section className="catalog" aria-labelledby="catalog-t">
        <div className="sec-head">
          <h1 id="catalog-t" className="catalog__title">
            {category && <span className="cat__icon cat__icon--head" aria-hidden="true">{category.emoji}</span>}
            {title}
          </h1>
          <p className="catalog__count">{items.length.toLocaleString('fa-IR')} کالا</p>
        </div>
        {items.length ? <ul className="grid"><ProductGrid items={items} controls={controls} /></ul> :
          <p className="state">فعلاً کالایی در این بخش نداریم.</p>}
      </section>
    </>
  );
}