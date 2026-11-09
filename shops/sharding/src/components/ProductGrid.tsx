import ProductCard from './ProductCard'

export default function ProductGrid() {
  return (
    <section className="product-shelf" id="shelf-main" aria-labelledby="shelf-main-title">
      <div className="container">
        <div className="product-shelf__inner">
          <div className="product-shelf__main">
            <div className="product-shelf__head">
              <h2 id="shelf-main-title" className="product-shelf__title">پیشنهادهای ویژه امروز</h2>
            </div>

            <ul
              className="product-shelf__grid"
              id="shelf-main-grid"
              tabIndex={0}
              aria-label="پیشنهادهای ویژه امروز"
            >
              <ProductCard />
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}