
export default function CategoryNav() {
  return (
    <section className="categories">
      <div className="container">
        <div className="section-header">
          <h2>دسته‌بندی محصولات</h2>
        </div>

        <div className="category-list">
          <a href="#" className="category-card">
            <span className="category-icon">🥛</span>
            <span>لبنیات</span>
          </a>

          <a href="#" className="category-card">
            <span className="category-icon">🥤</span>
            <span>نوشیدنی</span>
          </a>

          <a href="#" className="category-card">
            <span className="category-icon">🍫</span>
            <span>تنقلات</span>
          </a>

          <a href="#" className="category-card">
            <span className="category-icon">🍞</span>
            <span>نان و غلات</span>
          </a>

          <a href="#" className="category-card">
            <span className="category-icon">🍎</span>
            <span>میوه و سبزیجات</span>
          </a>

          <a href="#" className="category-card">
            <span className="category-icon">🧴</span>
            <span>بهداشتی</span>
          </a>
        </div>
      </div>
    </section>
  )
}
