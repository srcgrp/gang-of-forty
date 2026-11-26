import { Link } from '@tanstack/react-router'

export default function NotFound() {
  return (
    <section className="product-shelf" aria-labelledby="not-found-title">
      <div className="container">
        <div className="product-shelf__inner">
          <header className="product-shelf__main plp__heading">
            <h1 className="plp__title" id="not-found-title">این صفحه پیدا نشد</h1>
            <Link to="/" className="catalog-link">
              <svg width="16" height="16" fill="currentColor" aria-hidden="true">
                <use href="./icons.svg#arrowForward" />
              </svg>
              بازگشت به خانه
            </Link>
          </header>
        </div>
      </div>
    </section>
  )
}
