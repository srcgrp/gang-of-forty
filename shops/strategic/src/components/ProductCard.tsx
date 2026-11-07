import type { ProductItem } from '../types';

export default function ProductCard({ item }: { item: ProductItem }) {
  const { product, price, oldPrice, percent, soldOut, art } = item;
  return (
    <li className={soldOut ? 'card card--out' : 'card'}>
      <article className="card__body">
        <div className="pic">
          {art && <img src={`./assets/images/products/${art}.webp`} alt="" width={600} height={600} loading="lazy" decoding="async" />}
          {soldOut ? <span className="badge badge--out">ناموجود</span> : percent > 0 &&
            <span className="badge">{percent.toLocaleString('fa-IR')}٪<span className="sr-only"> تخفیف</span></span>}
        </div>
        <h3>{product.name}</h3>
        <p className="unit">{product.unit}</p>
        <div className="buy">
          <p className="price">
            {percent > 0 && <del><span className="sr-only">قیمت قبلی: </span>{oldPrice.toLocaleString('fa-IR')}</del>}
            <strong>{price.toLocaleString('fa-IR')} تومان</strong>
          </p>
          <div className="buy__control" data-id={product.id}>
            <button className="add" type="button" disabled={soldOut} aria-label={`افزودن ${product.name} به سبد خرید`}>+</button>
          </div>
        </div>
      </article>
    </li>
  );
}