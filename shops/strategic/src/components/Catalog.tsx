import type { Category, Product } from '../types';
import ProductGrid from './ProductGrid';

type CatalogProps = { title: string; category?: Category | undefined; products: Product[]; onAdd: (id: number) => void };

export default function Catalog({ title, category, products, onAdd }: CatalogProps) {
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
          <p className="catalog__count">{products.length.toLocaleString('fa-IR')} کالا</p>
        </div>
        {products.length ? <ul className="grid"><ProductGrid products={products} onAdd={onAdd} /></ul> :
          <p className="state">فعلاً کالایی در این بخش نداریم.</p>}
      </section>
    </>
  );
}