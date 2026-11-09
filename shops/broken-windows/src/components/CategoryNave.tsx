export default function CategoryNav() {
  return (
    <section className="categories" id="categories">
      <h2 className="items-header">دسته بندی ها</h2>

      <div className="all-items" id="categories-grid">
        <div className="items">
          <a href="#categories" className="items-link">
            <span aria-hidden="true" className="items-icon">🥨</span>
            <p className="items-title">تنقلات</p>
          </a>
        </div>

        <div className="items">
          <a href="#categories" className="items-link">
            <span aria-hidden="true" className="items-icon">🥛</span>
            <p className="items-title">لبنیات و بستنی</p>
          </a>
        </div>

        <div className="items">
          <a href="#banana" className="items-link">
            <span aria-hidden="true" className="items-icon">🍎</span>
            <p className="items-title">میوه و سبزی</p>
          </a>
        </div>

        <div className="items">
          <a href="#categories" className="items-link">
            <span aria-hidden="true" className="items-icon">🍞</span>
            <p className="items-title">خواربار و نان</p>
          </a>
        </div>

        <div className="items">
          <a href="#categories" className="items-link">
            <span aria-hidden="true" className="items-icon">🥤</span>
            <p className="items-title">نوشیدنی</p>
          </a>
        </div>

        <div className="items">
          <a href="#categories" className="items-link">
            <span aria-hidden="true" className="items-icon">🍳</span>
            <p className="items-title">صبحانه</p>
          </a>
        </div>
        <div className="items">
          <a href="#categories" className="items-link">
            <span aria-hidden="true" className="items-icon">🍿</span>
            <p className="items-title">پک به صرفه</p>
          </a>
        </div>
      </div>
    </section>
  );
}
