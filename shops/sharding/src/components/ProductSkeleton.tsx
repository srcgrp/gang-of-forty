export default function ProductSkeleton() {
  return (
    <section className="product-shelf" id="skeleton" aria-labelledby="skeleton-title">
      <div className="container">
        <div className="product-shelf__inner">
          <div className="product-shelf__main">
            <div className="product-shelf__head">
              <h2 className="product-shelf__title" id="skeleton-title">در حال بارگذاری…</h2>
            </div>
            <ul className="product-shelf__grid" id="skeleton-grid" aria-busy="true">
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i} className="product-item">
                  <article className="product" data-skeleton>
                    <div className="product__link">
                      <span className="product__img"></span>
                      <h3 className="product__name">—</h3>
                    </div>
                    <div className="product__footer">
                      <span className="product__price"><span className="product__current">—</span></span>
                      <span className="product__add"></span>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}